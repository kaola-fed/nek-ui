/**
 * @file KLSearch     筛选区
 * @author   wangsong3635@outlook.com
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../ui-base/_');

/**
 * @class KLSearch
 * @extend Component
 * @param {object}          [options.data]                       = 绑定属性
 * @param {string}          [options.data.class]                 => 补充class
 * @param {boolean}          [options.data.isShowMore]           => 控制是否显示更多
 * @param {boolean}          [options.data.isShowToggle]         => 控制展示toggle文字，默认展示出来
 * @param {string}          [options.data.showText]              => 设置展开的文案，默认“展开”
 * @param {string}          [options.data.hideText]              => 设置收起的文案，默认“收起”
 */
const KLSearch = Component.extend({
  name: 'kl-search',
  template,
  $more: null,
  $footer: null,
    /**
       * @protected
       */
  config() {
    _.extend(this.data, {
      isShowMore: false,
      isShowToggle: true,
      showText: '展开',
      hideText: '收起',
      toggleText: '',
    });
    this.data.toggleText = this.data.isShowMore ? this.data.hideText : this.data.showText;
    this.supr();
  },
  toggle() {
    const data = this.data;
    data.isShowMore = !data.isShowMore;
    data.toggleText = data.toggleText === data.showText ? data.hideText : data.showText;
  },
});

module.exports = KLSearch;
