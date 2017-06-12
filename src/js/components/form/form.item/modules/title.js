/**
 * ------------------------------------------------------------
 * FormItemTitle FormItem中title的自定义模板
 * @author   nupthale(nupthale@163.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../../../../ui-base/component');
var FormItem = require('../index.js');

/**
 * @class Panel
 * @extend Component
 * @param {object}            [options.data]                = 绑定属性
 */
var FormItemTitle = Component.extend({
  name: 'form.item.title',
  /**
   * @protected
   */
  config: function() {
    this.supr();

    if (this.$outer && this.$outer instanceof FormItem) {
      this.$outer.$title = this;
    }
  }
});

module.exports = FormItemTitle;