/**
 * ------------------------------------------------------------
 * Modal     模态对话框
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../../../ui-base/component');
var template = require('./index.html');
var _ = require('../../../ui-base/_');

/**
 * @class Modal
 * @extend Component
 * @param {object}            [options.data]                      = 绑定属性 | Binding Properties
 * @param {string}            [options.data.title=提示]            => 对话框标题 | Title of Dialog
 * @param {string}            [options.data.content]              => 对话框内容
 * @param {string}            [options.data.contentTemplate]      => 对话框内容模板，用于支持复杂内容的自定义。
 * @param {string}            [options.data.footerTemplate]       => 对话框底部模板
 * @param {boolean}           [options.data.okDisabled=false]     => Disale 确认按钮
 * @param {boolean}           [options.data.cancelDisabled=false] => Disale 取消按钮
 * @param {string|boolean}    [options.data.okButton=true]        => 是否显示确定按钮。值为`string`时显示该段文字。
 * @param {string|boolean}    [options.data.cancelButton=false]   => 是否显示取消按钮。值为`string`时显示该段文字。
 * @param {string}            [options.data.class]                => 补充class
 * @param {boolean}           [options.data.noClose]              => ok时是否关闭弹窗
 * @param {number}            [options.data.minHeight]            => 内容区域最小高度
 * @param {number}            [options.data.maxHeight]            => 内容区域最大高度，超出则显示滚动条
 */
var Modal = Component.extend({
    name: 'modal',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            title: this.$trans('NOTICE'),
            content: '',
            okButton: true,
            with: 400,
            cancelButton: false,
            noClose: false,
            okDisabled: false,
            cancelDisabled: false,
        });
        this.supr();
    },
    /**
     * @protected
     */
    init: function() {
        this.supr();

        // 如果不是内嵌组件，则嵌入到document.body中
        if(this.$root === this)
            this.$inject(document.body);
    },
    /**
     * @method close(result) 关闭对话框
     * @public
     * @param  {boolean} result 点击确定还是取消
     * @return {void}
     */
    close: function(result, event) {
        /**
         * @event close 关闭对话框时触发
         * @property {boolean} result 点击了确定还是取消
         */
        this.$emit('close', {
            result: result
        });
        result ? this.ok(event) : this.cancel();
    },
    /**
     * @method ok() 确定对话框
     * @public
     * @return {void}
     */
    ok: function(event) {
        /**
         * @event ok 确定对话框时触发
         */
        this.$emit('ok', event);
        !this.data.noClose && this.destroy();
    },
    /**
     * @method cancel() 取消对话框
     * @public
     * @return {void}
     */
    cancel: function() {
        /**
         * @event cancel 取消对话框时触发
         */
        this.$emit('cancel');
        this.destroy();
    },
    _onDragStart: function($event) {
        var dialog = $event.proxy;
        dialog.style.left = dialog.offsetLeft + 'px';
        dialog.style.top = dialog.offsetTop + 'px';
        dialog.style.zIndex = '1000';
        dialog.style.position = 'absolute';
    }
});

/**
 * @method alert(content[,title]) 弹出一个alert对话框。关闭时始终触发确定事件。
 * @static
 * @public
 * @param  {string} [content] 对话框内容
 * @param  {string} [title=提示] 对话框标题
 * @return {Modal} modal 返回该对话框
 */
Modal.alert = function(content, title, okButton) {
    var modal = new this({
        data: {
            content: content,
            title: title,
            okButton: okButton
        }
    });

    return modal;
}

/**
 * @method confirm(content[,title]) 弹出一个confirm对话框
 * @static
 * @public
 * @param  {string} [content] 对话框内容
 * @param  {string} [title=提示] 对话框标题
 * @return {Modal} modal 返回该对话框
 */
Modal.confirm = function(content, title, okButton, cancelButton) {
    var modal = new this({
        data: {
            content: content,
            title: title,
            okButton: okButton,
            cancelButton: cancelButton || true
        }
    });

    return modal;
}

// var oldExtend = Modal.extend;
// Modal.extend = function() {
//     var extended = oldExtend.apply(this, arguments);
//     extended.alert = this.alert;
//     extended.confirm = this.confirm;
//     return extended;
// }

module.exports = Modal;
