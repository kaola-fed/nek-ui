/**
 * ------------------------------------------------------------
 * JRMain 布局容器头部
 * ------------------------------------------------------------
 */

const Component = require('../../../../ui-base/component');

/**
 * @class JRMain
 * @extend Component
 * @param {object}          [options.data]                        => 绑定数据
 * @param {string}          [options.data.class]                  => 补充样式
 */
const JRMain = Component.extend({
  name: 'jr-main',
  template:
    '<main class={class} style="flex:1;padding:20px;box-sizing: border-box;">{#inc this.$body}</main>',
  config(data) {
    this.defaults({
    });
    this.supr(data);
  },
});

module.exports = JRMain;
