module.exports = Component => Component.implement({
  initScrollBar() {
    this.defaults({
      scrollerWidth: 20,
      hscrollBar: {
        x: 0,
        size: 0,
        moving: false,
        cursorX: 0,
        speed: 1,
      },
      vscrollBar: {
        y: 0,
        size: 0,
        moving: false,
        cursorY: 0,
        speed: 1,
      },
    });

    this.$on('scroll', () => {
      this.hscrollBar.x = -parseInt(this.offset.x * this.hscrollBar.speed, 10);
      this.vscrollBar.y = -parseInt(this.offset.y * this.vscrollBar.speed, 10);
    });
  },
});
