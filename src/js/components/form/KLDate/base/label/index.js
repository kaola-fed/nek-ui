/* eslint-disable */
import Component from '../../../../../ui-base/component';
import template from './index.html';

const KLDatePanelLabel = Component.extend({
    name: 'kl-date-panel-label',
    template,
    config() {
        this.defaults({
            datePanelLabel: {},
            currentView: '',
            datePrefixCls: '',
        });
        this.supr();

        this.$watch('datePanelLabel[0].label', (value) => {
            // console.log(value)
        })
    },
});

module.exports = KLDatePanelLabel;
