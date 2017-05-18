'use strict';

var Component = require('../../../../ui-base/component');

var TableCol = Component.extend({
    name: 'table.template',
    template: '<div ref="bodyContainer" style="display:none">{#include this.$body}</div>',
    config: function() {
        this.defaults({
            type: 'content'
        });
    },

    init: function() {
        this._register();
    },

    _register: function() {
        switch(this.data.type) {
            case 'header':
                this._register2Header(); break;
            case 'sub':
                this._register2Sub(); break;
            default:
                this._register2Content();
        }
    },

    _register2Content: function() {
        var outerData = this.$outer.data;
        if(!outerData._templates) {
            outerData._templates = [];
        }
        outerData._templates.push(this.getInnertTemplate());
    },

    _register2Header: function() {
        var outerData = this.$outer.data;
        if(!outerData._headerTemplates) {
            outerData._headerTemplates = [];
        }
        outerData._headerTemplates.push(this.getInnertTemplate());
    },

    _register2Sub: function() {
        this.$outer.data._subs = this.getInnertTemplate();
    },

    getInnertTemplate: function() {
        var template = this.$refs.bodyContainer.innerHTML;
        return this.parseTemplate(template);
    },

    parseTemplate: function(template) {
        // <a>$:item.title:$ - $:item.value:$</a>
        return template.replace(/(<!--)(.*)(-->)/g, '')
            // .replace(/\$:/g, '{')
            // .replace(/:\$/g, '}')
            .replace(/&gt;/g, '>')
            .replace(/&lt;/g, '<')
            .replace(/:\$/g, '}')
            .trim();
    }

});

module.exports = TableCol;
