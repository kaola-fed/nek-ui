
const Component = require('../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../ui-base/_');

/**
 * @class KLMessage
 * @extend Component
 * @param {object}      [options.data]                      = 绑定属性
 * @param {string}      [options.data.type]                 => 消息类型，可选参数：`success`、`warning`、`info`、`error`
 * @param {string}      [options.data.class]                => 补充`class`
 * @param {string}      [options.data.title]                => 补充`title`
 * @param {string}      [options.data.addClose]                => 补充`addClose`  添加了该字段, 为message添加了关闭按钮
 */

const KLMessage = Component.extend({
  name: 'kl-message',
  template,
  config() {
    _.extend(this.data, {
      type: '',
      addClose: false,
      title: '',
      visible: true,
    });
    this.supr();
  },
  init() {
    this.supr();
  },
  close(result) {
    this.data.visible = Boolean(result);
    this.$update();
  },
});
module.exports = KLMessage;
