/* eslint-disable */
import Component from '../../../../../ui-base/component';
import template from './index.html';

import KLTimePanel from '../../panel/time/index';
import KLTimeRangePanel from '../../panel/time.range/index';
import KLDrop from '../../../../layout/KLDrop/index';
import KLDropHeader from '../../../../layout/KLDrop/KLDropHeader/index';

export default Component.extend({
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
    }
})
    .component('kl-drop', KLDrop)
    .component('kl-drop-header', KLDropHeader)
    .component('kl-time-range-panel', KLTimeRangePanel)
    .component('kl-time-panel', KLTimePanel);

