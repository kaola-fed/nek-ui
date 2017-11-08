/**
 * @file JRLoading  加载中
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../ui-base/_');

/**
 * @class JRLoading
 * @param {object}        [options.data]                    = 绑定属性
 * @param {boolean}       [options.data.static=false]       => 是否嵌入文档流
 * @param {boolean}       [options.data.disabled=false]     => 是否禁用, 禁用后调用show和hide则无效
 * @param {boolean}       [options.data.visible=false]      => 是否显示
 * @param {string}        [options.data.class]              => 补充class
 */
const JRLoading = Component.extend({
  name: 'jr-loading',
  template,
  config() {
    _.extend(this.data, {
      static: false,
      visible: false,
    });
    this.supr();
  },
  init() {
    this.supr();
    // 证明不是内嵌组件
    if (this.$root === this) this.$inject(document.body);
  },
  /**
     * @method JRLoading#show() 显示组件
     * @return {void}
     */
  show() {
    if (this.data.disabled) return;

    this.data.visible = true;
    this.$update();
  },
  /**
     * @method JRLoading#hide() 隐藏组件
     * @return {void}
     */
  hide() {
    if (this.data.disabled) return;

    this.data.visible = false;
    this.$update();
  },
});


const loading = new JRLoading();
/**
 * @param loading 内部静态实例, 使用NEKUI.JRLoading的静态方法时,内部使用的是这个实例
 * @static
 */
JRLoading.loading = loading;

/**
 * @static
 */
JRLoading.show = function () {
  loading.show();
};

/**
 * @static
 */
JRLoading.hide = function () {
  loading.hide();
};

module.exports = JRLoading;
