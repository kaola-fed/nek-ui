/* eslint-disable */
import Component from '../../../../../ui-base/component';
import _ from '../../../../../ui-base/_';
import template from './index.html';


import ClassesMixin from './mixins/classes.mixin';
import EventMixin from './mixins/event.mixin';


import {clearHours, isInRange} from '../../util';

import jsCalendar from 'js-calendar';

const prefixCls = 'ivu-date-picker-cells';
const weeks = {
    sun: '日',
    mon: '一',
    tue: '二',
    wed: '三',
    thu: '四',
    fri: '五',
    sat: '六',
};

const KLDateTable = Component.extend({
    name: 'kl-date-table',
    template,
    config() {
        _.extend(this.data, {
            tableDate: null,
            selectionMode: null,
            value: null,
            focusedDate: null,

            showWeekNumbers: false,
            rangeState: {
                from: null,
                to: null,
                selecting: false,
            },
            disabledDate: null,
            prefixCls,
        });
        this.supr();
    },
    init() {
        this.supr();

        this.calendar();
        this.headerDays();

        this.dates();
        this.cells();

        this.$watch('value', (newValue) => {
            console.log('value changed', newValue);
            this.dates();
            this.cells();
        });

        this.$watch('tableDate', (newValue) => {
            console.log('tableDate changed');
            this.dates();
            this.cells();
        });

        this.$watch('rangeState', (newValue) => {
            console.log('rangeState changed', newValue);
            this.dates();
            this.cells();
        });

        // 待优化？？ rangeState变了 没检测到？！
        this.$watch('rangeState.to', (newValue) => {
            console.log('rangeState.to changed', newValue);
            this.dates();
            this.cells();
        });
    },

    calendar() {
        // const weekStartDay = Number(this.t('i.datepicker.weekStartDay')); // ??
        const weekStartDay = Number(0);
        this.data.calendar = new jsCalendar.Generator({onlyDays: !this.data.showWeekNumbers, weekStart: weekStartDay});
        return new jsCalendar.Generator({onlyDays: !this.data.showWeekNumbers, weekStart: weekStartDay});
    },
    headerDays() {
        // const weekStartDay = Number(this.t('i.datepicker.weekStartDay')); // ??
        const weekStartDay = Number(0);
        const translatedDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map(item => weeks[item], // ??
        );
        const weekDays = translatedDays.splice(weekStartDay, 7 - weekStartDay).concat(translatedDays.splice(0, weekStartDay));
        this.data.headerDays = this.data.showWeekNumbers ? [''].concat(weekDays) : weekDays;
    },

    // 依赖的外部值：selectionMode, value, rangeState
    dates() {
        const {selectionMode, value, rangeState} = this.data;
        const rangeSelecting = selectionMode === 'range' && rangeState.selecting;
        this.data.dates = rangeSelecting ? [rangeState.from] : value;
        return rangeSelecting ? [rangeState.from] : value;
    },
    // 依赖的外部值：tableDate, dates, rangeState, selectionMode, disabledDate, showWeekNumbers
    cells() {
        const store = this.data;

        const tableYear = store.tableDate.getFullYear();
        const tableMonth = store.tableDate.getMonth();
        const today = clearHours(new Date());
        const selectedDays = store.dates.filter(Boolean).map(clearHours);
        const [minDay, maxDay] = store.dates.map(clearHours);
        const rangeStart = store.rangeState.from && clearHours(store.rangeState.from);
        const rangeEnd = store.rangeState.to && clearHours(store.rangeState.to);

        const isRange = store.selectionMode === 'range';
        const disabledTestFn = typeof store.disabledDate === 'function' && store.disabledDate;

        this.data.cells = this.data.calendar(tableYear, tableMonth, (cell) => {
            const time = cell.date && clearHours(cell.date);
            const dateIsInCurrentMonth = cell.date && tableMonth === cell.date.getMonth();
            return {
                ...cell,
                type: time === today ? 'today' : cell.type,
                selected: dateIsInCurrentMonth && selectedDays.includes(time),
                disabled: (cell.date && disabledTestFn) && disabledTestFn(new Date(time)),
                range: dateIsInCurrentMonth && isRange && isInRange(time, rangeStart, rangeEnd),
                start: dateIsInCurrentMonth && isRange && time === minDay,
                end: dateIsInCurrentMonth && isRange && time === maxDay,
            };
        }).cells.slice(store.showWeekNumbers ? 8 : 0);
    },
    // computed
})
    .use(ClassesMixin)
    .use(EventMixin);

module.exports = KLDateTable;
