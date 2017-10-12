/**
 * @file KLTooltip     提示
 * @author   ziane(zianecui@gmail.com)
 * ------------------------------------------------------------
 */

/* eslint no-unused-vars: 0 */
const Popper = require('../../layout/KLPopper/index.js');
const dom = require('regularjs').dom;

const Component = require('../../../ui-base/component');
const template = require('./index.html');
require('../../layout/alignment/trigger');

const TipPopUp = Component.extend({
  template,
  config(data) {
    this.defaults({
      isShow: true,
    });
    this.supr(data);
  },
  init() {
    if (this.$root === this) {
      this.$inject(document.body);
    }
  },

});

/**
 * @class KLTooltip
 * @extend Component
 * @param {object}          [options.data]                  = 绑定属性
 * @param {string}          [options.data.tip]              => 文字提示
 * @param {string}          [options.data.class]              => 增加class
 * @param {string}          [options.data.placement=top]    => tips展示出的位置：top left right bottom topLeft topRight bottomLeft bottomRight leftTop leftBottom rightTop rightBottom
 */
const KLTooltip = Component.extend({
  name: 'kl-tooltip',
  template:
    '{#inc this.$body}',
  config(data) {
    this.defaults({
      tip: '',
      placement: 'top',
    });

    this.supr(data);
  },
  init() {
    const self = this;
    const element = dom.element(this);
    dom.on(element, 'mouseenter', () => {
      self.onMouseEnter();
    });
    dom.on(element, 'mouseleave', () => {
      self.onMouseLeave();
    });
  },
  onMouseEnter() {
    this.getInstance();
  },
  onMouseLeave() {
    if (this.data.instance) {
      this.data.instance.destroy();
    }
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
      const instance = new TipPopUp({
        data: {
          tip: self.data.tip,
          placement: self.data.placement,
          reference: dom.element(this),
        },
      });

      instance.$on('destroy', () => {
        self.data.instance = null;
      });

      this.data.instance = instance;
    }
    return this.data.instance;
  },
});


module.exports = KLTooltip;
