'use strict';

var Component = require('../../ui-base/component.js');
var template = require('./tooltip.html');
var dom = require('regularjs').dom;

/**
 * @class Tooltip
 * @extend Component
 * @param {object}                  options.data                     =  绑定属性
 * @param {string=''}               options.data.tip                 => 文字提示
 */
var Tooltip = Component.extend({
    name: 'tooltip',
    template: template,
    config: function (data) {
        this.supr(data);

        this._onMouseEnter = this._onMouseEnter.bind(this);
        this._onMouseLeave = this._onMouseLeave.bind(this);

    },
    init: function() {
        this.data.element = dom.element(this);
        const element = this.data.element;

        dom.on(element, 'mouseenter', this._onMouseEnter);
        dom.on(element, 'mouseleave', this._onMouseLeave);
    },
    _onMouseEnter: function() {
        var element = this.data.element;
        element.classList.add('u-tooltip', 'f-csp');
        element.title = this.data.tip;
    },
    _onMouseLeave: function() {
        var element = this.data.element;
        element.classList.remove('u-tooltip', 'f-csp');
        element.title = '';
    }
});

module.exports = Tooltip;
