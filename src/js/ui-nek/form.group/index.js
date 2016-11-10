'use strict';

var _ = require('../../ui-base/_.js');
var Validation = require('../../util/validation.js');

var template = require('./index.html');

/**
 * FormExt继承于Validation
 * 1. form.group具有和validation一样的校验功能, this.$refs.formgroup.validate().success
 * 2. form.group内实现统一的获取选择数据的接口；
 *
 * @example
 * <form.group service="{service.selector}" ref="formgroup">
 *   <form.item title="标题1" cols=3 sourceKey={key}>
 *     <select />
 *   </form.item>
 *   <form.item title="标题2" cols=3>
 *     <input />
 *   </form.item>
 * </form.ext>
 */
var FormGroup = Validation.extend({
  name: 'form.group',
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
    var keys = this.__getSourceKeys();
    console.log(keys);
  },
  __getSourceKeys: function() {
    return this.selectors.map(function($formitem) {
      return $formitem.data.sourceKey;
    })
  }
});

module.exports = FormGroup;
