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
const KLImagePreview = require('../../../../widget/KLImagePreview');

/**
 * @class UploadBase
 * @extend Component
 * @param {object}     [options.data]                = 绑定属性
 * @param {string}     [options.data.action]         => 必选，上传地址
 * @param {array}      [options.data.file-list]      => 上传的文件列表, 可以指定初始值，代表已经上传的文件，见demo，每次操作文件后，
 *                                                       都可以通过该参数绑定的变量，得到最新的文件列表，其中每个文件项包含下面的字段:
 *                                                       name: 文件名称
 *                                                       url: 文件的路径
 *                                                       flag: 0, 新增的文件; 1, 已经上传未被删除的文件，2，已经上传被删除的文件
 * @param {string}     [options.data.name]           => 可选，上传的文件字段名, 默认为'file'
 * @param {object}     [options.data.headers]              => 可选，设置上传的请求头部
 * @param {object}     [options.data.with-credentials=false]    => 可选，支持发送 cookie 凭证信息, 默认false
 * @param {boolean}    [options.data.multiple]       => 可选，是否支持多选, 可选值true/false，默认false单选
 * @param {object}     [options.data.data]           => 可选，上传时附带的额外参数
 * @param {boolean}    [options.data.drag]           => 可选，是否支持拖拽上传，可选值true/false，默认false不支持拖拽
 * @param {string}     [options.data.accept]         => 可选，接受上传的文件类型, 同input的accept属性
 * @param {string}     [options.data.list-type]      => 可选，上传组件的展示形式, 可选值list/card，默认list
 * @param {number}     [options.data.num-min]        => 可选，指定的至少上传的文件个数，默认无限制
 * @param {number}     [options.data.num-max]        => 可选，最大允许上传文件的个数，默认无限制
 * @param {number}     [options.data.num-perline]    => 可选，每行展示的文件个数，对于列表形式，默认无限制，根据父容器自动折行；
 *                                                       对于表单形式，默认每行展示5个
 * @param {number}     [options.data.max-size]       => 可选，上传文件大小的最大允许值, 支持数值大小以及KB,MB,GB为单元的指定
 * @param {boolean}    [options.data.readonly]       => 可选，是否开启预览模式，可选值true/false，true预览模式，只能预览和下载图片，
 *                                                       默认false，允许上传和删除图片
 * @param {number}     [options.data.image-width]    => 可选，指定上传图片文件的宽度, 值为数值，单位为px，如800
 * @param {number}     [options.data.image-height]   => 可选，指定上传图片文件的高度, 值为数值，单位为px, 如600
 * @param {string}     [options.data.image-scale]    => 可选，指定上传图片文件的宽高比, 值为冒号分隔的宽高比例字符串，如'4:3'
 * @param {boolean}    [options.data.readonly]       => 可选，是否开启预览模式，可选值true/false，true预览模式，只能预览和下载图片，
 */
const UploadBase = Component.extend({
  config(data) {
    this.supr(data);

    _.extend(data, {
      action: '',
      name: 'file',
      headers: {},
      withCredentials: false,
      multiple: false,
      data: {},
      drag: false,
      accept: '*',
      listType: 'list',
      fileList: [],
      numMin: -Infinity,
      numMax: Infinity,
      numPerline: Infinity,
      maxSize: Config.sizeMap.GB,
      readonly: false,
      imageWidth: Infinity,
      imageHeight: Infinity,
      imageScale: '',
      encType: 'multipart/form-data',
      onLoadInterceptor: null,
      onErrorInterceptor: null,
      beforeUpload: null,
      beforeRemove: null,
    });

    _.extend(data, {
      fileUnitList: [],
      dragover: false,
      dragenterCount: 0,
    });

    this.initWatchers();
    this.initUploadedFileUnitList();
  },

  initWatchers() {
    const self = this;

    this.$watch('fileList', (newVal, oldVal) => {
      if (oldVal !== undefined) {
        if (newVal.length >= oldVal.length) {
          self.extendFileList(newVal);
        } else {
          self.reduceFileList(newVal, oldVal);
        }
      }
    }, true);
  },

  extendFileList(fileList) {
    const self = this;
    const data = this.data;

    function filterDeleted(file) {
      return file.flag !== Config.flagMap.DELETED;
    }

    fileList.filter(filterDeleted).forEach((file, index) => {
      if (!file.uid) {
        const uid = utils.genUid();
        file.uid = uid;
        file.flag = file.flag === undefined ? Config.flagMap.ORIGINAL : file.flag;
        const fileunit = {
          name: file.name,
          url: file.url,
          type: self.getFileType(file),
          flag: file.flag,
          uid: file.uid,
          status: 'success',
        };
        data.fileUnitList.splice(index, index, fileunit);
      }
    });
  },

  reduceFileList(deletedFileList, srcFileList) {
    const data = this.data;

    function filterDeleted(file, srcIndex) {
      const index = deletedFileList.findIndex((item) => {
        let isEqual = item.name === file.name && item.url === file.url;
        if (item.uid && file.uid) {
          isEqual = isEqual && item.uid === file.uid;
        }
        return isEqual;
      });

      if (index === -1 && (file.flag === Config.flagMap.ORIGINAL || file.flag === Config.flagMap.DELETED)) {
        file.flag = Config.flagMap.DELETED;
        data.fileList.splice(srcIndex, 0, file);
      }

      return index === -1;
    }

    srcFileList.filter(filterDeleted).forEach((file) => {
      if (file.uid) {
        const visualIndex = data.fileUnitList.findIndex(item => item.uid === file.uid);

        if (visualIndex !== -1) {
          data.fileUnitList.splice(visualIndex, 1);
        }
      }
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
      fileList.forEach((file) => {
        const uid = utils.genUid();
        file.uid = uid;
        file.flag = file.flag === undefined ? Config.flagMap.ORIGINAL : file.flag;
        const fileunit = {
          name: file.name,
          url: file.url,
          type: self.getFileType(file),
          flag: file.flag,
          uid: file.uid,
          status: 'success',
          class: file.class || '',
        };

        if (fileunit.flag !== Config.flagMap.DELETED) {
          fileUnitList.push(fileunit);
        }
      });
    }
  },

  updateList(info) {
    // setTimeout((function() { this.updateFileList(); }).bind(this), 0);
    this.updateFileList(info);
  },

  updateFileList(info) {
    const data = this.data;
    const uid = info.file.uid;
    const { fileUnitList } = data;

    const fileList = JSON.parse(JSON.stringify(data.fileList));
    // 找到触发更新的unit单元
    const unitIndex = fileUnitList.findIndex(item => uid === item.uid);
    const unit = fileUnitList[unitIndex];
    const { name, url, flag, destroyed } = unit;

    // 找到该unit单元在fileList中的位置
    const fileIndex = fileList.findIndex(item => uid === item.uid);
    if (fileIndex === -1 && (unit.status === 'success' || unit.status === 'wait')) {
      // fileList中不存在该单元数据，新增数据
      // 只有当上传成功时才更新fileList
      fileList.push({ name, url, flag, uid });
    } else if (flag === Config.flagMap.DELETED) {
      if (fileIndex !== -1) {
        fileList[fileIndex].flag = Config.flagMap.DELETED;
      }
      fileUnitList.splice(unitIndex, 1);
    } else if (destroyed) {
      if (fileIndex !== -1) {
        fileList.splice(fileIndex, 1);
      }
      fileUnitList.splice(unitIndex, 1);
    }
    data.fileList = fileList;
    if (!data.autoUpload) {
      this.initFormData();
    }
    this.$update();
  },

  initFormData() {
    const data = this.data;
    const name = data.name || 'file';
    const { fileList, fileUnitList } = data;

    data.formData = data.formData || new FormData();
    data.formData.delete(name);
    for (const file of Object.values(fileList)) {
      const { flag, uid } = file;
      if (flag === Config.flagMap.ADDED) {
        const unitIndex = fileUnitList.findIndex(item => uid === item.uid);
        data.formData.append(name, fileUnitList[unitIndex].rawFile);
      }
    }
  },

  fileDialogOpen() {
    const inputNode = this.$refs.file;
    inputNode && inputNode.click();
  },

  fileSelect() {
    const inputNode = this.$refs.file;
    const files = inputNode.files;

    this.handleFiles(files);

    inputNode.value = '';
  },

  onDragEnter(e) {
    const data = this.data;
    e.stopPropagation();
    e.preventDefault();
    data.dragover = true;
    data.dragenterCount += 1;
  },

  onDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
  },

  onDragLeave(e) {
    const data = this.data;
    e.stopPropagation();
    e.preventDefault();
    data.dragenterCount -= 1;
    if (data.dragenterCount === 0) {
      data.dragover = false;
    }
  },

  onDrop(e) {
    this.data.dragover = false;
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

    data.preCheckInfo = '';

    const fileList = [].slice.call(files);
    fileList.forEach((file) => {
      if (data.fileUnitList.length < data.numMax) {
        const checker = self.preCheck(file);
        checker.then((preCheckInfo) => {
          data.preCheckInfo = preCheckInfo;
          self.$update();
          if (!data.preCheckInfo && data.fileUnitList.length < data.numMax) {
            const fileunit = {
              rawFile: file,
              name: file.name,
              url: window.URL.createObjectURL(file),
              type: self.getFileType(file),
              flag: Config.flagMap.ADDED,
              uid: utils.genUid(),
              status: self.data.autoUpload ? 'ready' : 'wait',
            };
            data.fileUnitList.push(fileunit);
            self.$update();
          }
        });
      }
    });
  },

  onPreview(info) {
    const current = info.file;
    this.$emit('preview', info);
    if (current.type !== 'image') {
      return;
    }
    function filterImgFile(file) {
      return file.type === 'image';
    }

    function mapCurrentFlag(img) {
      if (current === img) {
        img.current = true;
      }
      return img;
    }

    let imageList = this.data.fileUnitList
      .filter(filterImgFile)
      .map(mapCurrentFlag);

    const preview = createImagePreview(imageList);

    preview.$inject(this.$refs.imagepreview);

    function createImagePreview(imgFileList) {
      function findHelper(img) {
        return img.current;
      }

      const curIndex = imgFileList.findIndex(findHelper);

      function mapHelper(img) {
        delete img.current;
        return {
          src: img.url,
          name: img.name,
          status: img.status,
        };
      }

      imageList = imgFileList.map(mapHelper);
      const imagePreview = new KLImagePreview({
        data: {
          imageList,
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
        fileList: this.data.fileList,
      }),
    );
  },

  onSuccess(info) {
    this.updateList(info);
    this.$emit(
      'success',
      _.extend(info, {
        fileList: this.data.fileList,
      }),
    );
  },

  onError(info) {
    // 错误的情况下不更新fileList
    // this.updateList(info);
    this.$emit(
      'error',
      _.extend(info, {
        fileList: this.data.fileList,
      }),
    );
  },

  onRemove(info) {
    const inst = info.sender;
    const file = info.file;
    file.destroyed = true;
    if (file.flag === Config.flagMap.ORIGINAL) {
      file.flag = Config.flagMap.DELETED;
    }
    inst.destroy();
    this.updateList(info);

    this.$emit(
        'remove',
        _.extend(info, {
          fileList: this.data.fileList,
        }),
    );
  },

  setOptions(options) {
    const opts = options || {};

    return {
      url: opts.action,
      name: opts.name,
      readonly: opts.readonly,
      data: opts.data,
    };
  },

  preCheck(file) {
    const self = this;
    const data = self.data;
    const beforeCheck = data.beforeUpload && data.beforeUpload(file);

    const preFileCheck = (resolve) => {
      const type = self.getFileType(file).toLowerCase();
      let preCheckInfo = '';

      if (!self.isAcceptedFileSize(file)) {
        preCheckInfo = self.$trans('FILE_TOO_LARGE');
        return resolve(preCheckInfo);
      }
      if (!self.isAcceptedFileType(file)) {
        preCheckInfo = self.$trans('FILE_TYPE_ERROR');
        return resolve(preCheckInfo);
      }

      if (type === 'image') {
        const imageChecker = self.preCheckImage(file);
        imageChecker && imageChecker.then(imageCheckInfo => resolve(imageCheckInfo));
      } else {
        return resolve(preCheckInfo);
      }
    };

    if (beforeCheck && beforeCheck.then) {
      return beforeCheck.then((checkInfo) => {
        if (checkInfo === '') {
          return new Promise(preFileCheck);
        }
        return Promise.resolve(checkInfo);
      });
    } else if (beforeCheck === '' || beforeCheck === null || beforeCheck === undefined) {
      return new Promise(preFileCheck);
    }

    return Promise.resolve(beforeCheck);
  },

  preCheckImage(file) {
    const self = this;
    const data = this.data;
    const type = this.getFileType(file).toLowerCase();

    if (type === 'image') {
      const imageWidth = data.imageWidth;
      const imageHeight = data.imageHeight;
      const imageScale = data.imageScale;

      const preImageCheck = (resolve) => {
        const img = new window.Image();
        img.onload = () => {
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
          if (imageScale) {
            const scaleList = imageScale.split(':');
            const scaleW = scaleList[0];
            const scaleH = scaleList[1];
            if (Math.abs((width / height) - (scaleW / scaleH)) > 0.01) {
              checkInfo = self.$trans('IMAGE_SCALE_ERROR');
            }
          }

          resolve(checkInfo);
        };

        img.src = window.URL.createObjectURL(file);
      };

      return new Promise(preImageCheck);
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
    let typeStr = 'unknown';

    Object.keys(typeMap).forEach((key) => {
      const reg = new RegExp(`${key}$`);
      // 名称后缀不区分大小写
      if (reg.test(type) || reg.test(`${name}`.toLowerCase())) {
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
  },
})
  .component('file-unit', FileUnit);

module.exports = UploadBase;
