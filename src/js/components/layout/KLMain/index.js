/**
 * ------------------------------------------------------------
 * @file KLMain 内容区
 * @author mingmingcn.yang@gmail.com
 * ------------------------------------------------------------
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');

/**
 * @class KLMain
 * @extend Component
 * @param {boolean}          [options.isMaster]                      => 是否为主内容页面，与KLAside的showFold配合使用
 */
const KLMain = Component.extend({
  name: 'kl-main',
  template,
  config() {
    this.defaults({
      isMaster: false,
    });

    this.supr();

    this.$outer && this.data.isMaster && (this.$outer.bodyEl = this);
  },
});

module.exports = KLMain;
