/* eslint-disable */
import { clearHours } from '../../../utils/index';

const prefixCls = 'kl-newdate-picker-cells';

export default (Component) => {
  Component.implement({
    getCellCls(cell) {
      const selectedCellCls = cell.selected || cell.start || cell.end ? `${prefixCls}__cell--selected` : '';
      const disabledCellCls = cell.disabled ? `${prefixCls}__cell--disabled` : '';
      const todayCellCls = cell.type === 'today' ? `${prefixCls}__cell--today` : '';
      const prevMonthCellCls = cell.type === 'prevMonth' ? `${prefixCls}__cell--prev-month` : '';
      const nextMonthCellCls = cell.type === 'nextMonth' ? `${prefixCls}__cell--next-month` : '';
      const weekLabelCellCls = cell.type === 'weekLabel' ? `${prefixCls}__cell--week-label` : '';
      const rangeCellCls = cell.range && !cell.start && !cell.end ? `${prefixCls}__cell--range` : '';
      const focusedCls = clearHours(cell.date) === clearHours(this.data.focusedDate) ? `${prefixCls}__cell--focused` : '';

      return `${prefixCls}__cell ${selectedCellCls} ${disabledCellCls} ${todayCellCls} ${prevMonthCellCls} ${nextMonthCellCls} ${weekLabelCellCls} ${rangeCellCls} ${focusedCls}`;
    },
    getClasses() {
      let classes = '';
      if (this.data.showWeekNumbers) {
        classes = `${prefixCls}--show-week-numbers`;
      }

      return `${prefixCls} ${classes}`;
    },
  });
};
