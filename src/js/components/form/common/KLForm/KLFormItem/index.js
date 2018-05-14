const _ = require('../../../../../ui-base/_');
const Validation = require('../../../../../util/validation');
const validationMixin = require('../../../../../util/validationMixin');

const template = require('./index.html');

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
   * @param {string}        [options.data.labelLineHeight="2.5"] => label line-height 属性: 可以是数字值,也可以是sm(值:1), md(值:1.6), lg(值:2.5)
   * @param {string}        [options.data.textAlign=none]     => label text-align 属性：none/left/right
   * @param {boolean}       [options.data.required=false]     => 是否必选项
   * @param {string}        [options.data.tip]                => 字段说明
   * @param {string}        [options.data.class]              => 样式扩展
   * @param {string}        [options.data.layout='']          => 排列方式: 默认(横着排)/vertical/inline;
   * @param {string}        [options.data.sourceKey]          => 异步获取下拉列表接口的索引值
 */
const KLFormItem = Validation.extend({
  name: 'kl-form-item',
  template,
  config(data) {
    _.extend(data, {
      textAlign: 'right',
      labelCols: '',
    });
    this.supr(data);

    this.initValidation();
  },
  init() {
    const parentValidator = this._parentValidator;
    this.$watch('this.controls.length', () => {
      if (parentValidator && parentValidator.initSelectorSource) {
        parentValidator.initSelectorSource();
      }
      if (parentValidator && parentValidator.initFormItem) {
        parentValidator.initFormItem();
      }
    });

    this.$watch('required', function () {
      this.initValidateRule();
    });
  },
  initValidateRule() {
    if (!this.controls.length) {
      return;
    }

    const self = this;
    const controls = this.controls || [];
    const message = this.data.message;
    controls.forEach(($component) => {
      if (self.data.required) {
        $component.data.required = true;
        $component.data.message = $component.data.message || message;
        $component.$update();
      } else {
        $component.$update('required', false);
      }
    });
  },
});

KLFormItem.directive('cols', function (ele, cols) {
  this.$watch(cols, (ncols) => {
    ele.className = ele.className.replace(/(\s)?kl-col(-\d*)?/gim, '');
    if (ncols) {
      ele.classList.add('kl-col', `kl-col-${ncols}`);
    }
  });
});

KLFormItem.directive('size', function (ele, size) {
  this.$watch(size, (newValue, oldValue) => {
    if (!newValue) {
      return;
    }

    if (parseInt(newValue)) {
      ele.style.width = `${parseInt(newValue)}px`;
    } else {
      ele.style.width = '';
      ele.classList.remove(oldValue);
      ele.classList.add(`formitem_tt-${newValue}`);
    }
  });
});

KLFormItem.directive('lineHeight', function (ele, lineHeight) {
  this.$watch(lineHeight, (newValue, oldValue) => {
    if (!newValue) {
      return;
    }

    if (parseFloat(newValue)) {
      ele.style.lineHeight = newValue;
    } else {
      ele.style.lineHeight = '';
      ele.classList.remove(oldValue);
      ele.classList.add(`formitem_tt-lh-${newValue}`);
    }
  });
});

KLFormItem.use(validationMixin);

module.exports = KLFormItem;
