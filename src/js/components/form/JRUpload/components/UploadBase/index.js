/**
 *  ------------------------------
 *  upload.base 上传基础类
 *  ------------------------------
 */

const Component = require('../../../../../ui-base/component');
const _ = require('../../../../../ui-base/_');
const Config = require('../../config');

/**
 * @class UploadBase
 * @extend Component
 * @param {object}         [options.data]                  = 绑定属性
 * @param {string}         [options.data.action]           => 必选，上传地址
 * @param {array}          [options.data.file-list]        => 上传的文件列表, 可以指定初始值，代表已经上传的文件，见demo，每次操作文件后，
 *                                                             都可以通过该参数绑定的变量，得到最新的文件列表，其中每个文件项包含下面的字段:
 *                                                             name: 文件名称
 *                                                             url: 文件的路径
 *                                                             flag: 0, 新增的文件; 1, 已经上传未被删除的文件，2，已经上传被删除的文件
 * @param {string}         [options.data.name]             => 可选，上传的文件字段名, 默认为'file'
 * @param {boolean}        [options.data.multiple]         => 可选，是否支持多选, 可选值true/false，默认false单选
 * @param {boolean}        [options.data.drag]             => 可选，是否支持拖拽上传，可选值true/false，默认false不支持拖拽
 * @param {string}         [options.data.accept]           => 可选，接受上传的文件类型, 同input的accept属性
 * @param {string}         [options.data.list-type]        => 可选，上传组件的展示形式, 可选值list/card，默认list
 * @param {number}         [options.data.num-limit]        => 可选，最大允许上传文件的个数，默认10个
 * @param {number}         [options.data.num-perline]      => 可选，每行展示的文件个数，默认每行展示5个
 * @param {number}         [options.data.max-size]         => 可选，上传文件大小的最大允许值, 支持数值大小以及KB,MB,GB为单元的指定
 * @param {boolean}        [options.data.deletable]        => 可选，上传文件是否允许删除, 可选值true/false，默认true，可删除
 */
const UploadBase = Component.extend({
  name: 'upload-list',
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
      numLimit: 10,
      numPerline: 5,
      maxSize: Config.sizeMap.GB,
      deletable: true,
      encType: 'multipart/form-data',
    });

    _.extend(data, {
      fileUnitList: [],
      fileDeletedList: [],
      fileUnitWidth: 50,
      fileUnitMargin: 25,
    });

    this.supr(data);
  },

  init(data) {
    this.initUploadedFileUnits();
    this.supr(data);
  },

  initUploadedFileUnits() {
    const self = this;
    const data = this.data;

    if (data.fileList.length > 0) {
      const fileList = data.fileList.splice(0);
      fileList.forEach((file) => {
        const fileunit = self.createFileUnit({
          file,
          options: {},
          deletable: data.deletable,
        });

        fileunit.flag = 'ORIGINAL';

        data.fileUnitList.push({
          inst: fileunit,
        });
      });

      this.updateFileList();
    }
  },

  updateFileList() {
    const self = this;
    const data = this.data;
    const filesWrapper = data.filesWrapper;
    const fileList = data.fileList;
    const fileDeletedList = data.fileDeletedList;

    data.fileUnitList = data.fileUnitList.filter((item) => {
      const inst = item.inst;
      const flag = inst.flag;
      const file = inst.file;
      const destroyed = inst.destroyed;

      // item.inst = {};

      if (flag === 'DELETED') {
        file.flag = 'DELETED';
        fileDeletedList.push(file);
        return false;
      }
      return !destroyed;
    });

    filesWrapper.innerHTML = '';

    const fileUnitList = data.fileUnitList;
    fileUnitList.forEach((item, index) => {
      item.wrapper = self.createFileUnitWrapper(
        filesWrapper,
        index,
      );
      item.inst.$inject(item.wrapper);
    });

    fileList.splice(0);
    fileUnitList.forEach((item) => {
      const inst = item.inst;
      const file = inst.data.file || {};

      fileList.push({
        name: file.name,
        url: file.url,
        flag: Config.flagMap[inst.flag],
      });
    });

    fileDeletedList.forEach((file) => {
      fileList.push({
        name: file && file.name,
        url: file && file.url,
        flag: file && Config.flagMap[file.flag],
      });
    });
  },

  fileDialogOpen() {
    this.$refs.file && this.$refs.file.click();
  },

  setOptions(options) {
    const opts = options || {};

    return {
      url: opts.action,
    };
  },

  preCheck(file) {
    let preCheckInfo = '';
    if (!this.isAcceptedFileSize(file)) {
      preCheckInfo = this.$trans('FILE_TOO_LARGE');
    }
    if (!this.isAcceptedFileType(file)) {
      preCheckInfo = this.$trans('FILE_TYPE_ERROR');
    }
    return preCheckInfo;
  },

  isAcceptedFileType(file) {
    const data = this.data;
    const accept = data.accept;
    const type = this.getFileType(file).toLowerCase();
    let isValid = false;

    accept.split(',').forEach((cond) => {
      if (cond === '*') {
        isValid = true;
      } else if (/image\/.*/.test(cond)) {
        isValid = isValid || type === 'image';
      } else if (/audio\/.*/.test(cond)) {
        isValid = isValid || type === 'audio';
      } else if (/video\/.*/.test(cond)) {
        isValid = isValid || type === 'video';
      } else {
        isValid = isValid || type === Config.typeMap[cond];
      }
    });

    return isValid;
  },

  getFileType(file) {
    const type = file.type || '';
    const name = file.name || '';

    if (/image\/.*/.test(type) || /jpg|gif|jpeg|png/i.test(name)) {
      return 'IMAGE';
    } else if (/zip|rar|gz/i.test(name)) {
      return 'ZIP';
    } else if (
      /document|sheet|powerpoint|msword/.test(type) ||
      /doc|xlsx|ppt/i.test(name)
    ) {
      return 'DOC';
    } else if (/video\/.*/.test(type) || /mp4|mkv|rmvb/i.test(name)) {
      return 'VIDEO';
    } else if (/audio\/.*/.test(type) || /mp3/i.test(name)) {
      return 'AUDIO';
    } else if (/text\/plain/.test(type)) {
      return 'TEXT';
    } else if (/text\/html/.test(type)) {
      return 'HTML';
    } else if (/application\/pdf/.test(type)) {
      return 'PDF';
    } else if (/application\/javascript/.test(type)) {
      return 'JS';
    }

    return 'UNKNOWN';
  },

  isAcceptedFileSize(file) {
    const data = this.data;
    const maxSize = data.maxSize;
    const fileSize = file.size;

    const patterns = maxSize.match(/(\d+)(\D+)?/i);
    let size = patterns[1];
    const unit = patterns[2];

    if (unit) {
      size *= Config.sizeMap[unit.toUpperCase()];
    }

    return size >= fileSize;
  },
});

module.exports = UploadBase;
