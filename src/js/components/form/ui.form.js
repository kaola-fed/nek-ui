'use strict';

var _ = require('../../ui-base/_.js');
var ajax = require('../../ui-base/ajax.js');
var Validation = require('../../util/validation.js');

var template = require('./ui.form.html');

/**
 * @class UIForm
 * @extend Validation
 * @param {object}                  options.data                     =  绑定属性
 * @param {string=''}               options.data.service             => 全站异步获取source的接口地址
 * @param {string=''}               options.data.class               => 扩展样式
 * @param {string='data'}           options.data.sourcePath          => 获取到select数据后,读取json数据的路径
 */
var UIForm = Validation.extend({
    name: 'ui.form',
    template: template,
    config: function (data) {
        this.selectors = [];

        _.extend(data, {
            service: null,
            sourcePath: 'data',
            class: ''
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

        window.NEKSelects = window.NEKSelects || {};
        keys = keys.filter(function(key) { return !window.NEKSelects[key]; });

        this.selectors.forEach(function($formitem) {
            $formitem.data.source = window.NEKSelects[$formitem.data.sourceKey] || [];
        });


        if (!keys.length) { return; }
        this.keys = keys;
        ajax.request({
            url: this.data.service,
            method: 'get',
            type: 'json',
            data: {
                keys:keys.join(',')
            },
            success: this.__cbReqSource.bind(this)
        })
    },
    __cbReqSource: function(json) {
        var keys = this.keys,
            path = this.data.sourcePath,
            result = path === '' ? json : json[path];

        result = result || {};

        this.selectors.forEach(function($formitem) {
            var key = $formitem.data.sourceKey,
                $selectItem = $formitem.controls[0];
            if (keys.indexOf(key) != -1 && $selectItem) {
                $selectItem.data.source = result[key] || [];
            }
        });
    }
});

module.exports = UIForm;