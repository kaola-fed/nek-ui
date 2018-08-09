import { clearHours } from '../../../util';

export default (Component) => {
  Component.implement({
    handleClick(cell) {
      if (cell.disabled || cell.type === 'weekLabel') return;
      const newDate = new Date(clearHours(cell.date));

      this.$emit('pick', { value: newDate });
      this.$emit('pick-click');
    },
    handleMouseMove(cell) {
      if (!this.data.rangeState.selecting) return;
      if (cell.disabled) return;
      const newDate = cell.date;

      this.$emit('change-range', newDate);
    },
  });
};
