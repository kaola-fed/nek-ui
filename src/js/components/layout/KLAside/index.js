/**
 * ------------------------------------------------------------
 * @file KLAside 侧边栏
 * @author mingmingcn.yang@gmail.com
 * ------------------------------------------------------------
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../ui-base/_');

/**
 * @class KLAside
 * @extend Component
 * @param {string}           [options.width]                        => 侧栏宽度

 */
const KLAside = Component.extend({
  name: 'kl-aside',
  template,
  config() {
    _.extend(this.data, {
      width: '200px',
    });
    this.supr();
  },
});

module.exports = KLAside;
