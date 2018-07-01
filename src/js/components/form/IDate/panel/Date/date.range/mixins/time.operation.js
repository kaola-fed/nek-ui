const dateSorter = (a, b) => {
  if (!a || !b) return 0;
  return a.getTime() - b.getTime();
};

export default (Component) => {
  Component.implement({
    onRangePick(val, type) {
      if (this.data.rangeState.selecting || this.data.currentView === 'time') {
        if (this.data.currentView === 'time') {
          this.data.dates = val;
        } else {
          const [minDate, maxDate] = [this.data.rangeState.from, val].sort(dateSorter);
          this.data.dates = [minDate, maxDate];
          this.data.rangeState = {
            from: minDate,
            to: maxDate,
            selecting: false,
          };
        }
        this.handleConfirm(false, type || 'date');
      } else {
        this.data.rangeState = {
          from: val,
          to: null,
          selecting: true,
        };
      }
    },
  });
};
