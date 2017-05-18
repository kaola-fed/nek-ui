'use strict';

var TableTemplate = require('../table.template');
// var _ = require('utils/extend');

var Component = require('../../../../ui-base/component');
var tpl = require('./index.html');
//
// var _parseFormat = function(str) {
//     return str.replace(/</g, '&lt;')
//         .replace(/>/g, '&gt;');
// };

var TableBasic = Component.extend({
    template: tpl,
    computed: {
        fixedWidth: {
            get: function() {
                return this.data.headers.reduce(function(previous, current) {
                    if(current.fixed) {
                        return previous + current._width;
                    }
                    return previous;
                }, 0);
            }
        }
    },

    config: function(data) {
        this.defaults({
            type: '',
            enableHover: true,
            show: true,
            x: 1,
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

        var headers = [];
        var extractHeaders = function(columns, depth) {
            columns.forEach(function(column) {
                if(column.children && column.children.length > 0) {
                    column._dataColumn = extractHeaders(column.children, depth + 1);
                }
                if(!headers[depth]) {
                    headers[depth] = [];
                }
                if(column.children && column.children.length > 0) {
                    column.childrenDepth = 1 + column.children.reduce(function(previous, current) {
                        if(current.childrenDepth > previous) {
                            return current.childrenDepth;
                        }
                        return previous;
                    }, -1);
                    column.colSpan = column.children.reduce(function(previous, current) {
                        if(current.colSpan) {
                            return previous + current.colSpan;
                        }
                        return previous;
                    }, 0);
                } else {
                    column.childrenDepth = 0;
                    column.colSpan = 1;
                }
                headers[depth].push(column);
            });
        };
        extractHeaders(columns, 0);
        this.data.headers = headers;
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
        if(!data._ok2ResizeCol) {
            return;
        }
        header._isDragging = true;

        var tableLeft = this.$parent.$refs.table.getBoundingClientRect().left;
        var mouseLeft = e.pageX;
        var headerEle = this.$refs['table_th_' + headerTrIndex + '_' + headerIndex];
        var headerLeft = headerEle.getBoundingClientRect().left;

        header._resizeParam = {
            tableLeft: tableLeft,
            mouseLeft: mouseLeft,
            headerLeft: headerLeft
        };

        var resizeProxy = this.$parent.$refs.resizeProxy;
        resizeProxy.style.visibility = 'visible';

        var onMouseMove = function(_e) {
            var proxyLeft = _e.pageX - tableLeft;
            var headerWidth = _e.pageX - headerLeft;

            if(headerWidth > 30) {
                resizeProxy.style.left = proxyLeft + 'px';
            }

            _e.preventDefault();
        };

        var onMouseUp = function(_e) {
            _e.preventDefault();
            resizeProxy.style.visibility = 'hidden';
            document.body.style.cursor = '';
            header._isDragging = false;

            var headerWidth = _e.pageX - headerLeft;

            var setWidth = function(column, width) {
                var children = column.children;
                if(children && children.length > 0) {
                    setWidth(children[children.length - 1], width);
                    return;
                }
                column._width = Math.max(width, 30);
            };

            var getWidth = function(column) {
                var ret = {
                    width: 0,
                    lastLeafWidth: 0
                };
                if(column.children && column.children.length > 0) {
                    column.children.forEach(function(item, index) {
                        var tmp = getWidth(item);
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

            var widthInfo = getWidth(header);
            setWidth(header, headerWidth - (widthInfo.width-widthInfo.lastLeafWidth));


            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    },

    _onMouseUp: function(e, header) {
        var data = this.data;
        if(!data._ok2ResizeCol) {
            return;
        }
        header._isDragging = false;
    },

    _onMouseMove: function(e, header) {
        var target = e.target;
        while(target && target.tagName !== 'TH') {
            target = target.parentNode;
        }
        var data = this.data;

        if (!header._isDragging) {
            var rect = target.getBoundingClientRect();
            var bodyStyle = document.body.style;
            if (rect.width > 12 && rect.right - event.pageX < 8) {
                bodyStyle.cursor = 'col-resize';
                data._ok2ResizeCol = true;
            } else if (!header._dragging) {
                bodyStyle.cursor = '';
                data._ok2ResizeCol = false;
            }
        }
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

