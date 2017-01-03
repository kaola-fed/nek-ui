'use strict';

var _ = require('../../ui-base/_.js');
var Validation = require('../../util/validation.js');
var Tooltip = require('../widget/tooltip.js');

var template = require('./form.item.html');

/**
 * @class FormItem
 * @extend Validation
 * @param {object}                  options.data                     =  绑定属性
 * @param {string=''}               options.data.title               => label显示的文字
 * @param {number}                  options.data.cols                => 布局列数
 * @param {number=4}                options.data.labelCols           => 如果有title, label占的列数
 * @param {number}                  options.data.offset              => 布局offset
 * @param {string=''}               options.data.row                 => 垂直布局row
 * @param {boolean=false}           options.data.required            => 是否必选项
 * @param {string=''}               options.data.tip                 => 字段说明
 * @param {string=''}               options.data.class               => 样式扩展
 * @param {string=''}               options.data.sourceKey           => 异步获取下拉列表接口的索引值
 */
var FormItem = Validation.extend({
    name: 'form.item',
    template: template,
    config: function (data) {
        _.extend(data, {
            labelCols:12
        });
        this.supr(data);

        var $outer = this.$outer;
        if ($outer && $outer instanceof Validation) {
            $outer.controls.push(this);
        }
    },
    init: function() {
        this.initValidateRule();
    },
    initValidateRule: function() {
        if (!this.controls.length) { return; }

        var controls = this.controls || [];
        controls.forEach(function($component) {
          var rules = $component.data.rules,
              isFilled = { type: 'isFilled' };

          if (this.data.required) {
            if (!rules) {
              $component.data.rules = [].concat(isFilled);
            } else {
              rules.push(isFilled);
            }
          }
        }.bind(this));
    }
});

FormItem.directive('cols', function(ele, cols) {
    this.$watch(cols, function(ncols) {
        ele.className = ele.className.replace(/(\s)g-col(-\d)?/gim, '');

        if (ncols) {
            ele.classList.add('g-col', 'g-col-' + ncols);
        }
    });
});

FormItem.directive('offset', function(ele, offset) {
    this.$watch(offset, function(noffset) {
        ele.className = ele.className.replace(/(\s)g-offset(-\d)?/gim, '');

        if (noffset) {
            ele.classList.add('g-offset-' + noffset);
        }
    });
});

FormItem.directive('row', function(ele, row) {
    this.$watch(row, function(newValue) {

        if (newValue) {
            ele.classList.add('u-formitem-row');
            this.data.labelCols = this.data.labelCols == 12 ?  4 : this.data.labelCols;
        }
    });
});

module.exports = FormItem;
