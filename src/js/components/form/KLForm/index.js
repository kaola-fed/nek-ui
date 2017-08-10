const _ = require('../../../ui-base/_');
const ajax = require('../../../ui-base/ajax');
const Validation = require('../../../util/validation');
const ValidationMixin = require('../../../util/validationMixin');

const template = require('./index.html');

/**
 * @class KLForm
 * @extend Validation
 * @param {object}      [options.data]                    = 绑定属性
 * @param {string}      [options.data.service]            => 全站异步获取source的接口地址
 * @param {string}      [options.data.class]              => 扩展样式
 * @param {boolean}     [options.data.inline='']          => 如果true,kl-form-item按照inline-block排列
 * @param {string}      [options.data.sourcePath=data]    => 获取到select数据后,读取json数据的路径
 * @param {string|number} [options.data.labelSize='']     => 批量设置kl-form-item的labelSize,取值与kl-form-item的labelSize相同
 * @param {string|number} [options.data.labelLineHeight='']  => 批量设置kl-form-item的labelLineHeight,取值与kl-form-item的labelLineHeight相同
 */
const KLForm = Validation.extend({
  name: 'kl-form',
  template,
  selectors: [],
  config(data) {
    _.extend(data, {
      service: null,
      sourcePath: 'data',
      class: '',
    });

    this.supr(data);
  },
  init() {
    this.supr();

    this.initValidation();

    this.$watch('this.controls.length', function () {
      this.initSelectorSource();
      this.initFormItem();
    });
  },
  initFormItem() {
    const controls = this.controls;
    const {
      labelSize,
      labelLineHeight,
    } = this.data;
    labelSize &&
      controls.forEach(($component) => {
        if (!$component.labelSize) {
          $component.$update('labelSize', labelSize);
        }
      });
    labelLineHeight &&
      controls.forEach(($component) => {
        if (!$component.labelLineHeight) {
          $component.$update('labelLineHeight', labelLineHeight);
        }
      });
  },
  initSelectorSource() {
    const controls = this.controls;
    this.selectors = controls.filter($formitem => !!$formitem.data.sourceKey);

    if (!this.data.service || !this.selectors.length) {
      return;
    }

    this.__reqSource();
  },
  __getSourceKeys() {
    return this.selectors.map($formitem => $formitem.data.sourceKey);
  },
  __reqSource() {
    const self = this;
    let keys = this.__getSourceKeys();

    window.NEKSelects = window.NEKSelects || {};
    keys = keys.filter(key => !window.NEKSelects[key]);

    this.selectors.forEach(($formitem) => {
      const key = $formitem.data.sourceKey;
      const source = window.NEKSelects[key] || [];
      self.__updateSource($formitem, key, source);
    });

    if (!keys.length) {
      return;
    }
    this.keys = keys;
    ajax.request({
      url: this.data.service,
      method: 'get',
      type: 'json',
      data: {
        keys: keys.join(','),
      },
      success: this.__cbReqSource.bind(this),
    });
  },
  __cbReqSource(json) {
    const self = this;
    const path = this.data.sourcePath;
    const result = (path === '' ? json : json[path]) || {};

    this.selectors.forEach(($formitem) => {
      const key = $formitem.data.sourceKey;
      const source = result[key] || [];
      self.__updateSource($formitem, key, source);
    });
    /**
       * @event KLForm#sourceCompleted kl-form自动获取sourceKey异步数据后触发
       * @property {object} sender 事件发送对象
       * @property {object} result 所有异步数据
       */
    this.$emit('sourceCompleted', {
      sender: this,
      result: window.NEKSelects,
    });
  },
  __updateSource($formitem, key, source) {
    const $selectItem = $formitem.controls[0];

    /* 三种情况不给组件赋值:1. kl-form-item下面没有选项组件; 2. source为空 3. 选项组件的source属性已经有值 */
    if (!$selectItem || !source.length || $selectItem.data.source.length) {
      return;
    }
    $selectItem.data.source = _.clone(source);
    window.NEKSelects[key] = _.clone(source);
    $selectItem.$update();
  },
});

KLForm.use(ValidationMixin);

module.exports = KLForm;
