/**
 * ------------------------------------------------------------
 * ConfirmContent     气泡确认框依赖组件
 * @author   ziane(zianecui@gmail.com)
 * ------------------------------------------------------------
 */


'use strict';

var Component = require('../../ui-base/component.js');
var template = require('./confirm.content.html');
var dom = require('regularjs').dom;
var _ = require('../../ui-base/_.js');


var ConfirmContent = Component.extend({
    template: template,
    config: function (data) {
        _.extend(data, {

        });
        this.supr(data);
    },
    init: function(){
        ConfirmContent.parentEle.push(this.data.parent);
        ConfirmContent.self.push(this);
        if (ConfirmContent.parentEle[0] == ConfirmContent.parentEle[1]) {
            ConfirmContent.parentEle.pop();
            ConfirmContent.self.pop();
            return;
        } else if (ConfirmContent.parentEle.length != 1) {
            ConfirmContent.self[0].destroy();
        }
    	if(this.$root == this){
    		this.$inject(document.body);
    	}
    },
    close: function(){
        this.destroy();
    },
    confirm: function(){
        this.$emit('ok');

        this.destroy();
    },
    destroy: function(){
        this.supr();
        ConfirmContent.self.shift();
        ConfirmContent.parentEle.shift();
    }
});

ConfirmContent.self = [];
ConfirmContent.parentEle = [];

module.exports = ConfirmContent;
