/**
 * @file KLSearch 筛选区
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../ui-base/_');

/**
 * @class KLSearch
 * @extend Component
 * @param {object}          [options.data]                       = 绑定属性
 * @param {string}          [options.data.class]                 => 补充class
 * @param {boolean}         [options.data.isShowFooter]          => 控制是否显示Footer
 * @param {boolean}         [options.data.isShowMore]            => 控制是否显示更多
 * @param {boolean}         [options.data.isShowToggle]          => 控制展示toggle文字，默认展示出来
 * @param {string}          [options.data.searchText]            => 设置展开的文案，默认“查询”
 * @param {string}          [options.data.resetText]             => 设置展开的文案，默认“重置”
 * @param {string}          [options.data.unfoldText]            => 设置展开的文案，默认“展开”
 * @param {string}          [options.data.foldText]              => 设置收起的文案，默认“收起”
 */
const KLSearch = Component.extend({
  name: 'kl-search',
  template,
  $more: null,

  config() {
    _.extend(this.data, {
      isShowMore: false,
      isShowFooter: true,
      isShowToggle: true,
      searchText: this.$trans('SEARCH'),
      resetText: this.$trans('RESET'),
      unfoldText: this.$trans('UNFOLD'),
      foldText: this.$trans('FOLD'),
      toggleText: this.$trans('UNFOLD'),
    });
    this.data.toggleText = this.data.isShowMore ? this.data.foldText : this.data.unfoldText;
    this.supr();
  },
  toggle() {
    const data = this.data;
    data.isShowMore = !data.isShowMore;
    data.toggleText = data.toggleText === data.unfoldText ? data.foldText : data.unfoldText;
  },
  /**
  * @event KLSearch#search 点击查询时触发
  */
  search() {
    this.$emit('search');
  },
  /**
  * @event KLSearch#reset 点击重置时触发
  */
  reset() {
    this.$emit('reset');
  },
});

module.exports = KLSearch;
