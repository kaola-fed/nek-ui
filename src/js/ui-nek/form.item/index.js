'use strict';

var _ = require('../../ui-base/_.js');
var Validation = require('../../util/validation.js');

var template = require('./index.html');

/**
 * FormItem继承于Validation
 * 1. form.base具有和validation一样的校验功能
 * 2. form.base内实现统一的获取选择form.select数据的接口；
 *
 * @example
 * <form.item>
 *    <form.component />
 * </form.item>
 *
 * 使用说明:
 * form.item内最多包含一个验证组件,如果多余一个,console提示,并且只会验证第一个;其余丢弃;请将form.item中的内容封装为一个组件;
 */
var FormItem = Validation.extend({
  name: 'form.item',
  template: template,
  config: function (data) {
    _.extend(data, {});

    this.$watch('this.controls.length', function(len) {
      if (len <= 1) { return; }
      console.error('[Error]FormItem内仅允许包含一个校验组件, 请将多个组件封装为一个 ');
      this.controls.pop();
    });

    var $outer = this.$outer;
    if ($outer && $outer instanceof Validation) {
      $outer.controls.push(this);
    }

    this.supr(data);
  }
});

FormItem.directive('cols', function(ele, cols) {
  cols = this.$get(cols);
  if (!cols) { return; }

  ele.classList.add('g-col', 'g-col-' + cols);
});

module.exports = FormItem;
