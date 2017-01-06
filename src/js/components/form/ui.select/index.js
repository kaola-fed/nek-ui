/**
 * ------------------------------------------------------------
 * Select2  选择扩展
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Dropdown = require('../../navigation/dropdown');
var template = require('./index.html');
var _ = require('../../../ui-base/_');
var Validation = require('../../../util/validation');
var Ajax = require("../../../ui-base/ajax");
var privateMethod = require('./privateMethod');
var selectUtil = require('./selectUtil');

require('../check/index');

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
 *
 * @param {boolean=false}           options.data.canSearch              => 是否可搜索
 * @param {string=""}               options.data.searchInputPlaceholder => 搜索输入框placeholder
 * @param {string=""}               options.data.searchValue            => 搜索的值
 * @param {boolean=false}           options.data.isCaseSensitive        => 是否区分大小写
 * @param {boolean="无匹配项"}       options.data.searchZeroText         => 搜索无结果文案
 * @param {Number=300}              options.data.delaySearch            => 异步搜索的延迟
 * @param {boolean=true}            options.data.closeClearSearchText   => 下拉关闭时是否清空搜索内容
 * @param {Number=1000}             options.data.maxShowCount           => 最大展示条数
 *
 * @param {boolean=false}           options.data.multiple               => 是否多选
 * @param {string=","}              options.data.separator              => 多选value分隔符
 * @param {string='、'}             options.data.showSeparator          => 多选文案分隔符
 * @param {boolean=true}            options.data.selectedClose          => 多选时选中非全部和请选择项时 是否关闭
 * @param {boolean=false}           options.data.canSelectAll           => 是否有全选
 */

var Select = Dropdown.extend(
    _.extend({
        name: 'ui.select',
        template: template,
        /**
         * @protected
         */
        config: function () {
            var data = this.data;
            _.extend(data, {
                selected: undefined,
                key: 'id',
                nameKey: 'name',
                value: undefined,

                searchInputPlaceholder: '',
                searchValue: '',
                canSearch: false,
                // 默认不区分大小写
                isCaseSensitive: true,
                searchZeroText: '无匹配项',
                delaySearch: 300,
                closeClearSearchText: true,
                maxShowCount: 1000,

                separator: ',',
                showSeparator: '、',
                multiple: false,
                selectedClose: false,
                canSelectAll: true,

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
                            return newValueArr.indexOf(item[key] + '') !== -1;
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
                var itemHandleFn = function (value) {
                    return value;
                };
                if (newValue.length) {
                    if (typeof newValue[0] === 'string' || typeof newValue[0] === 'number') {
                        itemHandleFn = function (value) {
                            var item = {};
                            item[key] = value;
                            item[nameKey] = value;
                            return item
                        }
                    } else if (!newValue[0].hasOwnProperty(key)) {
                        itemHandleFn = function (value) {
                            if (!value.hasOwnProperty('divider')) {
                                value[key] = value[nameKey];
                            }
                            return value
                        }
                    } else if (!newValue[0].hasOwnProperty(nameKey)) {
                        itemHandleFn = function (value) {
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

            this.$watch('multiple', function (newValue, oldValue){
                if(newValue){
                    if(!Array.isArray(data.selected)){
                        data.selected = data.selected?[data.selected]:data.selected;
                    }
                }else{
                    data.value = '';
                }
            });
            if (this.service && this.service.getList) {
                var $updateSource = _.throttle(this.$updateSource.bind(this), data.delaySearch);
                this.$watch('searchValue', function (newValue, oldValue) {
                    if (oldValue === undefined) {
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
                var indexOf = this.indexOf(selected, item);
                if (indexOf !== -1) {
                    selected.splice(indexOf, 1);
                } else {
                    if (item) {
                        selected.push(item);
                    } else {
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

            if (multiple && !data.selectedClose && item) {
                return
            }
            this.toggle(false);
        },
        selectAll: function (isSelected) {
            var data = this.data;
            if (isSelected) {
                data.selected = this.filterData(data.source);
            } else {
                data.selected = [];
            }
            this.toggle(false);
        },
        toggle: function () {
            var data = this.data;
            data.closeClearSearchText && data.canSearch
            && selectUtil.clearDataToNUll(data, 'searchValue', '');
            this.supr();
        },
        request: function (options) {
            var data = this.data;
            var oldError = options.error,
                oldSuccess = options.success,
                oldComplete = options.complete;
            data.loading = true;

            options.success = function (data) {
                oldSuccess && oldSuccess(data);
                this.$update('loading', false);
            }.bind(this);
            options.error = function (data) {
                oldError && oldError(data);
                this.$update('loading', false);
            }.bind(this);

            options.complete = function (data) {
                oldComplete && oldComplete(data);
                this.$update('loading', false);
            }.bind(this);
            Ajax.request(options)
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
    }, privateMethod)
);

module.exports = Select;