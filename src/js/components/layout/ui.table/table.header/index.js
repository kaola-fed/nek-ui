'use strict';

var TableTemplate = require('../table.template');
var templates = require('../th.elements');

var Component = require('../../../../ui-base/component');
var tpl = require('./index.html');
var _ = require('../utils');

const HEADER_MIN_WIDTH = 30;

var hasChildren = function(column) {
    return column.children && column.children.length > 0
};

var setColumnWidth = function(column, width) {
    var children = column.children;
    if(hasChildren(column)) {
        setColumnWidth(children[children.length - 1], width);
        return;
    }
    column._width = Math.max(width, HEADER_MIN_WIDTH);
};

var getColumnWidth = function(column) {
    var ret = {
        width: 0,
        lastLeafWidth: 0
    };
    if(hasChildren(column)) {
        column.children.forEach(function(item, index) {
            var tmp = getColumnWidth(item);
            if(index === column.children.length - 1) {
                ret.lastLeafWidth = tmp.width;
            }
            ret.width += tmp.width;
        });
    } else {
        return {
            width: column._width,
            lastLeafWidth: column._width
        };
    }
    return ret;
};

var getHeaders = function(columns) {
    var headers = [];
    var extractHeaders = function(columns, depth) {
        columns.forEach(function(column) {
            if(hasChildren(column)) {
                column._dataColumn = extractHeaders(column.children, depth + 1);
            }
            if(!headers[depth]) {
                headers[depth] = [];
            }
            // 计算深度和宽度
            if(hasChildren(column)) {
                column.childrenDepth = 1 + column.children.reduce(function(previous, current) {
                    return current.childrenDepth > previous ? current.childrenDepth : previous;
                }, -1);
                column.colSpan = column.children.reduce(function(previous, current) {
                    return previous + (current.colSpan || 0);
                }, 0);
            } else {
                column.childrenDepth = 0;
                column.colSpan = 1;
            }
            headers[depth].push(column);
        });
    };
    extractHeaders(columns, 0);
    return headers;
};

var TableBasic = Component.extend({
    template: tpl,
    computed: {
        fixedWidth: {
            get: function() {
                return this.data.headers.reduce(function(previous, current) {
                    return current.fixed ? previous + current._width : previous;
                }, 0);
            }
        }
    },
    config: function(data) {
        this.defaults({
            type: '',
            show: true,
            columns: [],
            sorting: {},
            config: {}
        });
        this.supr(data);
        this._updateHeaders();
    },
    _updateHeaders: function() {
        var columns = this.data.columns;

        if(!columns) {
            return;
        }

        this.data.headers = getHeaders(columns);
    },
    _onHeaderClick: function(header, headerIndex) {
        if(!header.sortable) {
            return;
        }
        this._onSort(header, headerIndex);
    },
    _onSort: function(header, headerIndex) {
        if(header._isDragging) {
            return;
        }
        var sorting = this.data.sorting;

        if(sorting.key === header.key) {
            sorting.isAsc = !sorting.isAsc;
        } else {
            sorting.isAsc = header.isDefaultAsc || false;
        }

        sorting.columnIndex = headerIndex;
        sorting.key = header.key;

        this.$emit('sort', {
            sender: this,
            sorting: sorting,
            column: header,
            columnIndex: headerIndex,
            key: header.key,
            asc: sorting.isAsc
        });
    },
    _onMouseDown: function(e, header, headerIndex, headerTrIndex) {
        var data = this.data;
        var self = this;
        if(!data._ok2ResizeCol) {
            return;
        }
        header._isDragging = true;
        this._startResizing(e, header, headerIndex, headerTrIndex);
    },
    _startResizing: function(e, header, headerIndex, headerTrIndex) {
        var self = this;
        var tableLeft = self.$parent.$refs.table.getBoundingClientRect().left;
        var mouseLeft = e.pageX;
        var headerEle = self.$refs['table_th_' + headerTrIndex + '_' + headerIndex];
        var headerLeft = headerEle.getBoundingClientRect().left;

        header._resizeParam = {
            tableLeft: tableLeft,
            mouseLeft: mouseLeft,
            headerLeft: headerLeft
        };

        var resizeProxy = self.$parent.$refs.resizeProxy;
        resizeProxy.style.visibility = 'visible';

        var onMouseMove = function(_e) {
            _e.preventDefault();

            var proxyLeft = _e.pageX - tableLeft;
            var headerWidth = _e.pageX - headerLeft;

            if(headerWidth > HEADER_MIN_WIDTH) {
                resizeProxy.style.left = proxyLeft + 'px';
            }
        };

        var onMouseUp = function(_e) {
            _e.preventDefault();
            resizeProxy.style.visibility = 'hidden';

            var headerWidth = _e.pageX - headerLeft;
            var widthInfo = getColumnWidth(header);
            setColumnWidth(header, headerWidth - (widthInfo.width-widthInfo.lastLeafWidth));

            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);

            header._isDragging = false;
            self._disableResize();
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    },
    _onMouseOut: function(e, header) {
        if(!header._isDragging) {
            this._disableResize();
            return;
        }
    },
    _onMouseMove: function(e, header) {
        if(!header._isDragging && this._shouldEnableResize(e)) {
            this._enableResize();
        } else {
            this._disableResize();
        }
    },
    _shouldEnableResize: function(e) {
        var target = e.target;
        while(target && target.tagName !== 'TH') {
            target = target.parentNode;
        }
        var rect = target.getBoundingClientRect();
        return rect.width > 12 && rect.right - event.pageX < 8;
    },
    _enableResize: function() {
        document.body.style.cursor = 'col-resize';
        this.$update('_ok2ResizeCol', true);
    },
    _disableResize: function() {
        document.body.style.cursor = '';
        this.$update('_ok2ResizeCol', false);
    },
    _getTHElement: function(header, item) {
        if(header.headerFormat || header.headerFormatter || header.headerTemplate) {
            return this._getCustom(header, item);
        }
        return templates.get(header.type);
    },
    _getCustom: function(header, item) {
        if(header.headerTemplate) {
            return this._getTemplate(header);
        } else if(header.headerFormatter) {
            return this._getFormatter(header, item);
        } else if(header.headerFormat) {
            return this._getFormat(header);
        }
        return '';
    },
    _getTemplate: function(header) {
        if(_.isArray(header.headerTemplate)) {
            return '{#list header.headerTemplate as template by template_index}{#include template}{/list}';
        }
        return'{#include header.headerTemplate}';
    },
    _getFormatter: function(header, headers) {
        var formatter = header.formatter;
        if(_.isArray(formatter)) {
            return formatter.reduce(function(previous, current) {
                return previous + (current.call(this, header, headers) || '');
            }.bind(this), '');
        }
        return formatter.call(this, header, headers) || '';
    },
    _getFormat: function(header) {
        var format = header.format;
        if(_.isArray(format)) {
            return format.reduce(function(previous, current) {
                return previous + _parseFormat(current);
            }.bind(this), '');
        }
        return _parseFormat(format);
    },
    emitEvent: function(type) {
        var args = [].slice.call(arguments, 1);
        this.$emit('customevent', {
            type: type,
            sender: this,
            args: {
                param: args
            }
        });
    }
})
.filter('sortingClass', function(header) {
    var data = this.data;
    var sorting = data.sorting;
    if(sorting) {
        if(sorting.key === header.key) {
            return sorting.isAsc ? 'u-icon-sort-asc' : 'u-icon-sort-desc';
        }
        return '';
    }
});

TableBasic.component('table.template', TableTemplate);

module.exports = TableBasic;
