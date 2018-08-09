/**
 * @file KLStep    步骤条
 * @author   ziane(zianecui@gmail.com)
 */

const Component = require('../../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../../ui-base/_');

const KLSteps = Component.extend({
  name: 'kl-step',
  template,
  config() {
    _.extend(this.data, {
      currentStatus: 'finish',
      current: '',
      status: '',
      lineStyle: '',
    });
    this.supr();

    this.data.stepNumber = this.$parent.data.$stepsNode.length;
    this.$parent.data.$stepsNode.push(this);
    this.data.current = this.$parent.data.current;
    this.data.size = this.$parent.data.size;
    this.data.direction = this.$parent.data.direction; // vertical/horizontal

    const steps = this.$parent.data.steps;

    this.$watch('this.$parent.data.current', (newValue) => {
      this.data.current = newValue;
      this.getCurrentIndex(steps);
    });

    this.$watch('this.$parent.data.steps.length', (len) => {
      this.getCurrentIndex(steps);
      this.data.style = this.setStyles(len);
    });
  },
  init() {
    this.supr();
  },
  /**
   * 计算出step的宽度百分比，为了让每个step平分
   */
  setStyles(len) {
    let style = '';
    style += `flex-basis:${100 / (len - (this.data.isCenter ? 0 : 1))}%;`;
    if (this.isVertical) {
      this.data.style = style;
      return;
    }
    style += `max-width:${100 / len}%`;

    return style;
  },
  /**
   * 获取当前到达的步骤
   */
  getCurrentIndex(steps) {
    const data = this.data;
    const current = data.current;
    if (!current && current !== 0 && current !== '0') return;
    if (!steps) return;

    steps.forEach((item, index) => {
      if ((typeof item.key !== 'function' && item.key / 1 === current / 1) || (typeof item.key === 'function' && item.key(current))) {
        data.currentIndex = index;
      }
    });

    this.setStatus(steps);
  },
  /**
   * 设置每一步状态
   */
  setStatus(steps) {
    const data = this.data;
    const currentIndex = data.currentIndex;
    if (currentIndex === undefined) {
      this.data.currentStatus = 'finish';
    } else {
      steps.forEach((item, index) => {
        if (index < currentIndex / 1) {
          item.status = 'finish';
        } else if (index > currentIndex / 1) {
          item.status = 'wait';
        } else if (index === currentIndex / 1) {
          item.status = 'success';
        }
      });
      this.data.currentStatus = steps[data.stepNumber].status;
    }
    this.calcProgress(this.data.currentStatus);
  },
  calcProgress(status) {
    let step = 100;
    let style = '';
    style = `transition-delay:${150 * (this.data.stepNumber / 1)}ms;`;

    if (status === 'success') {
      step = 0;
    }

    if (this.data.size === 'small') {
      style += `border-width: ${step ? '1px' : 0};`;
    } else {
      style += `border-width: ${step ? '2px' : 0};`;
    }
    if (this.data.direction === 'vertical') {
      style += `height: ${step / 1}%;`;
    } else {
      style += `width: ${step / 1}%;`;
    }

    this.data.lineStyle = style;
    this.$update();
  },
});

module.exports = KLSteps;
