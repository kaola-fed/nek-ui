/**
 * ------------------------------------------------------------
 * ui.button  按钮
 * @author   Cody Chan<int64ago@gmail.com>
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../../ui-base/component.js');
var template = require('./index.html');
var _ = require('../../ui-base/_.js');

var UIButton = Component.extend({
    name: 'ui.button',
    template: template,
    config: function() {
        _.extend(this.data, {
            title: '按钮',
            // default/primary/info/success/warning/error
            type: 'default',
        });
        this.supr();
    },
    $$NEK: function() {
        var data = this.data;
        return {
            id: 100,
            cols: 1,
            conf: [
                {
                    key: 'title',
                    // 默认值，默认取组件默认值
                    default: data.title || '',
                    // 配置描述
                    desc: '标题',
                    // none: radio
                    // string: input-text
                    // number: input-number
                    // boolean: radio
                    // select: select
                    // array: checkbox
                    // expresion: input-text -> key={exp}
                    type: 'string',
                    // 只有在 type 是 select/array 的时候才有意义
                    selects: [],
                },
                {
                    key: 'type',
                    default: data.type || 'default',
                    desc: '类型',
                    type: 'select',
                    selects: ['default', 'primary', 'info', 'success', 'warning', 'error'],
                },
            ]
        }
    }
});

module.exports = UIButton;
