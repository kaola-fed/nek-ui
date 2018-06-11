/**
 * @file KLTextArea   输入扩展
 * @author   sensen(rainforest92@126.com)
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../ui-base/_');
const Validation = require('../../../util/validation');
const validationMixin = require('../../../util/validationMixin');
const calcTextareaHeight = require('./calcTextareaHeight');

const bowser = require('bowser');

/**
 * @class KLTextArea
 * @extend Component
 * @param {object}        [options.data]                    = 绑定属性
 * @param {string}        [options.data.value]              <=> 文本框的值
 * @param {string}        [options.data.placeholder]         => 占位符
 * @param {number}        [options.data.maxlength]          => 文本框的最大长度
 * @param {object[]}      [options.data.rules=[]]           => 验证规则
 * @param {boolean}       [options.data.autofocus=false]    => 是否自动获得焦点
 * @param {number}        [options.data.width]              => 组件宽度
 * @param {boolean}       [options.data.required=false]     => 是否必填
 * @param {string}        [options.data.message]         => 必填校验失败提示的消息
 * @param {boolean}       [options.data.hideTip=false]      => 是否显示校验错误信息
 * @param {boolean}       [options.data.readonly=false]     => 是否只读
 * @param {boolean}       [options.data.disabled=false]     => 是否禁用
 * @param {boolean}       [options.data.visible=true]       => 是否显示
 * @param {string}        [options.data.size]               => 组件大小, sm/lg控制整体尺寸，smw/mdw/lgw控制宽度大小
 * @param {string}        [options.data.class]              => 补充class
 */
const KLTextArea = Component.extend({
  name: 'kl-textarea',
  template,
  config() {
    _.extend(this.data, {
      hideTip: false,
      value: '',
      placeholder: '',
      state: '',
      maxlength: undefined,
      autosize: null,
      rules: [],
      autofocus: false,
      _eltIE9: bowser.msie && bowser.version <= 9,
      required: false,
      textareaCalcStyle: {},
    });

    this.supr();

    this.initValidation();
  },
  computed: {
    textareaStyle() {
      return this.merge({}, this.textareaCalcStyle, { resize: this.resize });
    },
  },
  init() {
    this.resizeTextarea();
    this.$watch('required', function (value) {
      const rules = this.data.rules;
      const message = this.data.message || this.$trans('PLEASE_INPUT');
      if (value) {
        rules.push({ type: 'isRequired', message });
      } else {
        this.data.rules = rules.filter(rule => rule.type !== 'isRequired');
      }
    });

    this.$watch('value', function () {
      this.resizeTextarea();
    });
  },
  resizeTextarea() {
    const { autosize } = this.data;
    if (!autosize) {
      this.textareaCalcStyle = {
        minHeight: calcTextareaHeight(this.$refs.textarea).minHeight,
      };
      return;
    }
    const minRows = autosize.minRows;
    const maxRows = autosize.maxRows;

    this.textareaCalcStyle = calcTextareaHeight(this.$refs.textarea, minRows, maxRows);
  },
  validate(on = '') {
    const data = this.data;
    // 如果是readonly或者disabled状态, 无需验证
    if (data.readonly || data.disabled) {
      return {
        success: true,
      };
    }

    const value = data.value;
    let rules = data.rules;

    rules = rules.filter(rule => (rule.on || '').indexOf(on) >= 0);
    if (!rules.length) {
      return { success: true };
    }
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
  focus() {
    this.$refs.textarea.focus();
  },
  blur() {
    this.$refs.textarea.blur();
  },
  _onKeyUp($event) {
    this.validate('keyup');
    /**
     * @event KLTextarea#keyup 原生keyup事件
     * @param {event} KeyBoardEvent 键盘事件
     */
    this.$emit('keyup', $event);
  },
  _onBlur($event) {
    this.validate('blur');
    /**
     * @event KLTextarea#blur 原生blur事件
     * @param {event} MouseEvent 鼠标点击事件
     */
    this.$emit('blur', $event);
  },
  _onFocus($event) {
    this.validate('focus');
    /**
     * @event KLTextarea#blur 原生focus事件
     * @param {event} MouseEvent 鼠标点击事件
     */
    this.$emit('focus', $event);
  },
  merge(...args) {
    for (let i = 1, j = args.length; i < j; i += 1) {
      const source = args[i] || {};
      for (const prop in source) {
        if (source.hasOwnProperty(prop)) {
          const value = source[prop];
          if (value !== undefined) {
            args[0][prop] = value;
          }
        }
      }
    }

    return args[0];
  },
});

KLTextArea.use(validationMixin);
module.exports = KLTextArea;
