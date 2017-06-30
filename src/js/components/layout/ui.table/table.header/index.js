'use strict';

var TableTemplate = require('../table.template');
var templates = require('../th.elements');

var Component = require('../../../../ui-base/component');
var _ = require('../utils');
var tpl = require('./index.html');

const HEADER_MIN_WIDTH = 30;
const SHOULD_ENABLE_RESIZE_THRESHOLD = 12;

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

var _parseFormat = function(str) {
    return str.replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
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
        return rect.width > 12 && rect.right - event.pageX < SHOULD_ENABLE_RESIZE_THRESHOLD;
    },
    _enableResize: function() {
        document.body.style.cursor = 'col-resize';
        this.$update('_ok2ResizeCol', true);
    },
    _disableResize: function() {
        document.body.style.cursor = '';
        this.$update('_ok2ResizeCol', false);
    },
    _getFormatter: function(header, headers) {
        return header.headerFormatter.call(this, header, headers) || '';
    },
    _getFormat: function(header) {
        return _parseFormat(header.headerFormat);
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
    },
    emit: function() {
        var args = [].slice.call(arguments, 0);
        this.$parent.$emit.apply(this.$parent, args);
    },
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
