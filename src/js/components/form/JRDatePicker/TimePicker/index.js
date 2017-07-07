/**
 * ------------------------------------------------------------
 * TimePicker 时间选择
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

const Component = require('../../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../../ui-base/_');
require('../NumberInput');

/**
 * @class TimePicker
 * @extend Component
 * @param {object}        [options.data]                    = 绑定属性
 * @param {string}        [options.data.time=00:00]       <=> 当前的时间值
 * @param {string}        [options.data.minTime=00:00]    => 最小时间
 * @param {string}        [options.data.maxTime=23:59]    => 最大时间
 * @param {boolean}       [options.data.autofocus=false]    => 是否自动获得焦点
 * @param {boolean}       [options.data.readonly=false]     => 是否只读
 * @param {boolean}       [options.data.disabled=false]     => 是否禁用
 * @param {boolean}       [options.data.visible=true]       => 是否显示
 * @param {string}        [options.data.class]           => 补充class
 */
const TimePicker = Component.extend({
  name: 'time-picker',
  template,
  /**
   * @protected
   */
  config() {
    _.extend(this.data, {
      time: '00:00:00',
      hour: 0,
      minute: 0,
      seconds: 0,
      minTime: '00:00:00',
      maxTime: '23:59:59',
      autofocus: false,
    });
    this.supr();

    this.$watch('time', function (newValue, oldValue) {
      if (oldValue === undefined) {
        return;
      }

      if (!newValue) throw new TypeError('Invalid Time');

      // 如果超出时间范围，则设置为范围边界的时间
      const isOutOfRange = this.isOutOfRange(newValue);
      if (isOutOfRange) return (this.data.time = isOutOfRange);

      const time = newValue.split(':');
      this.data.hour = +time[0];
      this.data.minute = +time[1];
      this.data.seconds = +time[2];

      /**
       * @event change 时间改变时触发
       * @property {object} sender 事件发送对象
       * @property {object} time 改变后的时间
       */
      this.$emit('change', {
        sender: this,
        time: newValue,
      });
    });

    this.$watch(['hour', 'minute', 'seconds'], function (_hour, _minute, _seconds) {
      let hour = _hour;
      let minute = _minute;
      let seconds = _seconds;
      hour += '';
      minute += '';
      seconds += '';
      this.data.time = `${hour.length > 1 ? hour : `0${hour}`}:${minute.length >
      1
        ? minute
        : `0${minute}`}:${seconds.length > 1 ? seconds : `0${seconds}`}`;
    });

    this.$watch(['minTime', 'maxTime'], function (minTime, maxTime) {
      if (!minTime) throw new TypeError('Invalid Time');
      if (!maxTime) throw new TypeError('Invalid Time');

      if (minTime > maxTime) {
        throw new TimePicker.TimeRangeError(minTime, maxTime);
      }

      // 如果超出时间范围，则设置为范围边界的时间
      const isOutOfRange = this.isOutOfRange(this.data.time);
      if (isOutOfRange) this.data.time = isOutOfRange;
    });
  },
  /**
   * @method isOutOfRange(time) 是否超出规定的时间范围
   * @public
   * @param {Time} time 待测的时间
   * @return {boolean|Time} time 如果没有超出时间范围，则返回false；如果超出时间范围，则返回范围边界的时间
   */
  isOutOfRange(time) {
    const minTime = this.data.minTime;
    const maxTime = this.data.maxTime;

    // minTime && time < minTime && minTime，先判断是否为空，再判断是否超出范围，如果超出则返回范围边界的时间
    return (
      (minTime && time < minTime && minTime) ||
      (maxTime && time > maxTime && maxTime)
    );
  },
});

const TimeRangeError = function (minTime, maxTime) {
  this.name = 'TimeRangeError';
  this.message = `Wrong Time Range where \`minTime\` is ${minTime} and \`maxTime\` is ${maxTime}!`;
};

TimeRangeError.prototype = Object.create(Error.prototype);
TimeRangeError.prototype.constructor = TimeRangeError;
TimePicker.TimeRangeError = TimeRangeError.prototype.constructor;

module.exports = TimePicker;
