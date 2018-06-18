
import Component from '../../../../../ui-base/component';
import _ from '../../../../../ui-base/_';
import template from './index.html';

const KLTimeTable = Component.extend({
  name: 'time-table',
  template,
  config() {
    _.extend(this.data, {
    });
    this.supr();
  },
  init() {
    this.supr();
  },
});

module.exports = KLTimeTable;
