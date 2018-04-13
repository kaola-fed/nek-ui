/**
 * @file KLLoading  加载中
 * @author   sensen(rainforest92@126.com)
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../ui-base/_');

/**
 * @class KLLoading
 * @param {object}        [options.data]                    = 绑定属性
 * @param {boolean}       [options.data.static=false]       => 是否嵌入文档流
 * @param {boolean}       [options.data.disabled=false]     => 是否禁用, 禁用后调用show和hide则无效
 * @param {boolean}       [options.data.visible=false]      => 是否显示
 * @param {string}        [options.data.class]              => 补充class
 * @param {string}        [options.data.el]                 => 设置对话框要嵌入的父级元素，默认为document.body
 */
const KLLoading = Component.extend({
  name: 'kl-loading',
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

    // 如果不是内嵌组件，则嵌入到data.el或document.body中
    if (this.$root === this) {
      this.$inject(this.data.el || document.body);
    }
  },
  /**
     * @method KLLoading#show() 显示组件
     * @return {void}
     */
  show() {
    if (this.data.disabled) return;

    this.data.visible = true;
    this.$update();
  },
  /**
     * @method KLLoading#hide() 隐藏组件
     * @return {void}
     */
  hide() {
    if (this.data.disabled) return;

    this.data.visible = false;
    this.$update();
  },
});


const loading = new KLLoading();
/**
 * @param loading 内部静态实例, 使用NEKUI.KLLoading的静态方法时,内部使用的是这个实例
 * @static
 */
KLLoading.loading = loading;

/**
 * @static
 */
KLLoading.show = function () {
  loading.show();
};

/**
 * @static
 */
KLLoading.hide = function () {
  loading.hide();
};

module.exports = KLLoading;
