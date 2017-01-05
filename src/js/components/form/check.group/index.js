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
 * @param {object}                  options.data                     =  绑定属性
 * @param {object[]=[]}             options.data.source             <=> 数据源
 * @param {string}                  options.data.source[].name       => 每项的内容
 * @param {string='name'}           options.data.nameKey             => 数据项的name键
 * @param {number}                  options.data.min                 => 最少选几项
 * @param {number}                  options.data.max                 => 最多选几项
 * @param {string}                  options.data.message             => 校验错误提示信息
 * @param {boolean=false}           options.data.block               => 多行显示
 * @param {boolean=false}           options.data.readonly            => 是否只读
 * @param {boolean=false}           options.data.disabled            => 是否禁用
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string=''}               options.data.class               => 补充class
 * @param {object}                  options.service                 @=> 数据服务
 */
var CheckGroup = SourceComponent.extend({
    name: 'check.group',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            block: false,
            source: [],
            min:0,
            max: 1000,
            nameKey: 'name'
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
     * @method validate() 根据min, max验证组件的值是否正确
     * @public
     * @return {object} result 结果
     */
    validate: function(on) {
        var source = this.data.source,
            result = { success: true, message: ''},
            min = this.data.min,
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
            on: on,
            result: result
        });

        return result;
    },
});

module.exports = CheckGroup;