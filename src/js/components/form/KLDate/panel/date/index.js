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
import TimePanel from '../time/index';

// mixins
import ClassesMixin from './mixins/classes.mixin';
import LabelActionMixin from './mixins/label.action';
import PickActionMixin from './mixins/pick.action';

// utils
import {
    TYPE_VALUE_RESOLVER_MAP,
    DEFAULT_FORMATS,
    formatDateLabels,
    initTimeDate        // 当前 00:00:00 的时间格式
} from '../../utils/index';

const prefixCls = 'kl-picker-panel';
const datePrefixCls = 'kl-picker-panel-body-header';

module.exports = Component.extend({
    name: 'kl-date-panel',
    template,
    config() {
        this.defaults({
            prefixCls,
            datePrefixCls,

            value: null,
            confirm: false,
            showTime: false,
            format: 'yyyy-MM-dd',
            selectionMode: 'date',      // 'year', 'month', 'date', 'time'
            shortcuts: [],
            disabledDate: () => false,
            timePickerOptions: {},
            showWeekNumbers: false,
            startDate: new Date(),
            pickerType: '',             // required
            focusedDate: new Date(),            // required
            multiple: false,
        });
        this.supr();
        this.initInternalData();

        this.$watch('value', (newValue) => {
            if (this.data.currentView !== 'time' || !newValue) {
                this.initInternalData();
            }
        });
    },

    /**
     * 获取
     * currentView: 控制当前展示项
     * internalValue:
     * panelDate: 展示的面板日期（通过这个值init日期面板）
     * pickerTable: 日期选择类型
     * datePanelLabel: 头部展示的内容
     */
    // value == '0' ????
    initInternalData() {
        let {selectionMode, value} = this.data;

        if (selectionMode == 'datetime') {
            this.data.currentView = 'date';
        } else {
            this.data.currentView = selectionMode || 'date';
        }

        if (!value && value !== 0  && value !== '0') {
            this.data.internalValue = [];
            this.data.panelDate = initTimeDate();
        } else if (Array.isArray(value)) {
            this.data.internalValue = value;
            this.data.panelDate = new Date(value);
        } else {
            this.data.internalValue = [new Date(value)];
            this.data.panelDate = new Date(value);
        }
        this.$emit('showVisualValue', this.formatDate(this.data.internalValue));

        this.setPickerTableType(this.data.currentView);
        this.getDatePanelLabel();
    },
    /**
     * 获取 datePanelLabel
     */
    getDatePanelLabel() {
        const locale = 'zh-CN';
        const datePanelLabel = '[yyyy年] [m月]';
        const panelDate = this.data.panelDate;
        const {labels, separator} = formatDateLabels(locale, datePanelLabel, panelDate);

        const handler = type => () => this.setPickerTableType(type);
        this.data.datePanelLabel = {
            separator,
            labels: labels.map(obj => ((obj.handler = handler(obj.type)), obj)),
        };
    },
    /**
     * pickerTable 获取 当前面板类型
     * @param currentView
     */
    setPickerTableType(currentView) {
        this.data.pickerTable = currentView.match(/^time/) ? 'time-picker' : `${currentView}-table`;
    },

    onToggleTime() {
        this.data.currentView = this.data.currentView === 'time' ? 'date' : 'time';
    },



    parseDate(val, type, format, multiple) {
        // const { multiple, type, format } = this.data;

        const isRange = type.includes('range');
        const parser = (
            TYPE_VALUE_RESOLVER_MAP[type] ||
            TYPE_VALUE_RESOLVER_MAP.default
        ).parser;
        const formatType = format || DEFAULT_FORMATS[type];
        const multipleParser = TYPE_VALUE_RESOLVER_MAP.multiple.parser;

        if (val && type === 'time' && !(val instanceof Date)) {
            val = parser(val, formatType);
        } else if (multiple && val) {
            val = multipleParser(val, formatType);
        } else if (isRange) {
            if (!val) {
                val = [null, null];
            } else if (typeof val === 'string') {
                val = parser(val, formatType);
            } else if (type === 'timerange') {
                val = parser(val, formatType).map(v => v || '');
            } else {
                const [start, end] = val;
                if (start instanceof Date && end instanceof Date) {
                    val = val.map(date => new Date(date));
                } else if (typeof start === 'string' && typeof end === 'string') {
                    val = parser(val.join(RANGE_SEPARATOR), formatType);
                } else if (!start || !end) {
                    val = [null, null];
                }
            }
        } else if (typeof val === 'string' && type.indexOf('time') !== 0) {
            val = parser(val, formatType) || null;
        }
        return (isRange || multiple) ? (val || []) : [val];
    },


    formatDate(value) {
        const { multiple, format, selectionMode } = this.data;

        const formattedType = DEFAULT_FORMATS[selectionMode];

        if (multiple) {
            const formatter = TYPE_VALUE_RESOLVER_MAP.multiple.formatter;
            return formatter(value, format || formattedType);
        }
        const {formatter} = (
            TYPE_VALUE_RESOLVER_MAP[selectionMode] ||
            TYPE_VALUE_RESOLVER_MAP.default
        );
        return formatter(value, format || formattedType);
    },


    onPickSuccess(event) {
        this.$emit('pickSuccess', event)
    },

    onShortcutClick(shortcut) {
        if (shortcut.value) {
            this.data.value = shortcut.value();

            this.$emit('pick', {
                value: shortcut.value(),
                isShow: false
            });
        }
        if (shortcut.onClick) shortcut.onClick(this);
    },

})
    .use(ClassesMixin)
    .use(LabelActionMixin)
    .use(PickActionMixin)
    .component('kl-date-table',DateTable)
    .component('kl-year-table',YearTable)
    .component('kl-month-table',MonthTable)
    .component('kl-date-panel-label',DatePanelLabel)
    .component('kl-time-picker-panel',TimePanel)
    .component('kl-confirm', Confirm);
