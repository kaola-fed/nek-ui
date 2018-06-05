/**
 * ------------------------------------------------------------
 * @file KLHeader 头部
 * @author mingmingcn.yang@gmail.com
 * ------------------------------------------------------------
 */

const Component = require('../../../../ui-base/component');
const template = require('./index.html');

/**
 * @class KLHeader
 * @extend Component
 * @param {string}           [options.height]                        => 头部高度

 */
const KLHeader = Component.extend({
  name: 'kl-header',
  template,
  config() {
    this.defaults({
      height: '60px',
    });
    this.supr();

    this.$outer && (this.$outer.header = this);
  },
});

module.exports = KLHeader;
