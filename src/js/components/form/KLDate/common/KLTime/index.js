/* eslint-disable */
const Component = require('../../../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../../../ui-base/_');

const KLTime = Component.extend({
  name: 'kl-time',
  template,
  config() {
    _.extend(this.data, {
      value: null,
      hour: null,
      minute: null,
      second: null,
    });
    this.supr();
  },
  init() {
    this.initPanel();

    this.$watch('value', () => {
      this.setTime(this.data.value);
    });
  },
  initPanel() {
    this.data.hourList = [];
    this.data.minuteList = [];
    this.data.secondList = [];
    for (let index = 0; index < 24; index++) {
      this.data.hourList.push(index);
    }
    for (let index = 0; index < 60; index++) {
      this.data.minuteList.push(index);
    }
    for (let index = 0; index < 60; index++) {
      this.data.secondList.push(index);
    }
  },
  setTime(value) {
    const time = new Date(value);
    const data = this.data;

    data.hour = time.getHours();
    data.minute = time.getMinutes();
    data.second = time.getSeconds();
  },
  // 选中元素滚动到上端
  onClick(e, value, type) {
    // e.target.scrollIntoView();

    const data = this.data;
    const time = new Date(data.value);

    if (type === 'HOUR') {
      data.value = time.setHours(value);
      console.log(this.$refs.hourElement);
    } else if (type === 'MINUTE') {
      data.value = time.setMinutes(value);
    } else if (type === 'SECOND') {
      data.value = time.setSeconds(value);
    }
    // this.setTime(data.value);
  },
});

module.exports = KLTime;
