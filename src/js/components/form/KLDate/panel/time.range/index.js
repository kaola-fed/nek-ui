/* eslint-disable */

import Component from '../../../../../ui-base/component';
import template from './index.html';

import TimeSpinner from '../../base/time.spinner/index';
import Confirm from '../../base/confirm/index';

// mixins
import EventActionMixin from './mixins/event.action';

//utils
import {
    initTimeDate,
    formatDateLabels,
    parseValue
} from '../../utils/index';
import {DEFAULT_FORMATS, TYPE_VALUE_RESOLVER_MAP} from "../../utils";

// const prefixCls = 'kl-picker-panel';
// const datePrefixCls = 'kl-picker-panel-body-header';
const prefixCls = 'kl-picker-panel';
const timePrefixCls = 'kl-time-picker-body-header';
const KLRangeTimePickerPanel = Component.extend({
    template,
    config() {
        this.defaults({
            disabledHours: [],
            disabledMinutes: [],
            disabledSeconds: [],
            hideDisabledOptions: false,
            type: 'timerange',

            confirm: false,

            steps: [],
            format: 'HH:mm:ss',
            value: [],

            prefixCls,
            timePrefixCls,
            showDate: false,
        })
        this.supr();

        this.initInternalValue();

        this.$watch('value', () => {
            this.initInternalValue();
        })
    },
    getVisualValue(dateStart, dateEnd) {
        let visualValue;
        if (!dateStart || !dateEnd) {
            visualValue = '';
        } else {
            visualValue = `${this.formatDate(dateStart)}-${this.formatDate(dateEnd)}`;
        }
        this.$emit('format', visualValue)
    },
    initInternalValue() {
        const { value, type } = this.data;
        if (!value) {
            this.data.dateStart = initTimeDate();
            this.data.dateEnd = initTimeDate();

            this.getVisualValue(null, null);

        } else if (Array.isArray(value)) {
            const formattedValue = parseValue(value, type);
            const [dateStart, dateEnd] = formattedValue.slice();
            this.data.dateStart = dateStart|| initTimeDate();
            this.data.dateEnd = dateEnd || initTimeDate();

            if (dateStart && dateEnd) {
                this.getVisualValue(dateStart, dateEnd);
            }

        } else {
            console.error('value值类型错误');
            return;
        }

    },
    computed: {
        classes() {
            const secondsCls = this.showSeconds ? `${timePrefixCls}--with-seconds` : '';
            return [
                `${prefixCls}--body-wrapper`,
                `${prefixCls}--with-range`,
                secondsCls,
            ].join(' ');
        },
        showSeconds() {
            return !(this.data.format || '').match(/mm$/);
        }
    },
    onPickSuccess(event) {
        this.$emit('pickSuccess', event)
    }
})
    .use(EventActionMixin);

module.exports = KLRangeTimePickerPanel;
