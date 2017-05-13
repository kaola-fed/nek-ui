/**
 * ------------------------------------------------------------
 * Select2Group 多级选择2
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../../../ui-base/component');
var template = require('./index.html');
var _ = require('../../../ui-base/_');
var Validation = require('../../../util/validation');

/**
 * @class SelectGroup
 * @extend Component
 * @param {object}            [options.data]                    = 绑定属性
 * @param {object[]}          [options.data.source=[]]          <=> 数据源
 * @param {string}            [options.data.source[].name]      => 每项的内容
 * @param {boolean}           [options.data.source[].disabled=false]  => 禁用此项
 * @param {boolean}           [options.data.source[].divider=false]   => 设置此项为分隔线
 * @param {number}            [options.data.depth=1]            => 层级数
 * @param {boolean}           [options.data.required]           => 是否必填 
 * @param {object}            [options.data.selected=[]]        <=  最后的选择项
 * @param {object[]}          [options.data.selecteds=[]]       <=> 所有的选择项
 * @param {string[]|number[]} [options.data.values=[]]          <=> 所有的选择值
 * @param {string}            [options.data.key=id]             => 数据项的键
 * @param {string[]}          [options.data.placeholders=[]]    => 默认项的文字
 * @param {boolean}           [options.data.hideTip=false]      => 是否显示校验错误信息
 * @param {boolean}           [options.data.readonly=false]     => 是否只读
 * @param {boolean}           [options.data.disabled=false]     => 是否禁用
 * @param {boolean}           [options.data.visible=true]       => 是否显示
 * @param {string}            [options.data.class]              => 补充class
 * @param {object}            [options.service]                 @=> 数据服务
 */
var SelectGroup = Component.extend({
    name: 'select.group',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            hideTip: false,
            depth: 1,
            sources: [],
            selected: undefined,
            selecteds: [],
            key: 'id',
            values: [],
            placeholders: [],
            required:false
        });
        this.supr();

        this.$watch('selected', function(newValue, oldValue) {
            /**
             * @event change 最后的选择项改变时触发
             * @property {object} sender 事件发送对象
             * @property {object} selected 最后的选择项
             * @property {object} selecteds 所有的选择项
             * @property {string} key 数据项的键
             * @property {string[]|number[]} values 所有的选择值
             */
            this.$emit('change', {
                sender: this,
                selected: newValue,
                selecteds: this.data.selecteds,
                key: this.data.key,
                values: this.data.values
            });

            this.data.tip && this.validate();
        });

        this.data.sources[0] = this.data.source;

        var $outer = this.$outer;
        if($outer && $outer instanceof Validation) {
            $outer.controls.push(this);

            this.$on('destroy', function() {
                var index = $outer.controls.indexOf(this);
                $outer.controls.splice(index, 1);
            });
        }
    },
    /**
     * @private
     */
    _onChange: function(item, level) {
        // 由内部<select2>控制
        // if(this.data.readonly || this.data.disabled || (item && (item.disabled || item.divider)))
        //     return;

        this.data.sources[level + 1] = item ? item.children : undefined;
        for(var i = level + 2; i < this.data.depth; i++)
            this.data.sources[i] = undefined;

        if(level === this.data.depth - 1)
            this.data.selected = item;

        /**
         * @event select 选择某一项时触发
         * @property {object} sender 事件发送对象
         * @property {object} selected 当前选择项
         * @property {object} level 当前选择的层级
         */
        this.$emit('select', {
            sender: this,
            selected: item,
            selecteds: this.data.selecteds,
            level: level
        });
    },
    /**
     * @method validate() 根据required验证组件的值是否正确
     * @public
     * @return {object} result 结果
     */
    validate: function(on) {

        var data = this.data,
            result = { success: true, message: '' },
            values = this.data.values,
            depth  = this.data.depth;

        if (data.required && (values.length < depth)) {
            result.success = false;
            result.message = this.data.message || this.$trans('PLEASE_SELECT');
            this.data.state = 'error';
        } else {
            result.success = true;
            result.message = '';
            this.data.state = '';
        }
        this.data.tip = result.message;

        this.$emit('validate', {
            sender: this,
            on: on,
            result: result
        });

        return result;
    },
});

module.exports = SelectGroup;