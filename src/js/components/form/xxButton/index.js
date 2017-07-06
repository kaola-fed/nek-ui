/**
 * ------------------------------------------------------------
 * xxButton  按钮
 * ------------------------------------------------------------
 */

const validator = require('validator');
const bowser = require('bowser');
const Component = require('../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../ui-base/_');

/**
 * @class xxButton
 * @extend Component
 * @param {object}      [options.data]                => 绑定属性
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
const actionIcons = {
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
    plus: 'plus',
};

const xxButton = Component.extend({
    name: 'xx-button',
    template,
    config() {
        _.extend(this.data, {
            title: this.$trans('CONFIRM'),
            type: 'default',
            size: 'normal',
            icon: '',
            loading: false,
            disabled: false,
            actionIcons,
            target: '_self',
        });
        this.supr();
    },

    init() {
        this.supr();
        this.$watch('download', function (url) {
            if (validator.isURL(url)) {
                if (bowser.chrome) {
                    const a = document.createElement('a');
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

    onClick(e) {
        const loading = this.data.loading;
        if (!loading) {
            this.$emit('click', {
                sender: this,
                e,
            });
        }
        return !!this.data.link;
    },

    onMouseUp(e) {
        e.target.blur();
    },
});

module.exports = xxButton;
