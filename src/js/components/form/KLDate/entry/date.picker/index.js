/* eslint-disable */

import Component from '../../../../../ui-base/component';
import template from './index.html';

// components
import KLDatePanel from '../../panel/date/index';
import KLDateRangePanel from '../../panel/date.range/index';
import KLDrop from '../../../../layout/KLDrop/index';
import KLDropHeader from '../../../../layout/KLDrop/KLDropHeader/index';

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
        if (event.isShow == false) {
            this.data.isShow = event.isShow;
        }
        this.$emit('pick', event);
    },
    onShowVisualValue(visualValue) {
        this.data.visualValue = visualValue;
    },
    resetValue(e) {
        e.stopPropagation();
        this.data.value = null;
    }
})
    .component('kl-drop', KLDrop)
    .component('kl-drop-header', KLDropHeader)
    .component('kl-date-range-panel', KLDateRangePanel)
    .component('kl-date-panel', KLDatePanel);

module.exports = KLDate;
