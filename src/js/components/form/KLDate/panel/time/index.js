/* eslint-disable */

// common
import Component from '../../../../../ui-base/component';
import template from './index.html';

// base components
import TimeSpinner from '../../base/time.spinner/index';
import Confirm from '../../base/confirm/index';

// utils
import {
    initTimeDate,
    DEFAULT_FORMATS,
    TYPE_VALUE_RESOLVER_MAP
 } from '../../utils/index';
import {
    capitalize,
    mergeDateHMS,
    unique,
    returnFalse
} from './utils/index';


const KLTimePickerPanel = Component.extend({
    name: 'kl-time-panel',
    template,
    config() {
        this.defaults({
            prefixCls: 'kl-picker-panel',
            timePrefixCls: 'kl-time-picker',

            disabledHours: [],
            disabledMinutes: [],
            disabledSeconds: [],
            hideDisabledOptions: false,
            confirm: false,
            disabledDate: returnFalse, // function
            steps: [],
            format: 'HH:mm:ss',
            value: null,
            showDate: false,
        });
        this.supr();

        this.$watch('isShow', (newValue) => {
            if (newValue == true) {
                // 更新dom
                this.updateScroll();
            }
        });
        this.initInternalValue();

        this.$watch('value', () => {
            this.initInternalValue();
        })
    },
    getVisualValue(value) {
        let visualValue;
        if (!value) {
            visualValue = '';
        } else {
            visualValue = this.formatDate(value);
        }
        this.$emit('format', visualValue)
    },
    initInternalValue() {

        const value = this.data.value;

        if (!value) {
            this.data.date = null;
        } else if (Array.isArray(value)) {
            this.data.date = this.parseDate(value[0])[0];
        } else {
            this.data.date = this.parseDate(value)[0];
        }
        this.getVisualValue(this.data.date);
        this.getTimeSlots();
        this.showSeconds();
        this.getDisabledHMS();
    },
    getTimeSlots () {
        if (!this.data.date) {
            this.data.timeSlots = [];
        } else {
            this.data.timeSlots = ['getHours', 'getMinutes', 'getSeconds'].map(fn => this.data.date[fn]());
        }
    },
    showSeconds() {
        this.data.showSeconds = !(this.data.format || '').match(/mm$/);
    },
    getDisabledHMS() {
        const store = this.data;
        const disabledTypes = ['disabledHours', 'disabledMinutes', 'disabledSeconds'];
        const disabled = disabledTypes.reduce(
            (obj, type) => (obj[type] = store[type], obj), {},
        );
        this.data.disabledHMS = disabled;
    },

    onChange(e) {
        if (!this.data.date) {
            this.data.date = initTimeDate();
        }

        const newDate = new Date(this.data.date);
        Object.keys(e).forEach(
            type => newDate[`set${capitalize(type)}`](e[type]),
        );

        this.data.date = newDate;
        this.getTimeSlots();
        this.data.value = this.formatDate(newDate);
        this.getVisualValue(this.data.date);

        this.$emit('pick', {
            value: newDate,
            type: 'time',
        });
    },
    onPickClick() {
        //
    },
    formatDate(value) {
        const store = this.data;

        const format = DEFAULT_FORMATS.time;

        const {formatter} = (
            TYPE_VALUE_RESOLVER_MAP.time
        );
        return formatter(value, store.format || format);
    },
    parseDate(val) {
        const store = this.data;
        const type = store.se;
        const format = store.format || DEFAULT_FORMATS.time;
        const parser = TYPE_VALUE_RESOLVER_MAP.time.parser;

        if (val && !(val instanceof Date)) {
            val = parser(val, format);
        }
        return [val];
    },

    updateScroll() {
        this.$refs.timeSpinner.updateScroll();
    },
    onPickSuccess(event) {
        this.$emit('pickSuccess', event)
    }
})
    .component('kl-time-spinner', TimeSpinner)
    .component('kl-confirm', Confirm);

module.exports = KLTimePickerPanel;
