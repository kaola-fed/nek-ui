/**
 * ------------------------------------------------------------
 * Component 组件基类
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Regular = require('regularjs');
var polyfill = require('./polyfill.js');
var _ = require('./_.js');
var filter = require('./filter.js');
var directive = require('./directive.js');

/**
 * @class Component
 * @extend Regular
 * @param {boolean=false}           options.data.readonly            => 是否只读
 * @param {boolean=false}           options.data.disabled            => 是否禁用
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string=''}               options.data.class               => 补充class
 */
var Component = Regular.extend({
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            readonly: false,
            disabled: false,
            visible: true,
            'class': '',
            console: typeof console === 'undefined' ? undefined : console
        });
        this.$on('update_nek', function(conf) {
            if (!conf) return;
            var typeTrans = function(value, type) {
                // 'none', 'string', 'number', 'boolean', 'array', 'select', 'expression'
                if (type === 'none' || type === 'boolean') {
                    return value === 'true';
                }
                if (type === 'number') {
                    return value / 1;
                }
                return value;
            };
            conf.forEach(function(d) {
                if (this.data.hasOwnProperty(d.key)) {
                    this.$update(d.key, typeTrans(d.value, d.type));
                }
            }.bind(this));
        })
        this.$watch('NEK', function(val) {
            this.$emit('update_nek', val.conf);
        });
        this.supr();
    },
    /**
     * @protected
     */
    defaults: function(data) {
      this.data = Object.assign(data, this.data);
    },
    /**
     * @protected
     */
    reset: function() {
        this.data = {};
        this.config();
    }
})
.filter(filter)
.directive(directive);

module.exports = Component;