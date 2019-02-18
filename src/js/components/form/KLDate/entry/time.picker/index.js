/* eslint-disable */
import Component from '../../../../../ui-base/component';
import template from './index.html';

import KLTimePanel from '../../panel/time/index';
import KLTimeRangePanel from '../../panel/time.range/index';
import KLDrop from '../../../../layout/KLDrop/index';
import KLDropHeader from '../../../../layout/KLDrop/KLDropHeader/index';

import ValidationMixin from '../../../../../util/validationMixin';

const KLTimePicker = Component.extend({
    name: 'kl-time-picker',
    template,
    config() {
        this.defaults({
            isShow: false,
            type: 'time',
            value: null,
            format: 'HH:mm:ss',
            placeholder: '请选择时间',
            disabledHours: [],
            disabledMinutes: [],
            disabledSeconds: [],
            hideDisabledOptions: false,
            confirm: false,
            steps: [],
        });
        this.supr();

        this.initValidation()
    },
    onPick(event) {
        this.$emit('pick', event);
    },
    getVisualValue(visualValue) {
        this.data.visualValue = visualValue;
    },
    resetValue(e) {
        e.stopPropagation();
        this.data.value = null;
    },
    validate(on) {
        const data = this.data;
        const date = data.date || '';

        if (data.readonly || data.disabled) {
          return {
            success: true,
          };
        }

        const result = { success: true, message: '' };
        let value = this.data.value;

        if (data.required && (value === undefined || value === null)) {
          result.success = false;
          result.message = this.data.message || '请选择';
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
})
    .use(ValidationMixin)
    .component('kl-drop', KLDrop)
    .component('kl-drop-header', KLDropHeader)
    .component('kl-time-range-panel', KLTimeRangePanel)
    .component('kl-time-panel', KLTimePanel);

module.exports = KLTimePicker;
