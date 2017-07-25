const dom = require('regularjs').dom;

Object.assign(dom, {
  getPosition(elem) {
    const doc = elem && elem.ownerDocument;
    const docElem = doc.documentElement;
    const body = doc.body;

    const box = elem.getBoundingClientRect
      ? elem.getBoundingClientRect()
      : { left: 0, top: 0 };

    const clientLeft = docElem.clientLeft || body.clientLeft || 0;
    const clientTop = docElem.clientTop || body.clientTop || 0;

    return { left: box.left - clientLeft, top: box.top - clientTop };
  },
  getSize(elem, mode = 'outside') {
    if (mode === 'inside') { return { width: elem.clientWidth, height: elem.clientHeight }; } else if (mode === 'center') {
 return {
        width: (elem.clientWidth + elem.offsetWidth) / 2,
        height: (elem.offsetHeight + elem.clientHeight) / 2,
      };
} else if (mode === 'outside') { return { width: elem.offsetWidth, height: elem.offsetHeight }; }
  },
  getDimension(elem, mode) {
    return Object.assign(this.getSize(elem, mode), this.getPosition(elem));
  },
  isInRect(position, dimension) {
    if (!position || !dimension) return false;

    return (
      position.left > dimension.left &&
      position.left < dimension.left + dimension.width &&
      position.top > dimension.top &&
      position.top < dimension.top + dimension.height
    );
  },
  getComputedStyle(elem, property) {
    const computedStyle =
      elem.currentStyle || window.getComputedStyle(elem, null);
    return property ? computedStyle[property] : computedStyle;
  },
});

export default dom;
