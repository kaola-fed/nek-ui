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
 * @param {boolean}     [options.data.inline]          => 如果true,kl-form-item按照inline-block排列
 * @param {string}      [options.data.sourcePath=data]    => 获取到select数据后,读取json数据的路径
 * @param {string|number} [options.data.labelSize]     => 批量设置kl-form-item的labelSize,取值与kl-form-item的labelSize相同
 * @param {string|number} [options.data.labelLineHeight]  => 批量设置kl-form-item的labelLineHeight,取值与kl-form-item的labelLineHeight相同
 */

/**
 * @class KLFormItem
 * @extend Validation
 * @param {object}        [options.data]                    = 绑定属性
 * @param {string}        [options.data.title]              => label显示的文字
 * @param {string}        [options.data.titleTemplate]      => title 模板
 * @param {string}        [options.data.descTemplate]       => 说明区块模板
 * @param {number}        [options.data.cols]               => [deprecated]布局列数, 请使用布局组件代替直接设置cols属性
 * @param {number}        [options.data.labelCols]          => [deprecated]如果有title, label占的列数, 建议使用labelSize
 * @param {string|number} [options.data.labelSize=200]      => 如果有title, label占的宽度,可以是px单位的数字,也可以是sm, md, lg, xlg
 * @param {string}        [options.data.labelLineHeight=lg] => label line-height 属性: 可以是数字值,也可以是sm(值:1), md(值:1.3), lg(值:2.5)
 * @param {string}        [options.data.textAlign=none]     => label text-align 属性：none/left/right
 * @param {boolean}       [options.data.required=false]     => 是否必选项
 * @param {string}        [options.data.tip]                => 字段说明
 * @param {string}        [options.data.class]              => 样式扩展
 * @param {string}        [options.data.layout]          => 排列方式: 默认(横着排)/vertical/inline;
 * @param {string}        [options.data.sourceKey]          => 异步获取下拉列表接口的索引值
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

/**
 * @method KLForm#validate() 验证所有表单组件
 * @return {object} conclusion 结果说明
 */
KLForm.use(ValidationMixin);

module.exports = KLForm;
