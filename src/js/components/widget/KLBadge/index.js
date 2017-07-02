/**
 * ------------------------------------------------------------
 * KLBadge  文本
 * @author   Cody Chan<int64ago@gmail.com>
 * ------------------------------------------------------------
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../ui-base/_');

/**
 * @class KLBadge
 * @extend Component
 * @param {object}      [options.data]                = 绑定属性
 * @param {string}      [options.data.text=--]        <=> 内容
 * @param {boolean}     [options.data.circle=false]   => 是否圆角
 * @param {string}      [options.data.type=default]   => 文本样式
 */
const KLBadge = Component.extend({
  name: 'kl-badge',
  template,
  config() {
    _.extend(this.data, {
      text: '--',
      // default/primary/info/success/warning/error
      type: 'default',
      circle: false,
    });
    this.supr();
  },
  onClick(e) {
    this.$emit('click', e);
  },
});

module.exports = KLBadge;
