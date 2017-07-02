/**
 * ------------------------------------------------------------
 * KLPopConfirm 气泡弹框
 * @author   ziane(zianecui@gmail.com)
 * ------------------------------------------------------------
 */

const dom = require('regularjs').dom;

const Component = require('../../../ui-base/component');
const template = require('./index.html');
require('../../layout/alignment/trigger');

const PopUp = Component.extend({
  template,
  config(data) {
    this.defaults({
      isShow: true,
      content: '',
      contentTemplate: '',
    });
    this.supr(data);
  },
  init() {
    if (this.$root === this) {
      this.$inject(document.body);
    }
    this.data.element = dom.element(this);
    dom.on(this.data.element, 'click', (e) => {
      e.stopPropagation();
    });
  },
  getElement() {
    return this.data.element;
  },
  ok() {
    const $validation = this.$refs.validation;
    if (!$validation || $validation.validate().success) {
      /**
       * @event ok 确定时触发
       * @property {object} sender 事件发送对象
       * @property {object} data popConfirm组件的数据
       */
      this.$emit('ok', {
        sender: this,
        data: this.data,
      });
    }
  },
  cancel() {
    /**
     * @event cancel 取消时触发
     * @property {object} sender 事件发送对象
     * @property {object} data popConfirm组件的数据
     */
    this.$emit('cancel', {
      sender: this,
      data: this.data,
    });
  },
});

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
const KLPopConfirm = Component.extend({
  name: 'kl-pop-confirm',
  template:
    '<trigger ref="trigger" action="click" placement={placement} getInstance={@(this.getInstance.bind(this))} destroyOnHide=true hideWhenScroll={hideWhenScroll}>{#inc this.$body}</trigger>',
  config(data) {
    this.defaults({
      placement: 'top',
    });

    this.supr(data);
  },
  destroy() {
    if (this.data.instance) {
      this.data.instance.destroy();
    }
    this.supr();
  },
  getInstance() {
    const self = this;
    if (!this.data.instance) {
      const instance = new PopUp({ data: this.data });

      instance.$on('ok', (data) => {
        if (self.events && self.events.ok) {
          self.$emit('ok', data);
        } else {
          self.data.instance.destroy();
        }
      });

      instance.$on('cancel', (data) => {
        if (self.events && self.events.cancel) {
          self.$emit('cancel', data);
        } else {
          self.data.instance.destroy();
        }
      });

      instance.$on('destroy', () => {
        self.$refs.trigger.data.isShow = false;
        self.data.instance = null;
      });

      this.data.instance = instance;
    }
    return this.data.instance;
  },
});

module.exports = KLPopConfirm;
