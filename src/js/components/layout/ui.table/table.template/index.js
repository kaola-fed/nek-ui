'use strict';

var Component = require('../../../../ui-base/component');
var _ = require('../utils');

/**
 * @class TableTemplate
 * @extend Component
 * @param {object}      [options.data]                = 绑定属性
 * @param {string}      [options.data.type="content"] => 模版类型, header, content, expand
 */

var matchList = [
    {
        reg: /&quot;/g,
        glyph: '"'
    },
    {
        reg: /&amp;/g,
        glyph: '&'
    },
    {
        reg: /&lt;/g,
        glyph: '<'
    },
    {
        reg: /&gt;/g,
        glyph: '>'
    },
    {
        reg: /&nbsp;/g,
        glyph: ' '
    }
];

var decodeChar = function(str) {
    matchList.forEach(function(item) {
        str = str.replace(item.reg, item.glyph);
    });
    return str;
};

var TableTemplate = Component.extend({
    name: 'table.template',
    template: '<div ref="bodyContainer" style="display:none">{#include this.$body}</div>',
    config: function() {
        this.defaults({
            type: 'content',
            template: null
        });
    },
    init: function() {
        this._register();
    },
    _register: function() {
        switch(this.data.type) {
            case 'header':
                this._register2Header(); break;
            case 'expand':
                this._register2Expand(); break;
            default:
                this._register2Content();
        }
    },
    _register2Header: function() {
        var outerData = this.$outer.data;
        outerData._headerTemplate = this._getInnertTemplate();
    },
    _register2Expand: function() {
        this.$outer.data._expandTemplate = this._getInnertTemplate();
    },
    _register2Content: function() {
        var outerData = this.$outer.data;
        outerData._template = this._getInnertTemplate();
    },
    _getInnertTemplate: function() {
        var template = this.data.template || this.$refs.bodyContainer.innerHTML;
        return this._parseTemplate(template);
    },
    _parseTemplate: function(template) {
        return decodeChar(template)
                    .replace(/(<!--)(.*)(-->)/g, '')
                    .trim();
    }
});

module.exports = TableTemplate;
