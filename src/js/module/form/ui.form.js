'use strict';

var _ = require('../../ui-base/_.js');
var ajax = require('../../ui-base/ajax.js');
var Validation = require('../../util/validation.js');

var template = require('./ui.form.html');

/**
 * Form继承于Validation
 * 1. 具有和validation一样的校验功能, this.$refs.formgroup.validate().success
 * 2. 实现统一的获取选择数据的接口；
 *
 */
var UIForm = Validation.extend({
    name: 'ui.form',
    template: template,
    config: function (data) {
        this.selectors = [];

        _.extend(data, {
            service: null
        });
        this.supr(data);
    },

    init: function() {
        this.__initSelectorSource();
    },
    __initSelectorSource: function() {
        var controls = this.controls;
        this.selectors = controls.filter(function($formitem) {
            return !!$formitem.data.sourceKey;
        });

        if (!this.data.service || !this.selectors.length) { return; }

        this.__reqSource();
    },
    __getSourceKeys: function() {
        return this.selectors.map(function($formitem) {
            return $formitem.data.sourceKey;
        })
    },
    __reqSource: function() {
        var keys = this.__getSourceKeys();

        ajax.request({
            url: this.data.service,
            method: 'get',
            data: keys.join(','),
            success: this.__cbReqSource.bind(this)
        })
    },
    __cbReqSource: function() {

    }
});

module.exports = UIForm;