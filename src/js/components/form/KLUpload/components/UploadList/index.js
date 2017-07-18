/**
 *  ------------------------------
 *  UploadList 上传
 *  ------------------------------
 */

const _ = require('../../../../../ui-base/_');
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
    data.filesWrapper.appendChild(data.inputWrapper);
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
    const data = this.data;
    const len = files.length;
    let index = 0;
    let file;
    let fileunit;

    const options = this.setOptions(data);

    data.preCheckInfo = '';

    for (; index < len; index += 1) {
      if (data.fileUnitList.length < data.numLimit) {
        file = files[index];
        data.preCheckInfo = this.preCheck(file);
        if (!data.preCheckInfo) {
          fileunit = this.createFileUnit({
            file,
            options
          });
          fileunit.flag = 'ADDED';
          data.fileUnitList.push({
            inst: fileunit,
          });
        }
      }
    }

    this.updateFileList();
  },

  createFileUnit(data) {
    const self = this;
    const imagePreviewWrapper = this.$refs.imagepreview;
    const fileunit = new FileUnit({ data });

    fileunit.$on('preview', function () {
      const current = this;

      function filterImgFile(file) {
        return file.inst.data.type === 'IMAGE';
      }

      function mapHelper(img) {
        if (current === img.inst) {
          img.inst.current = true;
        }
        return img.inst;
      }

      const imgList = self.data.fileUnitList
        .filter(filterImgFile)
        .map(mapHelper);

      const preview = createImagePreview(imgList);

      preview.$inject(imagePreviewWrapper);
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
      self.updateFileList();
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
      self.updateFileList();
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
      self.updateFileList();
    });

    return fileunit;
  },

  updateFileList() {
    this.supr();
    this.appendInputWrapper();
    this.$update();
  },

  createFileUnitWrapper(parent, index) {
    const wrapper = document.createElement('li');

    parent.appendChild(wrapper);

    this.setFileUnitWrapperStyle(wrapper, index);

    return wrapper;
  },

  setFileUnitWrapperStyle(wrapper, index) {
    const data = this.data;
    const numPerline = data.numPerline;
    const fileUnitWidth = data.fileUnitWidth;
    const fileUnitMargin = data.fileUnitMargin;

    wrapper.className = 'u-fileitem';
    wrapper.style.display = 'inline-block';
    wrapper.style.width = `${fileUnitWidth}px`;

    wrapper.style.marginRight = `${fileUnitMargin}px`;
    if (index && isFinite(numPerline) && (index + 1) % numPerline == 0) {
      wrapper.style.marginRight = '0';
    }
  },

  appendInputWrapper() {
    const data = this.data;
    const inputWrapper = data.inputWrapper;
    const filesWrapper = data.filesWrapper;
    const numPerline = data.numPerline;
    const numLimit = data.numLimit;
    const fileUnitMargin = data.fileUnitMargin;
    const length = data.fileUnitList.length;

    if (length < numLimit) {
      filesWrapper.appendChild(inputWrapper);

      if (length % numPerline) {
        inputWrapper.style.marginRight = '0';
      } else {
        inputWrapper.style.marginRight = `${fileUnitMargin}px`;
      }
    }
  },
});

module.exports = UploadList;
