/**
 * ------------------------------------------------------------
 * Suggest   自动提示
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

const Dropdown = require('../../form/common/Dropdown');
const template = require('./index.html');
const _ = require('../../../ui-base/_');
const Validation = require('../../../util/validation');
const validationMixin = require('../../../util/validationMixin');

/**
 * @class Suggest
 * @extend Dropdown
 * @param {object}        [options.data]                          = 绑定属性
 * @param {object[]}      [options.data.source=[]]                <=> 数据源
 * @param {string}        [options.data.source[].name]            => 每项的内容
 * @param {string}        [options.data.key=id]                   => 数据项的键
 * @param {string}        [options.data.nameKey=name]             => 数据项的name键
 * @param {boolean}       [options.data.source[].disabled=false]  => 禁用此项
 * @param {object}        [options.data.selected=null]            <=> 当前选择项
 * @param {string}        [options.data.value]                    <=> 文本框中的值
 * @param {string}        [options.data.id]                       <=> 选项的id值;
 * @param {string}        [options.data.placeholder=请输入]      => 文本框的占位文字
 * @param {number}        [options.data.maxlength]                => 文本框的最大长度
 * @param {number}        [options.data.startLength=0]            => 开始提示长度。当输入长度>=该值后开始提示
 * @param {string}        [options.data.matchType=all]            => 匹配方式，`all`表示匹配全局，`start`表示只匹配开头，`end`表示只匹配结尾
 * @param {boolean}       [options.data.strict]                   => 是否为严格模式。当为严格模式时，`value`属性必须在source中选择，否则为空。
 * @param {boolean}       [options.data.autofocus]                => 是否自动获得焦点
 * @param {string}        [options.data.itemTemplate=null]        @=> 单项模板
 * @param {boolean}       [options.data.hideTip=false]            => 是否显示校验错误信息
 * @param {boolean}       [options.data.open]                     <=> 当前为展开/收起状态
 * @param {boolean}       [options.data.readonly]                 => 是否只读
 * @param {boolean}       [options.data.disabled]                 => 是否禁用
 * @param {boolean}       [options.data.visible=true]             => 是否显示
 * @param {string}        [options.data.class]                 => 补充class
 * @param {object}        [options.service]                       @=> 数据服务
 */
const Suggest = Dropdown.extend({
  name: 'suggest',
  template,
  /**
     * @protected
     */
  config() {
    _.extend(this.data, {
      // @inherited source: [],
      // @inherited open: false,
      hideTip: false,
      selected: null,
      value: '',
      id: '',
      key: 'id',
      nameKey: 'name',
      placeholder: this.$trans('PLEASE_SELECT'),
      maxlength: undefined,
      startLength: 0,
      delay: 300,
      matchType: 'all',
      strict: false,
      autofocus: false,
      required: false,
    });
    this.supr();

    this.initValidation();

    this.$watch('id', function (id) {
      let source = this.data.source || [],
        key = this.data.key,
        nameKey = this.data.nameKey;

      const crt = source.find(item => item[key] == id);
      this.$update('value', crt ? crt[nameKey] : '');
    });
  },
  /**
     * @protected
     */
  init() {
    let id = this.data.id,
      source = this.data.source;

    if (id && source) {
      const selected = source.filter(function (item) {
        return item[this.data.key] == id;
      })[0];
      if (selected) {
        this.data.selected = selected;
        this.data.value = selected[this.data.nameKey];
      }
    }
  },
  /**
     * @method select(item) 选择某一项
     * @public
     * @param  {object} item 选择项
     * @return {void}
     */
  select(item) {
    if (
      this.data.readonly ||
      this.data.disabled ||
      item.disabled ||
      item.divider
    ) {
      this.$emit('select', {
        sender: this,
        selected: item,
        disabled: true,
      });
      return;
    }

    this.data.selected = item;
    this.data.value = item[this.data.nameKey];
    this.data.id = item[this.data.key];

    /**
         * @event select 选择某一项时触发
         * @property {object} sender 事件发送对象
         * @property {object} selected 当前选择项
         */
    this.$emit('select', {
      sender: this,
      selected: item,
    });
    this.toggle(false);
  },
  /**
     * @method toggle(open) 展开/收起
     * @public
     * @param  {boolean} open 展开/收起状态。如果无此参数，则在两种状态之间切换。
     * @return {void}
     */
  toggle(open, _isInput) {
    if (this.data.readonly || this.data.disabled) return;

    if (open === undefined) open = !this.data.open;
    this.data.open = open;

    const index = Dropdown.opens.indexOf(this);
    if (open && index < 0) Dropdown.opens.push(this);
    else if (!open && index >= 0) {
      Dropdown.opens.splice(index, 1);

      if (!_isInput && this.data.strict) {
        this.data.value = this.data.selected
          ? this.data.selected[this.data.nameKey]
          : '';
      }
    }

    /**
         * @event toggle  展开/收起时触发
         * @property {object} sender 事件发送对象
         * @property {object} open 展开/收起状态
         */
    this.$emit('toggle', {
      sender: this,
      open,
    });
  },
  /**
     * @private
     */
  _onInput($event) {
    const value = this.data.value || '';

    if (value.length >= this.data.startLength) {
      this.toggle(true);
      if (this.service) this.$updateSource();
    } else this.toggle(false, true);
  },
  /**
     * @private
     */
  _onBlur($event) {},
  /**
     * @private
     */
  getParams() {
    return { value: this.data.value };
  },
  /**
     * @private
     */
  filter(item) {
    const value = this.data.value;

    if (!value && this.data.startLength) return false;

    if (this.data.matchType === 'all') {
      return item[this.data.nameKey].indexOf(value) >= 0;
    } else if (this.data.matchType === 'startLength') {
      return item[this.data.nameKey].slice(0, value.length) === value;
    } else if (this.data.matchType === 'end') {
      return item[this.data.nameKey].slice(-value.length) === value;
    }
  },
  /**
     * @method validate() 根据验证组件的值是否正确
     * @public
     * @return {object} result 结果
     */
  validate(on) {
    if (!this.data.required) {
      return { success: true };
    }

    var result = { success: true, message: '' },
      value = this.data.value,
      value = typeof value === 'undefined' ? '' : `${value}`;

    if (!value.length) {
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

Suggest.use(validationMixin);
module.exports = Suggest;
