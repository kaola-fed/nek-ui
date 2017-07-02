/**
 * ------------------------------------------------------------
 * SourceComponent 数据组件基类
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

const Component = require('./component');
const _ = require('./_');
const Ajax = require('./ajax');

/**
 * @class SourceComponent
 * @extend Component
 * @deprecated
 * @param {object[]}        [options.data.source=[]]              =  数据源
 * @param {boolean}         [options.data.updateAuto=true]          => 当有service时，是否自动加载
 * @param {boolean}         [options.data.readonly=false]            => 是否只读
 * @param {boolean}         [options.data.disabled=false]            => 是否禁用
 * @param {boolean}         [options.data.visible=true]             => 是否显示
 * @param {string}          [options.data.class]               => 补充class
 * @param {object}          [options.service]                 @=> 数据服务
 */
const SourceComponent = Component.extend({
  service: null,
  /**
     * @protected
     */
  config() {
    _.extend(this.data, {
      source: [],
      updateAuto: true,
    });

    if (this.data.service) this.service = this.data.service;

    if (this.service && this.data.updateAuto) this.$updateSource();

    this.supr();
  },
  request(options) {
    const self = this;
    const data = this.data;
    const { error: oldError, success: oldSuccess, complete: oldComplete } = options;

    data.loading = true;

    options.success = function (_data) {
      oldSuccess && oldSuccess(_data);
      self.$update('loading', false);
    };
    options.error = function (_data) {
      oldError && oldError(_data);
      self.$update('loading', false);
    };

    options.complete = function (_data) {
      oldComplete && oldComplete(_data);
      self.$update('loading', false);
    };
    Ajax.request(options);
  },
  /**
     * @method getParams 返回请求时需要的参数
     * @protected
     * @deprecated
     * @return {object} object
     */
  getParams() {
    return {};
  },
  /**
     * @method $updateSource() 从service中更新数据源
     * @public
     * @deprecated
     * @return {SourceComponent} this
     */
  $updateSource() {
    const self = this;
    this.service.getList.call(this, this.getParams(), (result) => {
      self.$update('source', result);
    });
    return this;
  },
});

module.exports = SourceComponent;
