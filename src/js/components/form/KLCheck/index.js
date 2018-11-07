/**
 * @file KLCheck 多选按钮
 * @author sensen <rainforest92@126.com>
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../ui-base/_');

/**
 * @class KLCheck
 * @extend Component
 * @param {object}      options.data                    = 绑定属性
 * @param {string}      [options.data.name]             => 多选按钮的文字
 * @param {boolean}     [options.data.checked=false]    <=> 多选按钮的选择状态。`false`表示未选，`true`表示已选，`null`表示半选。
 * @param {boolean}     [options.data.block=false]      => 是否以block方式显示
 * @param {boolean}     [options.data.readonly=false]   => 是否只读
 * @param {boolean}     [options.data.disabled=false]   => 是否禁用
 * @param {boolean}     [options.data.visible=true]     => 是否显示
 * @param {string}      [options.data.class]            => 补充class
 * @param {string}      [options.data.contentTemplate]  => 内容模板，用于支持复杂内容的自定义。
 */
const KLCheck = Component.extend({
  name: 'kl-check',
  template,
  config() {
    _.extend(this.data, {
      name: '',
      checked: false,
      block: false,
    });
    this.supr();

    this.$watch('checked', function (newValue, oldValue) {
      if (oldValue === undefined || newValue === undefined) return;
      /**
         * @event KLCheck#change 选中状态改变时触发
         * @property {object} sender 事件发送对象
         * @property {object} date 改变后的选中状态
         */
      this.$emit('change', {
        sender: this,
        checked: newValue,
      });
    });
  },

  check(_checked, e) {
    if (this.data.readonly || this.data.disabled) return;

    let checked = _checked;

    if (checked === undefined) checked = !this.data.checked;
    this.data.checked = checked;

    /**
       * @event KLCheck#check 改变选中状态时触发
       * @property {object} sender 事件发送对象
       * @property {boolean} checked 选中状态
       */
    this.$emit('check', {
      sender: this,
      checked,
      e,
    });
    return false;
  },
});

module.exports = KLCheck;
