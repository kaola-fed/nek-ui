//
// /**
//  * @filter  KLModal     模态对话框
//  * @author  sensen(rainforest92@126.com)
//  */

const Component = require('../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../ui-base/_');

/**
 * @class KLModal
 * @extend Component
 * @param {object}            [options.data]                      = 绑定属性
 * @param {string}            [options.data.title=提示]            => 对话框标题
 * @param {string}            [options.data.content]              => 对话框内容
 * @param {string}            [options.data.contentTemplate]      => 对话框内容模板，用于支持复杂内容的自定义。
 * @param {string}            [options.data.footerTemplate]       => 对话框底部模板
 * @param {boolean}           [options.data.okDisabled=false]     => Disable 确认按钮
 * @param {boolean}           [options.data.cancelDisabled=false] => Disable 取消按钮
 * @param {boolean}           [options.data.hasFooter=true]       => 是否显示 footer
 * @param {boolean}           [options.data.isCanClose=true]      => 是否允许取消关闭
 * @param {string/boolean}    [options.data.okButton=true]        => 是否显示确定按钮。值为`string`时显示该段文字。
 * @param {string/boolean}    [options.data.cancelButton=false]   => 是否显示取消按钮。值为`string`时显示该段文字。
 * @param {string}            [options.data.class]                => 补充class
 * @param {boolean}           [options.data.noClose]              => ok时是否关闭弹窗
 * @param {number}            [options.data.minHeight]            => 内容区域最小高度
 * @param {number}            [options.data.maxHeight]            => 内容区域最大高度，超出则显示滚动条
 */
const KLModal = Component.extend({
  name: 'kl-modal',
  template,
  config() {
    _.extend(this.data, {
      title: this.$trans('NOTICE'),
      content: '',
      okButton: true,
      with: 400,
      cancelButton: false,
      noClose: false,
      okDisabled: false,
      cancelDisabled: false,
      hasFooter: true,
      isCanClose: true,
    });
    this.supr();
  },

  init() {
    this.supr();

    // 如果不是内嵌组件，则嵌入到document.body中
    if (this.$root === this) this.$inject(document.body);
  },
  /**
     * @method KLModal#close(result) 关闭对话框
     * @param  {boolean} result 点击确定还是取消
     * @return {void}
     */
  close(result, event) {
    /**
         * @event KLModal#close  关闭对话框时触发
         * @property {boolean} result 点击事件按钮，确定/取消
         */
    this.$emit('close', {
      result,
    });
    const that = this;
    // setTimeout为了先触发下拉的收起（如果contentTemplate中有下拉组件）。
    setTimeout(() => {
      result ? that.ok(event) : that.cancel();
    });
  },
  /**
     * @method KLModal#ok() 确定对话框
     * @return {void}
     */
  ok(event) {
    /**
         * @event KLModal#ok 确定对话框时触发
         */
    this.$emit('ok', event);
    !this.data.noClose && this.destroy();
  },
  /**
     * @method KLModal#cancel() 取消对话框
     * @return {void}
     */
  cancel() {
    /**
         * @event KLModal#cancel 取消对话框时触发
         */
    this.$emit('cancel');
    this.destroy();
  },
  _onDragStart($event) {
    const dialog = $event.proxy;
    dialog.style.left = `${dialog.offsetLeft}px`;
    dialog.style.top = `${dialog.offsetTop}px`;
    dialog.style.zIndex = '1000';
    dialog.style.position = 'absolute';
  },
});

/**
 * @static
 * @param  {string} content 对话框内容
 * @param  {string} title=提示 对话框标题
 */
KLModal.alert = function (content, title, okButton) {
  const modal = new this({
    data: {
      content,
      title,
      okButton,
    },
  });

  return modal;
};

/**
 * @static
 * @param  {string} content 对话框内容
 * @param  {string} title=提示 对话框标题
 */
KLModal.confirm = function (content, title, okButton, cancelButton) {
  const modal = new this({
    data: {
      content,
      title,
      okButton,
      cancelButton: cancelButton || true,
    },
  });

  return modal;
};

module.exports = KLModal;
