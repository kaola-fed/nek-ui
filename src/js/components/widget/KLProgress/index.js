/**
 * @file KLProgress  进度条
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../ui-base/_');

/**
 * @class KLProgress
 * @extend Component
 * @param {object}              [options.data]                    = 绑定属性
 * @param {string}              [options.data.class]              => 补充class
 * @param {number}              [options.data.percent=36]         => 百分比
 * @param {string}              [options.data.size=null]          => 进度条的尺寸, 可选值sm/lg
 * @param {boolean}             [options.data.visible=true]       => 是否显示
 * @param {boolean}             [options.data.insideText=true]    => 进度是否在进度条上显示,size=lg时才生效;
 * @param {string}             [options.data.color]               => 进度条的颜色
 */
const KLProgress = Component.extend({
  name: 'kl-progress',
  template,
  config() {
    _.extend(this.data, {
      percent: 36,
      size: '',
    });
    this.supr();
  },
});

module.exports = KLProgress;
