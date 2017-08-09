/**
 * ------------------------------------------------------------
 * JRSwitch  开关
 * ------------------------------------------------------------
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../ui-base/_');

/**
 * @class JRSwitch
 * @extend Component
 * @param {object}      [options.data]                  => 绑定属性
 * @param {number}      [options.data.width=46]         => 组件宽度
 * @param {boolean}     [options.data.open=true]        => 默认打开
 * @param {boolean}     [options.data.showText=true]    => 是否显示开关的文字
 * @param {string}      [options.data.onText=on]        => 打开的title
 * @param {string}      [options.data.offText=off]      => 关闭的title
 * @param {string}      [options.data.onColor]          => 打开的背景色，不建议白色，因为文字为白色
 * @param {string}      [options.data.offColor]         => 关闭的背景色，不建议白色，因为文字为白色
 * @param {boolean}     [options.data.disabled=false]   => 禁止按钮
 * @param {boolean}     [options.data.class]            => 样式扩展
 */

const JRSwitch = Component.extend({
  name: 'jr-switch',
  template,
  config() {
    _.extend(this.data, {
      open: true,
      onText: 'on',
      width: 58,
      offText: 'off',
      showText: true,
      onColor: '#13ce66',
      offColor: '#ff0000',
    });
    this.supr();
  },
  init() {
    this.supr();
  },
  switch() {
    if (this.data.disabled) {
      return;
    }
    this.data.open = !this.data.open;
    /**
     * @event change 开关改变的时候
     * @property {object} sender 事件发送对象
     * @property {boolean} open 当前开关状态
     */
    this.$emit('switch', {
      sender: this,
      open: this.data.open,
    });
  },
});

module.exports = JRSwitch;
