/**
 * ------------------------------------------------------------
 * RadioGroup 输入扩展
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var SourceComponent = require('../../ui-base/sourceComponent.js');
var template = require('./radioGroup.html');
var _ = require('../../ui-base/_.js');

/**
 * @class RadioGroup
 * @extend SourceComponent
 * @param {object}                  options.data                     =  绑定属性
 * @param {object[]=[]}             options.data.source             <=> 数据源
 * @param {string}                  options.data.source[].name       => 每项的内容
 * @param {object=null}             options.data.selected           <=> 当前选择
 * @param {boolean=false}           options.data.block               => 多行显
 * @param {boolean=false}           options.data.readonly            => 是否只读
 * @param {boolean=false}           options.data.disabled            => 是否禁用
 * @param {boolean=true}            options.data.visible             => 是否显
 * @param {string=''}               options.data.class               => 补充class
 * @param {object}                  options.service                 @=> 数据服务
 */
var RadioGroup = SourceComponent.extend({
    name: 'radioGroup',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            selected: null,
            _radioGroupId: new Date()
        });
        this.supr();
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

        this.data.selected = item;
        /**
         * @event select 选择某一项时触发
         * @property {object} sender 事件发送对象
         * @property {object} selected 当前选择
         */
        this.$emit('select', {
            sender: this,
            selected: item
        });
    }
});

module.exports = RadioGroup;