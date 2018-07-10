/* eslint-disable */
import Component from '../../../../../ui-base/component';
import _ from '../../../../../ui-base/_';
import template from './index.html';

import {deepCopy, clearHours} from '../../util';

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
    init() {
        this.startYear();
        this.dates();
        this.cells();


        this.$watch('value', (newValue) => {
            this.startYear();
            this.dates();
            this.cells();
        });

        this.$watch('tableDate', (newValue) => {
            this.startYear();
            this.dates();
            this.cells();
        });

        this.$watch('rangeState', (newValue) => {
            this.startYear();
            this.dates();
            this.cells();
        });

        // 待优化？？ rangeState变了 没检测到？！
        this.$watch('rangeState.to', (newValue) => {
            this.startYear();
            this.dates();
            this.cells();
        });

        this.supr();
    },
    computed: {

        classes() {
            return `${prefixCls} ${prefixCls}-year`;
        },

    },

    startYear() {
        this.data.startYear = Math.floor(this.data.tableDate.getFullYear() / 10) * 10;
        return Math.floor(this.data.tableDate.getFullYear() / 10) * 10;
    },
    dates() {
        const {selectionMode, value, rangeState} = this.data;
        const rangeSelecting = selectionMode === 'range' && rangeState.selecting;
        this.data.dates = rangeSelecting ? [rangeState.from] : value;
        return rangeSelecting ? [rangeState.from] : value;
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

        this.data.cells = cells;

        return cells;
    },


    handleClick(cell, e) {
        e.stopPropagation();
        if (cell.disabled || cell.type === 'weekLabel') return;
        const newDate = new Date(clearHours(cell.date));

        this.$emit('pick', newDate);
        this.$emit('pick-click');
    },
    handleMouseMove(cell) {
        if (!this.data.rangeState.selecting) return;
        if (cell.disabled) return;
        const newDate = cell.date;
        this.$emit('change-range', newDate);
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
