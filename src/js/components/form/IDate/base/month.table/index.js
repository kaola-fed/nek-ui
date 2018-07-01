/* eslint-disable */
import Component from '../../../../../ui-base/component';
import _ from '../../../../../ui-base/_';
import template from './index.html';

import { deepCopy, clearHours } from '../../util';

import jsCalendar from 'js-calendar';

const prefixCls = 'ivu-date-picker-cells';
const MONTHS = {
  m1: '1月',
  m2: '2月',
  m3: '3月',
  m4: '4月',
  m5: '5月',
  m6: '6月',
  m7: '7月',
  m8: '8月',
  m9: '9月',
  m10: '10月',
  m11: '11月',
  m12: '12月',
};

const KLMonthTable = Component.extend({
  name: 'kl-month-table',
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
      return `${prefixCls} ${prefixCls}-month`;
    },
    cells() {
      const store = this.data;

      const cells = [];
      const cell_tmpl = {
        text: '',
        selected: false,
        disabled: false,
      };

      const tableYear = store.tableDate.getFullYear();
      const selectedDays = store.dates.filter(Boolean).map(date => clearHours(new Date(date.getFullYear(), date.getMonth(), 1)));
      const focusedDate = clearHours(new Date(store.focusedDate.getFullYear(), store.focusedDate.getMonth(), 1));

      for (let i = 0; i < 12; i++) {
        const cell = deepCopy(cell_tmpl);
        cell.date = new Date(tableYear, i, 1);
        cell.text = this.tCell(i + 1);
        const day = clearHours(cell.date);
        cell.disabled = typeof store.disabledDate === 'function' && store.disabledDate(cell.date) && store.selectionMode === 'month';
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
  tCell(nr) {
    return MONTHS[`m${nr}`];
  },
});

module.exports = KLMonthTable;
