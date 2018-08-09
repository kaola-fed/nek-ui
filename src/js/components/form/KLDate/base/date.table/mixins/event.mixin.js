/* eslint-disable */
import { clearHours } from '../../../utils/index';

export default (Component) => {
  Component.implement({
    onClick(cell) {
      if (cell.disabled || cell.type === 'weekLabel') return;
      const newDate = new Date(clearHours(cell.date));

      this.$emit('pick', { value: newDate });
      this.$emit('pick-click');
    },
    onMouseMove(cell) {
      if (!this.data.rangeState.selecting) return;
      if (cell.disabled) return;
      const newDate = cell.date;
      this.$emit('change-range', newDate);
    },
  });
};
