/**
 * ------------------------------------------------------------
 * Select2  选择扩展
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Dropdown = require('../../navigation/dropdown');
var template = require('./ui.select.html');
var _ = require('../../../ui-base/_');
var Validation = require('../../../util/validation');
var Ajax = require("../../../ui-base/ajax");

require('../check');

/**
 * @class Select
 * @extend Dropdown
 * @param {object}                  options.data                     =  绑定属性
 * @param {object[]=[]}             options.data.source             <=> 数据源
 * @param {string}                  options.data.source[].name       => 每项的内容
 * @param {boolean=false}           options.data.source[].disabled   => 禁用此项
 * @param {boolean=false}           options.data.source[].divider    => 设置此项为分隔线
 * @param {object}                  options.data.selected           <=> 当前选择项
 * @param {string|number}           options.data.value              <=> 当前选择值
 * @param {string='id'}             options.data.key                 => 数据项的键
 * @param {string='name'}           options.data.nameKey             => 数据项的name键
 * @param {string='请选择'}          options.data.placeholder         => 默认项的文字，如果`placeholder`为空并且没有选择项时，将会自动选中第一项。
 * @param {boolean=false}           options.data.required            => 是否必填
 * @param {boolean=false}           options.data.readonly            => 是否只读
 * @param {boolean=false}           options.data.disabled            => 是否禁用
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string=''}               options.data.class               => 补充class
 * @param {object}                  options.service                 @=> 数据服务
 */
var Select = Dropdown.extend({
    name: 'ui.select',
    template: template,
    /**
     * @protected
     */
    config: function () {
        var data = this.data;
        _.extend(data, {
            // @inherited source: [],
            // @inherited open: false
            selected: undefined,
            key: 'id',
            nameKey: 'name',
            value: undefined,

            separator: ',',
            showSeparator: '、',
            multiple: false,
            searchInputText: '',
            searchValue: '',
            maxShowCount: 1000,
            selectedClose: false,
            canSearch: false,
            // 默认不区分大小写
            isCaseSensitive: true,
            searchZeroText: '无匹配项',
            canSelectAll: true,
            closeClearSearchText: true,
            remoteSearch: true,
            delaySearch: 300,

            placeholder: '请选择',
            required: false
        });
        if (data.multiple && !Array.isArray(data.selected)) {
            data.selected = data.selected ? [data.selected] : [];
        }
        this.supr();

        this.$watch('selected', function (newValue, oldValue) {
            data.value = this.getValue();
            if (!newValue && data.multiple) {
                data.selected = [];
            }
            /**
             * @event change 选择项改变时触发
             * @property {object} sender 事件发送对象
             * @property {object} selected 改变后的选择项
             * @property {string} key 数据项的键
             * @property {string|number} value 改变后的选择值
             */
            this.$emit('change', {
                sender: this,
                selected: newValue,
                key: data.key,
                value: data.value
            });
        });

        this.$watch('value', function (newValue) {
            var source = data.source;
            var key = data.key;
            if (newValue === undefined || newValue === null) {
                return data.selected = newValue;
            }

            if (source) {
                if (data.multiple) {
                    var newValueArr = newValue.split(data.separator);
                    data.selected = newValue ? source.filter(function (item) {
                        return newValueArr.indexOf(item[key]+'') !== -1;
                    }, this) : [];
                } else {
                    data.selected = source.find(function (item) {
                        return item[key] == newValue;
                    }, this);
                }
            }
        });

        this.$watch('source', function (newValue, oldValue) {

            if (newValue === undefined) {
                return data.selected = undefined;
            }

            if (!(newValue instanceof Array)) {
                throw new TypeError('`source` is not an Array!');
            }

            var key = data.key;
            var nameKey = data.nameKey;
            var value = data.value;
            var itemHandleFn = function(value){
                return value;
            };
            if (newValue.length) {
                if(typeof newValue[0] === 'string' || typeof newValue[0] === 'number'){
                    itemHandleFn = function(value){
                        var item = {};
                        item[key] = value;
                        item[nameKey] = value;
                        return item
                    }
                }else if(!newValue[0].hasOwnProperty(key)){
                    itemHandleFn = function(value){
                        if(!value.hasOwnProperty('divider')){
                            value[key] = value[nameKey];
                        }
                        return value
                    }
                }else if(!newValue[0].hasOwnProperty(nameKey)){
                    itemHandleFn = function(value){
                        value[nameKey] = value[key];
                        return value
                    }
                }
                return data.source = newValue.map(function (value) {
                    return itemHandleFn(value);
                });
            }

            if (data.multiple) {
                if (value !== undefined && value !== null) {
                    var newValueArr = value.split(data.separator);
                    data.selected = value ? source.find(function (item) {
                        return newValueArr.indexOf(item[key]);
                    }, this) : [];
                } else if (data.selected) {
                    data.selected = data.selected.filter(function (item) {
                        return newValue.indexOf(item) !== -1
                    });
                }
            } else {
                if (value !== undefined && value !== null) {
                    data.selected = newValue.find(function (item) {
                        return item[key] == value;
                    }, this);
                } else if (data.selected && newValue.indexOf(data.selected) < 0) {
                    data.selected = undefined;
                }

                // 当placeholder为空时，自动选择第一项
                if (!data.placeholder && !data.selected) {
                    data.selected = newValue[0];
                }
            }
        });
        if(data.service.getList){
            var $updateSource = _.throttle(this.$updateSource.bind(this), data.delaySearch);
            this.$watch('searchValue', function(newValue, oldValue){
                if(oldValue === undefined){
                    return
                }
                $updateSource()
            });
        }

        var $outer = this.$outer;
        if ($outer && $outer instanceof Validation) {
            $outer.controls.push(this);

            this.$on('destroy', function () {
                var index = $outer.controls.indexOf(this);
                $outer.controls.splice(index, 1);
            });
        }
    },
    indexOf: function(source, target){
        var index = -1;
        source.forEach(function(item, itemIndex){
            if(JSON.stringify(item) === JSON.stringify(target)){
                index = itemIndex;
            }
        });
        return index;
    },
    /**
     * @method select(item) 选择某一项
     * @public
     * @param  {object} item 选择项
     * @return {void}
     */
    select: function (item) {
        var data = this.data;
        var multiple = data.multiple;
        if (data.readonly || data.disabled ||
            (item && (item.disabled || item.divider))) {

            return;
        }
        if (multiple) {
            var selected = data.selected;
            var indexOf = selected.indexOf(item);
            if(indexOf!==-1){
                selected.splice(indexOf, 1);
            }else{
                if(item){
                    selected.push(item);
                }else{
                    selected.length = 0;
                }
            }
        } else {
            data.selected = item;
        }

        /**
         * @event select 选择某一项时触发
         * @property {object} sender 事件发送对象
         * @property {object} selected 当前选择项
         */
        this.$emit('select', {
            sender: this,
            selected: item
        });

        if(multiple && !data.selectedClose && item){
            return
        }
        this.toggle(false);
    },
    selectAll: function(isSelected){
        var data = this.data;
        if(isSelected){
            data.selected = this.filterData(data.source);
        }else{
            data.selected = [];
        }
        this.toggle(false);
    },
    filterData: function(source){
        return source.filter(function(item){
            return (!item.hasOwnProperty('divider') && !item.hasOwnProperty('disabled'))
                || (item.hasOwnProperty('divider') && !item.divider)
                || (item.hasOwnProperty('disabled') && !item.disabled);
        });
    },
    filterArray: function (source) {
        var data = this.data;
        if(data.service.getList){
            return source;
        }
        if (!Array.isArray(source)) {
            return;
        }

        if(!data.canSearch){
            return source;
        }
        var nameKey = data.nameKey;
        var searchValue = (data.searchValue || '').trim();
        var maxShowCount = data.maxShowCount;
        var isCaseSensitive = data.isCaseSensitive;
        searchValue = isCaseSensitive ? searchValue.toLowerCase() : searchKey;
        return source.filter(function (item, index) {
            var text = item[nameKey] + '';
            var value = isCaseSensitive ? text.toLowerCase() : text;
            return (searchValue && value.indexOf(searchValue) >= 0) || (!searchValue && index < maxShowCount)
        });
    },
    getValue: function () {
        var data = this.data;
        var key = data.key;
        var selected = data.selected;
        var separator = data.separator;
        var value = '';
        if (selected) {
            if (data.multiple) {
                value = selected.reduce(function (prev, next, index) {
                    var nextValue = next[key];
                    if (index != selected.length - 1) {
                        nextValue += separator
                    }
                    return prev + nextValue
                }, '');
            } else {
                value = selected[key || data.nameKey];
            }
        }
        return value;
    },
    toggle: function(){
        var data = this.data;
        data.closeClearSearchText && data.canSearch && this.clearSearchText();
        this.supr();
    },
    clearSearchText: function(){
        //异步执行 防止regular 多次刷新
        this.data.searchValue = '';
    },
    showName: function () {
        var data = this.data;
        var nameKey = data.nameKey;
        var selected = data.selected;
        var showSeparator = data.showSeparator;
        var showName = data.placeholder;
        if (selected) {
            if (data.multiple) {
                showName = selected.length ? selected.reduce(function (prev, next, index) {
                    var nextName = next[nameKey];
                    if (index != selected.length - 1) {
                        nextName += showSeparator
                    }
                    return prev + nextName
                }, '') : showName;
            } else {
                showName = selected[nameKey];
            }
        }
        return showName;
    },
    request: function(options){
        var data  = this.data;
        var oldError = options.error,
            oldSuccess = options.success,
            oldComplete = options.complete;
        data.loading = true;

        options.success = function(data){
            oldSuccess && oldSuccess(data);
            this.$update('loading', false);
        }.bind(this);
        options.error = function(data) {
            oldError && oldError(data);
            this.$update('loading', false);
        }.bind(this);

        options.complete = function(data) {
            oldComplete && oldComplete(data);
            this.$update('loading', false);
        }.bind(this);
        Ajax.request(options)
    },
    params: function(){
        return {
            searchValue: this.data.searchValue
        }
    },
    validate: function (on) {
        var data = this.data;
        if (!data.required) {
            return {success: true};
        }

        var result = {success: true, message: ''},
            value = this.data.value;

        value = ( typeof value == 'undefined' ) ? '' : value + '';
        if (!value.length) {
            result.success = false;
            result.message = data.message || '请选择';
            data.state = 'error';
        } else {
            result.success = true;
            result.message = '';
            data.state = '';
        }
        data.tip = result.message;

        this.$emit('validate', {
            sender: this,
            on: on,
            result: result
        });

        return result;
    }
}).directive({
    'focus': function(element){
        setTimeout(function(){
            element.focus();
        });
    }
});

module.exports = Select;