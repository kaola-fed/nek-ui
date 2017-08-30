/**
 * @file KLSteps     步骤条
 * @author   ziane(zianecui@gmail.com)
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../ui-base/_');

/**
 * @class KLSteps
 * @extend Component
 * @param {object}      [options.data]                        = 绑定属性
 * @param {object[]}    [options.data.steps=null]             <=> 数据源
 * @param {number}      [options.data.steps[].status]         => 状态id
 * @param {string}      [options.data.steps[].title]          => 步骤标题
 * @param {object[]}    [options.data.steps[].description]    => 步骤具体描述
 * @param {number}      [options.data.current=0]              <=> 当前状态
 * @param {string}      [options.data.size]                   =>  当前尺寸，sm
 */
const KLSteps = Component.extend({
  name: 'kl-steps',
  template,
  config() {
    _.extend(this.data, {
      steps: [],
      current: 0,
      size: '',
      currentIndex: 0,
    });
    this.supr();
  },
  init() {
    this.supr();
    this.$watch('current', () => {
      this.juedgeFinishedItem();
    });
  },
  juedgeFinishedItem() {
    const data = this.data;
    const current = data.current;
    const steps = data.steps;

    steps.forEach((item, index) => {
      if (item.status / 1 === current / 1) {
        data.currentIndex = index;
      }
    });
  },
});

module.exports = KLSteps;
