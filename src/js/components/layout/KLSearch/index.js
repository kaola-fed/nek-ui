/**
 * ------------------------------------------------------------
 * KLSearch     筛选区
 * ------------------------------------------------------------
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../ui-base/_');

/**
 * @class KLSearch
 * @extend Component
 * @param {object}          [options.data]                       = 绑定属性
 * @param {string}          [options.data.class]                 => 补充class
 * @param {boolean}         [options.data.isShowFooter]         => 控制是否显示Footer
 * @param {boolean}         [options.data.isShowMore]           => 控制是否显示更多
 * @param {boolean}         [options.data.isShowToggle]         => 控制展示toggle文字，默认展示出来
 * @param {string}          [options.data.queryText]              => 设置展开的文案，默认“查询”
 * @param {string}          [options.data.resetText]              => 设置展开的文案，默认“重置”
 * @param {string}          [options.data.showText]              => 设置展开的文案，默认“展开”
 * @param {string}          [options.data.hideText]              => 设置收起的文案，默认“收起”
 */
const KLSearch = Component.extend({
  name: 'kl-search',
  template,
  $more: null,
    /**
       * @protected
       */
  config() {
    _.extend(this.data, {
      isShowMore: false,
      isShowFooter: true,
      isShowToggle: true,
      queryText: this.$trans('QUERY'),
      resetText: this.$trans('RESET'),
      showText: this.$trans('UNFOLD'),
      hideText: this.$trans('PACK_UP'),
      toggleText: this.$trans('UNFOLD'),
    });
    this.supr();
  },
  toggle() {
    const data = this.data;
    data.isShowMore = !data.isShowMore;
    data.toggleText = data.toggleText === data.showText ? data.hideText : data.showText;
  },
  query() {
    this.$emit('query');
  },
  reset() {
    this.$emit('reset');
  },
});

module.exports = KLSearch;
