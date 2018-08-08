/* eslint-disable */

// common
import Component from '../../../../../ui-base/component';
import template from './index.html';

// base components
import Confirm from '../../base/confirm/index';
import DateTable from '../../base/date.table/index';
import YearTable from '../../base/year.table/index';
import MonthTable from '../../base/month.table/index';
import DatePanelLabel from '../../base/label/index';
import TimeRangePanel from '../time.range/index';


// mixins
import ClassesMixin from './mixins/classes.mixin';
import LabelActionMixin from './mixins/label.action';
import UtilsMixin from './mixins/utils.mixin';

// utils
import {
    dateSorter,
    formatDateLabels,
    initTimeDate,
    parseValue
} from '../../utils/index';
import {DEFAULT_FORMATS, TYPE_VALUE_RESOLVER_MAP} from "../../utils";



const prefixCls = 'kl-picker-panel';
const datePrefixCls = 'kl-picker-panel-body-header';
module.exports = Component.extend({
    name: 'kl-date-range-panel',
    template,
    computed: {
        isTime() {
            return this.data.currentView === 'time';
        },
        leftDatePanelView() {
            return this.data.leftPickerTable.split('-').shift();
        },
        rightDatePanelView() {
            return this.data.rightPickerTable.split('-').shift();
        },
        timeDisabled() {
            return !(this.data.dates[0] && this.data.dates[1]);
        },
    },
    config() {
        this.defaults({
            value: [],
            startDate: null,
            endDate: null,

            confirm: false,
            showTime: false,
            format: 'yyyy-MM-dd HH:mm:ss',
            type: 'daterange',
            selectionMode: 'date',
            shortcuts: [],
            disabledDate: () => false,
            timePickerOptions: {},
            showWeekNumbers: false,
            pickerType: '', // required
            focusedDate: new Date(), // required
            steps: [],
            splitPanels: false,
            prefixCls: prefixCls,
            datePrefixCls: datePrefixCls,
        });
        this.supr();

        this.initInternalValue();
        this.getSelectionMode(this.data.type);

        this.$watch('value', (newValue) => {
            if (this.data.currentView !== 'time' || !newValue) {
                this.initInternalValue();
            }
        });

    },

    getSelectionMode(type){
        if (type.match(/^date/)) type = 'date';
        this.data.selectionMode = type;
    },

    initInternalValue() {

        this.data.dates = parseValue(this.data.value, 'daterange');
        this.data.currentView = this.data.selectionMode || 'range';
        this.data.leftPickerTable = `${this.data.selectionMode}-table`;
        this.data.rightPickerTable = `${this.data.selectionMode}-table`;


        this.$emit('showVisualValue', this.formatDate(this.data.dates));


        // this.data.internalValue = value || [];
        this.initPanelDate();
        this.initDatePanelLabel();
        this.initPanelPickerHandlers();
    },
    /**
     * 初始化panelDate值
     */
    initPanelDate() {
        const { value, startDate } = this.data;
        const formattedValue = parseValue(value, 'daterange');


        const [minDate, maxDate] = (formattedValue || []).map(date => date || initTimeDate());
        const leftPanelDate = startDate ? startDate : minDate;

        // this.data.leftPanelDate = leftPanelDate;
        // this.data.rightPanelDate = new Date(leftPanelDate.getFullYear(), leftPanelDate.getMonth() + 1, 1);
        this.setPanelDates(leftPanelDate);

        this.data.rangeState = {
            from: formattedValue[0],
            to: formattedValue[1],
            selecting: minDate && !maxDate
        };
    },

    setPanelDates(leftPanelDate){
        this.data.leftPanelDate = leftPanelDate;
        const rightPanelDate = new Date(leftPanelDate.getFullYear(), leftPanelDate.getMonth() + 1, leftPanelDate.getDate());
        this.data.rightPanelDate = this.data.splitPanels ? new Date(Math.max(this.data.dates[1], rightPanelDate)) : rightPanelDate;
    },

    /**
     * 初始化 年月显示 的label 的配置
     */
    initDatePanelLabel() {
        this.data.leftDatePanelLabel = this.getDatePanelLabel('left');
        this.data.rightDatePanelLabel = this.getDatePanelLabel('right');
    },
    // /**
    //  * 初始化面板选择类型
    //  */
    // initPickerTableType() {
    //     const tableType = `${this.data.currentView}-table`;
    //
    //     this.data.pickerTableType = {
    //         left: this.data.leftPickerTable !== tableType,
    //         right: this.data.rightPickerTable !== tableType,
    //     };
    // },
    /**
     * 初始化 日期点击时间
     */
    initPanelPickerHandlers() {
        const tableType = `${this.data.currentView}-table`;
        this.data.pickerTableType = {
            left: this.data.leftPickerTable !== tableType,
            right: this.data.rightPickerTable !== tableType,
        };

        this.data.panelPickerHandlers = {
            left: this.data.pickerTableType.left ? this.handlePreSelection.bind(this, 'left') : this.onRangePick.bind(this),
            right: this.data.pickerTableType.right ? this.handlePreSelection.bind(this, 'right') : this.onRangePick.bind(this),
        };
    },
    handlePreSelection(panel, event) {
        this.data[`${panel}PanelDate`] = event.value;
        const currentViewType = this.data[`${panel}PickerTable`];

        if (currentViewType === 'year-table') {
            this.data[`${panel}PickerTable`] = 'month-table';
        } else {
            this.data[`${panel}PickerTable`] = `${this.data.currentView}-table`;
        }

        if (!this.data.splitPanels) {
            const otherPanel = panel === 'left' ? 'right' : 'left';
            this.data[`${otherPanel}PanelDate`] = event.value;
            this.changePanelDate(otherPanel, 'Month', 1, false);
        }
        this.initDatePanelLabel();
        this.initPanelPickerHandlers();
    },



    onPickClick() {
        //
    },

    onChangeRange(val) {
        this.data.rangeState.to = val;
    },

    onToggleTime() {
        this.data.currentView = this.data.currentView === 'time' ? 'date' : 'time';
    },


    onRangePick(e) {
        const { value, type } = e;
        if (this.data.rangeState.selecting || this.data.currentView === 'time') {
            if (this.data.currentView === 'time') {
                this.data.dates = value;
            } else {
                const [minDate, maxDate] = [this.data.rangeState.from, value].sort(dateSorter);
                this.data.dates = [minDate, maxDate];
                this.data.rangeState = {
                    from: minDate,
                    to: maxDate,
                    selecting: false,
                };
            }

            this.data.value = this.data.dates;

            let isShow = true;
            if (this.data.type != 'datetimerange') {
                isShow = false;
            }

            this.$emit('showVisualValue', this.formatDate(this.data.dates));
            this.$emit('pick', {
                value: this.data.dates,
                isShow,
                type: type || 'date',
            });
        } else {
            this.data.rangeState = {
                from: value,
                to: null,
                selecting: true,
            };
        }

    },


    onPickSuccess(event) {
        this.$emit('pickSuccess', event)
    },


    formatDate(value) {
        const {format, type } = this.data;

        const formattedType = DEFAULT_FORMATS[type];

        const {formatter} = (
            TYPE_VALUE_RESOLVER_MAP[type] ||
            TYPE_VALUE_RESOLVER_MAP.default
        );
        return formatter(value, format || formattedType);
    },
})
    .use(ClassesMixin)
    .use(LabelActionMixin)
    .use(UtilsMixin)
    .component('kl-date-table', DateTable)
    .component('kl-year-table', YearTable)
    .component('kl-month-table', MonthTable)
    .component('kl-date-panel-label', DatePanelLabel)
    .component('kl-time-range-panel', TimeRangePanel)
    .component('kl-confirm', Confirm);
