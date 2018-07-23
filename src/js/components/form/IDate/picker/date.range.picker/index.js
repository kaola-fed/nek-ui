/* eslint-disable */

import Component from '../../../../../ui-base/component';
import _ from '../../../../../ui-base/_';
import template from './index.html';


import KLDrop from '../../../../layout/KLDrop/index';
import KLDropHeader from '../../../../layout/KLDrop/KLDropHeader/index';
import KLDropMenu from '../../../../layout/KLDrop/KLDropMenu/index';

import DatePickerPanel from '../../panel/Date/date/index';
import DateRangePickerPanel from '../../panel/Date/date.range/index';

import {
    DEFAULT_FORMATS,
    RANGE_SEPARATOR,
    TYPE_VALUE_RESOLVER_MAP,
    getDayCountOfMonth,
} from '../../util';

import EventMixin from './mixins/event.mixin';

const findComponentsDownward = (context, componentName) => context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child);
    const foundChilds = findComponentsDownward(child, componentName);
    return components.concat(foundChilds);
}, []);

const prefixCls = 'ivu-date-picker';
const pickerPrefixCls = 'ivu-picker';

const isEmptyArray = val => val.reduce((isEmpty, str) => isEmpty && !str || (typeof str === 'string' && str.trim() === ''), true);

const keyValueMapper = {
    40: 'up',
    39: 'right',
    38: 'down',
    37: 'left',
};

const mapPossibleValues = (key, horizontal, vertical) => {
    if (key === 'left') return horizontal * -1;
    if (key === 'right') return horizontal * 1;
    if (key === 'up') return vertical * 1;
    if (key === 'down') return vertical * -1;
};

const pulseElement = (el) => {
    const pulseClass = 'ivu-date-picker-btn-pulse';
    el.classList.add(pulseClass);
    setTimeout(() => el.classList.remove(pulseClass), 200);
};


// 判断参数是否是其中之一
const oneOf = (value, validList) => {
    for (let i = 0; i < validList.length; i++) {
      if (value === validList[i]) {
        return true;
      }
    }
    return false;
  };

const extractTime = (date) => {
    if (!date) return [0, 0, 0];
    return [
      date.getHours(), date.getMinutes(), date.getSeconds(),
    ];
};


const KLNewDate = Component.extend({
    name: 'kl-new-date-range',
    template,
    config() {
        _.extend(this.data, {
            type: 'date',               // 显示类型，可选值为 date、daterange、datetime、datetimerange、year、month
            value: null,                // 日期
            format: '',                 // 格式化方式
            placement: 'bottom',        // 位置
            placeholder: '',
            splitPanels: false,         // 是否联动
            multiple: false,            // 多选
            showWeekNumbers: false,     // 是否展示周次
            startDate: null,            // 面板初始化的时候的开始时间
            confirm: false,             // 是否需要确认按钮
            size: 'default',            // 'small', 'large', 'default'
            steps: [],
            disabled: false,
            clearable: true,
            readonly: false,
            editable: true,
            timePickerOptions: {},
            options: {},
            open: false,
            name: '',

            prefixCls,
            showClose: false,
            isShow: false,

            disableClickOutSide: false,    // fixed when click a date,trigger clickoutside to close picker
            disableCloseUnderTransfer: false,  // transfer 模式下，点击Drop也会触发关闭,
            forceInputRerender: 1,
            isFocused: false,
            internalFocus: false,
        });
        this.initDate();
        this.supr();
    },
    // 双向绑定，应该是没用了
    publicVModelValue() {
        const { internalValue, type } = this.data;

        let val = internalValue.map(date => date instanceof Date ? new Date(date) : (date || ''));
        if (type.match(/^time/)) {
            val = val.map(this.formatDate.bind(this));
        }

        this.data.publicVModelValue =  val;
    },

    publicStringValue() {
        const { publicVModelValue, type } = this.data;

        const formatDate = this.formatDate.bind(this);
        if (type.match(/^time/)) return publicVModelValue;

        this.data.publicStringValue = Array.isArray(publicVModelValue) ? publicVModelValue.map(formatDate) : formatDate(publicVModelValue);
    },

    // 格式化初始值
    __parseDate(val) {
        const { type } = this.data;
        const parser = ( TYPE_VALUE_RESOLVER_MAP[type] || TYPE_VALUE_RESOLVER_MAP.default).parser;
        const format = this.data.format || DEFAULT_FORMATS[type];

        if (!val) {
            val = [null, null];
        } else if (typeof val === 'string') {
            val = parser(val, format);
        } else if (type === 'timerange') {
            val = parser(val, format).map(v => v || '');
        } else {
            const [start, end] = val;
            if (start instanceof Date && end instanceof Date) {
                val = val.map(date => new Date(date));
            } else if (typeof start === 'string' && typeof end === 'string') {
                val = parser(val.join(RANGE_SEPARATOR), format);
            } else if (!start || !end) {
                val = [null, null];
            }
        }

        return val || [];
    },

    initDate() {
        const initialValue = isEmptyArray(this.data.value || []) ? [null, null] : this.__parseDate(this.data.value);
        const focusedTime = initialValue.map(extractTime);

        this.data.internalValue = initialValue;
        this.data.selectionMode = this.onSelectionModeChange(this.data.type);
        this.data.focusedDate = initialValue[0] || this.data.startDate || new Date();
        this.data.focusedTime = {
            column: 0, // which column inside the picker
            picker: 0, // which picker
            time: focusedTime, // the values array into [hh, mm, ss],
            active: false,
        };
    },
    init() {
        this.supr();

        this.$watch('value', (val) => {
            this.data.internalValue = this.__parseDate(val);
        });

        this.$watch('open', (val) => {
            this.data.isShow = val === true;
        });

        this.$watch('type', (type) => {
            this.onSelectionModeChange(type);
        });
    },


    computed: {
        wrapperClasses() {
            const isFocusedCls = this.data.isFocused ? `${prefixCls}-focused` : '';
            return `${prefixCls} ${isFocusedCls}`;
        },
        opened() {
            return this.data.open === null ? this.data.isShow : this.data.open;
        },
        visualValue() {
            return this.formatDate(this.data.internalValue);
        },
        isConfirm() {
            return this.data.confirm || this.data.type === 'datetime' || this.data.type === 'datetimerange' || this.data.multiple;
        },
    },



    reset() {
        // this.$refs.pickerPanel.reset && this.$refs.pickerPanel.reset();
    },


    formatDate(value) {
        const store = this.data;

        const format = DEFAULT_FORMATS[store.type];

        if (store.multiple) {
            const formatter = TYPE_VALUE_RESOLVER_MAP.multiple.formatter;
            return formatter(value, store.format || format);
        }
        const {formatter} = (
            TYPE_VALUE_RESOLVER_MAP[store.type] ||
            TYPE_VALUE_RESOLVER_MAP.default
        );
        return formatter(value, store.format || format);
    },
    onPick(e) {
        const [dates, visible, type] = [e.value, e.visible || false, e.type];
        const store = this.data;

        store.internalValue = Array.isArray(dates) ? dates : [dates];

        if (store.internalValue[0]) store.focusedDate = store.internalValue[0];

        store.focusedTime = {
          ...store.focusedTime,
          time: store.internalValue.map(extractTime),
        };

        if (!store.isConfirm) {
          this.onSelectionModeChange(this.data.type); // reset the selectionMode
          store.visible = visible;
        }
        this.emitChange(type);
      },

      handleClear() {
        const store = this.data;

        store.visible = false;
        store.internalValue = store.internalValue.map(() => null);
        this.$emit('clear');
        this.emitChange(this.data.type);
        this.reset();

        setTimeout(
            () => this.onSelectionModeChange(store.type),
            500, // delay to improve dropdown close visual effect
        );
      },
      emitChange(type) {
        const store = this.data;

        this.$emit('change', store.publicStringValue, type);
      },

      onPickSuccess() {
        this.$emit('ok');
        this.reset();
        this.data.isShow = !this.data.isShow;
      },

      onSelectionModeChange(type = 'time') {
        if (type.match(/^date/)) type = 'date';
        this.data.selectionMode = oneOf(type, ['year', 'month', 'date', 'time']) && type;
        return this.data.selectionMode;
      },
})

module.exports = KLNewDate;
