/**
 * ------------------------------------------------------------
 * KLSearchFooter     筛选区的操作区域
 * @author   wangsong3635@outlook.com
 * ------------------------------------------------------------
 */

const Component = require('../../../../ui-base/component');
const _ = require('../../../../ui-base/_');
const KLSearch = require('../index');

/**
 * @class KLSearchFooter
 * @extend Component
 * @param {object}          [options.data]                    = 绑定属性
 * @param {string}          [options.data.class]              => 补充class
 */
const KLSearchFooter = Component.extend({
  name: 'kl-search-footer',
    /**
       * @protected
       */
  config() {
    _.extend(this.data, {});
    this.supr();

    if (this.$outer && this.$outer instanceof KLSearch) {
      this.$outer.$footer = this;
    }
  },
});

module.exports = KLSearchFooter;
