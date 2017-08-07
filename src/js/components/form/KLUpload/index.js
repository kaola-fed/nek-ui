/**
 *  ------------------------------
 *  kl-upload 上传
 *  ------------------------------
 */

const _ = require('../../../ui-base/_');
const utils = require('./utils');
const Config = require('./config');
const Component = require('../../../ui-base/component');
const UploadList = require('./components/UploadList');
const UploadCard = require('./components/UploadCard');
const Validation = require('../../../util/validation');
const validationMixin = require('../../../util/validationMixin');
const tpl = require('./index.html');

/**
 * @class KLUpload
 * @extend Component
 * @param {object}     [options.data]                      = 绑定属性
 * @param {string}     [options.data.action]               => 必选，上传地址
 * @param {array}      [options.data.file-list]            => 上传的文件列表, 可以指定初始值，代表已经上传的文件，见demo，每次操作文件后，
 *                                                             都可以通过该参数绑定的变量，得到最新的文件列表，其中每个文件项包含下面的字段:
 *                                                             name: 文件名称
 *                                                             url: 文件的路径
 *                                                             flag: 0, 新增的文件; 1, 已经上传未被删除的文件，2，已经上传被删除的文件
 * @param {string}     [options.data.name=file]            => 可选，上传的文件字段名, 默认为'file'
 * @param {boolean}    [options.data.multiple=false]       => 可选，是否支持多选, 可选值true/false，默认false单选
 * @param {object}     [options.data.data]                 => 可选，上传时附带的额外参数
 * @param {boolean}    [options.data.drag=false]           => 可选，是否支持拖拽上传，可选值true/false，默认false不支持拖拽
 * @param {string}     [options.data.accept=*]             => 可选，接受上传的文件类型, 同input的accept属性
 * @param {string}     [options.data.list-type=list]       => 可选，上传组件的展示形式, 可选值list/card，默认list
 * @param {number}     [options.data.num-min=-Infinity]    => 可选，指定的至少上传的文件个数，默认无限制
 * @param {number}     [options.data.num-max=Infinity]     => 可选，最大允许上传文件的个数，默认无限制
 * @param {number}     [options.data.num-perline]          => 可选，每行展示的文件个数，对于列表形式，默认无限制，根据父容器自动折行；
 *                                                             对于表单形式，默认每行展示5个
 * @param {number}     [options.data.max-size=1GB]         => 可选，上传文件大小的最大允许值, 支持数值大小以及KB,MB,GB为单元的指定
 * @param {boolean}    [options.data.readonly=false]       => 可选，是否开启预览模式，可选值true/false，true预览模式，只能预览和下载图片，
 *                                                             默认false，允许上传和删除图片
 * @param {boolean}    [options.data.hideTip=false]        => 是否显示校验错误信息，默认false显示
 * @param {number}     [options.data.image-width]          => 可选，指定上传图片文件的宽度, 值为数值，单位为px，如800
 * @param {number}     [options.data.image-height]         => 可选，指定上传图片文件的高度, 值为数值，单位为px, 如600
 * @param {string}     [options.data.image-scale]          => 可选，指定上传图片文件的宽高比, 值为冒号分隔的宽高比例字符串，如'4:3'
 */

const KLUpload = Component.extend({
  name: 'kl-upload',
  template: tpl.replace(/([>}])\s*([<{])/g, '$1$2'),
  config(data) {
    _.extend(data, {
      action: '',
      name: 'file',
      data: {},
      multiple: false,
      drag: false,
      accept: '*',
      listType: 'list',
      fileList: [],
      numMin: -Infinity,
      numMax: Infinity,
      numPerline: Infinity,
      maxSize: Config.sizeMap.GB,
      readonly: false,
      hideTip: false,
      imageWidth: Infinity,
      imageHeight: Infinity,
      imageScale: '',
      encType: 'multipart/form-data',
      required: false,
      defaultRules: [],
    });

    this.preProcess(data);
    this.initValidation();

    this.data.defaultRules.push(this.createRule('minMax'));
    this.$watch('required', function (newValue) {
      if (newValue) {
        this.data.defaultRules.push(this.createRule('required'));
      } else {
        this.data.defaultRules = this.data.defaultRules.filter(rule => rule.id !== 'required');
      }
    });
    this.supr(data);
  },

  createRule(ruleType) {
    const _rule = {
      id: ruleType === 'required' ? 'required' : '',
      type: 'method',
      method(value, rule) {
        const sender = rule.sender;
        const data = sender.data;
        const length = sender.getActiveFileLength(value);
        const min = rule.ruleType === 'required' ? 1 : data.numMin;
        const max = data.numMax;
        if (length < min) {
          return rule.$trans('PLEASE_UPLOAD_ATLEAST') + min + rule.$trans('UNIT') + rule.$trans('FILE');
        }
        if (length > max) {
          return rule.$trans('PLEASE_UPLOAD_ATMOST') + max + rule.$trans('UNIT') + rule.$trans('FILE');
        }
        return true;
      },
      sender: this,
      ruleType,
      $trans: _.$trans,
    };
    return _rule;
  },

  preProcess(data) {
    if (typeof data.maxSize === 'number') {
      data.maxSize += '';
    }
  },

  init(data) {
    this.initWatcher();
    this.addUploadHandler();
    this.supr(data);
  },

  initWatcher() {
    const self = this;
    this.$watch('fileList', () => {
      self.data.tip = '';
    });
  },

  addUploadHandler() {
    const self = this;
    const uploadInst = this.$refs.upload;
    const handlerList = ['success', 'progress', 'error', 'remove'];
    handlerList.forEach((handler) => {
      const handlerFnName = handler;
      uploadInst.$on(handler, self[`on${utils.camelize(handlerFnName)}`].bind(self));
    });
  },

  onSuccess(info) {
    /**
     * @event success 文件上传成功回调函数
     * @property {object} sender 当前上传文件的实例
     * @property {object} file 当前上传的文件
     * @property {array} fileList 所有展示的文件列表
     * @property {string} status 上传的状态
     * @property {string} progress 上传的进度
     */
    this.$emit('success', info);
  },

  onProgress(info) {
    /**
     * @event progress 文件上传进度回调函数
     * @property {object} sender 当前上传文件的实例
     * @property {object} file 当前上传的文件
     * @property {array} fileList 所有展示的文件列表
     * @property {string} status 上传的状态
     * @property {string} progress 上传的进度
     */
    this.$emit('progress', info);
  },

  onError(info) {
    /**
     * @event error 文件上传失败回调函数
     * @property {object} sender 当前上传文件的实例
     * @property {object} file 当前上传的文件
     * @property {array} fileList 所有展示的文件列表
     * @property {string} status 上传的状态
     * @property {string} progress 上传的进度
     */
    this.$emit('error', info);
  },

  onRemove(info) {
    /**
     * @event remove 上传文件删除回调函数
     * @property {object} sender 当前上传文件的实例
     * @property {object} file 当前上传的文件
     * @property {array} fileList 所有展示的文件列表
     * @property {string} status 上传的状态
     * @property {string} progress 上传的进度
     */
    this.$emit('remove', info);
  },

  validate(on = '') {
    const value = this.data.fileList;
    return this._validate(on, value, Validation);
  },

  getActiveFileLength(fileList) {
    return fileList.filter(file => file.flag !== Config.flagMap.DELETED).length;
  },
})
  .component('upload-list', UploadList)
  .component('upload-card', UploadCard);

KLUpload.use(validationMixin);

module.exports = KLUpload;
