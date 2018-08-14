/**
 * ------------------------------------------------------------
 * Calendar  日历
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

const Component = require('../../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../../ui-base/_');

const bowser = require('bowser');
const moment = require('moment');
const polyfill = require('../../../../ui-base/polyfill');

const MS_OF_DAY = 24 * 3600 * 1000;

/**
 * @class Calendar
 * @extend Component
 * @param {object}        [options.data]                  = 绑定属性
 * @param {Date|string}   [options.data.date]             <=> 当前选择的日期，默认当前日期
 * @param {Date|string}   [options.data.minDate=null]     => 最小日期，如果为空则不限制
 * @param {Date|string}   [options.data.maxDate=null]     => 最大日期，如果为空则不限制
 * @param {boolean}       [options.data.readonly=false]   => 是否只读
 * @param {boolean}       [options.data.disabled=false]   => 是否禁用
 * @param {boolean}       [options.data.visible=true]     => 是否显示
 * @param {string}        [options.data.class]            => 补充class
 */
const Calendar = Component.extend({
  name: 'calendar',
  template: _.compressHtml(template),
  /**
     * @protected
     */
  config() {
    _.extend(this.data, {
      date: null,
      minDate: null,
      maxDate: null,
      _days: [],
    });
    this.supr();

    this.$watch('date', function (newValue, oldValue) {
      // 字符类型自动转为日期类型
      if (typeof newValue === 'string') {
        if (bowser.msie && bowser.version <= 9) {
          return (this.data.date = polyfill.StringDate(newValue));
        }
        return (this.data.date = newValue ? new Date(newValue) : new Date());
      } else if (typeof newValue === 'number') {
        return (this.data.date = new Date(newValue));
      }

      // 如果newValue为空， 则自动转到今天
      if (!newValue) {
        return (this.data.date = new Date(
          /* eslint no-bitwise: 0 */
          ((new Date() / MS_OF_DAY) >> 0) * MS_OF_DAY,
        ));
      }

      if (newValue === 'Invalid Date') throw new TypeError('Invalid Date');

      // 如果超出日期范围，则设置为范围边界的日期
      const isOutOfRange = this.isOutOfRange(newValue);
      if (isOutOfRange) {
        this.data.date = isOutOfRange;

        // 防止第二次刷新同月
        this._update();
        return;
      }

      if (!oldValue || !oldValue.getFullYear) this._update();
      else if (
        newValue.getFullYear() !== oldValue.getFullYear() ||
        newValue.getMonth() !== oldValue.getMonth()
      ) {
        this._update();
      }

      /**
             * @event change 日期改变时触发
             * @property {object} sender 事件发送对象
             * @property {object} date 改变后的日期
             */
      this.$emit('change', {
        sender: this,
        date: newValue,
      });
    });

    this.$watch('minDate', function (newValue) {
      if (!newValue) return;

      if (typeof newValue === 'string') {
        if (bowser.msie && bowser.version <= 9) {
          return (this.data.date = polyfill.StringDate(newValue));
        }
        return (this.data.minDate = new Date(newValue));
      }

      if (newValue === 'Invalid Date') throw new TypeError('Invalid Date');
    });

    this.$watch('maxDate', function (newValue) {
      if (!newValue) return;

      if (typeof newValue === 'string') {
        if (bowser.msie && bowser.version <= 9) {
          return (this.data.date = polyfill.StringDate(newValue));
        }
        return (this.data.maxDate = new Date(newValue));
      }

      if (newValue === 'Invalid Date') throw new TypeError('Invalid Date');
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

      if (minDate && maxDate) {
        if ((minDate / MS_OF_DAY) >> 0 > (maxDate / MS_OF_DAY) >> 0) {
          throw new Calendar.DateRangeError(minDate, maxDate);
        }
      }

      // 如果超出日期范围，则设置为范围边界的日期
      const isOutOfRange = this.isOutOfRange(this.data.date);
      if (isOutOfRange) this.data.date = isOutOfRange;
    });
  },
  /**
     * @method _update() 日期改变后更新日历
     * @private
     * @return {void}
     */
  _update() {
    this.data._days = [];
    const date = this.data.date;
    const mfirst = new Date(date);
    const month = mfirst.getMonth();
    mfirst.setDate(1);
    const mfirstTime = +mfirst;
    const nfirst = new Date(mfirst);
    nfirst.setMonth(month + 1);
    nfirst.setDate(1);
    const nfirstTime = +nfirst;
    const lastTime = nfirstTime + ((((7 - nfirst.getDay()) % 7) - 1) * MS_OF_DAY);
    let num = -mfirst.getDay();
    let tmpTime;
    let tmp;
    do {
      tmpTime = mfirstTime + (num * MS_OF_DAY);
      num += 1;
      tmp = new Date(tmpTime);
      this.data._days.push(tmp);
    } while (tmpTime < lastTime);
  },
  /**
     * @method addYear(year) 调整年份
     * @public
     * @param  {number} [year=0] 加/减的年份
     * @return {Date} date 计算后的日期
     */
  addYear(year) {
    if (this.data.readonly || this.data.disabled || !year) return;

    if (isNaN(year)) throw new TypeError(`${year} is not a number!`);

    const date = new Date(this.data.date);
    const oldMonth = date.getMonth();
    date.setFullYear(date.getFullYear() + year);
    if (date.getMonth() !== oldMonth) date.setDate(0);

    return (this.data.date = date);
  },
  /**
     * @method addMonth(month) 调整月份
     * @public
     * @param  {number} [month=0] 加/减的月份
     * @return {Date} date 计算后的日期
     */
  addMonth(month) {
    if (this.data.readonly || this.data.disabled || !month) return;

    if (isNaN(month)) throw new TypeError(`${month} is not a number!`);

    const date = new Date(this.data.date);
    const correctMonth = date.getMonth() + month;
    date.setMonth(correctMonth);
    // 如果跳月，则置为上一个月
    if ((date.getMonth() - correctMonth) % 12) date.setDate(0);

    return (this.data.date = date);
  },
  /**
     * @method select(date) 选择一个日期
     * @public
     * @param  {Date} date 选择的日期
     * @return {void}
     */
  select(date, e) {
    e.stopPropagation();
    if (this.data.readonly || this.data.disabled || this.isOutOfRange(date)) {
      return;
    }
    this.data.date = new Date(date);

    /**
         * @event select 选择某一个日期时触发
         * @property {object} sender 事件发送对象
         * @property {object} date 当前选择的日期
         */
    this.$emit('select', {
      sender: this,
      date,
    });
  },
  /**
     * @method goToday() 回到今天
     * @public
     * @return {void}
     */
  goToday() {
    if (this.data.readonly || this.data.disabled) return;

    this.data.date = new Date(((new Date() / MS_OF_DAY) >> 0) * MS_OF_DAY);
  },
  /**
     * @method isOutOfRange(date) 是否超出规定的日期范围
     * @public
     * @param {Date} date 待测的日期
     * @return {boolean|Date} date 如果没有超出日期范围，则返回false；如果超出日期范围，则返回范围边界的日期
     */
  isOutOfRange(date) {
    const minDate = this.data.minDate;
    const maxDate = this.data.maxDate;

    // minDate && date < minDate && minDate，先判断是否为空，再判断是否超出范围，如果超出则返回范围边界的日期
    return (
      (minDate && moment(date).isBefore(minDate, 'day') && minDate) ||
      (maxDate && moment(date).isAfter(maxDate, 'day') && maxDate)
    );
  },
});

const DateRangeError = function (minDate, maxDate) {
  this.name = 'DateRangeError';
  this.message = `Wrong Date Range where \`minDate\` is ${minDate} and \`maxDate\` is ${maxDate}!`;
};
DateRangeError.prototype = Object.create(RangeError.prototype);
DateRangeError.prototype.constructor = DateRangeError;
Calendar.DateRangeError = DateRangeError.prototype.constructor;

module.exports = Calendar;
