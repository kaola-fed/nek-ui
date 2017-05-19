'use strict';

var Component = require('../../../../ui-base/component');
var TableTemplate = require('../table.template');

/**
 * @class TableTemplate
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
var TableCol = Component.extend({
    name: 'table.col',
    template: '<div ref="bodyContainer" style="display:none">{#include this.$body}</div>',
    config: function() {
        this.defaults({
            _innerColumns: [],
            colSpan: 1
        });
    },
    init: function() {
        this._register();
    },
    _register: function() {
        var outerName = this.$outer.name;
        if(outerName === 'ui.table') {
            this._register2Table();
        } else if(outerName === 'table.col') {
            this._register2TableCol();
        }
    },
    _register2Table: function() {
        var _outer = this.$outer;
        this._push2Columns(_outer.data.columns);
    },
    _register2TableCol: function() {
        var _outer = this.$outer;
        this._push2Columns(_outer.data._innerColumns);
    },
    _push2Columns: function(columns) {
        var data = this.data;
        columns && columns.push({
            name: data.name,
            key: data.key,
            type: data.type,
            width: data.width,
            tip: data.tip,
            tdClass: data.tdClass,
            thClass: data.thClass,
            sortable: data.sortable,
            expandable: data.expandable,
            template: data._templates,
            headerTemplate: data._headerTemplates,
            expandTemplate: data._expandTemplate,
            children: data._innerColumns,
            fixed: data.fixed
        });
    }
})
.component('table.tempalte', TableTemplate);

module.exports = TableCol;
