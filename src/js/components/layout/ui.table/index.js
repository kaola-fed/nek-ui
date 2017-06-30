'use strict';

var TableHeader = require('./table.header');
var TableBody = require('./table.body');
var TableCol = require('./table.col');
var TableTemplate = require('./table.template');
var _ = require('../../../ui-base/_');
var u = require('./utils');

var Component = require('../../../ui-base/component');
var tpl = require('./index.html');

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
 * @param {string}            [optiosn.data.align='center']       => 文字对齐
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
 * @param {string}      [optiosn.data.align='']         => 列文字对齐

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
        },
        fixedRight: {
            get: function() {
                var data = this.data;
                var fixedRight = Math.floor(data.parentWidth - data.tableWidth);
                return fixedRight > 0 ? fixedRight : 0;
            }
        }
    },
    config: function(data) {
        this.defaults({
            stickyHeaderOffset: 0,
            stickyFooterOffset: 0,
            scrollParent: null,
            scrollParentNode: null,
            strip: true,
            enableHover: true,
            scrollYBar: 0,
            scrollXBar: 0,

            show: true,
            columns: [],
            sorting: {},
            config: {},
            align: 'center',
            initFinished: false
        });
        this.supr(data);

        this._initWatchers();
    },
    init: function() {
        this._initTable();
    },
    _initTable: function() {
        var data = this.data;
        var refs = this.$refs;
        var INIT = 1;
        setTimeout(function() {
            data.headerHeight = refs.headerWrap.offsetHeight;

            this._updateContainerWidth(INIT);
            this._updateViewWidth();
            this._initTableWidth();
            this._getHeaderHeight();
            data.initFinished = true;
        }.bind(this), 50);
    },
    _initTableWidth: function() {
        var data = this.data;
        var _dataColumns = data._dataColumns;
        if(!_dataColumns) {
            return;
        }

        var tableWidth = data.parentWidth;
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
        autoWidth = autoWidth > 0 ? autoWidth : 100;

        var totalWidth = 0;
        _dataColumns.forEach(function(dataColumn) {
            dataColumn._width = parseInt(dataColumn.width || autoWidth);
            totalWidth += dataColumn._width;
            return dataColumn;
        });

        this._updateData('tableWidth', tableWidth);
    },
    _initWatchers: function() {
        this.$watch('show', this._onShowChange);
        this.$watch('source', this._onSouceChange)
        this.$watch('columns', this._onColumnsChange);
        this.$watch('scrollYBar', this._onScrollYBarChange);
        this.$watch('parentWidth', this._onParentWidthChange);

        this._onBodyScroll = u.throttle(this._onBodyScroll.bind(this), 16);

        this._onWinodwScroll = u.throttle(this._onWinodwScroll.bind(this), 200);
        this._getScrollParentNode().addEventListener('scroll', this._onWinodwScroll);

        this._onWindowResize = u.throttle(this._onWindowResize.bind(this), 200);
        window.addEventListener('resize', this._onWindowResize);

        this._watchWidthChange();
    },
    _getScrollParentNode: function() {
        var data = this.data;
        if(data.scrollParentNode) {
            return data.scrollParentNode;
        }
        if(data.scrollParent) {
            return data.scrollParentNode = document.querySelector(data.scrollParent) || window;
        }
        return data.scrollParentNode = window;
    },
    _updateHeaders: function() {
        var columns = this.data.columns;
        if(!columns) {
            return;
        }
        this.data.headers = u.getHeaders(columns);
    },
    _onShowChange: function(newVal) {
        if(newVal) {
            setTimeout(function() {
                this._updateViewWidth();
            }.bind(this), 100)
        }
    },
    _updateViewWidth: function() {
        if(this.$refs.table) {
            this._updateData('viewWidth', this.$refs.table.offsetWidth);
        }
    },
    _onParentWidthChange: function(newVal, oldVal) {
        if(newVal == undefined || oldVal == undefined) {
            return;
        }
        oldVal = oldVal || this.data.tableWidth;
        var ratio = newVal / oldVal;
        this._updateTableWidth(ratio);
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

        var tableWrapOffset = this._getTableWrapOffset();

        if(data.stickyHeader && tableWrapOffset) {
            this._updateStickyHeaderStatus(tableWrapOffset);
        }

        if(data.stickyFooter && tableWrapOffset) {
            this._updateStickyFooterStatus(tableWrapOffset);
        }
    },
    _getTableWrapOffset: function() {
        var scrollParentNode = this._getScrollParentNode();
        var parentRect = {
            top: 0
        };
        var scrollTop;
        if(scrollParentNode !== window) {
            scrollTop = scrollParentNode.scrollTop;
            parentRect = scrollParentNode.getBoundingClientRect();
        } else {
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        }

        var tableRect = this.$refs.tableWrap.getBoundingClientRect();

        var tableWrapOffset = {
            top: tableRect.top + scrollTop - parentRect.top,
            bottom: tableRect.bottom + scrollTop - parentRect.top
        };

        return tableWrapOffset;
    },
    _updateStickyHeaderStatus: function(tableWrapOffset) {
        var headerHeight = this._getHeaderHeight();

        var scrollParentNode = this._getScrollParentNode();
        var scrollY = 0;
        if(scrollParentNode !== window) {
            scrollY = scrollParentNode.scrollTop;
        } else {
            scrollY = window.scrollY;
        }

        var stickyActive = false;

        if(scrollY + headerHeight > tableWrapOffset.bottom
            || scrollY < tableWrapOffset.top
        ) {
            stickyActive = false;
        } else if(scrollY > tableWrapOffset.top) {
            stickyActive = true;
        }

        this.data.stickyHeaderActive = stickyActive;
    },
    _updateStickyFooterStatus: function(tableWrapOffset) {
        var headerHeight = this._getHeaderHeight();
        var footerHeight = this._getFooterHeight();

        var scrollY = 0;
        var innerHeight = 0;
        var scrollParentNode = this._getScrollParentNode();
        if(scrollParentNode !== window) {
            scrollY = scrollParentNode.scrollTop;
            innerHeight = scrollParentNode.clientHeight;
        } else {
            scrollY = window.scrollY;
            innerHeight = window.innerHeight;
        }

        var scrollYBottom = scrollY + innerHeight;
        var stickyActive = false;

        if(scrollYBottom > tableWrapOffset.bottom + footerHeight
            || scrollYBottom < tableWrapOffset.top + headerHeight + 20
        ) {
            stickyActive = false;
        } else {
            stickyActive = true;
        }

        this.data.stickyFooterActive = stickyActive;
    },
    _watchWidthChange: function() {
        this.data._quickTimer = setInterval(function() {
            if(!this._isShow()) {
                return;
            }
            this._updateContainerWidth();
            this._updateScrollBar();
        }.bind(this), 50);
        this.data._slowTimer = setInterval(function() {
            if(!this._isShow()) {
                return;
            }
            this._updateTableWidth();
        }.bind(this), 200);
    },
    _updateContainerWidth: function(init) {
        var data = this.data;
        var width = data.width;
        if(init && width) {
            data._defaultWidth = width;
            return;
        }

        var parentStyle = window.getComputedStyle(this.$refs.tableWrap.parentElement);
        var parentPadding = u.getNum(parentStyle.paddingLeft) - u.getNum(parentStyle.paddingRight);
        var parentWidth = u.getNum(parentStyle.width);
        width = parentWidth - parentPadding;

        data.parentWidth = width;
        data._defaultWidth = width;
    },
    _updateScrollBar: function() {
        var data = this.data;
        var tableWrapEle = this.$refs.bodyWrap;
        var tableEle = this.$refs.table;
        if(!tableWrapEle || !tableEle) {
            return;
        }
        var yBarWidth = Math.abs(tableWrapEle.offsetWidth - tableWrapEle.clientWidth);
        var tableWrapEleXBarWidth = Math.abs(tableWrapEle.offsetHeight - tableWrapEle.clientHeight);
        var tableEleXBarWidth = Math.abs(tableEle.offsetHeight - tableEle.clientHeight);
        var xBarWidth = Math.max(tableWrapEleXBarWidth, tableEleXBarWidth);

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
            this._updateTableWidth();
            this._updateHeaders();
        }
    },
    _updateDataColumn: function() {
        this.$update('_dataColumns', u.getLeaves(this.data.columns));
    },
    _getHeaderHeight: function() {
        var headerHeight = u.getElementHeight(this.$refs.headerWrap);
        this._updateData('headerHeight', headerHeight);
        return headerHeight;
    },
    _getFooterHeight: function() {
        var footerHeight = u.getElementHeight(this.$refs.footerWrap);
        this._updateData('footerHeight', footerHeight);
        return footerHeight;
    },
    _updateTableWidth: function(ratio) {
        var data = this.data;
        var _dataColumns = data._dataColumns;
        if(!_dataColumns) {
            return;
        }
        ratio = ratio || 1;
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

            if(ratio !== 1) {
                column._width = Math.floor(column._width * ratio);
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

        data.fixedCol = fixedCol;
        data.fixedTableWidth = fixedTableWidth;
        data.fixedColRight = fixedColRight;
        data.fixedTableWidthRight = fixedTableWidthRight;

        data.tableWidth = newTableWidth;

        if(newTableWidth <= data._defaultWidth) {
            data.width = newTableWidth;
        } else {
            data.width = data._defaultWidth;
        }
        this.$update();
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

        u.setElementValue($refs.bodyWrapFixed, 'scrollTop', host.scrollTop);
        u.setElementValue($refs.bodyWrapFixedRight, 'scrollTop', host.scrollTop);
        u.setElementValue($refs.headerWrap, 'scrollLeft', host.scrollLeft);
        u.setElementValue($refs.bodyWrap, 'scrollLeft', host.scrollLeft);
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
        clearInterval(this.data._quickTimer);
        clearInterval(this.data._slowTimer);
        window.document.removeEventListener('scroll', this._onWinodwScroll);
        window.removeEventListener('resize', this._onWindowResize);
    }
})
.component('table.header', TableHeader)
.component('table.body', TableBody)
.component('table.col', TableCol)
.component('table.template', TableTemplate);

var oldFilterFunc = UITable.filter;

UITable.filter = function() {
    var args = [].slice.call(arguments, 0);
    TableHeader.filter.apply(TableHeader, args);
    TableBody.filter.apply(TableBody, args);
    TableCol.filter.apply(TableCol, args);
    TableTemplate.filter.apply(TableTemplate, args);
    oldFilterFunc.apply(UITable, args);
};

module.exports = UITable;

