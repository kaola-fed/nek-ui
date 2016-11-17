'use strict';

var Component = require('../../ui-base/component.js');
var template = require('./hint.html');

/**
 * Form继承于Validation
 * 1. 具有和validation一样的校验功能, this.$refs.formgroup.validate().success
 * 2. 实现统一的获取选择数据的接口；
 *
 * @example
 * <hint message="123" />
 */
var Hint = Component.extend({
    name: 'hint',
    template: template,
    config: function (data) {
        this.supr(data);
    }
});

module.exports = Hint;
