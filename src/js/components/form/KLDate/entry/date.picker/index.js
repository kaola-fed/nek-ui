/* eslint-disable */

import Component from '../../../../../ui-base/component';
import template from './index.html';

// components
import KLDatePanel from '../../panel/date/index';
import KLDateRangePanel from '../../panel/date.range/index';
import KLDrop from '../../../../layout/KLDrop/index';
import KLDropHeader from '../../../../layout/KLDrop/KLDropHeader/index';

import ValidationMixin from '../../../../../util/validationMixin';

const KLDate = Component.extend({
    name: 'kl-date',
    template,
    config() {
        this.defaults({
            placement: 'bottom-start',
            appendToBody: false,
            isShow: false,
            isConfirm: false,
            steps: [],
            palceholder: '请选择日期',
            type: 'date',
            internalValue: [null],
            format: '',
            disabledDate: () => false,
            shortcuts: [],
            showWeekNumbers: false,
            splitPanels: false,
        });
        this.supr();

        this.initValidation()
    },
    init() {
        if (!this.data.format) {
            const formatMap = {
                'year': 'yyyy',
                'month': 'yyyy-MM',
                'date': 'yyyy-MM-dd',
                'daterange': 'yyyy-MM-dd',
                'datetime': 'yyyy-MM-dd HH:mm:ss',
                'datetimerange': 'yyyy-MM-dd HH:mm:ss'
            };

            this.data.format = formatMap[this.data.type];
        }
    },
    onPick(event) {
        if (event.isShow == false && this.data.confirm != true) {
            this.data.isShow = event.isShow;
        }
        this.$emit('pick', event);
    },
    onHideDropDown() {
        if (this.data.confirm && this.data._manualConfirm) {
            this.data.value = this.data._backupValue;
        }
        this.data._manualConfirm = true;
    },
    onShowDropDown() {
        if (this.data.confirm) {
            this.data._backupValue = this.data.value;
        }
    },
    onPickSuccess(event) {
        this.data._manualConfirm = false;
        this.data.isShow = false;
        this.$emit('confirm', {
            e: event
        })
    },
    onShowVisualValue(visualValue) {
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
    .component('kl-date-range-panel', KLDateRangePanel)
    .component('kl-date-panel', KLDatePanel);

module.exports = KLDate;
