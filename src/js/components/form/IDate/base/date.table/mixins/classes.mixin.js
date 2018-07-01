import { clearHours } from '../../../util';

const prefixCls = 'ivu-date-picker-cells';

export default (Component) => {
  Component.implement({
    getCellCls(cell) {
      const selectedCellCls = cell.selected || cell.start || cell.end ? `${prefixCls}-cell-selected` : '';
      const disabledCellCls = cell.disabled ? `${prefixCls}-cell-disabled` : '';
      const todayCellCls = cell.type === 'today' ? `${prefixCls}-cell-today` : '';
      const prevMonthCellCls = cell.type === 'prevMonth' ? `${prefixCls}-cell-prev-month` : '';
      const nextMonthCellCls = cell.type === 'nextMonth' ? `${prefixCls}-cell-next-month` : '';
      const weekLabelCellCls = cell.type === 'weekLabel' ? `${prefixCls}-cell-week-label` : '';
      const rangeCellCls = cell.range && !cell.start && !cell.end ? `${prefixCls}-cell-range` : '';
      const focusedCls = clearHours(cell.date) === clearHours(this.focusedDate) ? `${prefixCls}-focused` : '';

      return `${prefixCls}-cell ${selectedCellCls} ${disabledCellCls} ${todayCellCls} ${prevMonthCellCls} ${nextMonthCellCls} ${weekLabelCellCls} ${rangeCellCls} ${focusedCls}`;
    },
    getClasses() {
      let classes = '';
      if (this.data.showWeekNumbers) {
        classes = `${prefixCls}-show-week-numbers`;
      }

      return `${prefixCls} ${classes}`;
    },
  });
};
