/**
 * @file KLSteps     步骤条
 * @author   ziane(zianecui@gmail.com)
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../ui-base/_');


const KLSteps = Component.extend({
  name: 'kl-steps',
  template,
  config() {
    _.extend(this.data, {
      $stepsNode: [],
      steps: [],
      current: 0,
      size: '',
      currentIndex: 0,
      currentStatus: '',  // wait; process; finish; error
      direction: 'horizontal',
    });
    this.supr();

    this.$watch('$stepsNode.length', (newValue) => {
      if (newValue !== 0) {
        const stepsNode = this.data.$stepsNode;
        stepsNode.forEach((element) => {
          console.log(element);
        });
      }
    });
  },
  init() {
    this.supr();
  },
});

module.exports = KLSteps;
