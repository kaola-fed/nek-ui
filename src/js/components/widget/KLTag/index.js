/**
 * @file KLTag 标签
 * @author nupthale<nupthale@163.com>
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');

/**
 * @class KLTag
 * @extend Component
 * @param {object}      [options.data]                = 绑定属性
 * @param {string}      [options.data.class]               => 补充class
 */
const KLTag = Component.extend({
  name: 'kl-tag',
  template,
  config() {
    this.defaults({
      class: '',
    });
    this.supr();
  },
});

module.exports = KLTag;
