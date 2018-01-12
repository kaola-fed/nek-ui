/**
 * ------------------------------------------------------------
 * JRContainer 布局容器
 * ------------------------------------------------------------
 */

const Component = require('../../../ui-base/component');

/**
 * @class JRContainer
 * @extend Component
 * @param {object}          [options.data]                        => 绑定数据
 * @param {strgin}          [options.data.direction]              => flex布局的元素方式，默认为'column',还可选择'row'
 * @param {string}          [options.data.class]                  => 补充样式
 */

/**
 * @class JRHeader
 * @extend Component
 * @param {object}          [options.data]                        => 绑定数据
 * @param {number}          [options.data.height=80]              => 头部高度
 * @param {string}          [options.data.class]                  => 补充样式
 */

/**
 * @class JRFooter
 * @extend Component
 * @param {object}          [options.data]                        => 绑定数据
 * @param {number}          [options.data.height=80]              => 头部高度
 * @param {string}          [options.data.class]                  => 补充样式
 */

/**
 * @class JRASide
 * @extend Component
 * @param {object}          [options.data]                        => 绑定数据
 * @param {number}          [options.data.width=120]              => 宽度
 * @param {string}          [options.data.class]                  => 补充样式
 */
const JRContainer = Component.extend({
  name: 'jr-container',
  template:
    '<section class="{class}" r-style={{"flex-direction":direction,"flex":1,"display":"flex","box-sizing":"border-box"}}>{#inc this.$body}</section>',
  config(data) {
    this.defaults({
      direction: 'column',
    });
    if (['column', 'row'].indexOf(this.data.direction) === -1) {
      this.data.direction = 'column';
    }
    this.supr(data);
  },
});

module.exports = JRContainer;
