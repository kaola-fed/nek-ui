/**
 * ------------------------------------------------------------
 * Tooltip     提示
 * @author   ziane(zianecui@gmail.com)
 * ------------------------------------------------------------
 */

'use strict';

var dom = require('regularjs').dom;

var Component = require("../../ui-base/component.js");
var template = require('./tooltip.html');
var _ = require('../../ui-base/_.js');
var trigger = require('../layout/alignment/trigger.js');

/**
 * @class Tooltip
 * @extend Component
 * @param {object}                  options.data                     =  绑定属性
 * @param {string=''}               options.data.tip                 => 文字提示
 * @param {string='top'}            options.data.placement           => tips展示出的位置：top left right bottom topLeft topRight bottomLeft bottomRight leftTop leftBottom rightTop rightBottom
 */
var Tooltip = Component.extend({
    name: 'tooltip',
    template: '<trigger placement={placement} getInstance={@(this.getInstance.bind(this))}>{#inc this.$body}</trigger>',
    config: function (data) {
        this.defaults({
          tip: '',
          placement: 'top'
        });

        this.supr(data);
    },
    getInstance: function() {
      var tip = this.data.tip,
          placement = this.data.placement;
      if (!this.data.instance) {
        this.data.instance = new TipPopUp({
          data: {tip: tip, placement: placement}
        });
      }
      return this.data.instance;
    }
});

var TipPopUp = Component.extend({
  template: template,
  config: function(data) {
    this.defaults({
      isShow: true
    });
    this.supr(data);
  },
  init: function() {
    if(this.$root == this){
      this.$inject(document.body);
    }
    this.data.element = dom.element(this);
  },
  getElement: function() { return this.data.element; },
  toggle: function(isShow) { this.$update('isShow', !!isShow); }
});

module.exports = Tooltip;
