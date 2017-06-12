/**
 * ------------------------------------------------------------
 * FormItemDescription FormItem中description的自定义模板
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
var FormItemDescription = Component.extend({
  name: 'form.item.description',
  /**
   * @protected
   */
  config: function() {
    this.supr();

    if (this.$outer && this.$outer instanceof FormItem) {
      this.$outer.$description = this;
    }
  }
});

module.exports = FormItemDescription;