/**
/**
 * ------------------------------------------------------------
 * Alignment tooltip, popconfirm使用的定位
 * ------------------------------------------------------------
 */

'use strict';

var dom = require('regularjs').dom;
var domAlign = require('dom-align');

var Component = require('../../../ui-base/component.js');
var _ = require('../../../ui-base/_.js');
var placement = require('./placement.js');

/**
 * @class Alignment
 * @extend Component
 * @param {object}                  options.data                     =  绑
 * @param {string='top'}            options.data.placement           => tips展示出的位置：top left right bottom topLeft topRight bottomLeft bottomRight leftTop leftBottom rightTop rightBottom
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

    dom.on(window, 'resize', _.debounce(function() {
      this.reAlign();
    }.bind(this), 50));
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
      targetOffset: align.targetOffset
    });
  }
});

module.exports = Alignment;
