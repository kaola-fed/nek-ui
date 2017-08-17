const Component = require('../../../../ui-base/component');
const _ = require('../../../../ui-base/_');
const KLTableTemplate = require('../KLTableTemplate');
const KLTable = require('../index');

/**
 * @class KLTableCol
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
 * @param {boolean}     [options.data.expandable]       => 可下钻展开
 * @param {string}      [options.data.children]         => 子表头
 * @param {boolean|string} [options.data.fixed]         => 列固定开关，默认left为做固定，right为右固定

 * @param {string}      [options.data.template]         => 列内容模版
 * @param {string}      [options.data.headerTemplate]   => 列表头模版
 * @param {string}      [options.data.expandTemplate]   => 下钻展开内容模版
 */
const KLTableCol = Component.extend({
  name: 'kl-table-col',
  template:
    '<div ref="bodyContainer" style="display:none">{#include this.$body}</div>',
  config(data) {
    this.defaults({
      _innerColumns: [],
      colSpan: 1,
      custom: data,
      columnData: {},
      outerColumns: [],
    });
  },
  init() {
    this._register();
  },
  _register() {
    const outer = this.$outer;
    if (outer instanceof KLTable) {
      this._register2Table();
    } else if (outer instanceof KLTableCol) {
      this._register2TableCol();
    }
  },
  _register2Table() {
    const _outer = this.$outer;
    this.data.outerColumns = _outer.data.columns;
    this._push2Columns(_outer.data.columns);
  },
  _register2TableCol() {
    const _outer = this.$outer;
    this.data.outerColumns = _outer.data._innerColumns;
    this._push2Columns(_outer.data._innerColumns);
  },
  _push2Columns(columns) {
    const data = this.data;
    const index = +data.index;

    data.columnData = this.createColumnData(data);

    if (columns) {
      let insertIndex = -1;
      columns.some((item, i) => {
        if (index < item.index) {
          insertIndex = i;
          return true;
        }
        return false;
      });
      if (insertIndex !== -1) {
        columns.splice(insertIndex, 0, data.columnData);
      } else {
        columns && columns.push(data.columnData);
      }
    }
  },
  createColumnData(data) {
    return _.extend({
      name: data.name,
      key: data.key,
      index: +data.index,
      type: data.type,
      width: +data.width,
      minWidth: +data.minWidth,
      tip: data.tip,
      tdClass: data.tdClass,
      thClass: data.thClass,
      sortable: data.sortable,
      expandable: data.expandable,
      children: data._innerColumns,
      align: data.align,
      fixed: data.fixed,

      filter: data.filter,
      template: data._template || data.template,
      formatter: data.formatter,
      format: data.format,
      headerTemplate: data._headerTemplate || data.headerTemplate,
      headerFormatter: data.headerFormatter,
      headerFormat: data.headerFormat,
      expandTemplate: data._expandTemplate,
    }, data.custom);
  },
  destroy() {
    const data = this.data;
    const index = data.outerColumns.indexOf(data.columnData);
    data.outerColumns.splice(index, 1);
    this.supr();
  },
}).component('kl-table-tempalte', KLTableTemplate);

module.exports = KLTableCol;
