/* eslint-disable */
const Component = require('../../../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../../../ui-base/_');

const KLYear = Component.extend({
  name: 'kl-year',
  template,
  config() {
    _.extend(this.data, {
      yearArr: [
        [],
        [],
        [],
        [],
      ],
    });
    // this.initPanel(new Date().getTime());
    this.supr();
  },
  initPanel(date) {
    const time = new Date(date);
    const year = time.getFullYear();

    const firstValue = (parseInt(year / 10) * 10) - 1;

    for (let index = 0; index < 4; index++) {
      for (let index2 = 0; index2 < 3; index2++) {
        this.data.yearArr[index].push(firstValue + (index2 + (index * 3)));
      }
    }

    console.log(this.data.yearArr);
  },
  setYear(year) {
    this.$emit('update', year);
  },
});

module.exports = KLYear;
