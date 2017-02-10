/**
 * ------------------------------------------------------------
 * Tooltip     提示
 * @author   ziane(zianecui@gmail.com)
 * ------------------------------------------------------------
 */

'use strict';

var dom = require('regularjs').dom;

var Component = require("../../../ui-base/component");
var template = require('./index.html');
var _ = require('../../../ui-base/_');
var trigger = require('../../layout/alignment/trigger');

/**
 * @class Tooltip
 * @extend Component
 * @param {object}          [options.data]                  = 绑定属性
 * @param {string}          [options.data.tip]              => 文字提示
 * @param {string}          [options.data.placement=top]    => tips展示出的位置：top left right bottom topLeft topRight bottomLeft bottomRight leftTop leftBottom rightTop rightBottom
 */
var Tooltip = Component.extend({
    name: 'tooltip',
    template: '<trigger ref="trigger" placement={placement} getInstance={@(this.getInstance.bind(this))} destroyOnHide>{#inc this.$body}</trigger>',
    config: function (data) {
        this.defaults({
          tip: '',
          placement: 'top'
        });

        this.supr(data);
    },
    destroy: function() {
        if (this.data.instance) {
            this.data.instance.destroy();
        }
        this.supr();
    },
    getInstance: function() {
      var tip = this.data.tip,
          placement = this.data.placement;
      if (!this.data.instance) {
        var instance = new TipPopUp({
          data: {tip: tip, placement: placement}
        });

        instance.$on('destroy', function() {
          this.$refs.trigger.data.isShow = false;
          this.data.instance = null;
        }.bind(this));

        this.data.instance = instance;
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
  getElement: function() { return this.data.element; }
});

module.exports = Tooltip;
