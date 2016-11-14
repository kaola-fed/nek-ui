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
        this.data.$$NEK = {
            id: 100,
            name: this.name,
            desc: '按钮',
            layout: { cols: 1 },
            conf: [{
                key: 'title',
                value: this.data.title,
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
            }, {
                key: 'type',
                value: this.data.type,
                desc: '类型',
                type: 'select',
                selects: ['default', 'primary', 'info', 'success', 'warning', 'error'],
            }]
        };
        return this.data.$$NEK;
    }
});

module.exports = UIButton;
