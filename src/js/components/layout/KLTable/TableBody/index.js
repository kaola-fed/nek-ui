'use strict';

var _ = require('../utils');

var Component = require('../../../../ui-base/component');
var tpl = require('./index.html');
var templates = require('../TDElements');

var _parseFormat = function(str) {
    return str.replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
};

var TableBody = Component.extend({
    template: tpl,
    config: function(data) {
        this.defaults({
            type: '',
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
        var self = this;
        var timer = setInterval(function() {
            var tdElement = self.$refs['td'+itemIndex];
            if(tdElement && item._expandHeight !== tdElement.clientHeight) {
                item._expandHeight = tdElement.clientHeight;
                self.$update();
            }
            if(!item.expand) {
                clearInterval(timer);
            }
        }, 100);
    },
    _onSubEvent: function(type, table, e) {
        this.$emit('subevent', {
            sender: table,
            type: type,
            event: e
        });
    },
    _getTypeTemplate: function(column) {
        return templates.get(column.type);
    },
    _getFormatter: function(column, item) {
        var formatter = column.formatter;
        return formatter.call(this, column, item) || '';
    },
    _getFormat: function(column) {
        var format = column.format;
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
    emit: function() {
        var args = [].slice.call(arguments, 0);
        this.$parent.$emit.apply(this.$parent, args);
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

module.exports = TableBody;

