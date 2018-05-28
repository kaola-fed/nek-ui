/**
 * @file KLScrollBar  进度条
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

const dom = require('regularjs').dom;
const Component = require('../../../../ui-base/component');
const template = require('./index.html');

export const BAR_MAP = {
  vertical: {
    offset: 'offsetHeight',
    scroll: 'scrollTop',
    scrollSize: 'scrollHeight',
    size: 'height',
    axis: 'Y',
    client: 'clientY',
    direction: 'top',
  },
  horizontal: {
    offset: 'offsetWidth',
    scroll: 'scrollLeft',
    scrollSize: 'scrollWidth',
    size: 'width',
    axis: 'X',
    client: 'clientX',
    direction: 'left',
  },
};

/**
 * @class KLScrollBar
 * @extend Component
 * @param {object}              [options.data]                    = 绑定属性
 */
const KLScrollBar = Component.extend({
  name: 'kl-scroll-bar',
  template,
  config() {
    this.defaults({
      direction: 'vertical',
      size: '',
      move: '',
    });
    this.data.bar = BAR_MAP[this.data.direction];

    this.$on('destroy', () => {
      document.removeEventListener('mouseup', this.onMouseUpDocument);
    });

    this.onMouseMoveDocument = this.mouseMoveDocumentHandler.bind(this);
    this.onMouseUpDocument = this.mouseUpDocumentHandler.bind(this);

    this.supr();
  },
  clickTrackHandler(e) {
    const $el = dom.element(this);

    const { bar } = this.data;
    const wrap = this.$parent.$refs.wrap;

    const offset = Math.abs(e.target.getBoundingClientRect()[bar.direction] - e[bar.client]);
    const thumbHalf = (this.$refs.thumb[bar.offset] / 2);
    const thumbPositionPercentage = ((offset - thumbHalf) * 100) / $el[bar.offset];

    wrap[bar.scroll] = (thumbPositionPercentage * wrap[bar.scrollSize]) / 100;
  },
  clickThumbHandler(e) {
    const { bar } = this.data;

    this.startDrag(e);
    this.data[bar.axis] = (e.target[bar.offset] - (e.event[bar.client] - e.target.getBoundingClientRect()[bar.direction]));
  },
  startDrag(e) {
    e.stopImmediatePropagation();
    this.data.cursorDown = true;

    document.addEventListener('mousemove', this.onMouseMoveDocument);
    document.addEventListener('mouseup', this.onMouseUpDocument);

    document.onselectstart = () => false;
  },

  mouseMoveDocumentHandler(e) {
    const $el = dom.element(this);
    const { bar } = this.data;
    const wrap = this.$parent.$refs.wrap;

    if (this.data.cursorDown === false) return;
    const prevPage = this.data[bar.axis];

    if (!prevPage) return;

    const offset = ($el.getBoundingClientRect()[bar.direction] - e[bar.client]) * -1;
    const thumbClickPosition = this.$refs.thumb[bar.offset] - prevPage;
    const thumbPositionPercentage = ((offset - thumbClickPosition) * 100) / $el[bar.offset];

    wrap[bar.scroll] = (thumbPositionPercentage * wrap[bar.scrollSize]) / 100;
  },

  mouseUpDocumentHandler() {
    const { bar } = this.data;

    this.data.cursorDown = false;
    this.data[bar.axis] = 0;
    document.removeEventListener('mousemove', this.onMouseMoveDocument);
    document.onselectstart = null;
  },
});

KLScrollBar.directive('thumbStyle', function (ele) {
  this.$watch(['move', 'size'], function (move = 0, size = 0) {
    const { bar } = this.data;
    if (bar) {
      ele.style[bar.size] = size;
      ele.style.transform = `translate${bar.axis}(${move}%)`;
    }
  });
});

export default KLScrollBar;
