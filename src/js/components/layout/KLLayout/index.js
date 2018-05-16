/**
 * ------------------------------------------------------------
 * @file KLLayout 布局
 * @author mingmingcn.yang@gmail.com
 * ------------------------------------------------------------
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');

/**
 * @class KLLayout
 * @extend Component
 * @param {string}           [options.direction]                        => 子元素排列方向，可选为horizontal/vertical
 * @param {boolean}          [options.isMaster]                         => 是否为主内容页面，与KLAside的showFold配合使用
 */

/**
 * @class KLHeader
 * @extend Component
 * @param {string}           [options.height]                           => 头部高度
 */

/**
 * @class KLFooter
 * @extend Component
 * @param {string}           [options.height]                           => 底部高度
 */

/**
 * @class KLAside
 * @extend Component
 * @param {string}           [options.width]                            => 侧栏宽度
 * @param {boolean}          [options.showFold]                         => 是否开启折叠功能，默认true
 * @param {boolean}          [options.active]                           => 若开启折叠功能，初始展开状态，默认true
 */

/**
 * @class KLMain
 * @extend Component
 * @param {boolean}          [options.isMaster]                         => 是否为主内容页面，与KLAside的showFold配合使用
 */

const KLLayout = Component.extend({
  name: 'kl-layout',
  template,
  config() {
    this.defaults({
      direction: 'horizontal',
      isMaster: false,
    });

    this.supr();

    this.$outer && this.data.isMaster && (this.$outer.bodyEl = this);
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
