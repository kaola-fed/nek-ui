/**
 * ------------------------------------------------------------
 * @file KLFooter 尾部
 * @author mingmingcn.yang@gmail.com
 * ------------------------------------------------------------
 */

const Component = require('../../../../ui-base/component');
const template = require('./index.html');

/**
 * @class KLFooter
 * @extend Component
 * @param {string}           [options.height]                        => 尾部高度
 * @param {string}           [options.class]                        => class样式
 */
const KLFooter = Component.extend({
  name: 'kl-footer',
  template,
  config() {
    this.defaults({
      height: '60px',
      class: '',
    });

    this.supr();

    this.$outer && (this.$outer.header = this);
  },
});

module.exports = KLFooter;
