/**
 * ------------------------------------------------------------
 * JRProgress  进度条
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../ui-base/_');

/**
 * @class JRProgress
 * @extend Component
 * @param {object}              [options.data]                    = 绑定属性
 * @param {number}              [options.data.percent=36]         => 百分比
 * @param {string|boolean}      [options.data.text=true]          => 在进度条中是否显示百分比。值为`string`时显示该段文字。
 * @param {string}              [options.data.size=null]          => 进度条的尺寸
 * @param {string}              [options.data.state=null]         => 进度条的状态
 * @param {boolean}             [options.data.striped=false]      => 是否显示条纹
 * @param {number}              [options.data.width]              => 组件宽度
 * @param {number}              [options.data.height]             => 组件高度
 * @param {boolean}             [options.data.active=false]       => 进度条是否为激活状态，当`striped`为`true`时，进度条显示动画
 * @param {boolean}             [options.data.visible=true]       => 是否显示
 * @param {string}              [options.data.class]              => 补充class
 */
const JRProgress = Component.extend({
  name: 'jr-progress',
  template,
  /**
     * @protected
     */
  config() {
    _.extend(this.data, {
      percent: 36,
      text: true,
      size: null,
      state: null,
      striped: false,
      active: false,
    });
    this.supr();
  },
});

module.exports = JRProgress;
