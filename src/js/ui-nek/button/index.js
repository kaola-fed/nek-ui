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
        return {
            id: 100,
            name: this.name,
            desc: '按钮',
            layout: { cols: 1 },
            conf: [{
                key: 'title',
                value: this.data.title,
                // 配置描述
                desc: '标题',
                // none: 配置页(checkbox) 生成页(attr)
                // string: 配置页(input-text) 生成页(attr="xx")
                // number: 配置页(input-number) 生成页(attr=3)
                // boolean: 配置页(checkbox) 生成页(attr=true)
                // select: 配置页(select) 生成页(attr="selected")
                // array: 配置页(checkbox-group) 生成页(attr={arr})
                // expresion: 配置页(input-text) 生成页(attr={exp})
                type: 'string',
                // 只有在 type 是 select/array 的时候才有意义
                selects: [],
            }, {
                key: 'type',
                value: this.data.type,
                desc: '类型',
                type: 'select',
                selects: ['default', 'primary', 'info', 'success', 'warning', 'error'],
            }]
        };
    }
});

module.exports = UIButton;
