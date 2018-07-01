export default (Component) => {
  Component.implement({
    onToggleTime() {
      this.data.currentView = this.data.currentView === 'time' ? 'date' : 'time';
    },
    onPickSuccess() {
      this.resetView();
      this.$emit('on-pick-success');
    },
    onPickClear() {
      this.resetView();
      this.$emit('on-pick-clear');
    },
    resetView() {
      setTimeout(
                () => this.data.currentView = this.data.selectionMode,
                500, // 500ms so the dropdown can close before changing
            );
    },
  });
};
