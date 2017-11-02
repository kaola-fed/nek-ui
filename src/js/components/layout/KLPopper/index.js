const PopperJS = require('popper.js');
const Component = require('../../../ui-base/component');
const dom = require('regularjs').dom;
const PlacementObj = require('./placement');

const Popper = Component.extend({
  name: 'kl-popper',
  template: '{#inc this.$body}',
  config(data) {
    this.defaults({
      placement: 'bottom',
      reference: {},
      popper: {},
      appendToBody: true,
      currentPlacement: '',
    });

    this.supr(data);
  },
  init() {
    if (this.data.appendToBody === true) {
      this.createPopper();
    }
  },
  createPopper() {
    const that = this;
    const data = this.data;
    const popperElm = dom.element(this);
    const reference = data.reference;
    if (!reference) {
      return;
    }
    this.data.popperJS = new PopperJS(reference, popperElm, {
      gpuAcceleration: false,
      placement: PlacementObj.placement[data.placement],
      onUpdate(instance) {
        const realPlacement = instance.attributes['x-placement'];
        that.restPlacement(realPlacement);
      },
      onCreate(instance) {
        const realPlacement = instance.attributes['x-placement'];
        that.restPlacement(realPlacement);
      },
    });
  },
  restPlacement(realPlacement) {
    const data = this.data;
    if (realPlacement !== PlacementObj.placement[data.placement]) {
      data.placement = PlacementObj.xplacement[realPlacement];
    }
    this.$update();
  },
  destroy() {
    if (this.data.popperJS) {
      this.data.popperJS.destroy();
    }
    this.supr();
  },
  update() {
    if (this.data.popperJS) {
      this.data.popperJS.update();
    } else {
      this.createPopper();
    }
  },
});

module.exports = Popper;
