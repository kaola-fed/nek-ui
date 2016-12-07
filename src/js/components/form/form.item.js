'use strict';

var _ = require('../../ui-base/_.js');
var Validation = require('../../util/validation.js');
var Tooltip = require('../widget/tooltip.js');

var template = require('./form.item.html');

/**
 * @class FormItem
 * @extend Validation
 * @param {object}                  options.data                     =  绑定属性
 * @param {string=''}               options.data.title               => label显示的文字
 * @param {number}                  options.data.cols                => 布局列数
 * @param {number}                  options.data.offset              => 布局offset
 * @param {boolean=false}           options.data.required            => 是否必选项
 * @param {string=''}               options.data.tip                 => 字段说明
 */
var FormItem = Validation.extend({
    name: 'form.item',
    template: template,
    config: function (data) {
        _.extend(data, {});
        this.supr(data);

        this.$watch('this.controls.length', function(len) {
            if (len <= 1) { return; }
            console.error('[Error]FormItem内仅允许包含一个校验组件, 请将多个组件封装为一个 ');
            this.controls.pop();
        });

        var $outer = this.$outer;
        if ($outer && $outer instanceof Validation) {
            $outer.controls.push(this);
        }
    },
    init: function() {
        this.initValidateRule();
    },
    initValidateRule: function() {
        if (!this.controls.length) { return; }

        var $component = this.controls[0],
            rules = $component.data.rules,
            isFilled = { type: 'isFilled' };

        if (this.data.required) {
            if (!rules) {
                $component.data.rules = [].concat(isFilled);
            } else {
                rules.push(isFilled);
            }
        }
    }
});

FormItem.directive('cols', function(ele, cols) {
    cols = this.$get(cols);
    if (!cols) { return; }

    ele.classList.add('g-col', 'g-col-' + cols);
});

FormItem.directive('offset', function(ele, offset) {
    offset = this.$get(offset);
    if (!offset) { return; }

    ele.classList.add('g-offset-' + offset);
});

module.exports = FormItem;