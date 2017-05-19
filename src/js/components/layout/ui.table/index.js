'use strict';

var TableHeader = require('./table.header');
var TableBody = require('./table.body');
var TableCol = require('./table.col');
var TableTemplate = require('./table.template');
var _ = require('../../../ui-base/_');
var utils = require('./utils');

var Component = require('../../../ui-base/component');
var tpl = require('./index.html');

var getLeaves = function(columns) {
    var res = [];
    var extractLeaves = function(columns) {
        if(columns.forEach) {
            return columns.forEach(function(item) {
                if(item.children && item.children.length > 0) {
                    extractLeaves(item.children);
                } else {
                    res.push(item);
                }
            });
        }
    };
    extractLeaves(columns);
    return res;
};

var getNum = function(str) {
    return +((str+'').split('px')[0]);
};

var setElementValue = function(ele, prop, val) {
    if(ele) {
        ele[prop] = val;
    }
};

var UITable = Component.extend({
    name: 'ui.table',
    template: tpl,
    computed: {
        bodyHeight: {
            get: function() {
                var data = this.data;
                if(data.height != undefined && data.headerHeight != undefined) {
                    return +data.height - data.headerHeight;
                }
            },
            set: function(val) {
                return this.data.bodyHeight = val;
            }
        }
    },
    config: function(data) {
        this.defaults({
            enableHover: true,
            scrollYBar: 0,
            scrollXBar: 0,

            show: true,
            columns: [],
            sorting: {},
            config: {},
            _scrollBarTimer: null
        });
        this.supr(data);

        this._initWatchers();
    },
    _initWatchers: function() {
        this.$watch('scrollYBar', this._onScrollYBarChange);
        this.$watch('columns', this._onColumnsChange);

        this._onScroll = utils.throttle(this._onScroll.bind(this), 200);
        window.document.addEventListener('scroll', this._onScroll);

        this._watchWidthChange();
    },
    _onScroll: function() {
        var data = this.data;

        if(data.stickyHeader) {
            this._updateStickyHeaderStatus();
        }

        if(data.stickyFooter) {
            this._updateStickyFooterStatus();
        }
    },
    _updateStickyHeaderStatus: function() {
        var headerHeight = this._getHeaderHeight();
        var scrollY = window.scrollY;
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        var tableRect = this.$refs.tableWrap.getBoundingClientRect();
        var tableWrapOffset = {
            top: tableRect.top + scrollTop,
            bottom: tableRect.bottom + scrollTop
        };

        if(scrollY + headerHeight > tableWrapOffset.bottom
            || scrollY < tableWrapOffset.top
        ) {
            this.$update('stickyHeaderActive', false);
        } else if(scrollY > tableWrapOffset.top) {
            this.$update('stickyHeaderActive', true);
        }
    },
    _updateStickyFooterStatus: function() {
        this._getHeaderHeight();
        var scrollY = window.scrollY;
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        var innerHeight = window.innerHeight;

        var tableRect = this.$refs.tableWrap.getBoundingClientRect();
        var tableWrapOffset = {
            top: tableRect.top + scrollTop,
            bottom: tableRect.bottom + scrollTop
        };

        if(scrollY + innerHeight > tableWrapOffset.bottom) {
            this.$update('stickyFooterActive', false);
        } else if(scrollY > tableWrapOffset.top && scrollY < tableWrapOffset.bottom) {
            this.$update('stickyFooterActive', true);
        }
    },
    _watchWidthChange: function() {
        this.data._widthTimer = setInterval(function() {
            this._updateScrollBar();
            this._updateColumnsWidth();
            this._updateFixedColumnWidth();
        }.bind(this), 200);
    },
    _updateScrollBar: function() {
        var data = this.data;
        var tableWrap = this.$refs.bodyWrap;
        if(!tableWrap) {
            return;
        }

        var yBarWidth = tableWrap.offsetWidth - tableWrap.clientWidth;
        var xBarWidth = tableWrap.offsetHeight - tableWrap.clientHeight;

        if(data.scrollYBar !== yBarWidth) {
            this.$update('scrollYBar', yBarWidth);
        }
        if(data.scrollXBar !== xBarWidth) {
            this.$update('scrollXBar', xBarWidth);
        }
    },
    _onScrollYBarChange: function(newVal, oldVal) {
        if(oldVal === undefined) {
            return;
        }
        this._updateTableWidth();
    },
    _onColumnsChange: function(newVal) {
        if(newVal) {
            this._updateDataColumn();
        }
    },
    _updateDataColumn: function() {
        this.data._dataColumns = getLeaves(this.data.columns);
    },
    init: function() {
        this._initTable();
    },
    _initTable: function() {
        setTimeout(function() {
            this.$update('headerHeight', this.$refs.headerWrap.offsetHeight);
            this._initTableWidth();
            this._getHeaderHeight();
            this._updateStickyHeaderStatus();
        }.bind(this), 200);
    },
    _updateTableWidth: function() {
        this._updateColumnsWidth();
        this._updateFixedColumnWidth();
    },
    _initTableWidth: function() {
        var data = this.data;
        var _dataColumns = data._dataColumns;
        if(!_dataColumns) {
            return;
        }

        var tableWidth = this.$refs.table.clientWidth;
        var customWidthCount = 0;
        var customColumnWidthTotal = _dataColumns.reduce(function(previous, current) {
            var width = parseInt(current.width);
            if(width) {
                customWidthCount++;
                return previous + width;
            }
            return previous;
        }, 0);

        var tableViewWidth = tableWidth - data.scrollYBar;
        var autoWidth = Math.floor((tableViewWidth-customColumnWidthTotal) / (_dataColumns.length-customWidthCount));
        autoWidth = autoWidth >= 0 ? autoWidth : 100;

        var totalWidth = 0;
        _dataColumns.forEach(function(dataColumn) {
            dataColumn._width = parseInt(dataColumn.width || autoWidth);
            totalWidth += dataColumn._width;
            return dataColumn;
        });
        data.tableWidth = totalWidth;
        this.$update();
    },
    _getHeaderHeight: function() {
        var headerHeight = this.data.headerHeight;
        if(headerHeight != undefined) {
            return headerHeight;
        }
        var computedStyle = window.getComputedStyle(this.$refs.headerWrap);
        headerHeight = getNum(computedStyle.marginTop)
                + getNum(computedStyle.borderTopWidth)
                + getNum(this.$refs.headerWrap.offsetHeight)
                + getNum(computedStyle.borderBottomWidth)
                + getNum(computedStyle.marginBottom);

        this.$update('headerHeight', headerHeight);
        return headerHeight;
    },
    _getFooterHeight: function() {
        var footerHeight = this.data.footerHeight;
        if(footerHeight != undefined) {
            return footerHeight;
        }
        var computedStyle = window.getComputedStyle(this.$refs.footerWrap);
        footerHeight = getNum(computedStyle.marginTop)
                + getNum(computedStyle.borderTopWidth)
                + getNum(this.$refs.footerWrap.offsetHeight)
                + getNum(computedStyle.borderBottomWidth)
                + getNum(computedStyle.marginBottom);

        this.$update('footerHeight', footerHeight);
        return footerHeight;
    },
    _updateColumnsWidth: function() {
        var data = this.data;
        var _dataColumns = data._dataColumns;
        if(!_dataColumns) {
            return;
        }
        var newTableWidth = _dataColumns.reduce(function(previous, current) {
            return previous + current._width;
        }, 0);

        if(data.tableWidth !== newTableWidth) {
            this.$update('tableWidth', newTableWidth);
        }
    },
    _updateFixedColumnWidth: function() {
        var data = this.data;
        if(!data._dataColumns
            || (!this.$refs.table && this.$refs.table.clientWidth <= 0)) {
            return;
        }

        var fixedCol = false;
        var fixedColRight = false;
        var fixedTableWidth = 0;
        var fixedTableWidthRight = 0;
        data._dataColumns.forEach(function(item) {
            if(item._width && item.fixed) {
                if(item.fixed === 'right') {
                    fixedColRight = true;
                    fixedTableWidthRight += item._width;
                } else {
                    fixedCol = true;
                    fixedTableWidth += item._width;
                }
            }
        });

        data.fixedTableWidth = fixedTableWidth;
        data.fixedTableWidthRight = fixedTableWidthRight;
        data.fixedCol = fixedCol;
        data.fixedColRight = fixedColRight;
        this.$update();
    },
    _onBodyScroll: function(host) {
        var $refs = this.$refs;

        setElementValue($refs.bodyWrapFixed, 'scrollTop', host.scrollTop);
        setElementValue($refs.bodyWrapFixedRight, 'scrollTop', host.scrollTop);
        setElementValue($refs.headerWrap, 'scrollLeft', host.scrollLeft);
        setElementValue($refs.bodyWrap, 'scrollLeft', host.scrollLeft);
    },
    _onSort: function(e) {
        this.$emit('sort', e);
    },
    _onCustomEvent: function(e) {
        this.$emit(e.type, _.extend({
            sender: this,
            custom: true
        }, e.args));
    },
    _onItemCheckChange: function(e) {
        this.$emit('checkchange', {
            sender: this,
            item: e.item,
            checked: e.checked,
            checkedEvent: e.event
        });
    },
    emitEvent: function(type) {
        var args = [].slice.call(arguments, 1);
        this.$emit(type, {
            custom: true,
            sender: this,
            param: args
        });
    },
    _onExpand: function(e) {
        this.$emit('expand', {
            sender: this,
            expand: e.expand,
            item: e.item,
            itemIndex: e.itemIndex,
            column: e.column
        });
    },
    _onPaging: function(e) {
        console.log(e);
    },
    _onFixedExpand: function(e) {
        this.$refs.tableBody._onExpand(e.item, e.itemIndex, e.column);
    },
    destroy: function() {
        clearInterval(this.data._widthTimer);
        window.document.removeEventListener('scroll', this._onScroll);
        this.supr();
    }
})
.component('table.header', TableHeader)
.component('table.body', TableBody)
.component('table.col', TableCol)
.component('table.template', TableTemplate);

module.exports = UITable;

