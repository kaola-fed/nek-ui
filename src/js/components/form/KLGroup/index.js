/**
 * @file KLGroup     步骤条
 * @author   ziane(zianecui@gmail.com)
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../ui-base/_');


const KLGroup = Component.extend({
  name: 'kl-group',
  template,
  $stepsNode: [],
  config() {
    _.extend(this.data, {
    });
    this.supr();
  },
  init() {
    this.supr();
  },
});

module.exports = KLGroup;
