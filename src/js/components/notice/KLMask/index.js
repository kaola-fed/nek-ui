
const Component = require('../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../ui-base/_');

/**
 * @class KLMask
 * @extend Component
 * @param {object}            [options.data]                      = 绑定数据
 * @param {string}            [options.data.content]              => 内容模板,纯文本或者html代码片段
 * @param {boolean}           [options.data.closable=true]       => 点击空白区域是否可关闭遮罩框，`true`是，`false`否
 * @param {string}            [options.data.class]                => 补充`class`
 */
const KLMask = Component.extend({
  name: 'kl-mask',
  template,
  config() {
    _.extend(this.data, {
      closable: true,
    });
    this.supr();
  },

  init() {
    this.supr();

    // 如果不是内嵌组件，则嵌入到document.body中
    if (this.$root === this) this.$inject(document.body);
  },

  _handleClick(e) {
    if (/m-mask/.test(e.target.className)) {
      if (this.data.closable) this.close();
    }
  },
  /**
     * @method close(data) 关闭遮罩
     * @public
     * @param  {object} data 额外数据
     * @return {void}
     */
  close(data) {
    /**
         * @event close 关闭遮罩时触发
         * @property {object} data  {sender, data} 事件对象，包括额外数据和事件本身
         */
    this.$emit('close', {
      sender: this,
      data,
    });
    this.destroy();
  },
});

module.exports = KLMask;
