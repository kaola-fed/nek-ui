/**
 * ------------------------------------------------------------
 * JRCrumbItem     面包屑里的每一项
 * @author   zianecui@gmail.com
 * ------------------------------------------------------------
 */

const Component = require('../../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../../ui-base/_');
const JRCrumb = require('../index');

/**
 * @class JRCrumbItem
 * @extend Component
 * @param {object}          [options.data]                    = 绑定属性
 * @param {string}          [options.data.content]            => 内容模板
 * @param {string}          [options.data.class]              => 补充class
 * @param {string}          [options.data.href]                => 传入的链接
 */
const JRCrumbItem = Component.extend({
  name: 'jr-crumb-item',
  template,
  /**
     * @protected
     */
  config() {
    _.extend(this.data, {});
    this.supr();

    if (this.$outer && this.$outer instanceof JRCrumb) {
      this.$outer.data.crumbArr.push(this);
    }
  },
});

module.exports = JRCrumbItem;
