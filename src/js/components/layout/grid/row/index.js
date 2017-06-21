/**
 * ------------------------------------------------------------
 * Row 栅格布局-行
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../../../../ui-base/component');
var _ = require('../../../../ui-base/_');
var template = require('./index.html');

/**
 * @class Row
 * @extend Component
 * @param {object}          [options.data]                        => 绑定数据
 * @param {string}          [options.data.class]                  => 补充class
 * @param {string}          [options.data.type='']              => 布局模式，可选 flex，现代浏览器下有效
 * @param {string}          [options.data.justify='start']      => flex 布局下的水平排列方式
 * @param {string}          [options.data.align='top']          => flex 布局下的垂直排列方式
 * @param {string}          [options.data.wrap='wrap']          => flex布局下的换行显示方式,wrap/nowrap/wrap-reverse
 * @param {number}          [options.data.gutter='0']           => 栅格间隔
 */
var Row = Component.extend({
  name: 'ui.row',
  template: template,
  config: function (data) {
    this.defaults({
      type: '',
      justify: 'start',
      align: 'top',
      gutter: 0,
      wrap: 'wrap',
    });

    this.supr(data);
  },
});

Row.directive('gutter', function(ele, value) {
  this.$watch(value, function(gutter) {
    if (gutter) {
      var margin = '-' + (gutter/2) + 'px';
      ele.style.marginLeft = margin;
      ele.style.marginRight = margin;
    }
  })
});

module.exports = Row;
