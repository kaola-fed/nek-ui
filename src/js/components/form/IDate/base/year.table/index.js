/* eslint-disable */
import Component from '../../../../../ui-base/component';
import _ from '../../../../../ui-base/_';
import template from './index.html';

import { deepCopy, clearHours } from '../../util';

const prefixCls = 'ivu-date-picker-cells';

const KLYearTable = Component.extend({
  name: 'kl-year-table',
  template,
  config() {
    _.extend(this.data, {
      tableDate: null,
      selectionMode: null,
      value: null,
      focusedDate: null,

      rangeState: {
        from: null,
        to: null,
        selecting: false,
      },
      disabledDate: null,
    });
    this.supr();
  },
  computed: {
    dates() {
      const { selectionMode, value, rangeState } = this.data;
      const rangeSelecting = selectionMode === 'range' && rangeState.selecting;
      return rangeSelecting ? [rangeState.from] : value;
    },
    classes() {
      return `${prefixCls} ${prefixCls}-year`;
    },
    startYear() {
      return Math.floor(this.data.tableDate.getFullYear() / 10) * 10;
    },
    cells() {
      const store = this.data;
      const cells = [];
      const cell_tmpl = {
        text: '',
        selected: false,
        disabled: false,
      };

      const selectedDays = store.dates.filter(Boolean).map(date => clearHours(new Date(date.getFullYear(), 0, 1)));
      const focusedDate = clearHours(new Date(store.focusedDate.getFullYear(), 0, 1));

      for (let i = 0; i < 10; i++) {
        const cell = deepCopy(cell_tmpl);
        cell.date = new Date(store.startYear + i, 0, 1);
        cell.disabled = typeof store.disabledDate === 'function' && store.disabledDate(cell.date) && store.selectionMode === 'year';
        const day = clearHours(cell.date);
        cell.selected = selectedDays.includes(day);
        cell.focused = day === focusedDate;
        cells.push(cell);
      }

      return cells;
    },
  },
  handleClick(cell) {
    if (cell.disabled || cell.type === 'weekLabel') return;
    const newDate = new Date(clearHours(cell.date));

    this.$emit('on-pick', newDate);
    this.$emit('on-pick-click');
  },
  handleMouseMove(cell) {
    if (!this.data.rangeState.selecting) return;
    if (cell.disabled) return;
    const newDate = cell.date;
    this.$emit('on-change-range', newDate);
  },
  getCellCls(cell) {
    const selectedCls = cell.selected ? `${prefixCls}-cell-selected` : '';
    const disabledCls = cell.disabled ? `${prefixCls}-cell-disabled` : '';
    const focusedCls = cell.focused ? `${prefixCls}-cell-focused` : '';
    const rangedCls = cell.range && !cell.start && !cell.end ? `${prefixCls}-cell-range` : '';

    return `${prefixCls}-cell ${selectedCls} ${disabledCls} ${focusedCls} ${rangedCls}`;
  },
});

module.exports = KLYearTable;
