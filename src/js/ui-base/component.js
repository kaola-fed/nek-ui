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
            var typeTrans = function(value, type, selectType) {
                // type: 'none', 'string', 'number', 'boolean', 'array', 'select', 'expression'
                // selectType: string/number
                // arrayType: string/number/boolean
                if (type === 'none' || type === 'boolean') {
                    return value === 'true';
                }
                if (type === 'number'
                  || (type === 'select' && selectType === 'number')) {
                    return value / 1;
                }
                if (type === 'array') {
                    return JSON.parse(value || '[]').map(function(d) {
                        if (arrayType === 'number') {
                            return d / 1;
                        }
                        if (arrayType === 'boolean') {
                            return d === 'true';
                        }
                        return d;
                    });
                }
                if (type === 'expression') {
                    return 'NEK_EXP';
                }
                return value;
            };
            conf.forEach(function(d) {
                var val = typeTrans(d.value, d.type);
                if (this.data.hasOwnProperty(d.key) && val !== 'NEK_EXP') {
                    this.$update(d.key, val);
                }
            }.bind(this));
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