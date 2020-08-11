import Popper from 'popper.js';
import Component from '../../../ui-base/component';
import _ from '../../../ui-base/_';

const PopperComponent = Component.extend({
  name: 'kl-popper',
  template: `
    <div class="{class} {isShow ? 'fadeIn' : 'fadeOut'}"
      r-hide={!isShow}
      ref="popper"
      v-clickoutside="onClose">
      {#inc this.$body}
    </div>
    `,
  config(data) {
    this.defaults({
      referenceElm: null,
      popperJS: null,
      showPopper: false,
      currentPlacement: '',
      reference: {},
      appendToBody: false,
      placement: 'bottom',
      isShow: false,
    });

    this.supr(data);

    this.$watch('isShow', (newVal) => {
      const index = PopperComponent.opens.indexOf(this);
      if (newVal) {
        this.$emit('show');
        if (index < 0) {
          PopperComponent.opens.push(this);
        }
        this.updatePopper();
      } else {
        this.$emit('hide');
        if (index >= 0) {
          PopperComponent.opens.splice(index, 1);
          this.destroyPopper();
        }
      }
    });
  },
  init() {

  },
  destroyPopper() {
    // todo: 待优化（这种方式感觉不是很好）
    if (document.body.contains(this.$el)) {
      this.$el && document.body.removeChild(this.$el);
    }
    this.data.popperJS && this.data.popperJS.destroy();
    this.data.popperJS = null;
  },
  updatePopper() {
    if (!this.data.popperJS) {
      let boundariesElement = 'scrollParent';
      if (this.data.appendToBody === true) {
        document.body.appendChild(this.$refs.popper);
        const referenceWidth = window.getComputedStyle(this.data.reference).width;
        this.$refs.popper.style.width = referenceWidth;
        boundariesElement = 'window';
      }
      this.data.popperJS = new Popper(this.data.reference, this.$refs.popper, {
        placement: this.data.placement,
        modifiers: {
          preventOverflow: {
            enabled: true,
            boundariesElement,
          },
          hide: {},
        },
        onCreate() {},
        onUpdate: () => {
          if (!this.$refs || !this.$refs.popper) return;
          if (this.$refs.popper.attributes['x-out-of-boundaries']) {
            this.data.isShow = false;
            this.$update();
          }
        },
      });
    }
    this.data.popperJS.update();
  },
  onClose() {
    if (this.data.isShow === true) {
      this.data.isShow = false;
    }
  },
  destroy() {
    const index = PopperComponent.opens.indexOf(this);
    index >= 0 && PopperComponent.opens.splice(index, 1);
    this.supr();
  },
});


PopperComponent.opens = [];

_.dom.on(document, 'click', (e) => {
  const opens = PopperComponent.opens.map(d => d);
  opens.forEach((popperNode) => {
    // 这个地方不能用stopPropagation来处理，因为展开一个popperNode的同时要收起其他popperNode
    const element = popperNode.$refs.popper;
    const referenceNode = popperNode.data.reference;
    // let clickedElem = e.target;
    if (referenceNode.contains(e.target) || element.contains(e.target)) {
      return false;
    }
    // while (clickedElem) {
    //   if (element === clickedElem || referenceNode === clickedElem) return;
    //   clickedElem = clickedElem.parentElement;
    // }
    // popperNode.toggle(false);
    popperNode.data.isShow = false;
    popperNode.$update();
  });
});


module.exports = PopperComponent;
