/**
 * ------------------------------------------------------------
 * KLMessage    消息
 * ------------------------------------------------------------
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../ui-base/_');

/**
 * @class KLMessage
 * @extend Component
 * @param {object}      [options.data]                      = 绑定属性
 * @param {string}      [options.data.type]                 => 消息位置，可选参数：`success`、`warning`、`info`、`error`
 * @param {string}      [options.data.class]                => 补充class
 */

const KLMessage = Component.extend({
  name: 'kl-message',
  template,
    /**
     * @protected
     */
  config() {
    _.extend(this.data, {
      type: '',
    });
    this.supr();
  },
    /**
     * @protected
     */
  init() {
    this.supr();
  },
});
module.exports = KLMessage;
