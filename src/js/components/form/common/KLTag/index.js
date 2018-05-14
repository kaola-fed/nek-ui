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
 * @param {boolean}      [options.data.closable=false]   => 标签是否可以移除
 */
const KLTag = Component.extend({
  name: 'kl-tag',
  template,
  config() {
    this.defaults({
      class: '',
      type: 'default',
      closable: false,
    });
    this.supr();
  },
  close(e) {
      /**
       * @event KLTag#close 关闭标签事件
       * @property {object} sender tag的this引用
       * @property {object} e event对象
       */
    this.$emit('close', {
      sender: this,
      e,
    });
  },
});

module.exports = KLTag;
