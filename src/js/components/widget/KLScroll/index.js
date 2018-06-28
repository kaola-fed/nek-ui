/**
 * @file KLScroll  进度条
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

import KLScrollBar from './KLScrollBar';
import ResizeMixin from './resize';

const Component = require('../../../ui-base/component');
const template = require('./index.html');

/**
 * @class KLScroll
 * @extend Component
 * @param {object}              [options.data]                    = 绑定属性
 * @param {string}              [options.data.class]              => 补充class
 * @param {string}              [options.data.wrapClass]          => 补充wrap的class
 * @param {string}              [options.data.wrapMaxHeight]      => 滚动区域的最大高
 */
const KLScroll = Component.extend({
  name: 'kl-scroll',
  template,
  config() {
    this.defaults({
      class: '',
      wrapClass: '',
      wrapMaxHeight: '',
    });
    this.supr();
  },
  init() {
    this.addResizeListener(this.$refs.resize, this.update);

    this.$watch('wrapMaxHeight', () => {
      this.update();
    });

    this.$on('destroy', () => {
      this.removeResizeListener(this.$refs.resize);
    });

    setTimeout(() => {
      this.update();
    }, 100);
    this.supr();
  },
  onScroll() {
    const wrap = this.$refs.wrap;

    this.data.moveY = (wrap.scrollTop * 100) / wrap.clientHeight;
    this.data.moveX = (wrap.scrollLeft * 100) / wrap.clientWidth;
  },
  update() {
    const wrap = this.$refs.wrap;
    if (!wrap) return;

    const heightPercentage = (wrap.clientHeight * 100) / wrap.scrollHeight;
    const widthPercentage = (wrap.clientWidth * 100) / wrap.scrollWidth;

    this.data.sizeHeight = (heightPercentage < 100) ? (`${heightPercentage}%`) : '';
    this.data.sizeWidth = (widthPercentage < 100) ? (`${widthPercentage}%`) : '';
    this.$update();
  },

}).use(ResizeMixin).component('kl-scroll-bar', KLScrollBar);

module.exports = KLScroll;
