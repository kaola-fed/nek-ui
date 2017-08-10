/**
 * @file KLTextArea   输入扩展
 * @author   sensen(rainforest92@126.com)
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../ui-base/_');
const Validation = require('../../../util/validation');
const validationMixin = require('../../../util/validationMixin');

const bowser = require('bowser');

/**
 * @class KLTextArea
 * @extend Component
 * @param {object}        [options.data]                    = 绑定属性
 * @param {string}        [options.data.value]              <=> 文本框的值
 * @param {string}        [options.data.placeholder]         => 占位符
 * @param {string}        [options.data.state]              <=> 文本框的状态
 * @param {number}        [options.data.maxlength]          => 文本框的最大长度
 * @param {object[]}      [options.data.rules=[]]           => 验证规则
 * @param {boolean}       [options.data.autofocus=false]    => 是否自动获得焦点
 * @param {number}        [options.data.height=120]         => 高度
 * @param {boolean}       [options.data.required=false]     => 是否必填
 * @param {string}        [options.data.message='']         => 必填校验失败提示的消息
 * @param {boolean}       [options.data.hideTip=false]      => 是否显示校验错误信息
 * @param {boolean}       [options.data.readonly=false]     => 是否只读
 * @param {boolean}       [options.data.disabled=false]     => 是否禁用
 * @param {boolean}       [options.data.visible=true]       => 是否显示
 * @param {string}        [options.data.class]              => 补充class
 * @param {string}        [options.data.size]               => 组件大小, sm/md/lg
 * @param {number}        [options.data.width]              => 组件宽度
 */
const KLTextArea = Component.extend({
  name: 'kl-textarea',
  template,
  /**
     * @protected
     */
  config() {
    _.extend(this.data, {
      hideTip: false,
      value: '',
      placeholder: '',
      state: '',
      maxlength: undefined,
      height: 120,
      rules: [],
      autofocus: false,
      _eltIE9: bowser.msie && bowser.version <= 9,
      required: false,
    });

    this.supr();

    this.initValidation();
  },
  init() {
    this.$watch('required', function (value) {
      const rules = this.data.rules;
      const message = this.data.message || this.$trans('PLEASE_INPUT');
      if (value) {
        rules.push({ type: 'isRequired', message });
      } else {
        this.data.rules = rules.filter(rule => rule.type !== 'isRequired');
      }
    });
  },
  /**
     * @method validate() 根据`rules`验证组件的值是否正确
     * @public
     * @return {object} result 结果
     */
  validate(on = '') {
    const value = this.data.value;
    let rules = this.data.rules;

    rules = rules.filter(rule => (rule.on || '').indexOf(on) >= 0);

    const result = Validation.validate(value, rules);
    if (
      result.firstRule &&
      !(
        result.firstRule.silentOn === true ||
        (typeof result.firstRule.silentOn === 'string' &&
          result.firstRule.silentOn.indexOf(on) >= 0)
      )
    ) {
      this.data.tip = result.firstRule.message;
    } else this.data.tip = '';

    // @TODO
    if (!result.success) this.data.state = 'error';
    else {
      this.data.state = '';
    }

    this.$emit('validate', {
      sender: this,
      on,
      result,
    });

    return result;
  },
  _onKeyUp($event) {
    this.validate('keyup');
    this.$emit('keyup', $event);
  },
  _onBlur($event) {
    this.validate('blur');
    this.$emit('blur', $event);
  },
});

KLTextArea.use(validationMixin);
module.exports = KLTextArea;
