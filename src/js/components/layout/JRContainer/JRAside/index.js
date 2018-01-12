/**
 * ------------------------------------------------------------
 * JRASide 布局容器头部
 * ------------------------------------------------------------
 */

const Component = require('../../../../ui-base/component');

/**
 * @class JRASide
 * @extend Component
 * @param {object}          [options.data]                        => 绑定数据
 * @param {number}          [options.data.width=120]              => 宽度
 * @param {string}          [options.data.class]                  => 补充样式
 */
const JRASide = Component.extend({
  name: 'jr-aside',
  template:
    '<aside class={class} r-style={{width:width+"px",padding:"20px","box-sizing": "border-box"}}>{#inc this.$body}</aside>',
  config(data) {
    this.defaults({
      width: 120,
    });
    this.supr(data);
  },
});

module.exports = JRASide;
