const TableHeader = require('./TableHeader');
const TableBody = require('./TableBody');
const _ = require('../../../ui-base/_');
const u = require('./utils');

const Component = require('../../../ui-base/component');
const tpl = require('./index.html');

/**
 * @class KLTable
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
 * @param {number}            [optiosn.data.minColWidth=50]       => 最小列宽
 */

/**
 * @class KLTableCol
 * @extend Component
 * @param {object}      [options.data]                  = 绑定属性
 * @param {string}      [options.data.name]             => 表头名称
 * @param {string}      [options.data.key]              => 列属性字段
 * @param {string}      [options.data.tip]              => 提示信息
 * @param {string}      [options.data.type]             => 列内容的预设类型
 * @param {string}      [options.data.width]            => 列宽
 * @param {number}      [optiosn.data.minWidth]         => 最小列宽，不设置时取全局值 minColWidth，拖动改变列宽后会被设置
 * @param {string}      [options.data.columnClass]      => 列内容样式
 * @param {string}      [options.data.headerClass]      => 表头样式
 * @param {boolean}     [options.data.sortable]         => 可排序
 * @param {string}      [options.data.children]         => 子表头
 * @param {boolean|string} [options.data.fixed]         => 列固定开关，默认left为做固定，right为右固定
 * @param {string}      [optiosn.data.align='']         => 列文字对齐
 * @param {string}      [optiosn.data.placeholder='-']  => 列文字对齐
 *
 * @param {string}      [options.data.template]         => 列内容模版
 * @param {string}      [options.data.headerTemplate]   => 列表头模版
 * @param {string}      [options.data.expandTemplate]   => 下钻展开内容模版
 */

/**
 * @class KLTableTemplate
 * @extend Component
 * @param {object}      [options.data]                = 绑定属性
 * @param {string}      [options.data.type="content"] => 模版类型, header, content
 */

const KLTable = Component.extend({
  name: 'kl-table',
  template: tpl,
  computed: {
    checkAll: {
      get() {
        if (!this.data.source) {
          return false;
        }
        const checkedList = this.data.source.filter(item => (item._checked));
        if (checkedList.length === this.data.source.length) {
          return true;
        } else if (checkedList.length > 0) {
          return null;
        }
        return false;
      },
      set(val) {
        if (!this.data.source) {
          return val;
        }
        if (val !== null) {
          this.data.source.forEach((item) => {
            item._checked = !!val;
          });
        }
      },
    },
  },
  config(data) {
    this.defaults({
      stickyHeaderOffset: 0,
      stickyFooterOffset: 0,
      scrollParent: null,
      scrollParentNode: null,
      strip: true,
      enableHover: true,
      scrollYBarWidth: 0,
      scrollXBarWidth: 0,

      show: true,
      columns: [],
      sorting: {},
      config: {},
      align: 'center',
      placeholder: '-',
      checkAll: false,
      initFinished: false,
      minColWidth: 50,
    });
    this.supr(data);
    this.data.minColWidth = +this.data.minColWidth;
    this.data._defaultWidth = +this.data.width;
  },
  init() {
    this._initTable();
  },
  _initTable() {
    const self = this;
    setTimeout(() => {
      self._updateParentWidth();
      self._updateSticky();
      self._updateTableWidth();
      self._initWatchers();
    }, 0);
    setTimeout(() => {
      self._getHeaderHeight();
    }, 400);
  },
  _initWatchers() {
    this.$watch('source', this._onSouceChange);
    this.$watch('columns', this._onColumnsChange);
    this.$watch('scrollYBarWidth', this._onScrollYBarChange);
    this.$watch('parentWidth', this._onParentWidthChange);
    this.$watch('tableWidth', this._onTableWidthChange);
    this.$watch('headerHeight', this._updateBodyHeight);
    this.$watch('height', this._updateBodyHeight);

    this._onBodyScroll = u.throttle(this._onBodyScroll.bind(this), 16);

    this._onWindowScroll = u.throttle(this._onWindowScroll.bind(this), 50);
    this._getScrollParentNode().addEventListener('scroll', this._onWindowScroll);

    this._onWindowResize = u.throttle(this._onWindowResize.bind(this), 50);
    window.addEventListener('resize', this._onWindowResize);

    this._watchWidthChange();
  },
  _getScrollParentNode() {
    const data = this.data;
    if (data.scrollParentNode) {
      return data.scrollParentNode;
    }
    if (data.scrollParent) {
      return (data.scrollParentNode =
        document.querySelector(data.scrollParent) || window);
    }
    return (data.scrollParentNode = window);
  },
  _updateHeaders() {
    const columns = this.data.columns;
    if (!columns) {
      return;
    }
    const headers = u.getHeaders(columns);
    this._updateData('headers', headers);
  },
  _onParentWidthChange(newVal, oldVal) {
    if (newVal === undefined || oldVal === undefined) {
      return;
    }
    this._updateTableWidth();
    this._updateSticky();
    this._updateFixedTablePosRight();
    this._getHeaderHeight();
  },
  _onTableWidthChange() {
    this._updateFixedTablePosRight();
  },
  _onSouceChange() {
    const self = this;
    setTimeout(() => {
      self._updateSticky();
    }, 500);
  },
  _onWindowScroll() {
    if (!this.$refs || !this._isShow()) {
      return;
    }
    this._updateSticky();
  },
  _updateSticky() {
    const data = this.data;
    if (data.parentWidth === 0) {
      data.stickyHeaderActive = false;
      data.stickyFooterActive = false;
      return;
    }
    if (!data.stickyHeader && !data.stickyFooter) {
      return;
    }

    const tableWrapOffset = this._getTableWrapOffset();

    if (data.stickyHeader && tableWrapOffset) {
      this._updateStickyHeaderStatus(tableWrapOffset);
    }

    if (data.stickyFooter && tableWrapOffset) {
      this._updateStickyFooterStatus(tableWrapOffset);
    }
  },
  _getTableWrapOffset() {
    const scrollParentNode = this._getScrollParentNode();
    let parentRect = {
      top: 0,
    };
    let scrollTop;
    if (scrollParentNode !== window) {
      scrollTop = scrollParentNode.scrollTop;
      parentRect = scrollParentNode.getBoundingClientRect();
    } else {
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    }

    const tableRect = this.$refs.tableWrap.getBoundingClientRect();

    const tableWrapOffset = {
      top: (tableRect.top + scrollTop) - parentRect.top,
      bottom: (tableRect.bottom + scrollTop) - parentRect.top,
    };

    return tableWrapOffset;
  },
  _updateStickyHeaderStatus(tableWrapOffset) {
    const headerHeight = this._getHeaderHeight();

    const scrollParentNode = this._getScrollParentNode();
    let scrollY = 0;
    if (scrollParentNode !== window) {
      scrollY = scrollParentNode.scrollTop;
    } else {
      scrollY = window.pageYOffset || document.documentElement.scrollTop;
    }

    let stickyActive = false;
    const stickyHeaderOffset = +this.data.stickyHeaderOffset;

    if (
      scrollY + stickyHeaderOffset + headerHeight > tableWrapOffset.bottom ||
      scrollY + stickyHeaderOffset < tableWrapOffset.top
    ) {
      stickyActive = false;
    } else {
      stickyActive = true;
    }

    this._updateData('stickyHeaderActive', stickyActive);
  },
  _updateStickyFooterStatus(tableWrapOffset) {
    const headerHeight = this._getHeaderHeight();
    const footerHeight = this._getFooterHeight();

    let scrollY = 0;
    let innerHeight = 0;
    const scrollParentNode = this._getScrollParentNode();
    if (scrollParentNode !== window) {
      scrollY = scrollParentNode.scrollTop;
      innerHeight = scrollParentNode.clientHeight;
    } else {
      scrollY = window.scrollY;
      innerHeight = window.innerHeight;
    }

    const scrollYBottom = scrollY + innerHeight;
    let stickyActive = false;

    const stickyFooterOffset = +this.data.stickyFooterOffset;

    if (
      scrollYBottom > tableWrapOffset.bottom + footerHeight + stickyFooterOffset ||
      scrollYBottom < tableWrapOffset.top + headerHeight + 20 + stickyFooterOffset
    ) {
      stickyActive = false;
    } else {
      stickyActive = true;
    }

    this._updateData('stickyFooterActive', stickyActive);
  },
  _watchWidthChange() {
    const self = this;
    self.data._quickTimer = setInterval(() => {
      if (!self._isShow()) {
        return;
      }
      self._updateParentWidth();
      self._updateScrollBar();
    }, 200);
  },
  _updateParentWidth() {
    const data = this.data;
    let width = data.width;

    const parentStyle = window.getComputedStyle(
      this.$refs.tableWrap.parentElement,
    );
    const parentPadding =
      u.getNum(parentStyle.paddingLeft) + u.getNum(parentStyle.paddingRight);
    const parentWidth = this.$refs.tableWrap.parentElement.clientWidth;
    width = parentWidth - parentPadding;

    this._updateData('parentWidth', width);
  },
  _updateScrollBar() {
    const tableWrapEle = this.$refs.bodyWrap;
    const tableEle = this.$refs.table;
    if (!tableWrapEle || !tableEle) {
      return;
    }
    const yBarWidth = Math.abs(
      tableWrapEle.offsetWidth - tableWrapEle.clientWidth,
    );
    const tableWrapEleXBarWidth = Math.abs(
      tableWrapEle.offsetHeight - tableWrapEle.clientHeight,
    );
    const tableEleXBarWidth = Math.abs(
      tableEle.offsetHeight - tableEle.clientHeight,
    );
    const xBarWidth = Math.max(tableWrapEleXBarWidth, tableEleXBarWidth);

    this._updateData('scrollYBarWidth', yBarWidth);
    this._updateData('scrollXBarWidth', xBarWidth);
  },
  _onScrollYBarChange(newVal, oldVal) {
    if (oldVal === undefined) {
      return;
    }
    this._updateTableWidth();
  },
  _onColumnsChange(newVal) {
    if (newVal) {
      this._updateDataColumn();
      this._updateTableWidth();
      this._updateHeaders();
    }
  },
  _updateDataColumn() {
    this.$update('_dataColumns', u.getLeaves(this.data.columns));
  },
  _getHeaderHeight() {
    const headerHeight = u.getElementHeight(this.$refs.headerWrap);
    this._updateData('headerHeight', headerHeight);
    return headerHeight;
  },
  _getFooterHeight() {
    const footerHeight = u.getElementHeight(this.$refs.footerWrap);
    this._updateData('footerHeight', footerHeight);
    return footerHeight;
  },
  _updateTableWidth() {
    const data = this.data;
    const minColWidth = data.minColWidth;
    const parentWidth = data.parentWidth - (data.scrollYBarWidth || 0);
    const _dataColumns = data._dataColumns;
    if (!_dataColumns) {
      return;
    }
    const minTableWidth = _dataColumns.reduce((sum, column) => sum + (column.width || column.minWidth || minColWidth), 0);
    if (parentWidth > minTableWidth) {
      const totalFlexWidth = parentWidth - minTableWidth;
      const flexColumns = _dataColumns.filter(column => !column.width);
      const flexColumnsWidth = flexColumns.reduce((sum, column) => sum + (column.minWidth || minColWidth), 0);
      const ratio = totalFlexWidth / flexColumnsWidth;
      let noneFirstColFlexWidth = 0;

      if (flexColumns.length > 0) {
        flexColumns.forEach((column, index) => {
          if (index === 0) {
            return;
          }
          const flexWidth = Math.floor((column.minWidth || minColWidth) * ratio);
          column._width = flexWidth + (column.minWidth || minColWidth);
          noneFirstColFlexWidth += flexWidth;
        });
        flexColumns[0]._width = (flexColumns[0].minWidth || minColWidth) + (totalFlexWidth - noneFirstColFlexWidth);
      }

      const newTableWidth = _dataColumns.reduce((sum, column) => {
        if (!column._width) {
          column._width = column.width || data.defaultsColWidth;
        }
        return sum + column._width;
      }, 0);

      this._updateData('tableWidth', newTableWidth);
    } else {
      let newTableWidth = 0;
      _dataColumns.forEach((column) => {
        column._width = column.width || column.minWidth || minColWidth;
        newTableWidth += column._width;
      });
      this._updateData('tableWidth', newTableWidth);
    }

    let newWidth = data.tableWidth;
    if (data._defaultWidth) {
      newWidth = Math.min(newWidth, data._defaultWidth);
    }
    newWidth = Math.min(newWidth, data.parentWidth);
    this._updateData('width', newWidth);
    this._updateFixedWidth();
  },
  _updateFixedWidth() {
    const _dataColumns = this.data._dataColumns;
    const fixedTableWidth = _dataColumns.reduce((sum, current) => {
      if (current.fixed === 'left' || current.fixed === true) {
        return sum + current._width;
      }
      return sum;
    }, 0);
    const fixedColLeft = !!fixedTableWidth;

    const fixedTableWidthRight = _dataColumns.reduce((sum, current) => {
      if (current.fixed === 'right') {
        return sum + current._width;
      }
      return sum;
    }, 0) - 1;
    const fixedColRight = !!fixedTableWidthRight;

    this._updateData('fixedColLeft', fixedColLeft);
    this._updateData('fixedTableWidth', fixedTableWidth);
    this._updateData('fixedColRight', fixedColRight);
    this._updateData('fixedTableWidthRight', fixedTableWidthRight);
  },
  _onWindowResize() {
    if (!this.$refs || !this._isShow()) {
      return;
    }
    this._updateParentWidth();
  },
  _onBodyScroll(host) {
    if (!this._isShow()) {
      return;
    }
    const $refs = this.$refs;

    u.setElementValue($refs.bodyWrapFixedLeft, 'scrollTop', host.scrollTop);
    u.setElementValue($refs.bodyWrapFixedRight, 'scrollTop', host.scrollTop);
    u.setElementValue($refs.headerWrap, 'scrollLeft', host.scrollLeft);
    u.setElementValue($refs.bodyWrap, 'scrollLeft', host.scrollLeft);
  },
  _onSort(e) {
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
  _onCustomEvent(e) {
    this.$emit(
      e.type,
      _.extend(
        {
          sender: this,
          custom: true,
        },
        e.args,
      ),
    );
  },
  _onItemCheckChange(e) {
    /**
         * @event checkchange 多选事件
         * @property {object} sender 事件来源
         * @property {boolean} checked 是否选中
         * @property {object} item 操作对象
         * @property {object} checkedEvent 多选事件对象源
         */
    setTimeout(() => {
      this.$emit('checkchange', {
        sender: this,
        item: e.item,
        checked: e.checked,
        checkedEvent: e.event,
        checkAll: this.data.checkAll,
      });
    });
  },
  _updateFixedTablePosRight() {
    const data = this.data;
    const fixedTablePosRight = Math.floor(data.parentWidth - data.tableWidth);
    this._updateData('fixedTablePosRight', fixedTablePosRight > 0 ? fixedTablePosRight : data.scrollYBarWidth);
  },
  _updateBodyHeight() {
    const data = this.data;
    if (data.height !== undefined && data.headerHeight !== undefined && data.height !== null && data.headerHeight !== null) {
      this._updateData('bodyHeight', +data.height - data.headerHeight);
    }
  },
  emitEvent(type, ...args) {
    /**
         * @event [type] 自定义的操作事件
         * @property {object} sender 事件来源
         * @property {boolean} custom 自定义事件标识
         * @property {array} param 自定义事件所带的参数
         */
    this.$emit(type, {
      custom: true,
      sender: this,
      param: args,
    });
  },
  _onExpand(e) {
    this.$emit('expand', {
      sender: this,
      expand: e.expand,
      item: e.item,
      itemIndex: e.itemIndex,
      column: e.column,
    });
  },
  _onPaging(e) {
    /**
         * @event paging 分页事件
         * @property {object} sender 事件来源
         * @property {number} current 事件来源
         * @property {object} paging 分页对象
         */
    this.$emit('paging', {
      sender: this,
      current: e.current,
      paging: this.data.paging,
    });
  },
  _onFixedExpand(e) {
    this.$refs.tableBody._onExpand(e.item, e.itemIndex, e.column);
  },
  _onColumnResize() {
    this._updateTableWidth();
    this._updateFixedWidth();
    this._forceRender();
  },
  _forceRender() {
    const strip = this.data.strip;
    this.$update('strip', !strip);
    setTimeout(() => {
      this.$update('strip', strip);
    }, 50);
  },
  _isShow() {
    return this.data.show;
  },
  _updateData(key, val) {
    if (this.data[key] !== val) {
      this.$update(key, val);
    }
  },
  destroy() {
    this.removeEventListener();
    this.supr();
  },
  removeEventListener() {
    clearInterval(this.data._quickTimer);
    window.document.removeEventListener('scroll', this._onWindowScroll);
    window.removeEventListener('resize', this._onWindowResize);
  },
})
  .component('table-header', TableHeader)
  .component('table-body', TableBody);

const oldFilterFunc = KLTable.filter;

KLTable.filter = function (...args) {
  TableHeader.filter(...args);
  TableBody.filter(...args);
  oldFilterFunc.apply(KLTable, args);
};

module.exports = KLTable;
