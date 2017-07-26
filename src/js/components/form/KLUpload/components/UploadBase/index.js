/**
 *  ------------------------------
 *  upload.base 上传基础类
 *  ------------------------------
 */

const Component = require('../../../../../ui-base/component');
const _ = require('../../../../../ui-base/_');
const utils = require('../../utils');
const Config = require('../../config');
const FileUnit = require('../FileUnit');

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
      fileUnitHandlerList: [
        'preview', 'progress', 'success', 'error', 'remove', '$destroy'
      ]
    });
    
    this.initWatchers();
    this.initUploadedFileUnitList();
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
        const fileunit = self.createFileUnit({ file, options }, { flag: 'ADDED'});
        data.fileUnitList.splice(index, index, { inst: fileunit, uid: uid });

        setTimeout(self.updateFileListView.bind(self), 0);
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
      
      setTimeout(self.updateFileListView.bind(self), 0);
    });
  },

  init(data) {
    this.supr(data);
  },

  initUploadedFileUnitList() {
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
        const fileunit = self.createFileUnit({ file, options }, { flag: 'ORIGINAL' });
        fileUnitList.push({ inst: fileunit, uid: uid });
      });
      
      setTimeout(this.updateFileListView.bind(this), 0);
    }
  },

  updateList() {
    this.updateFileList();
    setTimeout(this.updateFileListView.bind(this), 0);
  },
  
  updateFileList() {
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

  updateFileListView() {
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
  
  handleFiles(files) {
    const self = this;
    const data = this.data;

    const options = this.setOptions(data);

    data.preCheckInfo = '';

    files = [].slice.call(files);
    files.forEach(function(file) {
      if (data.fileUnitList.length < data.numLimit) {
        const checker = self.preCheck(file);
        checker.then(function(preCheckInfo) {
          data.preCheckInfo = preCheckInfo;
          self.$update();
          if (!data.preCheckInfo) {
            const fileunit = self.createFileUnit({ file, options }, { flag: 'ADDED'});
            data.fileUnitList.push({ inst: fileunit, uid: utils.genUid() });
          }
        }); 
      }
    });

    this.updateList();
  },
  
  createFileUnit(data, options) {
    const self = this;
    const fileunit = new FileUnit({ data });

    this.addFileUnitHandler(fileunit);
    this.setFileUnitProperty(fileunit, options);

    return fileunit;
  },

  addFileUnitHandler(fileunit) {
    const self = this;
    const handlerList = this.data.fileUnitHandlerList;
    handlerList.forEach(function(handler) {
      let handlerFnName = handler;
      if (/\$/.test(handler)) {
        handlerFnName = handler.replace(/\$/, '');
      }
      fileunit.$on(handler, self['on' + utils.camelize(handlerFnName)].bind(self));
    });
  },

  removeFileUnitHandler(fileunit) {
    const self = this;
    const handlerList = this.data.fileUnitHandlerList;
    handlerList.forEach(function(handler) {
      let handlerFnName = handler;
      if (/\$/.test(handler)) {
        handlerFnName = handler.replace(/\$/, '');
      }
      fileunit.$off(handler);
    });
  },
  
  setFileUnitProperty(fileunit, options) {
    options = options || [];
    Object.keys(options).forEach(function(key) {
      fileunit[key] = options[key];
    });
  },
  
  onPreview(info) {
    const current = info.sender;

    function filterImgFile(file) {
      return file.inst.data.type === 'IMAGE';
    }

    function mapCurrentFlag(img) {
      if (current === img.inst) {
        img.inst.current = true;
      }
      return img.inst;
    }

    const imgList = this.data.fileUnitList
      .filter(filterImgFile)
      .map(mapCurrentFlag);

    const preview = createImagePreview(imgList);

    preview.$inject(this.$refs.imagepreview);

    function createImagePreview(imgFileList) {
      function findHelper(img) {
        return img.current;
      }

      const curIndex = imgFileList.findIndex(findHelper);

      function mapHelper(img) {
        delete img.current;
        return {
          src: img.data.src,
          name: img.data.name,
          status: img.data.status,
        };
      }

      const imgList = imgFileList.map(mapHelper);
      const imagePreview = new KLImagePreview({
        data: {
          imgList,
          curIndex,
        },
      });

      imagePreview.$on('remove', (imgInfo) => {
        const index = imgInfo.index;
      const imgInst = imgFileList[index];

      if (imgInst) {
        imgInst.$emit('remove');
      }
    });

      imagePreview.$on('$destroy', () => {
        imgFileList.splice(0);
    });

      return imagePreview;
    }
  },

  onProgress(info) {
    this.$emit(
      'progress',
      _.extend(info, {
        fileList: this.data.fileList
      })
    );
  },

  onSuccess(info) {
    this.updateList();
    this.$emit(
      'success',
      _.extend(info, {
        fileList: this.data.fileList
      })
    );
  },

  onError(info) {
    this.updateList();
    this.$emit(
      'error',
      _.extend(info, {
        fileList: this.data.fileList
      })
    );
  },

  onRemove(info) {
    var inst = info.sender;
    if (inst.flag === 'ORIGINAL') {
      inst.flag = 'DELETED';
      inst.file = inst.data.file;
    }
    this.$emit(
        'remove',
        _.extend(info, {
          fileList: this.data.fileList
        })
    );
    inst.destroy();
  },

  onDestroy(info){
    const inst = info.sender;
    inst.destroyed = true;
    this.removeFileUnitHandler(inst);
    this.updateList();
  },

  setOptions(options) {
    const opts = options || {};

    return {
      url: opts.action,
      name: opts.name,
      readonly: opts.readonly
    };
  },

  preCheck(file) {
    const self = this;
    const onPass = function(resolve) {
      let preCheckInfo = '';
      if (!self.isAcceptedFileSize(file)) {
        preCheckInfo = self.$trans('FILE_TOO_LARGE');
        return resolve(preCheckInfo);
      }
      if (!self.isAcceptedFileType(file)) {
        preCheckInfo = self.$trans('FILE_TYPE_ERROR');
        return resolve(preCheckInfo);
      }
      
      const imageChecker = self.preCheckImage(file);
      imageChecker && imageChecker.then(function(imageCheckInfo) {
        return resolve(imageCheckInfo);
      });
    };
    
    const onError = function(reject) {};
    
    return new Promise(onPass, onError);
  },
  
  preCheckImage(file) {
    const self = this;
    const data = this.data;
    const type = this.getFileType(file).toLowerCase();
    
    if (type === 'image') {
      const imageWidth = data.imageWidth;
      const imageHeight = data.imageHeight;
      const imageScale = data.imageScale;
      
      const onResolve = function(resolve) {
        const img = new Image();
        img.onload = function() {
          window.URL.revokeObjectURL(img.src);
          const width = img.width;
          const height = img.height;
          let checkInfo = '';
          if (isFinite(imageWidth) && imageWidth !== width) {
            checkInfo = self.$trans('IMAGE_WIDTH_ERROR');
          }
          if (isFinite(imageHeight) && imageHeight !== height) {
            checkInfo = self.$trans('IMAGE_HEIGHT_ERROR');
          }
          if (!!imageScale) {
            const scaleList = imageScale.split(':');
            const scaleW = scaleList[0];
            const scaleH = scaleList[1];
            if (Math.abs(width / height - scaleW / scaleH) > 0.01) {
              checkInfo = self.$trans('IMAGE_SCALE_ERROR');
            }
          }
          
          resolve(checkInfo);
        }

        img.src = window.URL.createObjectURL(file);
      };
      
      const onReject = function(reject) {};
      
      return new Promise(onResolve, onReject);
    }
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
    const typeMap = Config.typeMap;
    let typeStr = 'UNKNOWN';

    Object.keys(typeMap).forEach(function(key) {
      const reg = new RegExp(key + '$');
      if (reg.test(type) || !type && reg.test(name)) {
        typeStr = typeMap[key];
      }
    });
    
    return typeStr;
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
