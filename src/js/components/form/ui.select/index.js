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
var util = require('./common/util');
var Multiple = require('./plugins/multiple');
var PrivateMethod = require('./plugins/private.method');
var tip = require('../../widget/tooltip');

require('../check');

/**
 * @class Select
 * @extend Dropdown
 * @param {object}            [options.data]                          = 绑定属性
 * @param {object[]}          [options.data.source=[]]                <=> 数据源
 * @param {string}            [options.data.source[].name]            => 每项的内容
 * @param {boolean}           [options.data.source[].disabled=false]  => 禁用此项
 * @param {string}            [options.data.source[].tip]             => 禁用此项显示的提示，如果没有则不显示
 * @param {string}            [options.data.source[].placement]       => 禁用此项显示提示的方向，默认下方
 * @param {boolean}           [options.data.source[].divider=false]   => 设置此项为分隔线
 * @param {object}            [options.data.selected]                 <=> 当前选择项
 * @param {string|number}     [options.data.value]                    <=> 当前选择值
 * @param {string}            [options.data.key=id]                   => 数据项的键
 * @param {string}            [options.data.nameKey=name]             => 数据项的name键
 * @param {string}            [options.data.placeholder=请选择]        => 默认项的文字，如果`placeholder`为空并且没有选择项时，将会自动选中第一项。
 * @param {boolean}           [options.data.required=false]           => 是否必填
 * @param {boolean}           [options.data.readonly=false]           => 是否只读
 * @param {boolean}           [options.data.disabled=false]           => 是否禁用
 * @param {boolean}           [options.data.visible=true]             => 是否显示
 * @param {string}            [options.data.class]                    => 补充class
 * @param {object}            [options.service]                       @=> 数据服务
 * @param {boolean}           [options.data.canSearch=false]          => 是否可搜索
 * @param {boolean}           [options.data.isCaseSensitive=false]    => 是否区分大小写
 * @param {boolean}           [options.data.noMatchText=无匹配项]       => 搜索无结果文案
 * @param {Number}            [options.data.delaySearch=300]          => 异步搜索的延迟
 * @param {Number}            [options.data.maxShowCount=1000]        => 最大展示条数
 * @param {boolean}           [options.data.multiple=false]           => 是否多选
 * @param {string}            [options.data.separator=,]              => 多选value分隔符
 * @param {boolean}           [options.data.selectedClose=true]       => 多选时选中非全部和请选择项时 是否关闭
 * @param {boolean}           [options.data.canSelectAll=false]       => 是否有全选
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
            selected: undefined,
            key: 'id',
            nameKey: 'name',
            value: undefined,

            // 搜索的文案
            searchValue: '',
            canSearch: undefined,
            // 默认不区分大小写
            isCaseSensitive: true,
            noMatchText: '无匹配项',
            delaySearch: 300,
            maxShowCount: 1000,

            separator: ',',
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

            //因为存在source异步获取的情况 如果source长度为0表示source还未获取
            if (oldValue === undefined && !(Array.isArray(data.source) && data.source.length)) {
                return;
            }
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
                    var newValueArr = (newValue + '').split(data.separator);
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
                newValue = data.source = newValue.map(function (value) {
                    return itemHandleFn(value);
                });
            }

            if (data.multiple) {
                if (value !== undefined && value !== null) {
                    var valueArr = (value + '').split(data.separator);
                    data.selected = [].concat(value ? newValue.filter(function (item) {
                            return valueArr.indexOf(item[key] + '') !== -1;
                        }, this) || [] : []);
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


            /**
             * 1.明确指定isCanSearch为true直接开始搜索项功能
             * 2.当选这项多余20个，没有指定可搜索时 自动开启
             */
            var canSearch;
            if(this.hasOwnProperty('__canSearch')){
                canSearch = this.__canSearch;
            }else{
                canSearch = this.__canSearch = data.canSearch;
            }
            data.canSearch = (canSearch === true) || (Array.isArray(newValue) && newValue.length > 20 && canSearch !== false);
        });

        this.$watch('multiple', function (newValue, oldValue) {
            if (oldValue === undefined) {
                return;
            }
            if (newValue) {
                if (!Array.isArray(data.selected)) {
                    data.selected = data.selected ? [data.selected] : data.selected;
                }
            } else {
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
        if (multiple) {
            this.searchInputFocus();
            if (!data.selectedClose && item) {
                data.canSearch && this.clearSearchValue();
                return
            }
        }
        this.toggle(false);
    },
    toggle: function (open, e) {
        e && e.stopPropagation();
        var data = this.data;
        data.canSearch && this.clearSearchValue();
        this.supr(open);
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
}).use(Multiple).use(PrivateMethod);

module.exports = Select;
