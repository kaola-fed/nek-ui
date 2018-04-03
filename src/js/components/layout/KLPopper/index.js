const PopperJS = require('popper.js');
const Component = require('../../../ui-base/component');
const dom = require('regularjs').dom;
const PlacementObj = require('./placement');

const Popper = Component.extend({
  name: 'kl-popper',
  template: '<div ref="popper" r-animation="on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;">{#inc this.$body}</div>',
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
    this.$watch('reference', () => {
      this.createPopper();
    });
  },
  createPopper() {
    const that = this;
    const data = this.data;
    const popperElm = dom.element(this);
    const reference = data.reference;
    if (!reference) {
      return;
    }
    const referenceNodeStyles = document.defaultView.getComputedStyle(reference);
    this.data.width = `${referenceNodeStyles.width}px`;
    console.log(this.data.width);
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
  updatePopper() {
    if (!this.data.popperJS && this.data.appendToBody === true) {
      console.log(this.$refs.popper);
      // document.body.appendChild(this.$refs.popper);
      // const that = this;
      // const popperElm = dom.element(this);
      // this.$inject(document.body);
      // this.data.popperJS = new Popper(this.data.reference, popperElm, {
      //   placement: this.data.placement,
      //   modifiers: {
      //     preventOverflow: {
      //       enabled: true,
      //     },
      //     hide: {
      //       ModifierFn(data, options) {
      //         console.log(123);
      //       },
      //     },
      //   },
      //   onUpdate: () => {
      //     if (this.$refs.popper.attributes['x-out-of-boundaries']) {
      //       // this.$emit('update:isShow', false);
      //     }
      //   },
      // });
    }
    // this.data.popperJS.update();
  },
  onClose() {
    if (this.isShow === true) {
      this.$emit('update:isShow', false);
    }
  },
  restPlacement(realPlacement) {
    const data = this.data;
    if (realPlacement !== PlacementObj.placement[data.placement]) {
      data.placement = PlacementObj.xplacement[realPlacement];
    }
    this.$update();
  },
  destroyPopper() {
    if (document.body.contains(this.$el)) {
      this.$el && document.body.removeChild(this.$el);
    }
    this.popperJS && this.popperJS.destroy();
    this.popperJS = null;
  },
  destroy() {
    this.destroyPopper();
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
