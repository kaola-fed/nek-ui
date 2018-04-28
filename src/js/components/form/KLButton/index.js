/**
 * @file KLButton 按钮
 * @author Cody Chan <int64ago@gmail.com>
 */

const validator = require('validator');
const bowser = require('bowser');
const Component = require('../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../ui-base/_');

/**
 * @class KLButton
 * @param {object}      [options.data]                = 绑定属性
 * @param {string}      [options.data.title=确定]      => 按钮标题
 * @param {string}      [options.data.type=default]   => 按钮样式, default/primary/warning
 * @param {string}      [options.data.size=normal]    => 按钮大小, sm/lg
 * @param {string}      [options.data.icon]           => 按钮图标;
 * @param {string}      [options.data.link]           => 按钮的链接
 * @param {string}      [options.data.target=_self]   => 按钮链接的打开方式
 * @param {string}      [options.data.download]       => 下载链接
 * @param {boolean}     [options.data.loading=false]  => 是否正在加载
 * @param {boolean}     [options.data.disabled=false] => 禁止按钮
 * @param {boolean}     [options.data.class=false]    => 样式扩展
 */

const KLButton = Component.extend({
  name: 'kl-button',
  template,
  config() {
    _.extend(this.data, {
      title: this.$trans('CONFIRM'),
      type: 'default',
      size: 'normal',
      icon: '',
      loading: false,
      disabled: false,
      target: '_self',
    });
    this.supr();
  },

  init() {
    this.supr();
    this.$watch('download', function (url) {
      if (validator.isURL(url)) {
        if (bowser.chrome) {
          const a = document.createElement('a');
          a.href = url;
          a.download = url;
          a.click();
        } else {
          location.href = url;
        }
        this.data.download = '';
      }
    });
  },
  /**
   * @event KLButton#click 按钮点击事件
   * @property {object} sender 事件发送对象
   * @property {object} e event对象
   */
  onClick(e) {
    const loading = this.data.loading;
    if (!loading) {
      this.$emit('click', {
        sender: this,
        e,
      });
    }
    return !!this.data.link;
  },

  onMouseUp(e) {
    e.target.blur();
  },
});

module.exports = KLButton;
