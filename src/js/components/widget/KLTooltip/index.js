/**
 * ------------------------------------------------------------
 * KLTooltip     提示
 * @author   ziane(zianecui@gmail.com)
 * ------------------------------------------------------------
 */

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
    this.data.element = dom.element(this);
  },
  getElement() {
    return this.data.element;
  },
});

/**
 * @class KLTooltip
 * @extend Component
 * @param {object}          [options.data]                  = 绑定属性
 * @param {string}          [options.data.tip]              => 文字提示
 * @param {string}          [options.data.placement=top]    => tips展示出的位置：top left right bottom topLeft topRight bottomLeft bottomRight leftTop leftBottom rightTop rightBottom
 */
const KLTooltip = Component.extend({
  name: 'kl-tooltip',
  template:
    '<trigger ref="trigger" placement={placement} getInstance={@(this.getInstance.bind(this))} destroyOnHide>{#inc this.$body}</trigger>',
  config(data) {
    this.defaults({
      tip: '',
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
    const { tip, placement } = this.data;
    if (!this.data.instance) {
      const instance = new TipPopUp({
        data: { tip, placement },
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

module.exports = KLTooltip;
