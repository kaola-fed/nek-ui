/* eslint-disable */
import Component from '../../../../../ui-base/component';
import template from './index.html';

import ClassesMixin from './mixins/classes.mixin';
import EventMixin from './mixins/event.mixin';

import {clearHours, isInRange} from '../../utils/index';

import jsCalendar from 'js-calendar';

const prefixCls = 'kl-newdate-picker-cells';
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
        this.defaults({
            tableDate: null,
            selectionMode: null,
            value: null,
            rangeState: {
                from: null,
                to: null,
                selecting: false,
            },
            focusedDate: null,

            showWeekNumbers: false,
            disabledDate: null,
            prefixCls,
        });
        this.supr();
    },
    init() {
        this.supr();

        this.getCalendar();
        this.getHeaderDays();

        this.getDates();
        this.getCells();

        this.$watch('value', (newValue) => {
            this.getDates();
            this.getCells();
        });

        this.$watch('tableDate', (newValue) => {
            this.getDates();
            this.getCells();
        });

        this.$watch('rangeState', (newValue) => {
            this.getDates();
            this.getCells();
        });

        // 待优化？？ rangeState变了 没检测到？！
        this.$watch('rangeState.to', (newValue) => {
            this.getDates();
            this.getCells();
        });
    },

    /**
     * calendar： function，日期面板获取方法
     */
    getCalendar() {
        const weekStartDay = Number(0);
        this.data.calendar = new jsCalendar.Generator({onlyDays: !this.data.showWeekNumbers, weekStart: weekStartDay});
    },
    /**
     * 获取日期头部数据
     */
    getHeaderDays() {
        const weekStartDay = Number(0);
        const translatedDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map(item => weeks[item], // ??
        );
        const weekDays = translatedDays.splice(weekStartDay, 7 - weekStartDay).concat(translatedDays.splice(0, weekStartDay));
        this.data.headerDays = this.data.showWeekNumbers ? [''].concat(weekDays) : weekDays;
    },

    // 依赖的外部值：selectionMode, value, rangeState
    getDates() {
        const {selectionMode, value, rangeState} = this.data;
        const rangeSelecting = selectionMode === 'range' && rangeState.selecting;
        this.data.dates = rangeSelecting ? [rangeState.from] : value;
    },
    // 依赖的外部值：tableDate, dates, rangeState, selectionMode, disabledDate, showWeekNumbers
    getCells() {
        const store = this.data;

        const tableYear = store.tableDate.getFullYear();
        const tableMonth = store.tableDate.getMonth();

        const today = clearHours(new Date());
        // const selectedDays = store.dates.filter(Boolean).map(clearHours);
        const selectedDays = store.dates.map(clearHours);
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
})
    .use(ClassesMixin)
    .use(EventMixin);

module.exports = KLDateTable;
