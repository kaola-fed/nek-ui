/**
 * ------------------------------------------------------------
 * ui.button  按钮
 * @author   Cody Chan<int64ago@gmail.com>
 * ------------------------------------------------------------
 */

'use strict';

var validator = require('validator');
var bowser = require('bowser');
var Component = require('../../../ui-base/component');
var template = require('./index.html');
var _ = require('../../../ui-base/_');

/**
 * @class Input
 * @extend Component
 * @param {object}      [options.data]                = 绑定属性
 * @param {string}      [options.data.title=确定]      => 按钮标题
 * @param {string}      [options.data.type=default]   => 按钮样式, primary, default, info, success, warn, error
 * @param {string}      [options.data.size=normal]    => 按钮大小, xs, sm, lg, xl
 * @param {string}      [options.data.icon]           => 按钮图标,action不能满足需求时使用;
 * @param {string}      [options.data.action]         => 按钮操作类型, 每种类型有对应的icon;
 * @param {string}      [options.data.link]           => 按钮的链接
 * @param {string}      [options.data.target=_self]   => 按钮链接的打开方式
 * @param {string}      [options.data.shape]          => circle, icon或者默认
 * @param {string}      [options.data.download]       => 下载链接
 * @param {boolean}     [options.data.loading=false]  => 是否正在加载
 * @param {boolean}     [options.data.disabled=false] => 禁止按钮
 * @param {boolean}     [options.data.class=false]    => 样式扩展
 */
var actionIcons= {
  /* 查看 */
  view: 'eye',
  /* 发送 */
  send: 'send-o',
  /* 撤销 */
  undo: 'reply-all',
  /* 取消 */
  cancel: 'arrow-circle-left',
  /* 删除 */
  remove: 'trash',
  /* 更新 */
  update: 'refresh',
  /* 提交 */
  submit: 'legal',
  /* 保存 */
  save: 'save',
  /* 复制 */
  copy: 'copy',
  /* 通过 */
  pass: 'success',
  /* 驳回 */
  reject: 'warning',
  /* 返回 */
  backward: 'angle-double-left',
  /* 下载 */
  download: 'download',
  /* 上传 */
  upload: 'upload',
  /* 查询 */
  search: 'search',
  /* 编辑 */
  edit: 'edit',
  /* 添加 */
  add: 'add',
  /* 链接 */
  link: 'link',
  /* 单行添加 */
  plus: 'plus'
};


var UIButton = Component.extend({
    name: 'ui.button',
    template: template,
    config: function() {
        _.extend(this.data, {
            title: this.$trans('CONFIRM'),
            type: 'default',
            size: 'normal',
            icon: '',
            loading: false,
            disabled: false,
            actionIcons: actionIcons,
            target: '_self'
        });
        this.supr();
    },

    init: function() {
        this.supr();
        this.$watch('download', function(url) {
            if (validator.isURL(url)) {
                if (bowser.chrome) {
                    var a = document.createElement('a');
                    a.href = url;
                    a.download = url;
                    a.click();
                } else {
                    location.href = url;
                }
                this.data.download = '';
            }
        });
    },

    onClick: function(e) {
        var loading = this.data.loading;
        if (!loading) {
            this.$emit('click', {
                sender: this,
                e: e
            });
        }
        return !!this.data.link;
    },

    onMouseUp: function (e) {
        e.target.blur();
    }
});

module.exports = UIButton;
