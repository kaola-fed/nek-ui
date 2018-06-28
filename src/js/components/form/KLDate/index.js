/* eslint-disable */
const validator = require('validator');
const bowser = require('bowser');
const Component = require('../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../ui-base/_');
const KLDateRange = require('./KLDateRange/index');
const KLDateNormal = require('./KLDateNormal/index');

const KLDate = Component.extend({
  name: 'kl-date',
  template,
  config() {
    _.extend(this.data, {
      type: 'normal'
    });
    this.supr();
  },
  select(e) {
    this.data.value = e;
  },
});

module.exports = KLDate;
