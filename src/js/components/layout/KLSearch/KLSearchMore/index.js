/**
 * ------------------------------------------------------------
 * KLSearchMore     筛选区的更多区域
 * @author   wangsong3635@outlook.com
 * ------------------------------------------------------------
 */

const Component = require('../../../../ui-base/component');
const _ = require('../../../../ui-base/_');
const KLSearch = require('../index');

/**
 * @class KLSearchMore
 * @extend Component
 * @param {object}          [options.data]                    = 绑定属性
 * @param {string}          [options.data.class]              => 补充class
 */
const KLSearchMore = Component.extend({
  name: 'kl-search-more',
    /**
       * @protected
       */
  config() {
    _.extend(this.data, {});
    this.supr();

    if (this.$outer && this.$outer instanceof KLSearch) {
      this.$outer.$more = this;
    }
  },
});

module.exports = KLSearchMore;
