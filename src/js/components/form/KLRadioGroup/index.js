/**
 * @file KLRadioGroup 输入扩展
 * @author   sensen<rainforest92@126.com>
 */

const SourceComponent = require('../../../ui-base/sourceComponent');
const template = require('./index.html');
const _ = require('../../../ui-base/_');
const validationMixin = require('../../../util/validationMixin');

/**
 * @class KLRadioGroup
 * @extend SourceComponent
 * @param {object}        [options.data]                  = 绑定属性
 * @param {object[]}      [options.data.source=[]]        <=> 数据源
 * @param {string}        [options.data.nameKey=name]     => 数据项的name键
 * @param {string}        [options.data.key=id]           => 数据项的key键
 * @param {string}        [options.data.source[].name]    => 每项的内容
 * @param {object}        [options.data.selected]         <=> 当前选择的对象
 * @param {number|string} [options.data.value]            <=> 当前选择的值
 * @param {boolean}       [options.data.block=false]      => 多行显
 * @param {boolean}       [options.data.required=false]   => 是否必选
 * @param {string}        [options.data.message]          => 验证错误提示
 * @param {boolean}       [options.data.hideTip=false]    => 是否显示校验错误信息
 * @param {boolean}       [options.data.readonly=false]   => 是否只读
 * @param {boolean}       [options.data.disabled=false]   => 是否禁用
 * @param {boolean}       [options.data.visible=true]     => 是否显
 * @param {string}        [options.data.class]            => 补充class
 * @param {object}        [options.service]               @=> 数据服务
 */
const KLRadioGroup = SourceComponent.extend({
  name: 'kl-radio-group',
  template,
  /**
     * @protected
     */
  config() {
    _.extend(this.data, {
      // @inherited source: [],
      hideTip: false,
      selected: null,
      _radioGroupId: new Date(),
      required: false,
      nameKey: 'name',
      key: 'id',
    });
    this.supr();

    this.initValidation();

    this.$watch('value', function (newValue) {
      const data = this.data;
      const source = data.source;
      if (newValue === undefined || newValue === null) return;
      if (source) {
        const key = data.key;
        source.forEach((item) => {
          if (item[key] === 0 && newValue === '') {
            return false;
          } else if (newValue === item[key]) {
            data.selected = item;
          }
          return undefined;
        });
      }
    });

    this.$watch('source', function (source) {
      if (!source || !(source instanceof Array)) {
        return console.error('source of radio.group is not an array');
      }

      if (source) {
        const data = this.data;
        const { key, value } = data;
        source.forEach((item) => {
          if (item[key] === 0 && value === '') {
            return false;
          } else if (value === item[key]) {
            data.selected = item;
          }
          return undefined;
        });
      }
      return undefined;
    });
  },
  /**
     * @method select(item) 选择某一
     * @public
     * @param  {object} item 选择
     * @return {void}
     */
  select(item) {
    if (this.data.readonly || this.data.disabled) return;

    const data = this.data;
    const key = data.key;
    const nameKey = data.nameKey;
    const value = item[key];
    data.value = value === undefined ? item[nameKey] : value;

    data.selected = item;
    /**
         * @event select 选择某一项时触发
         * @property {object} sender 事件发送对象
         * @property {object} selected 当前选择
         */
    this.$emit('select', {
      sender: this,
      selected: item,
    });

    this.data.tip && this.validate();
  },
  /**
     * @method validate() 根据required验证组件的值是否正确
     * @public
     * @return {object} result 结果
     */
  validate(on) {
    const data = this.data;
    const result = { success: true, message: '' };
    const selected = data.selected;

    // 如果是readonly或者disabled状态, 无需验证
    if (data.readonly || data.disabled) {
      return {
        success: true,
      };
    }

    if (data.required && !selected) {
      result.success = false;
      result.message = this.data.message || this.$trans('PLEASE_SELECT');
      this.data.state = 'error';
    } else {
      result.success = true;
      result.message = '';
      this.data.state = '';
    }
    this.data.tip = result.message;

    this.$emit('validate', {
      sender: this,
      on,
      result,
    });

    return result;
  },
});

KLRadioGroup.use(validationMixin);
module.exports = KLRadioGroup;
