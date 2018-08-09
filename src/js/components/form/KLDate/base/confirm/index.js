/* eslint-disable */
import Component from '../../../../../ui-base/component';
import template from './index.html';

const KLDateConfirm = Component.extend({
    name: 'kl-date-confirm',
    template,
    config() {
        this.defaults({
            prefixCls: 'kl-picker-confirm',
            showTime: false,
            timeDisabled: false,
            isTime: false,
        });
        this.supr();
    },

    onSuccess() {
        this.$emit('pick-success');
    },
    onToggleTime() {
        if (this.data.timeDisabled) return;
        this.$emit('pick-toggle-time');
    }
});

module.exports = KLDateConfirm;
