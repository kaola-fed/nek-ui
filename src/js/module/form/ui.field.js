'use strict';

var _ = require('../../ui-base/_.js');
var Validation = require('../../util/validation.js');
var Hint = require('../../unit/widget/hint.js');

var template = require('./ui.field.html');

/**
 * Field继承于Validation
 * 1. 具有和validation一样的校验功能
 * 2. 提供结构化的表单结构
 *
 * @example
 * <ui.field title="密码" cols=3 hint="这个密码的用途">
 *    <form.component />
 * </ui.field>
 *
 * 使用说明:
 * form.item内最多包含一个验证组件,如果多余一个,console提示,并且只会验证第一个;其余丢弃;请将form.item中的内容封装为一个组件;
 */
var UIField = Validation.extend({
    name: 'ui.field',
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

UIField.directive('cols', function(ele, cols) {
    cols = this.$get(cols);
    if (!cols) { return; }

    ele.classList.add('g-col', 'g-col-' + cols);
});

UIField.directive('offset', function(ele, offset) {
    cols = this.$get(offset);
    if (!offset) { return; }

    ele.classList.add('g-offset-' + offset);
});

module.exports = UIField;
