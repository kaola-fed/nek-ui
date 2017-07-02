/**
 *  ------------------------------
 *  UploadList 上传
 *  ------------------------------
 */

const FileUnit = require('../FileUnit');
const UploadBase = require('../UploadBase');
const ImagePreview = require('../ImagePreview');
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
  },

  init(data) {
    this.initFilesWrapper();
    this.supr(data);
  },

  initFilesWrapper() {
    const inputWrapper = (this.data.inputWrapper = this.$refs.inputwrapper);
    const filesWrapper = (this.data.filesWrapper = this.$refs.fileswrapper);
    filesWrapper.appendChild(inputWrapper);
    inputWrapper.style.display = 'inline-block';
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

  fileSelect() {
    let inputNode = this.$refs.file,
      files = inputNode.files;

    this.handleFiles(files);

    inputNode.value = '';
  },

  handleFiles(files) {
    let data = this.data,
      index = 0,
      len = files.length,
      file,
      fileunit,
      options;

    options = this.setOptions(data);

    data.preCheckInfo = '';

    for (; index < len; index++) {
      if (data.fileUnitList.length < data.numLimit) {
        file = files[index];
        data.preCheckInfo = this.preCheck(file);
        if (data.preCheckInfo) {
          continue;
        }
        fileunit = this.createFileUnit({
          file,
          options,
          deletable: data.deletable,
        });
        fileunit.flag = 'ADDED';
        data.fileUnitList.push({
          inst: fileunit,
        });
      }
    }

    this.updateFileList();
  },

  createFileUnit(data) {
    let self = this,
      imagePreview = this.$refs.imagepreview,
      fileunit = new FileUnit({ data });

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

      preview.$inject(imagePreview);
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

      const imagePreview = new ImagePreview({
        data: {
          imgList,
          curIndex,
        },
      });

      imagePreview.$on('delete', (imgInfo) => {
        let index = imgInfo.index,
          imgInst = imgFileList[index];

        if (imgInst) {
          imgInst.$emit('delete');
        }
      });

      imagePreview.$on('$destroy', () => {
        imgFileList = null;
      });

      return imagePreview;
    }

    fileunit.$on('onload', () => {
      self.updateFileList();
    });

    fileunit.$on('success', () => {
      self.updateFileList();
    });

    fileunit.$on('delete', function () {
      if (this.flag === 'ORIGINAL') {
        this.flag = 'DELETED';
        this.file = this.data.file;
      }
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
    let data = this.data,
      numPerline = data.numPerline,
      fileUnitWidth = data.fileUnitWidth,
      fileUnitMargin = data.fileUnitMargin;

    wrapper.className = 'u-fileitem';
    wrapper.style.display = 'inline-block';
    wrapper.style.width = `${fileUnitWidth}px`;

    if (index && index % numPerline) {
      wrapper.style.marginLeft = `${fileUnitMargin}px`;
    }
  },

  appendInputWrapper() {
    let data = this.data,
      inputWrapper = data.inputWrapper,
      filesWrapper = data.filesWrapper,
      numPerline = data.numPerline,
      numLimit = data.numLimit,
      fileUnitMargin = data.fileUnitMargin,
      length = data.fileUnitList.length;

    if (length < numLimit) {
      filesWrapper.appendChild(inputWrapper);

      if (length % numPerline) {
        inputWrapper.style.marginLeft = `${fileUnitMargin}px`;
      } else {
        inputWrapper.style.marginLeft = '0';
      }
    }
  },
});

module.exports = UploadList;
