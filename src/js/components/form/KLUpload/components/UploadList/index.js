/**
 *  ------------------------------
 *  UploadList 上传
 *  ------------------------------
 */

const _ = require('../../../../../ui-base/_');
const utils = require('../../utils');
const FileUnit = require('../FileUnit');
const UploadBase = require('../UploadBase');
const KLImagePreview = require('../KLImagePreview');
const tpl = require('./index.html');

/**
 * @class UploadList
 * @extend UploadBase
 */
const UploadList = UploadBase.extend({
  name: 'upload-list',
  template: tpl.replace(/([>}])\s*([<{])/g, '$1$2'),
  config(data) {
    this.supr(data);
    
    _.extend(data, {
      fileUnitWidth: 50,
      fileUnitMargin: 25,
      fileWrapperWidth: '100%'
    });

  },

  init(data) {
    this.initFilesWrapper(data);
    
    this.supr(data);
  },

  initFilesWrapper(data) {
    data.inputWrapper = this.$refs.inputwrapper;
    data.filesWrapper = this.$refs.fileswrapper;
    // data.filesWrapper.appendChild(data.inputWrapper);
    this.initFileWrapperStyle(data);
  },
  
  initFileWrapperStyle: function(data) {
    const fileUnitWidth = data.fileUnitWidth;
    const numPerline = data.numPerline;
    const fileUnitMargin = data.fileUnitMargin;
    if (isFinite(numPerline)) {
      data.fileWrapperWidth = fileUnitWidth * numPerline + fileUnitMargin * (numPerline - 1) + 'px';
    }
  },

  handleFiles(files) {
    const self = this;
    const data = this.data;
    let fileunit;

    const options = this.setOptions(data);

    data.preCheckInfo = '';

    files = [].slice.call(files);
    files.forEach(function(file) {
      if (data.fileUnitList.length < data.numLimit) {
        data.preCheckInfo = self.preCheck(file);
        if (!data.preCheckInfo) {
          fileunit = self.createFileUnit({
            file,
            options
          });
          fileunit.flag = 'ADDED';
          data.fileUnitList.push({
            inst: fileunit,
            uid: utils.genUid()
          });
        }
      }
    });

    this.updateList();
  },

  createFileUnit(data) {
    const self = this;
    const fileunit = new FileUnit({ data });

    fileunit.$on('preview', function () {
      const current = this;

      function filterImgFile(file) {
        return file.inst.data.type === 'IMAGE';
      }

      function mapCurrentFlag(img) {
        if (current === img.inst) {
          img.inst.current = true;
        }
        return img.inst;
      }

      const imgList = self.data.fileUnitList
        .filter(filterImgFile)
        .map(mapCurrentFlag);

      const preview = createImagePreview(imgList);

      preview.$inject(self.$refs.imagepreview);
    });

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

    fileunit.$on('success', (info) => {
      self.updateList();
      self.$emit(
        'success',
        _.extend(info, {
          fileList: self.data.fileList
        })
      );
    });
    
    fileunit.$on('progress', function (info) {
       self.$emit(
         'progress',
         _.extend(info, {
           fileList: self.data.fileList
         })
       );
    });
    
    fileunit.$on('error', function (info) {
      self.updateList();
      self.$emit(
        'error',
        _.extend(info, {
          fileList: self.data.fileList
        })
      );
    });

    fileunit.$on('remove', function (info) {
      if (this.flag === 'ORIGINAL') {
        this.flag = 'DELETED';
        this.file = this.data.file;
      }
      self.$emit(
        'remove',
        _.extend(info, {
          fileList: self.data.fileList
        })
      );
      this.destroy();
    });

    fileunit.$on('$destroy', function () {
      this.destroyed = true;
      self.updateList();
    });

    return fileunit;
  }
});

module.exports = UploadList;
