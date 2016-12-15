/**
 * ------------------------------------------------------------
 * TipContent     提示依赖组件
 * @author   ziane(zianecui@gmail.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../../ui-base/component.js');
var template = require('./tip.content.html');
var dom = require('regularjs').dom;
var _ = require('../../ui-base/_.js');


var TipContent = Component.extend({
    template: template,
    config: function (data) {
        _.extend(data, {

        });
        this.supr(data);
    },
    init: function(){
    	if(this.$root == this){
    		this.$inject(document.body);
    	}
    }
});

module.exports = TipContent;
