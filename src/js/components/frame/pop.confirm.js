/**
 * ------------------------------------------------------------
 * PopConfirm 轻量级的confirm弹框
 * @author   ziane(zianecui@gmail.com)
 * ------------------------------------------------------------
 */

'use strict';

var dom = require('regularjs').dom;

var Component = require("../../ui-base/component.js");
var template = require('./pop.confirm.html');
var _ = require('../../ui-base/_.js');
var trigger = require('../layout/alignment/trigger.js');

/**
 * @class PopConfirm
 * @extend Component
 * @param {object}                  options.data                     =  绑定属性
 * @param {string=''}               options.data.content             => 弹窗中的文本内容
 * @param {string=''}               options.data.contentTemplate     => 弹窗中的模板内容,回调中会将PopConfirm的data返回;
 * @param {string='top'}            options.data.placement           => tips展示出的位置：top left right bottom topLeft topRight bottomLeft bottomRight leftTop leftBottom rightTop rightBottom
 * @param {string='确定'}            options.data.okText              => ok按钮文案
 * @param {string='取消'}            options.data.cancelText          => 取消按钮文案
 */
var PopConfirm = Component.extend({
  name: 'pop.confirm',
  template: '<trigger action="click" placement={placement} getInstance={@(this.getInstance.bind(this))}>{#inc this.$body}</trigger>',
  config: function (data) {
    this.defaults({
      placement: 'top'
    });

    this.supr(data);
  },
  getInstance: function() {
    if (!this.data.instance) {
      this.data.instance = new PopUp({
        data: this.data
      });
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
  },
  getElement: function () {
    return this.data.element;
  },
  toggle: function (isShow) {
    this.$update('isShow', !!isShow);
  },
  ok: function () {
    /**
     * @event ok 确定时触发
     * @property {object} data popConfirm组件的数据
     */
    this.$emit('ok', this.data);
  },
  cancel: function () {
    /**
     * @event cancel 取消时触发
     * @property {object} sender 事件发送对象
     * @property {object} data popConfirm组件的数据
     */
    this.$emit('cancel', this.data);
  },
});

module.exports = PopConfirm;

