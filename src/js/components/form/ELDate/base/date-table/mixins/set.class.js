export default (Component) => {
  Component.implement({
    cellMatchesDate(cell, date) {
      const value = new Date(date);
      return this.data.year === value.getFullYear() &&
        this.data.month === value.getMonth() &&
        Number(cell.text) === value.getDate();
    },
    getCellClasses(cell) {
      const selectionMode = this.data.selectionMode;

      let defaultValue;
      if (this.data.defaultValue) {
        if (Array.isArray(this.data.defaultValue)) {
          defaultValue = this.data.defaultValue;
        } else {
          defaultValue = [this.data.defaultValue];
        }
      } else {
        defaultValue = [];
      }

      const classes = [];
      if ((cell.type === 'normal' || cell.type === 'today') && !cell.disabled) {
        classes.push('available');
        if (cell.type === 'today') {
          classes.push('today');
        }
      } else {
        classes.push(cell.type);
      }

      if (cell.type === 'normal' && defaultValue.some(date => this.cellMatchesDate(cell, date))) {
        classes.push('default');
      }

      if (selectionMode === 'day' && (cell.type === 'normal' || cell.type === 'today') && this.cellMatchesDate(cell, this.data.value)) {
        classes.push('current');
      }

      if (cell.inRange && ((cell.type === 'normal' || cell.type === 'today') || this.selectionMode === 'week')) {
        classes.push('in-range');

        if (cell.start) {
          classes.push('start-date');
        }

        if (cell.end) {
          classes.push('end-date');
        }
      }

      if (cell.disabled) {
        classes.push('disabled');
      }

      if (cell.selected) {
        classes.push('selected');
      }
      return classes.join(' ');
    },
  });
};
