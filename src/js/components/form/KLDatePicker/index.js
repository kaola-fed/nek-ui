/**
 * @file KLDatePicker 日期选择
 * @author   sensen<rainforest92@126.com>
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
 * @class KLDatePicker
 * @extend Dropdown
 * @param {object}        [options.data] = 绑定属性
 * @param {object}        [options.data.date=null]        <=> 当前选择的日期时间
 * @param {boolean}       [options.data.showTime=false]   => 是否显示时间选择
 * @param {string}        [options.data.defaultTime=null]  => 首次默认的时分秒, 格式为字符串"hh:mm:ss"
 * @param {string}        [options.data.placeholder=请输入] => 文本框的占位文字
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
const KLDatePicker = Dropdown.extend({
  name: 'kl-date-picker',
  template,
  config() {
    _.extend(this.data, {
      // @inherited source: [],
      // @inherited open: false,
      hideTip: false,
      minDate: null,
      maxDate: null,
      placeholder: this.$trans('PLEASE_SELECT'),
      date: null,
      defaultTime: null,
      _date: undefined,
      _time: undefined,
      autofocus: false,
      required: false,
      showTime: false,
      open: false,
    });
    this.supr();

    this.$watch('date', function (newValue) {
      if (!newValue && this.data.defaultTime) {
        this.data._time = this.data.defaultTime;
      }

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
       * @event KLDatePicker#change 日期时间改变时触发
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
        return (this.data.maxDate = new Date(newValue));
      }

      if (newValue === 'Invalid Date' || newValue === 'NaN') {
        throw new TypeError('Invalid Date');
      }
    });

    this.$watch(['minDate', 'maxDate'], function (minDate, maxDate) {
      if (
        !(
          (minDate && minDate instanceof Date) ||
          (maxDate && maxDate instanceof Date)
        )
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
  select(date, time) {
    if (this.data.readonly || this.data.disabled || this.isOutOfRange(date)) {
      return;
    }
    this._onDateTimeChange(date, time);
  },
  onConfirm() {
    if (this.data.readonly || this.data.disabled || this.isOutOfRange(this.date)) {
      return;
    }
    this._onOk();
  },
  _onClose() {
    this.toggle(false);
  },
  _onOk() {
    this.date || this._onDateTimeChange(this.data._date);
    this.data.date = this.date;
    this.data.time = this.time;
    /**
     * @event KLDatePicker#select 选择某一项时触发
     * @property {object} sender 事件发送对象
     * @property {object} date 当前选择项
     */
    this.$emit('select', {
      sender: this,
      date: this.data.date,
    });

    this.toggle(false);
  },
  _onDateTimeChange(date, _time) {
    this.time = _time || '00:00:00';
    // this.data.time
    this.date = new Date(date);
    const time = this.time.split(':');
    this.date.setHours(time[0]);
    this.date.setMinutes(time[1]);
    this.date.setSeconds(time[2]);
  },
  _onInput($event) {
    const value = $event.target.value;
    const date = value ? new Date(value) : null;
    if (date !== 'Invalid Date') this.data.date = date;
    else {
      $event.target.value = filter.format(
        this.data.date,
        'yyyy-MM-dd HH:mm:ss',
      );
    }
  },
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

    // 如果是readonly或者disabled状态, 无需验证
    if (data.readonly || data.disabled) {
      return {
        success: true,
      };
    }

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

KLDatePicker.use(validationMixin);
module.exports = KLDatePicker;
