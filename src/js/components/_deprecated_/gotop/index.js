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
 * @param {string}        [options.data.position=bottomright]     => 组件的位置，可选参数：`topcenter`、`topleft`、`topright`、`bottomcenter`、`bottomleft`、`bottomright`、`static`
 * @param {boolean}       [options.data.disabled=false]           => 是否禁用
 * @param {boolean}       [options.data.visible=true]             => 是否显示
 * @param {string}        [options.data.class]                    => 补充class
 */
const Gotop = Component.extend({
  name: 'gotop',
  template,
  /**
     * @protected
     */
  config() {
    _.extend(this.data, {
      position: 'bottomright',
    });
    this.supr();
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

module.exports = Gotop;
