'use strict';

var TableCol = require('../table.col');
var TableTemplate = require('../table.template');
var _ = require('../utils');

var Component = require('../../../../ui-base/component');
var tpl = require('./index.html');
var tdTpl = require('../td.elements/templates/default.html');
var templates = require('../td.elements');

var _parseFormat = function(str) {
    return str.replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
};

var TableBasic = Component.extend({
    template: tpl,
    config: function(data) {
        this.defaults({
            type: '',
            tdTpl: tdTpl,
            enableHover: true,
            show: true,
            columns: [],
            config: {}
        });
        this.supr(data);
    },
    _onExpand: function(item, itemIndex, column) {
        if(!this.data.fixedCol) {
            this._expandTr(item, itemIndex, column);
        }

        this.$emit('expand', {
            sender: this,
            expand: item.expand,
            column: column,
            item: item,
            index: itemIndex
        });
    },
    _onItemCheckChange: function(item, e) {
        this.$emit('checkchange', {
            item: item,
            checked: e.checked,
            event: e
        });
    },
    _expandTr: function(item, itemIndex, column) {
        item._expanddingColumn = column;
        item.expand = !item.expand;

        this._updateSubTrHeight(item, itemIndex);
    },
    _updateSubTrHeight: function(item, itemIndex) {
        var timer = setInterval(function() {
            var tdElement = this.$refs['td'+itemIndex];
            if(tdElement && item._expandHeight !== tdElement.clientHeight) {
                item._expandHeight = tdElement.clientHeight;
                this.$update();
            }
            if(!item.expand) {
                clearInterval(timer);
            }
        }.bind(this), 100);
    },
    _onSubEvent: function(type, table, e) {
        this.$emit('subevent', {
            sender: table,
            type: type,
            event: e
        });
    },
    _isArray: function(arr) {
        return _.isArray(arr);
    },
    _getTDElement: function(column, item) {
        if(column.format || column.formatter || column.template) {
            return this._getCustom(column, item);
        }
        return templates.get(column.type);
    },
    _getCustom: function(column, item) {
        if(column.template) {
            return this._getTemplate(column);
        } else if(column.formatter) {
            return this._getFormatter(column, item);
        } else if(column.format) {
            return this._getFormat(column);
        }
        return '';
    },
    _getTemplate: function(column) {
        if(_.isArray(column.template)) {
            return _.convertBeginEnd('{#list column.template as template by template_index}{#include template}{/list}');
        }
        return _.convertBeginEnd('{#include column.template}');
    },
    _getFormatter: function(column, item) {
        var formatter = column.formatter;
        if(_.isArray(formatter)) {
            return formatter.reduce(function(previous, current) {
                return previous + (current.call(this, column, item) || '');
            }.bind(this), '');
        }
        return formatter.call(this, column, item) || '';
    },
    _getFormat: function(column) {
        var format = column.format;
        if(_.isArray(format)) {
            return format.reduce(function(previous, current) {
                return previous + _parseFormat(current);
            }.bind(this), '');
        }
        return _parseFormat(format);
    },
    _filter: function(column, val) {
        var args = [].slice.call(arguments, 1);
        if(column.filter && typeof column.filter === 'function') {
            return column.filter.apply(this, args);
        }
        return val;
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
    _onTrHover: function($event, item) {
        item._hover = true;
    },
    _onTrBlur: function($event, item) {
        item._hover = false;
    }
})
.filter('placeholder', function(val) {
    if(val === null || val === undefined) {
        return '-';
    }
    return val;
})
.filter('expandSign', function(item) {
    return item.expand ? '-' : '+';
});

TableBasic.component('table.col', TableCol);
TableBasic.component('table.template', TableTemplate);

module.exports = TableBasic;

