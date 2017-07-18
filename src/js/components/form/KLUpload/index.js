/**
 *  ------------------------------
 *  kl-upload 上传
 *  ------------------------------
 */

const Component = require('../../../ui-base/component');
const _ = require('../../../ui-base/_');
const UploadList = require('./components/UploadList');
const UploadCard = require('./components/UploadCard');
const Config = require('./config');
const tpl = require('./index.html');

/**
 * @class KLUpload
 * @extend Component
 * @param {object}     [options.data]              = 绑定属性
 * @param {string}     [options.data.action]       => 必选，上传地址
 * @param {array}      [options.data.file-list]    => 上传的文件列表, 可以指定初始值，代表已经上传的文件，见demo，每次操作文件后，
 *                                                     都可以通过该参数绑定的变量，得到最新的文件列表，其中每个文件项包含下面的字段:
 *                                                     name: 文件名称
 *                                                     url: 文件的路径
 *                                                     flag: 0, 新增的文件; 1, 已经上传未被删除的文件，2，已经上传被删除的文件
 * @param {string}     [options.data.name]         => 可选，上传的文件字段名, 默认为'file'
 * @param {boolean}    [options.data.multiple]     => 可选，是否支持多选, 可选值true/false，默认false单选
 * @param {boolean}    [options.data.drag]         => 可选，是否支持拖拽上传，可选值true/false，默认false不支持拖拽
 * @param {string}     [options.data.accept]       => 可选，接受上传的文件类型, 同input的accept属性
 * @param {string}     [options.data.list-type]    => 可选，上传组件的展示形式, 可选值list/card，默认list
 * @param {number}     [options.data.num-limit]    => 可选，最大允许上传文件的个数，默认10个
 * @param {number}     [options.data.num-perline]  => 可选，每行展示的文件个数，默认每行展示5个
 * @param {number}     [options.data.max-size]     => 可选，上传文件大小的最大允许值, 支持数值大小以及KB,MB,GB为单元的指定
 * @param {boolean}    [options.data.readonly]     => 可选，是否开启预览模式，可选值true/false，true预览模式，只能预览和下载图片，
 *                                                     默认false，允许上传和删除图片
 */
const KLUpload = Component.extend({
  name: 'kl-upload',
  template: tpl.replace(/([>}])\s*([<{])/g, '$1$2'),
  config(data) {
    _.extend(data, {
      action: '',
      name: 'file',
      multiple: false,
      drag: false,
      accept: '*',
      listType: 'list',
      fileList: [],
      data: {},
      numLimit: Infinity,
      numPerline: Infinity,
      maxSize: Config.sizeMap.GB,
      readonly: false,
      encType: 'multipart/form-data',
    });

    this.supr(data);
  },

  init(data) {
    this.preProcess(data);
    this.initUploadInst(data);
    this.supr(data);
  },

  preProcess(data) {
    if (typeof data.maxSize === 'number') {
      data.maxSize += '';
    }
  },

  initUploadInst(data) {
    const self = this;
    const uploadNode = this.$refs['m-upload'];
    const uploadTypeMap = {
      list: UploadList,
      card: UploadCard,
    };
    const emitter = function(type) {
      return function(info) {
        self.$emit(type, info);
      }
    };
    const uploadInst = new uploadTypeMap[data.listType]({
      data
    });
    
    uploadInst.$on('success', emitter('success'));
    uploadInst.$on('progress', emitter('progress'));
    uploadInst.$on('error', emitter('error'));
    uploadInst.$on('remove', emitter('remove'));
        
    uploadInst.$inject(uploadNode);
  },
});

module.exports = KLUpload;
