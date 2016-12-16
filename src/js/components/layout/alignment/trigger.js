/**
 * ------------------------------------------------------------
 * Trigger   trigger component 当被包裹target的action事件触发时,执行getInstance方法的show;
 * @author   ziane(zianecui@gmail.com)
 * ------------------------------------------------------------
 */

'use strict';

var dom = require('regularjs').dom;

var Component = require('../../../ui-base/component.js');
var _ = require('../../../ui-base/_.js');
var alignment = require('./alignment.js');

/**
 * @class Trigger
 * @extend Component
 * @param {object}                  options.data                     => 绑定数据
 * @param {string='click'}          options.data.action              => [click, focus, mouseEnter]中的一个
 * @param {function}                options.data.getInstance         => 获取浮层组件的方法
 * @param {string=''}               options.data.placement           => top left right bottom topLeft topRight bottomLeft bottomRight leftTop leftBottom rightTop rightBottom
 * @param {boolean=false}           options.data.destroyOnHide       => hide时是否destroy浮层
 */
var Trigger = Component.extend({
  name: 'trigger',
  template: '<alignment placement="{placement}" ref="alignment">{#inc this.$body}</alignment>',
  config: function (data) {
    this.defaults({
      action: 'mouseEnter',
      getInstance: function() {},
      placement: 'top',
      destroyOnHide: false
    });

    this.supr(data);
  },
  init: function() {
    var element = dom.element(this),
        action  = this.data.action;

    if (action == 'click') {
      dom.on(element, 'click', this.toggle.bind(this));
    }
    if (action == 'mouseEnter') {
      dom.on(element, 'mouseenter', function() { this.toggle(true); }.bind(this));
      dom.on(element, 'mouseleave', function() { this.toggle(false); }.bind(this));
    }
    if (action == 'focus') {
      dom.on(element, 'focus', function() { this.toggle(true); }.bind(this));
      dom.on(element, 'blur', function() { this.toggle(false); }.bind(this));
    }

    this.$watch('isShow', function(isShow) {
      this.updateInstance(isShow);
    });
  },
  updateInstance: function(isShow) {

    var instance = this.data.getInstance(),
        $align = this.$refs.alignment,
        destroyOnHide = this.data.destroyOnHide;

    if (instance != this.data.instance) {
      this.data.instance = instance;
      $align.reAlign(instance.getElement());
    }

    if (!isShow && destroyOnHide) {
      instance.destroy();
    } else {
      instance.toggle(isShow);
    }
  },
  toggle: function(e, isShow) {
    this.data.isShow = typeof isShow == 'undefined' ? !this.data.isShow : isShow;
    this.$update();
  }
});

module.exports = Trigger;
