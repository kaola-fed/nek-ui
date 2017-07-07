/**
 * ------------------------------------------------------------
 * JRCard     卡片
 * @author   zianecui@gmail.com
 * ------------------------------------------------------------
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../ui-base/_');

/**
 * @class JRCard
 * @extend Component
 * @param {object}          [options.data]                        = 绑定属性
 * @param {string}          [options.data.class]                  => 补充class
 * @param {boolean}          [options.data.isShowLine]            => 控制展示title之前的竖线，默认展示出来
 * @param {boolean}          [options.data.isShowBtLine]          => 控制展示title下发的横线，默认不展示出来
 * @param {boolean}          [options.data.isIndent]              => 控制子模块的title是否缩进
 */
const JRCard = Component.extend({
  name: 'jr-card',
  template,
  $tools: null,
  /**
     * @protected
     */
  config() {
    _.extend(this.data, {
      title: '',
      isShowLine: true,
      isShowBtLine: false,
      isIndent: true,
    });
    this.supr();
  },
});

module.exports = JRCard;
