import ResizeObserver from 'resize-observer-polyfill';

export default (Component) => {
  Component.implement({
    addResizeListener(element, fn) {
      const callback = fn.bind(this);
      element.__ro__ = new ResizeObserver(() => {
        callback();
      });
      element.__ro__.observe(element);
    },
    removeResizeListener(element) {
      element.__ro__.disconnect();
    },
  });
};
