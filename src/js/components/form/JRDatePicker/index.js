/**
 * ------------------------------------------------------------
 * JRDatePicker 日期选择
 * ------------------------------------------------------------
 */

const Dropdown = require('../common/Dropdown');
const template = require('./index.html');
const _ = require('../../../ui-base/_');

const filter = require('../../../ui-base/filter');
const Calendar = require('./Calendar');
const bowser = require('bowser');
const moment = require('moment');
const polyfill = require('../../../ui-base/polyfill');

const Validation = require('../../../util/validation');
const validationMixin = require('../../../util/validationMixin');

/**
 * @class JRDatePicker
 * @extend Dropdown
 * @param {object}        [options.data] = 绑定属性
 * @param {object}        [options.data.date=null]        <=> 当前选择的日期时间
 * @param {boolean}       [options.data.showTime=false]   => 是否显示时间选择
 * @param {string}        [options.data.placeholder='请输入'] => 文本框的占位文字
 * @param {Date|string}   [options.data.minDate=null]     => 最小日期时间，如果为空则不限制
 * @param {Date|string}   [options.data.maxDate=null]     => 最大日期时间，如果为空则不限制
 * @param {boolean}       [options.data.hideTip=false]    => 是否显示校验错误信息
 * @param {boolean}       [options.data.autofocus=false]  => 是否自动获得焦点
 * @param {boolean}       [options.data.required=false]   => 是否必填
 * @param {boolean}       [options.data.readonly=false]   => 是否只读
 * @param {boolean}       [options.data.disabled=false]   => 是否禁用
 * @param {boolean}       [options.data.visible=true]     => 是否显示
 * @param {string}        [options.data.size]             => 组件大小, sm/md/lg
 * @param {number}        [options.data.width]            => 组件宽度
 * @param {string}        [options.data.class]            => 补充class
 */
const JRDatePicker = Dropdown.extend({
  name: 'jr-date-picker',
  template,
  /**
     * @protected
     */
  config() {
    _.extend(this.data, {
      // @inherited source: [],
      // @inherited open: false,
      hideTip: false,
      minDate: null,
      maxDate: null,
      placeholder: this.$trans('PLEASE_SELECT'),
      date: null,
      _date: undefined,
      _time: undefined,
      autofocus: false,
      required: false,
      showTime: false,
      open: false,
    });
    this.supr();
    this.$watch('date', function (newValue) {
      // 字符类型自动转为日期类型
      if (typeof newValue === 'string') {
        if (bowser.msie && bowser.version <= 9) {
          return (this.data.date = polyfill.StringDate(newValue));
        }
        return (this.data.date = newValue ? new Date(newValue) : new Date());
      } else if (typeof newValue === 'number') {
        return (this.data.date = new Date(newValue));
      }

      if (newValue === 'Invalid Date' || newValue === 'NaN') {
        throw new TypeError('Invalid Date');
      }
      // 如果不为空并且超出日期范围，则设置为范围边界的日期
      if (newValue) {
        const isOutOfRange = this.isOutOfRange(newValue);
        if (isOutOfRange) return (this.data.date = isOutOfRange);
      }

      if (newValue) {
        // this.data.date.setSeconds(0);
        this.data.date.setMilliseconds(0);
        this.data._date = new Date(newValue);
        this.data._time = filter.format(newValue, 'HH:mm:ss');
      }

      /**
             * @event change 日期时间改变时触发
             * @property {object} sender 事件发送对象
             * @property {object} date 改变后的日期时间
             */
      this.$emit('change', {
        sender: this,
        date: newValue,
      });

      this.data.tip && this.validate();
    });

    this.$watch('minDate', function (newValue) {
      if (!newValue) return;

      if (typeof newValue === 'string') {
        if (bowser.msie && bowser.version <= 9) {
          return (this.data.date = polyfill.StringDate(newValue));
        }
        return (this.data.minDate = new Date(newValue));
      }

      if (newValue === 'Invalid Date' || newValue === 'NaN') {
        throw new TypeError('Invalid Date');
      }
    });

    this.$watch('maxDate', function (newValue) {
      if (!newValue) return;

      if (typeof newValue === 'string') {
        if (bowser.msie && bowser.version <= 9) {
          return (this.data.date = polyfill.StringDate(newValue));
        }
        return (this.data.maxDate = new Date(
          `${newValue}`.replace(new RegExp(/-/gm), '/'),
        ));
      }

      if (newValue === 'Invalid Date' || newValue === 'NaN') {
        throw new TypeError('Invalid Date');
      }
    });

    this.$watch(['minDate', 'maxDate'], function (minDate, maxDate) {
      if (
        !((minDate && minDate instanceof Date) ||
          (maxDate && maxDate instanceof Date))
      ) {
        return;
      }

      if (minDate && maxDate && minDate - maxDate > 0) {
        throw new Calendar.DateRangeError(minDate, maxDate);
      }

      // 如果不为空并且超出日期范围，则设置为范围边界的日期
      if (this.data.date) {
        const isOutOfRange = this.isOutOfRange(this.data.date);
        if (isOutOfRange) return (this.data.date = isOutOfRange);
      }
    });

    this.initValidation();
  },
  /**
     * @method toggle(open) 展开/收起
     * @public
     * @param  {boolean} open 展开/收起状态。如果无此参数，则在两种状态之间切换。
     * @return {void}
     */
  toggle(_open) {
    if (this.data.disabled) return;
    let open = _open;
    if (open === undefined) open = !this.data.open;
    this.data.open = open;

    // 根据状态在Dropdown.opens列表中添加/删除管理项
    const index = Dropdown.opens.indexOf(this);
    if (open && index < 0) Dropdown.opens.push(this);
    else if (!open && index >= 0) Dropdown.opens.splice(index, 1);
    if (this.data.date && open) {
      this.data.date.setMilliseconds(0);
      this.data._date = new Date(
        `${this.data.date}`.replace(new RegExp(/-/gm), '/'),
      );
      this.data._time = filter.format(this.data.date, 'HH:mm:ss');
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
     * @method select(date) 选择一个日期
     * @public
     * @param  {Date} date 选择的日期
     * @return {void}
     */
  select(date, time, flag) {
    if (this.data.readonly || this.data.disabled || this.isOutOfRange(date)) {
      return;
    }
    if (flag || !this.data.showTime) {
      this._onDateTimeChange(date, time);
      this._onOk();
    }
  },
  /**
     * 关闭
     * @private
     */
  _onClose() {
    this.toggle(false);
  },
  _onOk() {
    const format = this.data.showTime ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd';
    this.data.date = filter.format(this.date, format);
    this.data.time = this.time;
    /**
         * @event select 选择某一项时触发
         * @property {object} sender 事件发送对象
         * @property {object} date 当前选择项
         */
    this.$emit('select', {
      sender: this,
      date: this.data.date,
    });

    this.toggle(false);
  },
  /**
     * @method _onDateTimeChange(date, time) 日期或时间改变后更新日期时间
     * @private
     * @return {void}
     */
  _onDateTimeChange(date, _time) {
    this.time = _time || '00:00:00';
    // this.data.time
    this.date = new Date(`${date}`.replace(new RegExp(/-/gm), '/'));
    const time = this.time.split(':');
    this.date.setHours(time[0]);
    this.date.setMinutes(time[1]);
    this.date.setSeconds(time[2]);
  },
  /**
     * @method _onInput($event) 输入日期
     * @private
     * @param  {object} $event
     * @return {void}
     */
  _onInput($event) {
    let value = $event.target.value;
    value = value.replace(new RegExp(/-/gm), '/');
    const date = value ? new Date(value) : null;
    const format = this.data.showTime ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd';
    if (date === null || date.toString() === 'Invalid Date') {
      $event.target.value = this.data.date
        ? filter.format(this.data.date, format)
        : filter.format(new Date(), format);
    } else {
      $event.target.value = filter.format(date, format);
    }
    this.data.date = $event.target.value;
  },
  /**
     * @method isOutOfRange(date) 是否超出规定的日期时间范围
     * @public
     * @param {Date} date 待测的日期时间
     * @return {boolean|Date} date 如果没有超出日期时间范围，则返回false；如果超出日期时间范围，则返回范围边界的日期时间
     */
  isOutOfRange(date) {
    const minDate = this.data.minDate;
    const maxDate = this.data.maxDate;

    // minDate && date < minDate && minDate，先判断是否为空，再判断是否超出范围，如果超出则返回范围边界的日期时间。
    return (
      (minDate && moment(date).isBefore(minDate, 'day') && minDate) ||
      (maxDate && moment(date).isAfter(maxDate, 'day') && maxDate)
    );
  },
  validate(on) {
    const data = this.data;
    const date = data.date || '';

    const result = date
      ? Validation.validate(date.toString(), [
          { type: 'isDate', message: '请填写' },
        ])
      : { success: false };
    if (data.required && !result.success) {
      result.success = false;
      result.message = this.data.message || '请填写';
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

JRDatePicker.use(validationMixin);
module.exports = JRDatePicker;
