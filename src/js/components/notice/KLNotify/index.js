const Component = require('../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../ui-base/_');

/**
 * @class KLNotify
 * @extend Component
 * @param {object}      [options.data]                      = 绑定属性
 * @param {string}      [options.data.position=topcenter]   => 通知的位置，可选参数：`topcenter`、`topleft`、`topright`、`bottomcenter`、`bottomleft`、`bottomright`、`static`
 * @param {number}      [options.data.duration=2000]        => 每条消息默认的停留毫秒数，如果为`0`，则表示消息常驻不消失，默认为`2秒`。
 * @param {boolean}     [options.data.single=false]         => 是否始终显示一条，`true`表示是，`false`表示否
 * @param {boolean}     [options.data.visible=true]         => 是否显示,`true`表示是、`false`表示否
 * @param {string}      [options.data.class]                => 补充`class`
 * @param {string}      [options.data.contentTemplate]      => 内容模板，用于支持复杂内容的自定义。
 */
const KLNotify = Component.extend({
  name: 'kl-notify',
  template,
  config() {
    _.extend(this.data, {
      messages: [],
      position: 'topcenter',
      duration: 2000,
      single: false,
    });
    this.supr();
  },
  init() {
    this.supr();

    // 如果不是内嵌组件，则嵌入到document.body中
    if (this.$root === this) this.$inject(document.body);
  },
  show(text, state, duration) {
    const self = this;
    let message = {
      text,
      state,
      duration: duration >= 0 ? +duration : +this.data.duration,
      // duration: 0,
    };
    const messages = this.data.messages;

    if (this.data.single && messages[0]) {
      message = _.extend(messages[0], message, true);
      message.counter += 1;
    } else {
      messages.unshift(message);
      message.counter = 0;
    }

    this.$update();

    if (message.duration) {
      setTimeout(() => {
        if (!message.counter) self.close(message);
        else message.counter -= 1;
      }, message.duration);
    }

    /**
       * @event KLNotify#show 打开一条消息时触发
        * @property {object} sender 事件发送对象
        * @property {object} message 弹出的消息对象
        */
    this.$emit('show', {
      sender: this,
      message,
    });
  },
  close(message) {
    const index = this.data.messages.indexOf(message);
    if (index < 0) return;
    this.data.messages.splice(index, 1);
    this.$update();

    /**
         * @event KLNotify#close 关闭某条消息时触发
         * @property {object} sender 事件发送对象
         * @property {object} message 关闭了的消息对象
         */
    this.$emit('close', {
      sender: this,
      message,
    });
  },
  closeAll() {
    this.data.messages = [];
    this.$update();
  },
});

const STATES = ['success', 'warning', 'info', 'error'];

STATES.forEach((state) => {
  KLNotify.prototype[state] = function (text, duration) {
    this.show(text, state, duration);
  };
});

const notify = new KLNotify();
KLNotify.notify = notify;

const METHODS = [
  'show',
  'close',
  'closeAll',
  'success',
  'warning',
  'info',
  'error',
];
KLNotify.METHODS = METHODS;


/**
 * @static
 * @param  {string} text 消息内容
 * @param  {string} state 消息状态，可选参数：`info`、`success`、`warning`、`error`
 * @param  {number} duration=2000 该条消息的停留毫秒数。如果为0，则表示消息常驻不消失。如果不填，则使用notify默认的duration。
 */
KLNotify.show = () => {};
/**
 * @static
 * @param  {object} message 需要关闭的消息对象
 */
KLNotify.close = () => {};
/**
 * @static
 */
KLNotify.closeAll = () => {};
/**
 * @static
 * @param  {string} text 消息内容
 * @param  {number} duration=2000 该条消息的停留毫秒数。如果为0，则表示消息常驻不消失。如果不填，则使用notify默认的duration。
 */
KLNotify.success = () => {};
/**
 * @static
 * @param  {string} text 消息内容
 * @param  {number} duration=2000 该条消息的停留毫秒数。如果为0，则表示消息常驻不消失。如果不填，则使用notify默认的duration。
 */
KLNotify.warning = () => {};
/**
 * @static
 * @param  {string} text 消息内容
 * @param  {number} duration=2000 该条消息的停留毫秒数。如果为0，则表示消息常驻不消失。如果不填，则使用notify默认的duration。
 */
KLNotify.info = () => {};
/**
 * @static
 * @param  {string} text 消息内容
 * @param  {number} duration=2000 该条消息的停留毫秒数。如果为0，则表示消息常驻不消失。如果不填，则使用notify默认的duration。
 */
KLNotify.error = () => {};
METHODS.forEach((method) => {
  KLNotify[method] = notify[method].bind(notify);
});

module.exports = KLNotify;
