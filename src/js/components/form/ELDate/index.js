// import DatePickerPanel from './panel/date/index';
// import DateTable from './base/date-table/index';
// import MonthTable from './base/month-table/index';
// import YearTable from './base/year-table/index';
//
// import DatePicker from './panel/date/index';
// import DateRange from './panel/date.range/index';

const Component = require('../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../ui-base/_');


const KLDate = Component.extend({
  name: 'kl-date',
  template,
  config() {
    _.extend(this.data, {
      type: 'date',        // 'year', 'month', 'date', 'daterange', 'datetime', 'datetimerange'
    });
    this.supr();
  },
  init() {
    this.supr();
  },
});

module.exports = KLDate;
