/**
 * @file KLTag 标签
 * @author nupthale<nupthale@163.com>
 */

const Component = require('../../../../ui-base/component');
const template = require('./index.html');

/**
 * @class KLTag
 * @extend Component
 * @param {object}      [options.data]                = 绑定属性
 * @param {string}      [options.data.class]          => 补充class
 * @param {string}      [options.data.type=default]   => 样式, default/primary/warning
 */
const KLTag = Component.extend({
  name: 'kl-tag',
  template,
  config() {
    this.defaults({
      class: '',
      type: 'default',
    });
    this.supr();
  },
});

module.exports = KLTag;
