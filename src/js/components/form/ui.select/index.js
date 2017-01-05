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
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            // @inherited open: false
            selected: undefined,
            key: 'id',
            nameKey: 'name',
            value: undefined,
            placeholder: '请选择',
            required: false
        });
        this.supr();

        this.$watch('selected', function(newValue, oldValue) {
            this.data.value = newValue ? newValue[this.data.key] : newValue;

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
                key: this.data.key,
                value: this.data.value
            });
        });

        this.$watch('value', function(newValue, oldValue) {
            if(newValue === undefined || newValue === null)
                return this.data.selected = newValue;

            if(this.data.source) {
                if(!this.data.selected || this.data.selected[this.data.key] !== newValue)
                    this.data.selected = this.data.source.find(function(item) {
                        return item[this.data.key] == newValue;
                    }, this);
            }
        });

        this.$watch('source', function(newValue, oldValue) {
            if(newValue === undefined)
                return this.data.selected = undefined;

            if(!(newValue instanceof Array))
                throw new TypeError('`source` is not an Array!');

            if(newValue.length && (typeof newValue[0] === 'string' || typeof newValue[0] === 'number'))
                return this.data.source = newValue.map(function(name, index) {
                    return {id: index, name: name};
                });


            if(this.data.value !== undefined && this.data.value !== null) {
                this.data.selected = newValue.find(function(item) {
                    return item[this.data.key] == this.data.value;
                }, this);
            } else if(this.data.selected && newValue.indexOf(this.data.selected) < 0)
                this.data.selected = undefined;

            // 当placeholder为空时，自动选择第一项
            if(!this.data.placeholder && !this.data.selected)
                this.data.selected = newValue[0];
        });

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
     * @method select(item) 选择某一项
     * @public
     * @param  {object} item 选择项
     * @return {void}
     */
    select: function(item) {
        if(this.data.readonly || this.data.disabled || (item && (item.disabled || item.divider)))
            return;

        this.data.selected = item;

        /**
         * @event select 选择某一项时触发
         * @property {object} sender 事件发送对象
         * @property {object} selected 当前选择项
         */
        this.$emit('select', {
            sender: this,
            selected: item
        });

        this.toggle(false);
    },
    validate: function(on) {
        if (!this.data.required) { return {success:true}; }

        var result = { success: true, message: '' },
            value = this.data.value;
        value = ( typeof value == 'undefined' ) ? '' : value + '';
        if (!value.length) {
            result.success = false;
            result.message = this.data.message || '请选择';
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
    }
});

module.exports = Select;