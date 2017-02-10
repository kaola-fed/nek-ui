/**
 * ------------------------------------------------------------
 * Trigger   trigger component 当被包裹target的action事件触发时,执行getInstance方法的show;
 * @author   ziane(zianecui@gmail.com)
 * ------------------------------------------------------------
 */

'use strict';

var dom = require('regularjs').dom;

var Component = require('../../../ui-base/component');
var _ = require('../../../ui-base/_');
var alignment = require('./alignment');

/**
 * @class Trigger
 * @extend Component
 * @param {object}          [options.data]                        => 绑定数据
 * @param {string}          [options.data.action=click]           => [click, focus, mouseEnter]中的一个
 * @param {function}        [options.data.getInstance]            => 获取浮层组件的方法
 * @param {string}          [options.data.placement]              => top left right bottom topLeft topRight bottomLeft bottomRight leftTop leftBottom rightTop rightBottom
 * @param {boolean}         [options.data.destroyOnHide=false]    => hide时是否destroy浮层
 * @param {boolean}         [options.data.hideWhenScroll=false]   => 页面滚动时, 是否去除popover;
 */
var Trigger = Component.extend({
  name: 'trigger',
  template: '<alignment placement="{placement}" ref="alignment">{#inc this.$body}</alignment>',
  config: function (data) {
    this.defaults({
      action: 'mouseEnter',
      getInstance: function() {},
      placement: 'top',
      destroyOnHide: false,
      hideWhenScroll: false
    });

    this.supr(data);
  },
  init: function() {
    var element = dom.element(this),
        action  = this.data.action;

    if (action == 'click') {
      dom.on(element, 'click', function(e) { this.toggle(); }.bind(this));
      dom.on(document.body, 'click', function(e) {
        var target = e.target;
        if (!_.dom.contains(element, target) && this.data.isShow) {
          this.toggle(false);
        }
      }.bind(this));
    }
    if (action == 'mouseEnter') {
      dom.on(element, 'mouseenter', function() { this.toggle(true); }.bind(this));
      dom.on(element, 'mouseleave', function() { this.toggle(false); }.bind(this));
    }
    if (action == 'focus') {
      dom.on(element, 'focus', function() { this.toggle(true); }.bind(this));
      dom.on(element, 'blur', function() { this.toggle(false); }.bind(this));
    }

    window.addEventListener('scroll', function() {
      var isShow = this.data.isShow;
      if (isShow && this.data.hideWhenScroll) {
        this.toggle(false);
      }
    }.bind(this), true);
  },
  updateInstance: function(isShow) {

    var instance = this.data.getInstance(),
        element = instance.getElement(),
        $align = this.$refs.alignment,
        destroyOnHide = this.data.destroyOnHide;

    if (instance != this.data.instance) {
      this.data.instance = instance;

      dom.on(element, 'DOMSubtreeModified', function() {
          $align.reAlign(element);
      });
    }

    if (!isShow && destroyOnHide) {
      instance.destroy();
    } else {
      instance.toggle && instance.toggle(isShow);
      if (isShow) {
        $align.reAlign(element);
      }
    }
  },
  toggle: function(isShow) {
    this.data.isShow = typeof isShow == 'undefined' ? !this.data.isShow : isShow;
    this.updateInstance(this.data.isShow);
    this.$update();
  }
});

module.exports = Trigger;
