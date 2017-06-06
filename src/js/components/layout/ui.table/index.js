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

var getElementHeight = function(ele) {
    var computedStyle = window.getComputedStyle(ele);
    var height = getNum(computedStyle.marginTop)
            + getNum(computedStyle.borderTopWidth)
            + getNum(ele.offsetHeight)
            + getNum(computedStyle.borderBottomWidth)
            + getNum(computedStyle.marginBottom);
    return height;
}

/**
 * @class UITable
 * @extend Component
 * @param {object}            [options.data]                      = 绑定属性
 * @param {array}             [options.data.source]               => 数据源
 * @param {object}            [options.data.paging]               => 分页
 * @param {object}            [options.data.sorting]              => 排序
 * @param {boolean}           [options.data.stickyHeader]         => 将表头固定到页面顶部
 * @param {boolean}           [options.data.stickyFooter]         => 将表格底部操作固定到页面底部
 * @param {boolean}           [options.data.fixedHeader]          => 将表头固定到表格顶部
 * @param {number}            [options.data.lineClamp]            => 单元格行数限制
 * @param {array}             [options.data.columns]              => 列配置
 */

/**
 * @class TableCol
 * @extend Component
 * @param {object}      [options.data]                  = 绑定属性
 * @param {string}      [options.data.name]             => 表头名称
 * @param {string}      [options.data.key]              => 列属性字段
 * @param {string}      [options.data.tip]              => 提示信息
 * @param {string}      [options.data.type]             => 列内容的预设类型
 * @param {string}      [options.data.width]            => 列宽
 * @param {string}      [options.data.tdClass]          => 列内容样式
 * @param {string}      [options.data.thClass]          => 表头样式
 * @param {boolean}     [options.data.sortable]         => 可排序
 * @param {string}      [options.data.children]         => 子表头
 * @param {boolean|string} [options.data.fixed]         => 列固定开关，默认left为做固定，right为右固定

 * @param {string}      [options.data.template]         => 列内容模版
 */

/**
 * @class TableTemplate
 * @extend Component
 * @param {object}      [options.data]                = 绑定属性
 * @param {string}      [options.data.type="content"] => 模版类型, header, content
 */

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
        this.$watch('show', this._onShowChange);
        this.$watch('source', this._onSouceChange)
        this.$watch('columns', this._onColumnsChange);
        this.$watch('scrollYBar', this._onScrollYBarChange);

        this._onBodyScroll = utils.throttle(this._onBodyScroll.bind(this), 16);

        this._onWinodwScroll = utils.throttle(this._onWinodwScroll.bind(this), 200);
        window.document.addEventListener('scroll', this._onWinodwScroll);

        this._onWindowResize = utils.throttle(this._onWindowResize.bind(this), 200);
        window.addEventListener('resize', this._onWindowResize);

        this._watchWidthChange();
    },
    _onShowChange: function(newVal) {
        if(newVal) {
            setTimeout(function() {
                this._updateViewWidth();
            }.bind(this), 200)
        }
    },
    _updateViewWidth: function() {
        if(this.$refs.table) {
            this._updateData('viewWidth', this.$refs.table.offsetWidth);
        }
    },
    _onSouceChange: function() {
        setTimeout(function() {
            this._updateSticky();
        }.bind(this), 500)
    },
    _onWinodwScroll: function() {
        if(!this.$refs || !this._isShow()) {
            return;
        }
        this._updateSticky();
    },
    _updateSticky: function() {
        var data = this.data;
        if(!data.stickyHeader && !data.stickyFooter) {
            return;
        }

        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        var tableRect = this.$refs.tableWrap.getBoundingClientRect();
        var tableWrapOffset = {
            top: tableRect.top + scrollTop,
            bottom: tableRect.bottom + scrollTop
        };

        if(data.stickyHeader && tableWrapOffset) {
            this._updateStickyHeaderStatus(tableWrapOffset);
        }

        if(data.stickyFooter && tableWrapOffset) {
            this._updateStickyFooterStatus(tableWrapOffset);
        }
    },
    _updateStickyHeaderStatus: function(tableWrapOffset) {
        var headerHeight = this._getHeaderHeight();
        var scrollY = window.scrollY;
        var stickyActive = false;

        if(scrollY + headerHeight > tableWrapOffset.bottom
            || scrollY < tableWrapOffset.top
        ) {
            stickyActive = false;
        } else if(scrollY > tableWrapOffset.top) {
            stickyActive = true;
        }


        this._updateData('stickyHeaderActive', stickyActive);
    },
    _updateStickyFooterStatus: function(tableWrapOffset) {
        var headerHeight = this._getHeaderHeight();
        var footerHeight = this._getFooterHeight();
        var scrollY = window.scrollY;
        var innerHeight = window.innerHeight;
        var scrollYBottom = scrollY + innerHeight;
        var stickyActive = false;

        if(scrollYBottom > tableWrapOffset.bottom + footerHeight
            || scrollYBottom < tableWrapOffset.top + headerHeight + 20
        ) {
            stickyActive = false;
        } else {
            stickyActive = true;
        }

        this._updateData('stickyFooterActive', stickyActive);
    },
    _watchWidthChange: function() {
        this.data._widthTimer = setInterval(function() {
            if(!this._isShow()) {
                return;
            }
            this._updateScrollBar();
            this._updateTableWidth();
        }.bind(this), 300);
    },
    _updateScrollBar: function() {
        var data = this.data;
        var tableWrap = this.$refs.bodyWrap;
        if(!tableWrap) {
            return;
        }

        var yBarWidth = tableWrap.offsetWidth - tableWrap.clientWidth;
        var xBarWidth = tableWrap.offsetHeight - tableWrap.clientHeight;

        this._updateData('scrollYBar', yBarWidth);
        this._updateData('scrollXBar', xBarWidth);
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
        this.$update('_dataColumns', getLeaves(this.data.columns));
    },
    init: function() {
        this._initTable();
    },
    _initTable: function() {
        var data = this.data;
        var refs = this.$refs;
        setTimeout(function() {
            data.headerHeight = refs.headerWrap.offsetHeight;

            this._updateViewWidth();
            this._initTableWidth();
            this._getHeaderHeight();
        }.bind(this), 200);
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

        this._updateData('tableWidth', tableWidth);
    },
    _getHeaderHeight: function() {
        var headerHeight = getElementHeight(this.$refs.headerWrap);
        this._updateData('headerHeight', headerHeight);
        return headerHeight;
    },
    _getFooterHeight: function() {
        var footerHeight = getElementHeight(this.$refs.footerWrap);
        this._updateData('footerHeight', footerHeight);
        return footerHeight;
    },
    _updateTableWidth: function() {
        var data = this.data;
        var _dataColumns = data._dataColumns;
        if(!_dataColumns) {
            return;
        }
        var newTableWidth = 0;
        var fixedCol = false;
        var fixedTableWidth = 0;
        var fixedColRight = false;
        var fixedTableWidthRight = 0;

        _dataColumns.forEach(function(column) {
            // 计算表格宽度
            newTableWidth += column._width;

            // 更新列宽
            if(!column._width) {
                column._width = column.width || 100;
            }

            // 计算固定列的总宽度
            if(column._width && column.fixed) {
                if(column.fixed === 'right') {
                    fixedColRight = true;
                    fixedTableWidthRight += column._width;
                } else {
                    fixedCol = true;
                    fixedTableWidth += column._width;
                }
            }
        });

        this._updateData('fixedCol', fixedCol);
        this._updateData('fixedTableWidth', fixedTableWidth);
        this._updateData('fixedColRight', fixedColRight);
        this._updateData('fixedTableWidthRight', fixedTableWidthRight);
        this._updateData('tableWidth', newTableWidth);
    },
    _onWindowResize: function() {
        if(!this.$refs || !this._isShow()) {
            return;
        }
        this.$update('viewWidth', this.$refs.table.offsetWidth);
    },
    _onBodyScroll: function(host) {
        if(!this._isShow()) {
            return;
        }
        var $refs = this.$refs;

        setElementValue($refs.bodyWrapFixed, 'scrollTop', host.scrollTop);
        setElementValue($refs.bodyWrapFixedRight, 'scrollTop', host.scrollTop);
        setElementValue($refs.headerWrap, 'scrollLeft', host.scrollLeft);
        setElementValue($refs.bodyWrap, 'scrollLeft', host.scrollLeft);
    },
    _onSort: function(e) {
        /**
         * @event sort 排序事件
         * @property {object} sender 事件来源
         * @property {boolean} asc 是否升序
         * @property {object} column 目标列
         * @property {number} columnIndex 目标列序号
         * @property {string} key 排序字段
         * @property {object} sorting 排序设置对象
         */
        this.$emit('sort', e);
    },
    _onCustomEvent: function(e) {
        this.$emit(e.type, _.extend({
            sender: this,
            custom: true
        }, e.args));
    },
    _onItemCheckChange: function(e) {
        /**
         * @event checkchange 多选事件
         * @property {object} sender 事件来源
         * @property {boolean} checked 是否选中
         * @property {object} item 操作对象
         * @property {object} checkedEvent 多选事件对象源
         */
        this.$emit('checkchange', {
            sender: this,
            item: e.item,
            checked: e.checked,
            checkedEvent: e.event
        });
    },
    emitEvent: function(type) {
        var args = [].slice.call(arguments, 1);
        /**
         * @event [type] 自定义的操作事件
         * @property {object} sender 事件来源
         * @property {boolean} custom 自定义事件标识
         * @property {array} param 自定义事件所带的参数
         */
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
        /**
         * @event paging 分页事件
         * @property {object} sender 事件来源
         * @property {number} current 事件来源
         * @property {object} paging 分页对象
         */
        this.$emit('paging', {
            sender: this,
            current: e.current,
            paging: this.data.paging
        });
    },
    _onFixedExpand: function(e) {
        this.$refs.tableBody._onExpand(e.item, e.itemIndex, e.column);
    },
    _isShow: function() {
        return this.data.show;
    },
    _updateData: function(key, val) {
        if(this.data[key] !== val) {
            this.$update(key, val);
        }
    },
    destroy: function() {
        this.removeEventListener();
        this.supr();
    },
    removeEventListener: function() {
        clearInterval(this.data._widthTimer);
        window.document.removeEventListener('scroll', this._onWinodwScroll);
        window.removeEventListener('resize', this._onWindowResize);
    }
})
.component('table.header', TableHeader)
.component('table.body', TableBody)
.component('table.col', TableCol)
.component('table.template', TableTemplate);

module.exports = UITable;

