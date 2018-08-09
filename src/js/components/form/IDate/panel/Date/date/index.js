/* eslint-disable */
import Component from '../../../../../../ui-base/component';
import _ from '../../../../../../ui-base/_';
import template from './index.html';

import ClassesMixin from './mixins/classes.mixin';

import DateTable from '../../../base/date.table/index';
import YearTable from '../../../base/year.table/index';
import MonthTable from '../../../base/month.table/index';
import Confirm from '../../../base/confirm/index';
import TimePicker from '../../Time/time/index';
import DatePanelLabel from '../date.panel.label/index';

import {siblingMonth, formatDateLabels, initTimeDate} from '../../../util';


const prefixCls = 'ivu-picker-panel';
const datePrefixCls = 'ivu-date-picker';


const KLDatePickerPanel = Component.extend({
    name: 'kl-date-picker-panel',
    template,
    config() {
        const initTimeDateValue = initTimeDate();
        _.extend(this.data, {
            confirm: false,
            showTime: false,
            format: 'yyyy-MM-dd',
            selectionMode: 'date',      // 'year', 'month', 'date', 'time'
            shortcuts: [],
            disabledDate: () => false,
            value: [initTimeDateValue, initTimeDateValue],
            timePickerOptions: {},
            showWeekNumbers: false,
            startDate: new Date(),
            pickerType: '',      // required
            focusedDate: '',        // required
            multiple: false,
            prefixCls,
            datePrefixCls,
        });
        this.supr();

        const {selectionMode, value} = this.data;

        this.setPickerTableType(selectionMode);
        const dates = value.sort();

        this.data.currentView = selectionMode || 'date';
        this.data.dates = dates;
        this.data.panelDate = this.data.startDate || (this.data.multiple ? this.data.dates[this.data.dates.length - 1] : this.data.dates[0]) || new Date();
    },
    init() {
        this.supr();

        this.getDatePanelLabel();

        this.$watch('value', (newVal) => {
            const store = this.data;

            store.dates = newVal;
            store.panelDate = store.startDate || (store.multiple ? store.dates[store.dates.length - 1] : store.dates[0]) || new Date();
        });

        this.$watch('panelDate', (newVal) => {
            this.getDatePanelLabel();
        });


        this.$watch('currentView', (currentView) => {
            const store = this.data;

            this.$emit('selection-mode-change', currentView);

            if (store.currentView === 'time') {
                // this.$nextTick(() => {
                //     const spinner = this.$refs.timePicker.$refs.timeSpinner;
                //     spinner.updateScroll();
                // });
            }
        });
        //
        // this.$watch('selectionMode', (type) => {
        //     const store = this.data;
        //
        //     store.currentView = type;
        //     this.setPickerTableType(type);
        // });

        this.$watch('focusedDate', (date) => {
            const store = this.data;

            const isDifferentYear = date.getFullYear() !== store.panelDate.getFullYear();
            const isDifferentMonth = isDifferentYear || date.getMonth() !== store.panelDate.getMonth();
            if (isDifferentYear || isDifferentMonth) {
                store.panelDate = date;
            }
        });
    },

    stopPropagation(e) {
        e.stopPropagation();
    },


    /**
     * computed
     * panelDate, pickerTable
     */
    getDatePanelLabel() {
        const date = this.data.panelDate;

        const locale = 'zh-CN';
        const datePanelLabel = '[yyyy年] [m月]';
        const {labels, separator} = formatDateLabels(locale, datePanelLabel, date);

        const handler = type => () => this.setPickerTableType(type);

        this.data.datePanelLabel = {
            separator,
            labels: labels.map(obj => ((obj.handler = handler(obj.type)), obj)),
        };
    },





    resetView() {
        setTimeout(
            () => this.data.currentView = this.data.selectionMode,
            500, // 500ms so the dropdown can close before changing
        );
        this.$update();
    },


    // 年月日点击后通用处理方法
    onPickClick() {
        this.$emit('pick-click');
    },
    onPanelPickerHandlers(e) {
        this.data.pickerTable === `${this.data.currentView}-table` ? this.handlePick(e) : this.handlePreSelection(e);
    },
    handlePreSelection(value) {
        this.data.panelDate = value;
        if (this.data.pickerTable === 'year-table') this.data.pickerTable = 'month-table';
        else this.setPickerTableType(this.data.currentView);
    },
    handlePick(e) {

        let [ value, type ] = [ e.value, e.type ];
        const {selectionMode, panelDate} = this.data;
        if (selectionMode === 'year') value = new Date(value.getFullYear(), 0, 1);
        else if (selectionMode === 'month') value = new Date(panelDate.getFullYear(), value.getMonth(), 1);
        else value = new Date(value);

        this.data.dates = [value];
        this.$emit('pick', {
            value,
            visible: false,
            type: type || selectionMode,
        });
    },


    handleShortcutClick(shortcut) {
        if (shortcut.value) {
            this.$emit('pick', {
                value: shortcut.value()
            });
        }
        if (shortcut.onClick) shortcut.onClick(this);
    },
    handlePickClear() {
        this.resetView();
        this.$emit('pick-clear');
    },
    handlePickSuccess() {
        this.resetView();
        this.$emit('pick-success');
    },



    handleConfirm(visible, type) {
        this.$emit('pick', {
            value: this.data.dates,
            visible,
            type: type || this.data.type,
        });
    },
    handleToggleTime() {
        this.data.currentView = this.data.currentView === 'time' ? 'date' : 'time';
    },





    setPickerTableType(currentView) {
        this.data.pickerTable = currentView.match(/^time/) ? 'time-picker' : `${currentView}-table`;
    },


    changeYear(dir) {
        if (this.data.selectionMode === 'year' || this.data.pickerTable === 'year-table') {
            this.data.panelDate = new Date(this.data.panelDate.getFullYear() + dir * 10, 0, 1);
        } else {
            this.data.panelDate = siblingMonth(this.data.panelDate, dir * 12);
        }

        this.getDatePanelLabel(); // ??
    },
    changeMonth(dir) {
        this.data.panelDate = siblingMonth(this.data.panelDate, dir);
        this.getDatePanelLabel(); // ??
    },


    computed: {
        timeDisabled() {
            return !this.data.dates[0];
        },
    },






    reset() {
        this.data.currentView = this.data.selectionMode;
        this.setPickerTableType(this.data.currentView);
    },
    handleClear() {
        this.data.dates = this.data.dates.map(() => null);
        this.data.rangeState = {};
        this.$emit('pick', { value: this.data.dates});
        this.handleConfirm();
        //  if (this.showTime) this.$refs.timePicker.handleClear();
    },
    onToggleVisibility(open) {
        const {timeSpinner, timeSpinnerEnd} = this.$refs;
        if (open && timeSpinner) timeSpinner.updateScroll();
        if (open && timeSpinnerEnd) timeSpinnerEnd.updateScroll();
    },
})
    .use(ClassesMixin);

module.exports = KLDatePickerPanel;
