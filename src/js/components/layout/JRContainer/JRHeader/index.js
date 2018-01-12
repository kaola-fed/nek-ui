/**
 * ------------------------------------------------------------
 * JRHeader 布局容器头部
 * ------------------------------------------------------------
 */

const Component = require('../../../../ui-base/component');

/**
 * @class JRHeader
 * @extend Component
 * @param {object}          [options.data]                        => 绑定数据
 * @param {number}          [options.data.height=80]              => 头部高度
 * @param {string}          [options.data.class]                  => 补充样式
 */
const JRHeader = Component.extend({
  name: 'jr-header',
  template:
    '<header class={class} r-style={{height:height+"px","line-height":height+"px",padding: "0 20px","box-sizing": "border-box"}}>{#inc this.$body}</header>',
  config(data) {
    this.defaults({
      height: 80,
    });
    this.supr(data);
  },
});

module.exports = JRHeader;
