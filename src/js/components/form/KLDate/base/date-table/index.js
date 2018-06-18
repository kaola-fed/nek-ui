
import Component from '../../../../../ui-base/component';
import _ from '../../../../../ui-base/_';
import { getWeekNumber, isDate } from '../../util';
import template from './index.html';

import InitRows from './mixins/init.rows';
import SetClass from './mixins/set.class';

/* istanbul ignore next */
function hasClass(el, cls) {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  }
  return (` ${el.className} `).indexOf(` ${cls} `) > -1;
}

const KLDatePickerPanel = Component.extend({
  name: 'date-table',
  template,
  config() {
    _.extend(this.data, {
      WEEKS: ['日', '一', '二', '三', '四', '五', '六'],
      current: '',
      firstDayOfWeek: 7,
      value: new Date(),
      defaultValue: {},
      date: new Date(),
      showWeekNumber: false,
      selectionMode: 'day',
      disabledDate: {},
      selectedDate: [],
      minDate: {},
      maxDate: {},
      rangeState: {
        endDate: null,
        selecting: false,
        row: null,
        column: null,
      },
      tableRows: [[], [], [], [], [], []],
    });
    this.supr();

    // this.data.year = this.data.date.getFullYear();
    // this.data.month = this.data.date.getMonth();
  },
  computed: {
    year(data) {
      return data.date.getFullYear();
    },
    month(data) {
      return data.date.getMonth();
    },
  },
  init() {
    this.supr();
    this.getRows(this.data.value);
  },
  isWeekActive(cell) {
    if (this.data.selectionMode !== 'week') return false;
    const newDate = new Date(this.data.year, this.data.month, 1);
    const year = newDate.getFullYear();
    const month = newDate.getMonth();

    if (cell.type === 'prev-month') {
      newDate.setMonth(month === 0 ? 11 : month - 1);
      newDate.setFullYear(month === 0 ? year - 1 : year);
    }

    if (cell.type === 'next-month') {
      newDate.setMonth(month === 11 ? 0 : month + 1);
      newDate.setFullYear(month === 11 ? year + 1 : year);
    }

    newDate.setDate(parseInt(cell.text, 10));

    const valueYear = isDate(this.data.value) ? this.data.value.getFullYear() : null;
    return year === valueYear && getWeekNumber(newDate) === getWeekNumber(this.data.value);
  },

  handleClick(event) {
    let target = event.target;
    if (target.tagName === 'SPAN') {
      target = target.parentNode.parentNode;
    }
    if (target.tagName === 'DIV') {
      target = target.parentNode;
    }
    if (target.tagName !== 'TD') return;
    if (hasClass(target, 'disabled') || hasClass(target, 'week')) return;

    // const selectionMode = this.data.selectionMode;

    // if (selectionMode === 'week') {
    //   target = target.parentNode.cells[1];
    // }

    const year = Number(this.data.year);
    const month = Number(this.data.month);

    const cellIndex = target.cellIndex;
    const rowIndex = target.parentNode.rowIndex;

    const cell = this.data.rows[rowIndex - 1][cellIndex];
    const text = cell.text;
    const className = target.className;
    const newDate = new Date(year, month, 1);

    if (className.indexOf('prev') !== -1) {
      if (month === 0) {
        this.data.month = 11;
        this.data.year = this.data.year - 1;
      } else {
        this.data.month = this.data.month - 1;
      }
      newDate.setMonth(this.data.month);
      newDate.setFullYear(this.data.year);
    } else if (className.indexOf('next') !== -1) {
      if (month === 11) {
        this.data.month = 0;
        this.data.year = this.data.year + 1;
      } else {
        this.data.month = this.data.month + 1;
      }
      newDate.setMonth(this.data.month);
      newDate.setFullYear(this.data.year);
    }

    newDate.setDate(parseInt(text, 10));

    this.data.value = newDate;
    this.getRows(newDate);
    this.$emit('pick', {
      value: newDate,
      year: this.data.year,
      month: this.data.month,
    });
  },
  handleMouseMove() {
    //
  },
})
  .use(InitRows)
  .use(SetClass);

module.exports = KLDatePickerPanel;
