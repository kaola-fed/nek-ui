/**
 * ------------------------------------------------------------
 * CheckGroup 输入扩展
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var SourceComponent = require('../../../ui-base/sourceComponent');
var template = require('./index.html');
var _ = require('../../../ui-base/_');
var Check = require('../check');
var Validation = require('../../../util/validation');

/**
 * @class CheckGroup
 * @extend CheckGroup
 * @param {object}    [options.data]                    = 绑定属性
 * @param {object[]}  [options.data.source=[]]          <=> 数据源
 * @param {string}    [options.data.value='']           <=> 选择的值,逗号间隔的id值
 * @param {string}    [options.data.source[].name=[]]   => 每项的内容
 * @param {string}    [options.data.key=id]             => 数据项的键
 * @param {string}    [options.data.nameKey=name]       => 数据项的name键
 * @param {number}    [options.data.min]                => 最少选几项
 * @param {number}    [options.data.max]                => 最多选几项
 * @param {boolean}   [options.data.required]           => 是否必选
 * @param {string}    [options.data.message]            => 校验错误提示信息
 * @param {boolean}   [options.data.block=false]        => 多行显示
 * @param {boolean}   [options.data.readonly=false]     => 是否只读
 * @param {boolean}   [options.data.disabled=false]     => 是否禁用
 * @param {boolean}   [options.data.visible=true]       => 是否显示
 * @param {string}    [options.data.class]              => 补充class
 * @param {object}    [options.service]                 @=> 数据服务
 */
var CheckGroup = SourceComponent.extend({
    name: 'check.group',
    template: template,
    /**
     * @protected
     */
    config: function() {
        this.defaults({
            // @inherited source: [],
            block: false,
            source: [],
            min: 0,
            max: 1000,
            nameKey: 'name',
            key: 'id',
            value: ''
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
    init: function() {
        this.$watch('source', function(source) {
            if (!source || !(source instanceof Array)) { return console.error('source of check.group is not an array'); }

            var key = this.data.key,
                value = this.data.value || '',
                values = value.split(',');

            source.forEach(function(item) {
                if (values.indexOf(item[key] + '') != -1) {
                    item.checked = true;
                }
            });
        });
        this.$watch('value', function(newValue) {
            var source = this.data.source;
            if (newValue === undefined || newValue === null) return;

            if (source) {
                var key = this.data.key,
                    value = newValue || '',
                    values = value.split(',');
                source.forEach(function(item) {
                    if (values.indexOf(item[key] + '') != -1) {
                        item.checked = true;
                    } else {
                        item.checked = false;
                    }
                });
            }

        });
    },
    /**
     * @method validate() 根据min, max验证组件的值是否正确
     * @public
     * @return {object} result 结果
     */
    validate: function() {
        var source = this.data.source,
            result = { success: true, message: ''},
            required = this.data.required,
            min = this.data.min ? this.data.min : required/1,
            max = this.data.max,
            checked = source.filter(function(item) { return !!item.checked; }),
            len = checked.length;

        if (len < min || len > max) {
            result.success = false;
            result.message = this.data.message || ( '请选择(' + min + ',' + max + ']个选项' );
            this.data.state = 'error';
        } else {
            result.success = true;
            result.message = '';
            this.data.state = '';
        }
        this.data.tip = result.message;

        this.$emit('validate', {
            sender: this,
            result: result
        });

        return result;
    },
    /**
     * method _onCheck() 点击check时,改变对应的value值
     * @private
     */
    _onCheck: function(item) {
        item.checked = !item.checked;

        var key = this.data.key,
            source = this.data.source,
            checkedList = source.filter(function(item) { return item.checked; }),
            ids = checkedList.map(function(item) { return item[key]; });

        this.$update('value', ids.join(','));

        this.data.tip && this.validate();
    }
});

module.exports = CheckGroup;