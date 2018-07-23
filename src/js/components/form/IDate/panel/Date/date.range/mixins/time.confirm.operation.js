export default (Component) => {
  Component.implement({
    onToggleTime() {
      this.data.currentView = this.data.currentView === 'time' ? 'date' : 'time';
    },
    onPickSuccess() {
      this.resetView();
      this.$emit('pick-success');
    },
  });
};
