/**
 * ------------------------------------------------------------
 * PopConfirm     气泡确认框
 * @author   ziane(zianecui@gmail.com)
 * ------------------------------------------------------------
 */

'use strict';

var confirmContent = require('./confirm.content.js');
var Component = require("../../ui-base/component.js");
var template = require('./popconfirm.html');
var dom = require('regularjs').dom;
var _ = require('../../ui-base/_.js');

/**
 * @class PopConfirm
 * @extend Component
 * @param {object}                  options.data                     =  绑定属性
* @param {string=''}                options.data.content             => 弹出框展示的文字
 * @param {string='tr'}             options.data.placement           => tips展示出的位置：四个值，tr,tl,br,bl
 */
var PopConfirm = Component.extend({
    name: 'popconfirm',
    template: template,
    config: function (data) {
        _.extend(data, {
            placement: 'tr',
            content: '',
            cancelButton: true,
            okButton: true,
            contentTemplate: ''
        });
        this.supr(data);
    },
    enter: function($event) {
        var elem = $event.target;
        var placement = this.data.placement;
        var innerHeight = window.innerHeight;
        var innerWidth = window.innerWidth;
        var offSetStyle;
        var newValue = {}

        newValue.offsetTop = elem.offsetTop;
        newValue.offsetLeft = elem.offsetLeft;
        newValue.clientWidth = elem.clientWidth;
        newValue.clientHeight = elem.clientHeight;

        if (placement == 'tr') {
            offSetStyle = 'left:' + newValue.offsetLeft + 'px' + ';bottom:' + (innerHeight - newValue.offsetTop + 10) + 'px;';
        }

        if (placement == 'tl') {
            offSetStyle = 'right:' + (innerWidth - newValue.offsetLeft - newValue.clientWidth) + 'px' + ';bottom:' + (innerHeight - newValue.offsetTop + 10) + 'px;';
        }

        if (placement == 'bl') {
            offSetStyle = 'right:' + (innerWidth - newValue.offsetLeft - newValue.clientWidth) + 'px' + ';top:' + (newValue.offsetTop + newValue.clientHeight + 10) + 'px;';
        }

        if (placement == 'br') {
            offSetStyle = 'left:' + newValue.offsetLeft + 'px' + ';top:' + (newValue.offsetTop + newValue.clientHeight + 10) + 'px;';
        }


        var placement = {
            tl: 'arrow-tl',
            tr: 'arrow-tr',
            bl: 'arrow-bl',
            br: 'arrow-br'
        };
        this._content = new confirmContent({
            data:{
                parent: this,
                content: this.data.content,
                cancelButton: this.data.cancelButton,
                okButton: this.data.okButton,
                contentTemplate: this.data.contentTemplate,
                offSetStyle: offSetStyle,
                arrow: placement[this.data.placement]
            }
        });
    },
    leave: function() {
        this._content.destroy();
    }
});

module.exports = PopConfirm;
