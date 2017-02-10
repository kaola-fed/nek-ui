/**
 * ------------------------------------------------------------
 * Steps     步骤条
 * @author   ziane(zianecui@gmail.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../../../ui-base/component');
var template = require('./index.html');
var _ = require('../../../ui-base/_');

/**
 * @class Tabs
 * @extend Component
 * @param {object}      [options.data]                = 绑定属性
 * @param {object}      [options.data.steps=null]     <=> 类似于ui.select的source
 * @param {string}      [options.data.current=null]   <=> 当前状态
 * @param {boolean}     [options.data.size=false]     =>  当前尺寸
 */
var Steps = Component.extend({
    name: 'steps',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            steps: [],
            current: 0,
            size: '',
            currentIndex: 0
        });
        this.supr();
    },
    init: function () {
        this.supr();
        this.juedgeFinishedItem();
    },
    juedgeFinishedItem: function () {
        var data = this.data;
        var current = data.current;
        var steps = data.steps;

        steps.forEach(function(item, index) {
            if (item.status == current) {
                data.currentIndex = index;
            }
        })
    }
});

module.exports = Steps;