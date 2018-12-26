/* eslint-disable */

import Component from '../../../../../../ui-base/component';
import _ from '../../../../../../ui-base/_';
import template from './index.html';

import TimeSpinner from '../../../base/time.spinner/index';
import Confirm from '../../../base/confirm/index';

import {initTimeDate} from '../../../util';


const prefixCls = 'ivu-picker-panel';
const timePrefixCls = 'ivu-time-picker';

const capitalize = str => str[0].toUpperCase() + str.slice(1);
const mergeDateHMS = (date, hours, minutes, seconds) => {
    const newDate = new Date(date.getTime());
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    newDate.setSeconds(seconds);
    return newDate;
};
const unique = (el, i, arr) => arr.indexOf(el) === i;
const returnFalse = () => false;

const KLTimePickerPanel = Component.extend({
    name: 'kl-time-picker-panel',
    template,
    config() {
        _.extend(this.data, {
            disabledHours: [],
            disabledMinutes: [],
            disabledSeconds: [],
            hideDisabledOptions: false,

            confirm: false,

            disabledDate: returnFalse, // function
            steps: [],
            format: 'HH:mm:ss',
            value: true,

            prefixCls,
            timePrefixCls,
            showDate: false,
        });
        this.supr();
    },
    init() {
        this.supr();
        this.data.date = this.data.value[0] || initTimeDate();

        // ?? 有问题
        // if (this.$parent && this.$parent.name === 'DatePicker') this.data.showDate = true;


        this.$watch('value', (dates) => {
            let newVal = dates[0] || initTimeDate();
            newVal = new Date(newVal);
            this.data.date = newVal;

            this.timeSlots();
            this.disabledHMS();
        })
    },
    timeSlots() {
        if (!this.data.value[0]) return [];
        this.data.timeSlots = ['getHours', 'getMinutes', 'getSeconds'].map(fn => this.data.date[fn]());
    },

    disabledHMS() {
        const store = this.data;

        const disabledTypes = ['disabledHours', 'disabledMinutes', 'disabledSeconds'];
        if (store.disabledDate === returnFalse || !store.value[0]) {
            const disabled = disabledTypes.reduce(
                (obj, type) => (obj[type] = store[type], obj), {},
            );
            return disabled;
        }

        const slots = [24, 60, 60];
        const disabled = ['Hours', 'Minutes', 'Seconds'].map(type => store[`disabled${type}`]);
        const disabledHMS = disabled.map((preDisabled, j) => {
            const slot = slots[j];
            const toDisable = preDisabled;
            for (let i = 0; i < slot; i += (store.steps[j] || 1)) {
                const hms = store.timeSlots.map((slot, x) => x === j ? i : slot);
                const testDateTime = mergeDateHMS(store.date, ...hms);
                if (store.disabledDate(testDateTime, true)) toDisable.push(i);
            }
            return toDisable.filter(unique);
        });

        return disabledTypes.reduce(
            (obj, type, i) => (obj[type] = disabledHMS[i], obj), {},
        );
    },

    computed: {
        showSeconds() {
            return !(this.data.format || '').match(/mm$/);
        },
        visibleDate() { // TODO
            const date = this.data.date;
            const month = date.getMonth() + 1;
            const tYear = '年';
            const tMonth = '月';
            return `${date.getFullYear()}${tYear} ${tMonth}`;
        },

    },


    handlePickClear() {
        this.resetView();
        this.$emit('pick-clear');
    },
    handlePickSuccess() {
        this.resetView();
        this.$emit('pick-success');
    },
    handlePickClick() {
        this.$emit('pick-click');
    },
    resetView() {
        setTimeout(
            () => this.data.currentView = this.data.selectionMode,
            500, // 500ms so the dropdown can close before changing
        );
    },
    handleClear() {
        this.data.dates = this.data.dates.map(() => null);
        this.data.rangeState = {};
        this.$emit('pick', {
            value: this.data.dates
        });
        this.handleConfirm();
        //  if (this.showTime) this.$refs.timePicker.handleClear();
    },
    handleConfirm(visible, type) {
        this.$emit('pick', {
            value: this.data.dates,
            visible,
            type: type || this.data.type,
        });
    },
    onToggleVisibility(open) {
        const {timeSpinner, timeSpinnerEnd} = this.$refs;
        if (open && timeSpinner) timeSpinner.updateScroll();
        if (open && timeSpinnerEnd) timeSpinnerEnd.updateScroll();
    },



    handleChange(date, emit = true) {
        const newDate = new Date(this.data.date);
        Object.keys(date).forEach(
            type => newDate[`set${capitalize(type)}`](date[type]),
        );

        if (emit) {
            this.$emit('pick', {
                value: newDate,
                asd: 123,
                d: newDate,
                type: 'time',
            });
        }

    },

    stopPropagation(e) {
        e.stopPropagation();
    },
});

module.exports = KLTimePickerPanel;
