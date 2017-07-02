/**
 * ------------------------------------------------------------
 * KLText  文本
 * @author   Cody Chan<int64ago@gmail.com>
 * ------------------------------------------------------------
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../ui-base/_');

/**
 * @class KLText
 * @extend Component
 * @param {object}      [options.data]                = 绑定属性
 * @param {string}      [options.data.text=文本]      <=> 内容
 * @param {string}      [options.data.size]           => 大小
 * @param {boolean}     [options.data.isBold=false]   => 是否加粗
 * @param {string}      [options.data.align]          => 左右对齐方式
 * @param {string}      [options.data.vertical]       => 上下对齐方式
 * @param {string}      [options.data.type=default]   => 文本样式
 */
const KLText = Component.extend({
  name: 'kl-text',
  template,
  config() {
    _.extend(this.data, {
      text: '--',
      // default/primary/info/success/warning/error
      type: 'default',
      // xs/sm/lg/xl
      size: '',
      isBold: false,
      // tal/tac/tar/taj
      align: '',
      // vat/vam/vab
      vertical: '',
      /* eslint no-script-url: 0 */
      url: 'javascript:;',
      target: '',
    });
    this.supr();
  },
  onClick(e) {
    this.$emit('click', e);
  },
});

module.exports = KLText;
