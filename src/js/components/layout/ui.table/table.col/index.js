'use strict';

var Component = require('../../../../ui-base/component');
var TableTemplate = require('../table.template');

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
        var $outer = this.$outer;
        if($outer.name === 'ui.table') {
            this._register2Table();
        } else if($outer.name === 'table.col') {
            this._register2TableCol();
        }
    },

    _register2Table: function() {
        var _outer = this.data._outer = this.$outer;
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
            tdClass: data.tdClass,
            thClass: data.thClass,
            sortable: data.sortable,
            expandable: data.expandable,
            template: data._templates,
            headerTemplate: data._headerTemplates,
            subs: data._subs,
            children: data._innerColumns,
            fixed: data.fixed
        });
    }
})
.filter('sortingClass', function(key) {
    var data = this.data;
    var sorting = data.sorting;
    if(sorting) {
        if(sorting.key === key) {
            return sorting.isAsc ? 'u-icon-sort-asc' : 'u-icon-sort-desc';
        }
        return '';
    }
})
.component('table.tempalte', TableTemplate);

module.exports = TableCol;
