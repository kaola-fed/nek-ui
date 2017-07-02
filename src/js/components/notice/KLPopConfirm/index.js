/**
 * ------------------------------------------------------------
 * KLPopConfirm 气泡弹框
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
 * @class KLPopConfirm
 * @extend Component
 * @param {object}        [options.data]                        = 绑定属性
 * @param {string}        [options.data.content]                => 弹窗中的文本内容
 * @param {string}        [options.data.contentTemplate]        => 弹窗中的模板内容,回调中会将PopConfirm的data返回;
 * @param {string}        [options.data.placement=top]          => tips展示出的位置：top left right bottom topLeft topRight bottomLeft bottomRight leftTop leftBottom rightTop rightBottom
 * @param {string}        [options.data.okText=确定]             => ok按钮文案
 * @param {string}        [options.data.cancelText=取消]         => 取消按钮文案
 * @param {boolean}       [options.data.hideWhenScroll=false]   => window滚动时,是否影藏popover
 */
var KLPopConfirm = Component.extend({
  name: 'kl-pop-confirm',
  template: '<trigger ref="trigger" action="click" placement={placement} getInstance={@(this.getInstance.bind(this))} destroyOnHide=true hideWhenScroll={hideWhenScroll}>{#inc this.$body}</trigger>',
  config: function (data) {
    this.defaults({
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
    if (!this.data.instance) {
      var instance = new PopUp({ data: this.data });

      instance.$on('ok', function(data) {
        if (this.events && this.events.ok) {
          this.$emit('ok', data);
        } else {
          this.data.instance.destroy();
        }

      }.bind(this));

      instance.$on('cancel', function(data) {
        if (this.events && this.events.cancel) {
          this.$emit('cancel', data);
        } else {
          this.data.instance.destroy();
        }
      }.bind(this));

      instance.$on('destroy', function() {
        this.$refs.trigger.data.isShow = false;
        this.data.instance = null;
      }.bind(this));

      this.data.instance = instance;
    }
    return this.data.instance;
  }
});

var PopUp = Component.extend({
  template: template,
  config: function (data) {
    this.defaults({
      isShow: true,
      content: '',
      contentTemplate: ''
    });
    this.supr(data);
  },
  init: function () {
    if (this.$root == this) {
      this.$inject(document.body);
    }
    this.data.element = dom.element(this);
    dom.on(this.data.element, 'click', function(e) { e.stopPropagation(); });
  },
  getElement: function () {
    return this.data.element;
  },
  ok: function () {
    var $validation = this.$refs.validation;
    if (!$validation || $validation.validate().success) {
      /**
       * @event ok 确定时触发
       * @property {object} sender 事件发送对象
       * @property {object} data popConfirm组件的数据
       */
      this.$emit('ok', {
        sender: this,
        data: this.data
      });
    }
  },
  cancel: function () {
    /**
     * @event cancel 取消时触发
     * @property {object} sender 事件发送对象
     * @property {object} data popConfirm组件的数据
     */
    this.$emit('cancel', {
      sender: this,
      data: this.data
    });
  },
});

module.exports = KLPopConfirm;

