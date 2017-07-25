/**
 *  ------------------------------
 *  upload.base 上传基础类
 *  ------------------------------
 */

const Component = require('../../../../../ui-base/component');
const _ = require('../../../../../ui-base/_');
const utils = require('../../utils');
const Config = require('../../config');

/**
 * @class UploadBase
 * @extend Component
 * @param {object}    [options.data]               = 绑定属性
 * @param {string}    [options.data.action]        => 必选，上传地址
 * @param {array}     [options.data.file-list]     => 上传的文件列表, 可以指定初始值，代表已经上传的文件，见demo，每次操作文件后，
 *                                                     都可以通过该参数绑定的变量，得到最新的文件列表，其中每个文件项包含下面的字段:
 *                                                     name: 文件名称
 *                                                     url: 文件的路径
 *                                                     flag: 0, 新增的文件; 1, 已经上传未被删除的文件，2，已经上传被删除的文件
 * @param {string}    [options.data.name]          => 可选，上传的文件字段名, 默认为'file'
 * @param {boolean}   [options.data.multiple]      => 可选，是否支持多选, 可选值true/false，默认false单选
 * @param {boolean}   [options.data.drag]          => 可选，是否支持拖拽上传，可选值true/false，默认false不支持拖拽
 * @param {string}    [options.data.accept]        => 可选，接受上传的文件类型, 同input的accept属性
 * @param {string}    [options.data.list-type]     => 可选，上传组件的展示形式, 可选值list/card，默认list
 * @param {number}    [options.data.num-limit]     => 可选，最大允许上传文件的个数，默认10个
 * @param {number}    [options.data.num-perline]   => 可选，每行展示的文件个数，默认每行展示5个
 * @param {number}    [options.data.max-size]      => 可选，上传文件大小的最大允许值, 支持数值大小以及KB,MB,GB为单元的指定
 * @param {boolean}   [options.data.readonly]      => 可选，是否开启预览模式，可选值true/false，true预览模式，只能预览和下载图片，
 *                                                     默认false，允许上传和删除图片
 */
const UploadBase = Component.extend({
  config(data) {
    this.supr(data);
    
    _.extend(data, {
      action: '',
      name: 'file',
      multiple: false,
      drag: false,
      accept: '*',
      listType: 'list',
      fileList: [],
      numLimit: Infinity,
      numPerline: Infinity,
      maxSize: Config.sizeMap.GB,
      readonly: false,
      imageWidth: Infinity,
      imageHeight: Infinity,
      imageScale: '',
      data: {},
      encType: 'multipart/form-data'
    });

    _.extend(data, {
      fileUnitList: [],
    });
    
    this.initWatchers();
    this.initUploadedFileUnits();
  },
  
  initWatchers: function() {
    const self = this;
    const data = this.data;
    
    function filterDeleted(file) {
      return file.flag !== Config.flagMap['DELETED'];
    }
    
    this.$watch('fileList', function(newVal, oldVal) {
      if (oldVal !== undefined) {
        if (newVal.length >= oldVal.length) {
          self.extendFileList(newVal);
        } else {
          self.reduceFileList(newVal, oldVal);
        }
      }
    }, true);
  },
  
  extendFileList: function(fileList) {
    const self = this;
    const data = this.data;

    function filterDeleted(file) {
      return file.flag !== Config.flagMap['DELETED'];
    }
    
    fileList.filter(filterDeleted).forEach(function(file, index) {
      if (!file.uid) {
        const options = self.setOptions(data);
        const uid = utils.genUid();
        file.uid = uid;
        file.flag = Config.flagMap['ADDED'];
        const fileunit = self.createFileUnit({
          file,
          options
        });

        fileunit.flag = 'ADDED';

        data.fileUnitList.splice(index, index, {
          inst: fileunit,
          uid: uid
        });

        setTimeout(self.updateFileList.bind(self), 0);
      }
    });
  },
  
  reduceFileList: function(deletedFileList, srcFileList) {
    const self = this;
    const data = this.data;

    function filterDeleted(file, srcIndex) {
      const index = deletedFileList.findIndex(function(item) {
        let isEqual = item.name === file.name && item.url === file.url;
        if (item.uid && file.uid) {
          isEqual = isEqual && item.uid === file.uid;
        }
        return isEqual;
      });
      
      if (index === -1 && (file.flag === Config.flagMap['ORIGINAL'] || file.flag === Config.flagMap['DELETED'])) {
        file.flag = Config.flagMap['DELETED'];
        data.fileList.splice(srcIndex, 0, file);
      }
      
      return index === -1;
    }

    srcFileList.filter(filterDeleted).forEach(function(file, index) {
      if (file.uid) {
        let visualIndex = data.fileUnitList.findIndex(function(item) {
          return item.uid === file.uid;
        });
        
        if (visualIndex !== -1) {
          data.fileUnitList.splice(visualIndex, 1);
        }
      }
      
      setTimeout(self.updateFileList.bind(self), 0);
    });
  },

  init(data) {
    this.supr(data);
  },

  initUploadedFileUnits() {
    const self = this;
    const data = this.data;
    const fileList = data.fileList;
    const fileUnitList = data.fileUnitList;

    if (data.fileList.length > 0) {
      const options = this.setOptions(data);
      fileList.forEach((file) => {
        let uid = utils.genUid();
        file.uid = uid;
        file.flag = Config.flagMap['ORIGINAL'];
        const fileunit = self.createFileUnit({
          file,
          options
        });

        fileunit.flag = 'ORIGINAL';

        fileUnitList.push({
          inst: fileunit,
          uid: uid
        });
      });
      
      setTimeout(this.updateFileList.bind(this), 0);
    }
  },

  fileListToFileUnitList() {

  },
  
  updateList() {
    this.updateFileUnitList();
    setTimeout(this.updateFileList.bind(this), 0);
  },
  
  updateFileUnitList() {
    const data = this.data;
    const fileList = data.fileList;
    const fileUnitList = data.fileUnitList;
    const newFileList = [];
    
    for (var index = fileUnitList.length - 1; index >= 0; index--) {
      let fu = fileUnitList[index];
      let fuUid = fu.uid;
      let fuInst = fu.inst;
      let fuFlag = fuInst.flag;
      let fuFile = fuInst.data.file;
      let destroyed = fuInst.destroyed;
      let fileIndex = fileList.findIndex(function(file) {
        return fuUid == file.uid;
      });

      if (fileIndex === -1) {
        newFileList.push({
          name: fuFile.name,
          url: fuFile.url,
          flag: Config.flagMap[fuFlag],
          uid: fuUid
        });
      } else {
        if (fuFlag === 'DELETED') {
          fileList[fileIndex].flag = Config.flagMap['DELETED'];
          fileUnitList.splice(index, 1);
        } else if (destroyed) {
          fileUnitList.splice(index, 1);
          fileList.splice(fileIndex, 1);
        }
      }
    }
    
    [].push.apply(fileList, newFileList.reverse());
    
    this.$update();
  },

  updateFileList() {
    const self = this;
    const data = this.data;
    const filesWrapper = data.filesWrapper;
    const fileUnitList = data.fileUnitList;
    
    fileUnitList.forEach((item, index) => {
      item.wrapper = self.$refs['fileunit' + index];
      item.inst.$inject(item.wrapper);
    });

    this.$update();
  },

  fileDialogOpen() {
    var inputNode = this.$refs.file;
    inputNode && inputNode.click();
  },

  fileSelect() {
    const inputNode = this.$refs.file;
    const files = inputNode.files;

    this.handleFiles(files);

    inputNode.value = '';
  },

  onDragEnter(e) {
    e.stopPropagation();
    e.preventDefault();
  },

  onDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
  },

  onDrop(e) {
    e.stopPropagation();
    e.preventDefault();

    if (!this.data.drag) {
      return;
    }

    const dt = e.event && e.event.dataTransfer;
    const files = dt.files;

    this.handleFiles(files);
  },

  setOptions(options) {
    const opts = options || {};

    return {
      url: opts.action,
      name: opts.name,
      readonly: opts.readonly,
      imageWidth: opts.imageWidth,
      imageHeight: opts.imageHeight,
      imageScale: opts.imageScale
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
  }
});

module.exports = UploadBase;
