    /**
 * ------------------------------------------------------------
 * ListView  列表视图
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var SourceComponent = require('../../../../ui-base/sourceComponent');
var template = require('./index.html');
var _ = require('../../../../ui-base/_');

/**
 * @class ListView
 * @extend SourceComponent
 * @param {object}      [options.data]                              = 绑定属性
 * @param {object[]}    [options.data.source=[]]                    <=> 数据源
 * @param {string}      [options.data.source[].name]                => 每项的内容
 * @param {boolean}     [options.data.source[].disabled=false]      => 禁用此项
 * @param {boolean}     [options.data.source[].divider=false]       => 设置此项为分隔线
 * @param {boolean}     [options.data.source[].selected=false]      => 多选时此项是否选中
 * @param {object}      [options.data.selected]                     <=> 当前选择项。多选时无效。
 * @param {boolean}     [options.data.multiple=false]               => 是否可以多选
 * @param {string}      [options.data.itemTemplate]                 @=> 单项模板
 * @param {boolean}     [options.data.readonly=false]               => 是否只读
 * @param {boolean}     [options.data.disabled=false]               => 是否禁用
 * @param {boolean}     [options.data.visible=true]                 => 是否显示
 * @param {string}      [options.data.class]                        => 补充class
 * @param {object}      [options.service]                           @=> 数据服务
 */
var ListView = SourceComponent.extend({
    name: 'list-view',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            selected: null,
            itemTemplate: null,
            multiple: false
        });
        this.supr();
    },
    /**
     * @method select(item) 选择某一项
     * @public
     * @param  {object} item 选择项
     * @return {void}
     */
    select: function(item) {
        if(this.data.readonly || this.data.disabled || item.disabled || item.divider)
            return;

        if(this.data.multiple)
            return item.selected = !item.selected;

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
    }
});

module.exports = ListView;