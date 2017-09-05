/**
 * ------------------------------------------------------------
 * Gotop  回到顶部
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../ui-base/_');

/**
 * @class Gotop
 * @param {object}        [options.data]                          = 绑定属性
 * @param {string}        [options.data.position=bottomright]     => 组件的位置，可选参数：`bottomcenter`、`bottomleft`、`bottomright`
 * @param {boolean}       [options.data.disabled=false]           => 是否禁用
 * @param {boolean}       [options.data.visible=false]             => 是否显示
 * @param {string}        [options.data.class]                    => 补充class
 */
const KLGoTop = Component.extend({
  name: 'kl-gotop',
  template,
  config() {
    _.extend(this.data, {
      position: 'bottomright',
      visible: false,
    });
    this.supr();
  },
  init() {
    const data = this.data;
    if (!data.visible) {
      window.addEventListener('scroll', this._scrollHandle.bind(this));
    }
  },
  _scrollHandle() {
    const data = this.data;
    if (document.body.scrollTop > 0 && !data.visible) {
      data.visible = true;
      this.$update();
    }
    if (data.visible && document.body.scrollTop === 0) {
      data.visible = false;
      this.$update();
    }
  },
  /**
     * @method gotop() 回到顶部
     * @public
     * @return {void}
     */
  gotop() {
    if (this.data.disabled) return;

    document.body.scrollTop = 0;
  },
});

module.exports = KLGoTop;
