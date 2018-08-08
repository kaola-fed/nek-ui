/* eslint-disable */
/**
 * event: change, pick-click(传了当前选择的值)
 * 基本属性
 *  disabledHours: [],
 *  disabledMinutes: [],
 *  disabledSeconds: [],
 *  hideDisabledOptions: false,
 *  hours: NaN,
 *  minutes: NaN,
 *  seconds: NaN,
 *  showSeconds: true,
 *  steps: [],
 */
import Component from '../../../../../ui-base/component';
import template from './index.html';

import ClassMixins from './mixins/class.mixin';

import { deepCopy, scrollTop, firstUpperCase } from '../../utils/index';

const timeParts = ['hours', 'minutes', 'seconds'];

const KLTimeSpinner = Component.extend({
    name: 'kl-time-spinner',
    template,
    config() {
        this.defaults({
            prefixCls: 'kl-time-picker-cells',

            disabledHours: [],
            disabledMinutes: [],
            disabledSeconds: [],
            hideDisabledOptions: false,
            hours: NaN,
            minutes: NaN,
            seconds: NaN,
            showSeconds: true,
            steps: [],

            compiled: false,
            focusedColumn: -1, // which column inside the picker
            focusedTime: [0, 0, 0], // the values array into [hh, mm, ss]
        });

        this.data.spinerSteps = [1, 1, 1].map((one, i) => Math.abs(this.data.steps[i]) || one);

        this.supr();


        // 初始化的时候滚动到当前选项
        this.$watch('hours', (val) => {
            if (!this.data.compiled) return;
            this.scroll('hours', this.data.hoursList.findIndex(obj => obj.text == val));
        });

        this.$watch('minutes', (val) => {
            if (!this.data.compiled) return;
            this.scroll('minutes', this.data.minutesList.findIndex(obj => obj.text == val));
        });

        this.$watch('seconds', (val) => {
            if (!this.data.compiled) return;
            this.scroll('seconds', this.data.secondsList.findIndex(obj => obj.text == val));
        });

        this.$watch('focusedTime', (updated, old) => {
            timeParts.forEach((part, i) => {
                if (old == undefined) return;
                if (updated[i] === old[i] || typeof updated[i] === 'undefined') return;
                const valueIndex = this.data[`${part}List`].findIndex(obj => obj.text === updated[i]);
                this.scroll(part, valueIndex);
            });
        });

    },
    init() {
        this.supr();
        this.data.compiled = true;

        this.getHoursList();
        this.getMinutesList();
        this.getSecondsList();

        this.$watch('hours', () => {
            this.getHoursList();
        });
        this.$watch('minutes', () => {
            this.getMinutesList();
        });
        this.$watch('seconds', () => {
            this.getSecondsList();
        });

    },
    /**
     * 依赖的外部值（这些值变化需要重新更新hourList）：
     * spinerSteps、
     * focusedColumn、
     * focusedTime、
     * disabledHours: 设置不可点击的时间
     * hideDisabledOptions: 隐藏不可点击的选项————只会通过外部传入，内部不会改变
     * hours: value
     */
    getHoursList() {
        const store = this.data;

        const hours = [];
        const step = store.spinerSteps[0];
        const focusedHour = store.focusedColumn === 0 && store.focusedTime[0];
        const hour_tmpl = {
            text: 0,
            selected: false,
            disabled: false,
            hide: false,
        };

        for (let i = 0; i < 24; i += step) {
            const hour = deepCopy(hour_tmpl);
            hour.text = i;
            hour.focused = i === focusedHour;

            if (store.disabledHours.length && store.disabledHours.indexOf(i) > -1) {
                hour.disabled = true;
                if (store.hideDisabledOptions) hour.hide = true;
            }
            if (store.hours === i) hour.selected = true;
            hours.push(hour);
        }
        this.data.hoursList = hours;
    },
    /**
     * 依赖的外部值（这些值变化需要重新更新hourList）：
     * spinerSteps、
     * focusedColumn、
     * focusedTime、
     * disabledMinutes: 设置不可点击的时间
     * hideDisabledOptions: 隐藏不可点击的选项————只会通过外部传入，内部不会改变
     * minutes: value
     */
    getMinutesList() {
        const store = this.data;

        const minutes = [];
        const step = store.spinerSteps[1];
        const focusedMinute = store.focusedColumn === 1 && store.focusedTime[1];
        const minute_tmpl = {
            text: 0,
            selected: false,
            disabled: false,
            hide: false,
        };

        for (let i = 0; i < 60; i += step) {
            const minute = deepCopy(minute_tmpl);
            minute.text = i;
            minute.focused = i === focusedMinute;

            if (store.disabledMinutes.length && store.disabledMinutes.indexOf(i) > -1) {
                minute.disabled = true;
                if (store.hideDisabledOptions) minute.hide = true;
            }
            if (store.minutes === i) minute.selected = true;
            minutes.push(minute);
        }
        this.data.minutesList = minutes;
    },
    /**
     * 依赖的外部值（这些值变化需要重新更新hourList）：
     * spinerSteps、
     * focusedColumn、
     * focusedTime、
     * disabledSeconds: 设置不可点击的时间
     * hideDisabledOptions: 隐藏不可点击的选项————只会通过外部传入，内部不会改变
     * seconds: value
     */
    getSecondsList() {
        const store = this.data;

        const seconds = [];
        const step = store.spinerSteps[2];
        const focusedMinute = store.focusedColumn === 2 && store.focusedTime[2];
        const second_tmpl = {
            text: 0,
            selected: false,
            disabled: false,
            hide: false,
        };

        for (let i = 0; i < 60; i += step) {
            const second = deepCopy(second_tmpl);
            second.text = i;
            second.focused = i === focusedMinute;

            if (store.disabledSeconds.length && store.disabledSeconds.indexOf(i) > -1) {
                second.disabled = true;
                if (store.hideDisabledOptions) second.hide = true;
            }
            if (store.seconds === i) second.selected = true;
            seconds.push(second);
        }
        this.data.secondsList = seconds;
    },


    /**
     * 选中时、分、秒
     */
    onClick(type, cell, e) {
        e.stopPropagation();
        if (cell.disabled) return;
        const data = {[type]: cell.text};
        this.emitChange(data);
    },
    emitChange(changes) {
        this.$emit('change', changes);
        this.$emit('pick-click');
    },

    scroll(type, index) {
        const from = this.$refs[type].scrollTop;
        const to = 24 * this.getScrollIndex(type, index);
        scrollTop(this.$refs[type], from, to, 500);
    },
    getScrollIndex(type, index) {
        const Type = firstUpperCase(type);
        const disabled = this.data[`disabled${Type}`];
        if (disabled.length && this.data.hideDisabledOptions) {
            let _count = 0;
            disabled.forEach(item => item <= index ? _count++ : '');
            index -= _count;
        }
        return index;
    },


    updateScroll() {
        setTimeout(() => {
            timeParts.forEach((type) => {
                this.$refs[type].scrollTop = 24 * this.data[`${type}List`].findIndex(obj => obj.text == this.data[type]);
            });
        });
        setTimeout(() => {
          timeParts.forEach((type) => {
              this.$refs[type].scrollTop = 24 * this.data[`${type}List`].findIndex(obj => obj.text == this.data[type]);
          });
        });
    },

    // updateFocusedTime(col, time) {
    //     this.data.focusedColumn = col;
    //     this.data.focusedTime = time.slice();
    // },
    // chooseValue(values) {
    //     const changes = timeParts.reduce((obj, part, i) => {
    //         const value = values[i];
    //         if (this.data[part] === value) return obj;
    //         return {
    //             ...obj,
    //             [part]: value,
    //         };
    //     }, {});
    //     if (Object.keys(changes).length > 0) {
    //         this.emitChange(changes);
    //     }
    // },
})
    .use(ClassMixins)
    .filter({
        formatTime(text) {
            return text < 10 ? `0${text}` : text;
        }
    });

module.exports = KLTimeSpinner;
