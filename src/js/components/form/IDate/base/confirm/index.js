/* eslint-disable */
import Component from '../../../../../ui-base/component';
import _ from '../../../../../ui-base/_';
import template from './index.html';

const KLDateConfirm = Component.extend({
    name: 'kl-date-confirm',
    template,
    config() {
        _.extend(this.data, {
            showTime: false,
            isTime: false,
            timeDisabled: false,
            prefixCls: 'kl-picker-confirm',
        });
        this.supr();
    },

    handleClear() {
        this.$emit('pick-clear');
    },
    handleSuccess() {
        this.$emit('pick-success');
    },
    handleToggleTime() {
        if (this.data.timeDisabled) return;
        this.$emit('pick-toggle-time');
        // this.dispatch('CalendarPicker', 'focus-input');
    }
});

module.exports = KLDateConfirm;
