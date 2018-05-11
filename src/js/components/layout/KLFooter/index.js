/**
 * ------------------------------------------------------------
 * @file KLFooter 尾部
 * @author mingmingcn.yang@gmail.com
 * ------------------------------------------------------------
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../ui-base/_');

/**
 * @class KLFooter
 * @extend Component
 * @param {string}           [options.height]                        => 尾部高度

 */
const KLFooter = Component.extend({
  name: 'kl-footer',
  template,
  config() {
    _.extend(this.data, {
      height: '60px',
    });
    this.supr();

    this.$outer && (this.$outer.header = this);
  },
});

module.exports = KLFooter;
