/**
 * @file KLSwitch  开关
 * @author nupthale<nupthale@163.com>
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');

/**
 * @class KLSwitch
 * @extend Component
 * @param {object}      [options.data]                = 绑定属性
 * @param {boolean}      [options.data.disabled=false]      => 禁用开关
 * @param {boolean|string|number}      [options.data.value=false]  <=> 选择的值
 * @param {boolean|string|number} [options.data.checkedValue=true]  => 选中时的值, 用于扩展value值类型
 * @param {boolean|string|number} [options.data.unCheckedValue=false]  => 非选中时的值, 用于扩展value值类型
 */
const KLSwitch = Component.extend({
  name: 'kl-switch',
  template,
  config() {
    this.defaults({
      disabled: false,
      value: false,
      checkedValue: true,
      unCheckedValue: false,
    });
    this.supr();
  },
  computed: {
    checked() {
      return this.data.value === this.data.checkedValue;
    },
  },
  onChange() {
    const { data } = this;
    data.value = data.value === data.checkedValue ? data.unCheckedValue : data.checkedValue;

        /**
         * @event KLSwitch#change 切换事件
         * @param {boolean} value 当前value的值
         */
    this.$emit('change', {
      value: data.value,
    });
  },
});

module.exports = KLSwitch;
