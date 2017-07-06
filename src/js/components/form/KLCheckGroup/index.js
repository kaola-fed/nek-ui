/**
 * ------------------------------------------------------------
 * KLCheckGroup 输入扩展
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

const SourceComponent = require('../../../ui-base/sourceComponent');
const template = require('./index.html');
const validationMixin = require('../../../util/validationMixin');

/**
 * @class KLCheckGroup
 * @extend SourceComponent
 * @param {object}    [options.data]                    = 绑定属性
 * @param {object[]}  [options.data.source=[]]          <=> 数据源
 * @param {string}    [options.data.value='']           <=> 选择的值,separator间隔的id值
 * @param {string}    [options.data.source[].name=[]]   => 每项的内容
 * @param {string}    [options.data.key=id]             => 数据项的键
 * @param {string}    [options.data.separator=',']      => value的分割符号
 * @param {string}    [options.data.nameKey=name]       => 数据项的name键
 * @param {number}    [options.data.min]                => 最少选几项
 * @param {number}    [options.data.max]                => 最多选几项
 * @param {boolean}   [options.data.required]           => 是否必选
 * @param {string}    [options.data.message]            => 校验错误提示信息
 * @param {boolean}   [options.data.hideTip=false]      => 是否显示校验错误信息
 * @param {boolean}   [options.data.block=false]        => 多行显示
 * @param {boolean}   [options.data.readonly=false]     => 是否只读
 * @param {boolean}   [options.data.disabled=false]     => 是否禁用
 * @param {boolean}   [options.data.visible=true]       => 是否显示
 * @param {string}    [options.data.class]              => 补充class
 * @param {object}    [options.service]                 @=> 数据服务
 */
const KLCheckGroup = SourceComponent.extend({
  name: 'kl-check-group',
  template,
  /**
     * @protected
     */
  config() {
    this.defaults({
      // @inherited source: [],
      block: false,
      hideTip: false,
      source: [],
      min: 0,
      max: 1000,
      nameKey: 'name',
      key: 'id',
      value: '',
      separator: ',',
    });
    this.supr();

    this.initValidation();
  },
  init() {
    this.$watch('source', function (source) {
      if (!source || !(source instanceof Array)) {
        return console.error('source of check.group is not an array');
      }

      const { key, separator, value = '' } = this.data;
      const values = value.split(separator);

      source.forEach((item) => {
        if (values.indexOf(`${item[key]}`) !== -1) {
          item.checked = true;
        }
      });
    });
    this.$watch('value', function (newValue) {
      const source = this.data.source;
      if (newValue === undefined || newValue === null) return;

      if (source) {
        const { key, separator } = this.data;
        const value = newValue || '';
        const values = value.split(separator);
        source.forEach((item) => {
          if (values.indexOf(`${item[key]}`) !== -1) {
            item.checked = true;
          } else {
            item.checked = false;
          }
        });
      }
    });
  },
  /**
     * @method validate() 根据min, max验证组件的值是否正确
     * @public
     * @return {object} result 结果
     */
  validate() {
    const source = this.data.source;
    const result = { success: true, message: '' };
    const required = this.data.required;
    const min = this.data.min ? this.data.min : required / 1;
    const max = this.data.max;
    const checked = source.filter(item => !!item.checked);
    const len = checked.length;

    if (len < min || len > max) {
      result.success = false;
      result.message = this.data.message || `请选择(${min},${max}]个选项`;
      this.data.state = 'error';
    } else {
      result.success = true;
      result.message = '';
      this.data.state = '';
    }
    this.data.tip = result.message;

    this.$emit('validate', {
      sender: this,
      result,
    });

    return result;
  },
  /**
     * method _onCheck() 点击check时,改变对应的value值
     * @private
     */
  _onCheck(item) {
    item.checked = !item.checked;

    const { key, separator, source } = this.data;
    const checkedList = source.filter(_item => _item.checked);
    const ids = checkedList.map(_item => _item[key]);

    this.$update('value', ids.join(separator));

    this.data.tip && this.validate();
  },
});

KLCheckGroup.use(validationMixin);
module.exports = KLCheckGroup;
