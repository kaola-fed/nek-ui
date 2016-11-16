'use strict';

var _ = require('../../ui-base/_.js');
var ajax = require('../../ui-base/ajax.js');
var Validation = require('../../util/validation.js');

var template = require('./index.html');

/**
 * Form继承于Validation
 * 1. 具有和validation一样的校验功能, this.$refs.formgroup.validate().success
 * 2. 实现统一的获取选择数据的接口；
 *
 * @example
 * <ui.form service="{service.selector}" ref="formgroup">
 *   <ui.field title="标题1" cols=3 sourceKey={key}>
 *     <select />
 *   </ui.field>
 *   <ui.field title="标题2" cols=3>
 *     <input />
 *   </ui.field>
 * </ui.form>
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
