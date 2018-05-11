/**
 * ------------------------------------------------------------
 * @file KLLayout 布局
 * @author mingmingcn.yang@gmail.com
 * ------------------------------------------------------------
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../ui-base/_');

/**
 * @class KLLayout
 * @extend Component
 * @param {string}           [options.direction]                        => 子元素排列方向，可选为horizontal/vertical

 */
const KLLayout = Component.extend({
  name: 'kl-layout',
  template,
  config() {
    _.extend(this.data, {
      direction: 'horizontal',
    });
    this.supr();
  },
  computed: {
    isVertical() {
      const { direction } = this.data;

      if (this.header || this.footer) {
        return true;
      }

      return direction === 'vertical';
    },
  },
});

module.exports = KLLayout;
