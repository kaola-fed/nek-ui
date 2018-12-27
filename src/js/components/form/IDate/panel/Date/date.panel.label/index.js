/* eslint-disable */
import Component from '../../../../../../ui-base/component';
import _ from '../../../../../../ui-base/_';
import template from './index.html';

const KLDatePanelLabel = Component.extend({
  name: 'kl-date-panel-label',
  template,
  config() {
    _.extend(this.data, {
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
