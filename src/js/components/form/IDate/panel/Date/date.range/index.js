/* eslint-disable */
import Component from '../../../../../../ui-base/component';
import _ from '../../../../../../ui-base/_';
import template from './index.html';

import DateTable from '../../../base/date.table/index';
import YearTable from '../../../base/year.table/index';
import MonthTable from '../../../base/month.table/index';
import Confirm from '../../../base/confirm/index';

import TimeRangePicker from '../../Time/time.range/index';

import datePanelLabel from '../date.panel.label/index';


import ClassesMixin from './mixins/classes.mixin';
import TimeOperationMixin from './mixins/time.operation';
import TimeConfirmOperationMixin from './mixins/time.confirm.operation';
import CommonMixin from './mixins/common.mixin';
import ComputedMixin from './mixins/computed.mixin';
import PanelOperationMixin from './mixins/panel.operation';
import PanelLableMixin from './mixins/pabel.label';


import {toDate, initTimeDate, formatDateLabels} from '../../../util';



const dateSorter = (a, b) => {
    if (!a || !b) return 0;
    return a.getTime() - b.getTime();
};



const prefixCls = 'ivu-picker-panel';
const datePrefixCls = 'ivu-date-picker';


const KLDatePickerPanel = Component.extend({
    name: 'kl-range-date-picker-panel',
    template,
    config() {

        _.extend(this.data, {
            confirm: false,
            showTime: false,
            format: 'yyyy-MM-dd',
            selectionMode: 'date',      // 'year', 'month', 'date', 'time'
            shortcuts: [],
            disabledDate: false,
            timePickerOptions: {},
            showWeekNumbers: false,
            startDate: new Date(),
            pickerType: '',      // required
            focusedDate: '',         // required

            splitPanels: false,
            prefixCls: prefixCls,
            datePrefixCls: datePrefixCls,

        });

        const [minDate, maxDate] = this.data.value.map(date => date || initTimeDate());
        const leftPanelDate = this.data.startDate ? this.data.startDate : minDate;


        this.data.dates = this.data.value;
        this.data.leftPanelDate = leftPanelDate;
        this.data.rightPanelDate = new Date(leftPanelDate.getFullYear(), leftPanelDate.getMonth() + 1, 1);
        this.data.rangeState = {from: this.data.value[0], to: this.data.value[1], selecting: minDate && !maxDate};
        this.data.currentView = this.data.selectionMode || 'range';
        this.data.leftPickerTable = `${this.data.selectionMode}-table`;
        this.data.rightPickerTable = `${this.data.selectionMode}-table`;

        this.supr();
        console.log(this.data.currentView);
        this.leftDatePanelLabel();
        this.rightDatePanelLabel();

        this.preSelecting();
        this.panelPickerHandlers();





    },

    //
    preSelecting(){
        const tableType = `${this.data.currentView}-table`;
        this.data.preSelecting = {
            left: this.data.leftPickerTable !== tableType,
            right: this.data.rightPickerTable !== tableType,
        };
        return {
            left: this.data.leftPickerTable !== tableType,
            right: this.data.rightPickerTable !== tableType,
        };
    },
    panelPickerHandlers(){
        this.data.panelPickerHandlers = {
            left: this.data.preSelecting.left ? this.handlePreSelection.bind(this, 'left') : this.onRangePick.bind(this) ,
            right: this.data.preSelecting.right ? this.handlePreSelection.bind(this, 'right') : this.onRangePick.bind(this),
        };
        return {
            left: this.data.preSelecting.left ? this.handlePreSelection.bind(this, 'left') : this.onRangePick.bind(this),
            right: this.data.preSelecting.right ? this.handlePreSelection.bind(this, 'right') : this.onRangePick.bind(this),
        };
    },
    handlePreSelection(panel, value){
        this.data[`${panel}PanelDate`] = value;
        const currentViewType = this.data[`${panel}PickerTable`];
        if (currentViewType === 'year-table') this.data[`${panel}PickerTable`] = 'month-table';
        else this.data[`${panel}PickerTable`] = `${this.data.currentView}-table`;

        if (!this.data.splitPanels){
            const otherPanel = panel === 'left' ? 'right' : 'left';
            this.data[`${otherPanel}PanelDate`] = value;
            this.changePanelDate(otherPanel, 'Month', 1, false);
        }
    },
    //

    init() {
        this.supr();
        this.data.value = [initTimeDate(), initTimeDate()];

        this.$watch('value', (newVal) => {
            const store = this.data;

            const minDate = newVal[0] ? toDate(newVal[0]) : null;
            const maxDate = newVal[1] ? toDate(newVal[1]) : null;
            store.dates = [minDate, maxDate].sort(dateSorter);

            store.rangeState = {
                from: store.dates[0],
                to: store.dates[1],
                selecting: false
            };


            // set panels positioning
            this.setPanelDates(store.startDate || store.dates[0] || new Date());
        });

        this.$watch('currentView', (currentView) => {
            const store = this.data;

            const leftMonth = store.leftPanelDate.getMonth();
            const rightMonth = store.rightPanelDate.getMonth();
            const isSameYear = store.leftPanelDate.getFullYear() === store.rightPanelDate.getFullYear();

            if (currentView === 'date' && isSameYear && leftMonth === rightMonth){
                this.changePanelDate('right', 'Month', 1);
            }
            if (currentView === 'month' && isSameYear){
                this.changePanelDate('right', 'FullYear', 1);
            }
            if (currentView === 'year' && isSameYear){
                this.changePanelDate('right', 'FullYear', 10);
            }
        });

        this.$watch('selectionMode', (type) => {
            this.data.currentView = type || 'range';
        });

        this.$watch('focusedDate', (date) => {
            this.setPanelDates(date || new Date());
        });
    },

    setPanelDates(leftPanelDate){
        this.data.leftPanelDate = leftPanelDate;
        const rightPanelDate = new Date(leftPanelDate.getFullYear(), leftPanelDate.getMonth() + 1, leftPanelDate.getDate());
        this.data.rightPanelDate = this.data.splitPanels ? new Date(Math.max(this.data.dates[1], rightPanelDate)) : rightPanelDate;
    },

    stopPropagation(e) {
        e.stopPropagation();
    },

    /**
     *
     * @param shortcut
     */
    handleShortcutClick(shortcut) {
        if (shortcut.value) this.$emit('on-pick', shortcut.value());
        if (shortcut.onClick) shortcut.onClick(this);
    },

    handlePickClick() {
        this.$emit('on-pick-click');
    },
    handleChangeRange (val) {
        // watch 不会更新临时处理
        const rangeState = this.data.rangeState;
        rangeState.to = val;

        console.log(rangeState);

        this.data.rangeState = rangeState;
    },


    handleConfirm(visible, type) {
        this.$emit('on-pick', this.data.dates, visible, type || this.data.type);
    },

    // 外部调用
    onToggleVisibility(open) {
        const {timeSpinner, timeSpinnerEnd} = this.$refs;
        if (open && timeSpinner) timeSpinner.updateScroll();
        if (open && timeSpinnerEnd) timeSpinnerEnd.updateScroll();
    },



    // handleClear() {
    //     this.data.dates = this.data.dates.map(() => null);
    //     this.data.rangeState = {};
    //     this.$emit('on-pick', this.data.dates);
    //     this.handleConfirm();
    //     //  if (this.showTime) this.$refs.timePicker.handleClear();
    // },
    // reset(){
    //     this.data.currentView = this.data.selectionMode;
    //     this.data.leftPickerTable = `${this.data.currentView}-table`;
    //     this.data.rightPickerTable = `${this.data.currentView}-table`;
    // },


})
    .use(ClassesMixin)
    .use(CommonMixin)
    .use(ComputedMixin)
    .use(PanelOperationMixin)
    .use(PanelLableMixin)
    .use(TimeOperationMixin)
    .use(TimeConfirmOperationMixin);

module.exports = KLDatePickerPanel;
