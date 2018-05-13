/**
 * ------------------------------------------------------------
 * @file KLMain 内容区
 * @author mingmingcn.yang@gmail.com
 * ------------------------------------------------------------
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../ui-base/_');

/**
 * @class KLMain
 * @extend Component
 * @param {string}           [options.height]                        => 内容区高度

 */
const KLMain = Component.extend({
  name: 'kl-main',
  template,
  config() {
    _.extend(this.data, {});
    this.supr();
  },
});

module.exports = KLMain;
