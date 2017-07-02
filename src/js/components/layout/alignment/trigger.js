/**
 * ------------------------------------------------------------
 * Trigger   trigger component 当被包裹target的action事件触发时,执行getInstance方法的show;
 * @author   ziane(zianecui@gmail.com)
 * ------------------------------------------------------------
 */

const dom = require('regularjs').dom;

const Component = require('../../../ui-base/component');
const _ = require('../../../ui-base/_');
const alignment = require('./alignment');

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
const Trigger = Component.extend({
  name: 'trigger',
  template:
    '<alignment placement="{placement}" ref="alignment">{#inc this.$body}</alignment>',
  config(data) {
    this.defaults({
      action: 'mouseEnter',
      getInstance() {},
      placement: 'top',
      destroyOnHide: false,
      hideWhenScroll: false,
    });

    this.supr(data);
  },
  init() {
    const self = this;
    let element = dom.element(this),
      action = this.data.action;

    if (action == 'click') {
      dom.on(element, 'click', (e) => {
        self.toggle();
      });
      dom.on(document.body, 'click', (e) => {
        const target = e.target;
        if (!_.dom.contains(element, target) && self.data.isShow) {
          self.toggle(false);
        }
      });
    }
    if (action == 'mouseEnter') {
      dom.on(element, 'mouseenter', () => {
        self.toggle(true);
      });
      dom.on(element, 'mouseleave', () => {
        self.toggle(false);
      });
    }
    if (action == 'focus') {
      dom.on(element, 'focus', () => {
        self.toggle(true);
      });
      dom.on(element, 'blur', () => {
        self.toggle(false);
      });
    }

    window.addEventListener(
      'scroll',
      () => {
        const isShow = self.data.isShow;
        if (isShow && self.data.hideWhenScroll) {
          self.toggle(false);
        }
      },
      true,
    );
  },
  updateInstance(isShow) {
    let instance = this.data.getInstance(),
      element = instance.getElement(),
      $align = this.$refs.alignment,
      destroyOnHide = this.data.destroyOnHide;

    if (instance != this.data.instance) {
      this.data.instance = instance;

      // firefox浏览器会造成死循环, 本来这里加事件的原因是为了处理:pop.confirm中验证之后,高度变化造成对不齐的情况 ;
      // dom.on(element, 'DOMSubtreeModified', function() {
      //     $align.reAlign(element);
      // });
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
  toggle(isShow) {
    this.data.isShow =
      typeof isShow === 'undefined' ? !this.data.isShow : isShow;
    this.updateInstance(this.data.isShow);
    this.$update();
  },
});

module.exports = Trigger;
