/**
 * ------------------------------------------------------------
 * @file KLGrid 基于canvas的展示表格
 * ------------------------------------------------------------
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');

const ScrollBarMixin = require('./mixins/scrollbar');

/**
 * @class KLGrid
 * @extend Component
 * @param {object}          [options.data]                        = 绑定属性
 * @param {string}          [options.data.class]                  => 补充class
 */
const KLGrid = Component.extend({
  name: 'kl-grid',
  template,
  config() {
    this.defaults({
      width: 0,
    });
    this.supr();
  },
});

KLGrid.use(ScrollBarMixin);

module.exports = KLGrid;
