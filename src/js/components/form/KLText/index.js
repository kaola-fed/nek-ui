/**
 * @file KLText  文本
 * @author   Cody Chan<int64ago@gmail.com>
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../ui-base/_');

/**
 * @class KLText
 * @extend Component
 * @param {object}      [options.data]                = 绑定属性
 * @param {string}      [options.data.text=文本]      <=> 内容
 * @param {string}      [options.data.size]           => text大小 取值：xs、sm、lg、xl
 * @param {boolean}     [options.data.isBold=false]   => 是否加粗 取值：true-加粗 、false-不加粗
 * @param {string}      [options.data.align]          => 左右对齐方式 取值：left、center、right
 * @param {string}      [options.data.vertical]       => 上下对齐方式 取值：top、middle、bottom
 * @param {string}      [options.data.type=default]   => 文本样式 取值：default、primary、success、warning、error、inverse、muted
 * @param {string}      [options.dara.class]          => 自定义class
 * @param {string}      [options.data.url=javascript:;] =>连接的url 值为“javascript:”表示非链接文本
 * @param {string}      [options.data.target]        => a标签的target属性 取值：_blank、_self、_parent、_top
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
