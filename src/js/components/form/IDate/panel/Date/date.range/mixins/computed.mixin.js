export default (Component) => {
  Component.implement({
    computed: {
      isTime() {
        return this.data.currentView === 'time';
      },
      leftDatePanelView() {
        return this.data.leftPickerTable.split('-').shift();
      },
      rightDatePanelView() {
        return this.data.rightPickerTable.split('-').shift();
      },
      timeDisabled() {
        return !(this.data.dates[0] && this.data.dates[1]);
      },
    },
  });
};
