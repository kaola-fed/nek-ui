/**
/**
 * ------------------------------------------------------------
 * Alignment tooltip, popconfirm使用的定位
 * ------------------------------------------------------------
 */

const dom = require('regularjs').dom;
const domAlign = require('dom-align').default;

const Component = require('../../../ui-base/component');
const _ = require('../../../ui-base/_');
const placement = require('./placement');

/**
 * @class Alignment
 * @extend Component
 * @param {object}            [options.data]                        = 绑定属性
 * @param {string}            [options.data.placement=top]          => tips展示出的位置：top left right bottom topLeft topRight bottomLeft bottomRight leftTop leftBottom rightTop rightBottom
 */
const Alignment = Component.extend({
  name: 'alignment',
  template: '{#inc this.$body}',
  config(data) {
    this.defaults({
      placement: 'top',
    });

    this.supr(data);
  },
  init() {
    this.data.target = dom.element(this);
    const self = this;

    dom.on(
      window,
      'resize',
      _.debounce(() => {
        self.reAlign();
      }, 50),
    );
  },
  reAlign(_src) {
    const target = this.data.target;
    const src = _src || this.data.src;
    const align = placement[this.data.placement];

    if (src) {
      this.data.src = src;
    }
    if (!src || !target) {
      return;
    }

    if (src.style.display === 'none') {
      return;
    }

    domAlign(src, target, {
      points: align.points,
      offset: align.offset,
      targetOffset: align.targetOffset,
      overflow: align.overflow,
    });
  },
});

module.exports = Alignment;
