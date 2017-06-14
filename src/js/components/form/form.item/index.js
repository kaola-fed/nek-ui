'use strict';

var _ = require('../../../ui-base/_');
var Validation = require('../../../util/validation');
var UIForm = require('../ui.form');
var Tooltip = require('../../widget/tooltip');

var template = require('./index.html');

/**
 * @class FormItem
 * @extend Validation
   * @param {object}        [options.data]                    = 绑定属性
   * @param {string}        [options.data.title]              => label显示的文字
   * @param {number}        [options.data.cols]               => [deprecated]布局列数, 请使用布局组件代替直接设置cols属性
   * @param {number}        [options.data.labelCols]          => [deprecated]如果有title, label占的列数, 建议使用labelSize
   * @param {string|number} [options.data.labelSize=200]      => 如果有title, label占的宽度,可以是px单位的数字,也可以是sm, md, lg, xlg
   * @param {string}        [options.data.labelLineHeight="lg"] => label line-height 属性: 可以是数字值,也可以是sm(值:1), md(值:1.3), lg(值:2.5)
   * @param {string}        [options.data.textAlign=none]     => label text-align 属性：none/left/right
   * @param {boolean}       [options.data.required=false]     => 是否必选项
   * @param {string}        [options.data.tip]                => 字段说明
   * @param {string}        [options.data.class]              => 样式扩展
   * @param {string}        [options.data.layout='']          => 排列方式: 默认(横着排)/vertical/inline;
   * @param {string}        [options.data.sourceKey]          => 异步获取下拉列表接口的索引值
 */
var FormItem = Validation.extend({
    name: 'form.item',
    template: template,
    config: function (data) {
        _.extend(data, {
            textAlign: 'right',
            labelCols: '',
            labelLineHeight: 'lg'
        });
        this.supr(data);

        var $outer = this.$outer;
        if ($outer && $outer instanceof UIForm) {
            $outer.controls.push(this);

            this.$on('destroy', function() {
                var index = $outer.controls.indexOf(this);
                $outer.controls.splice(index, 1);
            });
        }
    },
    init: function() {
        var $outer = this.$outer;
        this.$watch('this.controls.length', function(newValue, oldValue) {
            /* 处理form.item下面ui.select数量变化的情况,当从没有变为有时,需要赋值 */
            if (oldValue === undefined) { return; }
            if ($outer && $outer.initSelectorSource) {
                $outer.initSelectorSource();
            }
        });
        
        this.$watch('required', function() {
            this.initValidateRule();
        });
    },
    initValidateRule: function() {
        if (!this.controls.length) { return; }

        var controls = this.controls || [],
            message = this.data.message;
        controls.forEach(function($component) {
          if (this.data.required) {
            $component.data.required = true;
            $component.data.message = $component.data.message || message;
            $component.$update();
          } else {
            $component.$update('required', false);
          }
        }.bind(this));
    }
});

FormItem.directive('cols', function(ele, cols) {
    this.$watch(cols, function(ncols) {
      ele.className = ele.className.replace(/(\s)?g-col(-\d*)?/gim, '');
      if (ncols) {
        ele.classList.add('g-col', 'g-col-' + ncols);
      }
    });
});

FormItem.directive('size', function(ele, size) {
    this.$watch(size, function(newValue, oldValue) {
        if (!newValue) { return; }

        if (parseInt(newValue)) {
            ele.style.width = parseInt(newValue) + 'px';
        } else {
            ele.style.width = '';
            ele.classList.remove(oldValue);
            ele.classList.add(`formitem_tt-${newValue}`);
        }
    });
});

FormItem.directive('lineHeight', function(ele, lineHeight) {
  this.$watch(lineHeight, function(newValue, oldValue) {
    if (!newValue) { return; }

    if (!isNaN(newValue)) {
      ele.style.lineHeight = newValue;
    } else {
      ele.style.lineHeight = '';
      ele.classList.remove(oldValue);
      ele.classList.add(`formitem_tt-lh-${newValue}`);
    }
  });
});

module.exports = FormItem;
