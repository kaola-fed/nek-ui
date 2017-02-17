/**
 * ------------------------------------------------------------
 * RadioGroup 输入扩展
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var SourceComponent = require('../../../ui-base/sourceComponent');
var template = require('./index.html');
var _ = require('../../../ui-base/_');
var Validation = require('../../../util/validation');

/**
 * @class RadioGroup
 * @extend SourceComponent
 * @param {object}        [options.data]                  = 绑定属性
 * @param {object[]}      [options.data.source=[]]        <=> 数据源
 * @param {string}        [options.data.nameKey=name]     => 数据项的name键
 * @param {string}        [options.data.key=id]           => 数据项的key键
 * @param {string}        [options.data.source[].name]    => 每项的内容
 * @param {object}        [options.data.selected]         <=> 当前选择的对象
 * @param {number|string} [options.data.value]            <=> 当前选择的值
 * @param {boolean}       [options.data.block=false]      => 多行显
 * @param {boolean}       [options.data.required=false]   => 是否必选
 * @param {string}        [options.data.message]          => 验证错误提示
 * @param {boolean}       [options.data.readonly=false]   => 是否只读
 * @param {boolean}       [options.data.disabled=false]   => 是否禁用
 * @param {boolean}       [options.data.visible=true]     => 是否显
 * @param {string}        [options.data.class]            => 补充class
 * @param {object}        [options.service]               @=> 数据服务
 */
var RadioGroup = SourceComponent.extend({
    name: 'radio.group',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            selected: null,
            _radioGroupId: new Date(),
            required: false,
            nameKey: 'name',
            key: 'id',
            value: '',
        });
        this.supr();

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
     * @method select(item) 选择某一
     * @public
     * @param  {object} item 选择
     * @return {void}
     */
    select: function(item) {
        if(this.data.readonly || this.data.disabled)
            return;

        var data = this.data;
        var key = data.key;
        var value = item[key];
        data.value = value === undefined ? item[nameKey] : value;

        data.selected = item;
        /**
         * @event select 选择某一项时触发
         * @property {object} sender 事件发送对象
         * @property {object} selected 当前选择
         */
        this.$emit('select', {
            sender: this,
            selected: item
        });

        this.data.tip && this.validate();
    },
    /**
     * @method validate() 根据required验证组件的值是否正确
     * @public
     * @return {object} result 结果
     */
    validate: function(on) {
        if (!this.data.required) { return {success:true}; }

        var result = { success: true, message: '' },
            selected = this.data.selected;

        if (!selected) {
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
    },
});

module.exports = RadioGroup;