/**
/**
 * ------------------------------------------------------------
 * Alignment tooltip, popconfirm使用的定位
 * ------------------------------------------------------------
 */

'use strict';

var dom = require('regularjs').dom;
var domAlign = require('dom-align');

var Component = require('../../../ui-base/component');
var _ = require('../../../ui-base/_');
var placement = require('./placement');

/**
 * @class Alignment
 * @extend Component
 * @param {object}            [options.data]                        = 绑定属性
 * @param {string}            [options.data.placement=top]          => tips展示出的位置：top left right bottom topLeft topRight bottomLeft bottomRight leftTop leftBottom rightTop rightBottom
 */
var Alignment = Component.extend({
  name: 'alignment',
  template: '{#inc this.$body}',
  config: function (data) {
    this.defaults({
      placement: 'top'
    });

    this.supr(data);
  },
  init:function() {
    this.data.target = dom.element(this);
    var self = this;

    dom.on(window, 'resize', _.debounce(function() {
      self.reAlign();
    }, 50));
  },
  reAlign: function(src) {
    var target = this.data.target,
      src = src || this.data.src,
      align = placement[this.data.placement];

    if (src) { this.data.src = src; }
    if (!src || !target) { return; }

    if (src.style.display == 'none') { return; }
    
    domAlign(src, target, {
      points: align.points,
      offset: align.offset,
      targetOffset: align.targetOffset,
      overflow: align.overflow
    });
  }
});

module.exports = Alignment;
