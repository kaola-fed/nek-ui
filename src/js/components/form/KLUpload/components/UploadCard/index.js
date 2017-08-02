/**
 *  ------------------------------
 *  UploadCard 上传
 *  ------------------------------
 */

const _ = require('../../../../../ui-base/_');
const utils = require('../../utils');
const UploadBase = require('../UploadBase');
const tpl = require('./index.html');

/**
 * @class UploadCard
 * @extend UploadBase
 */

const UploadCard = UploadBase.extend({
  template: tpl.replace(/([>}])\s*([<{])/g, '$1$2'),
  computed: {
    entryFileInfo: {
      get() {
        const lastFileUnit = this.data.fileUnitList.slice(-1)[0];
        return {
          name: (lastFileUnit && lastFileUnit.name) || '',
          type: (lastFileUnit && lastFileUnit.type) || '',
          src: (lastFileUnit && lastFileUnit.url) || '',
        };
      },
    },

    fileUnitListWidth: {
      get() {
        const data = this.data;
        const fileUnitWidth = data.fileUnitWidth;
        const fileUnitMargin = data.fileUnitMargin;
        let numPerline = data.numPerline;

        if (!isFinite(numPerline)) {
          data.numPerline = 5;
          numPerline = data.numPerline;
        }

        return (fileUnitWidth * numPerline) + (fileUnitMargin * (numPerline - 1));
      },
    },
  },
  config(data) {
    this.supr(data);

    _.extend(data, {
      status: 'success',
      info: '',
      numPerline: 5,
      fileUnitWidth: 50,
      fileUnitMargin: 25,
      fileUnitListPadding: 22,
    });
  },

  init(data) {
    this.initFilesZone(data);

    this.supr(data);
  },

  initFilesZone(data) {
    data.filesWrapper = this.$refs.fileswrapper;
  },

  handleFiles(files) {
    this.toggle(false);

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
          if (!data.preCheckInfo) {
            const fileunit = {
              rawFile: file,
              name: file.name,
              url: window.URL.createObjectURL(file),
              type: self.getFileType(file),
              flag: 'ADDED',
              uid: utils.genUid(),
              status: 'ready',
            };
            data.fileUnitList.push(fileunit);
            self.updateFilesZone();
            self.$update();
          }
        });
      }
    });

    this.updateList();
  },

  onProgress(info) {
    const curFile = info.file;
    const data = this.data;
    let curIndex = -1;
    let lastIndex = -1;

    data.fileUnitList.forEach((item, index) => {
      if (item.status === 'uploading') {
        lastIndex = index;
      }

      if (item.rawFile === curFile) {
        curIndex = index;
      }
    });

    if (curIndex >= lastIndex && data.status !== 'fail') {
      data.status = 'uploading';
      data.progress = info.progress;
      this.$update();
    }

    this.supr(info);
  },

  onSuccess(info) {
    const data = this.data;
    let allUploaded = true;
    let hasFailed = false;
    data.fileUnitList.forEach((item) => {
      allUploaded = allUploaded && item.status === 'success';
      hasFailed = hasFailed || item.status === 'fail';
    });

    if (allUploaded) {
      data.status = 'success';
    } else if (hasFailed) {
      data.status = 'fail';
    }

    this.supr(info);
  },

  onError(info) {
    const data = this.data;
    data.status = 'fail';
    data.info = this.$trans('UPLOAD_FAIL');

    this.supr(info);
  },

  onRemove(info) {
    const self = this;
    const inst = info.sender;
    const file = info.file;
    self.toggle(false);
    file.destroyed = true;

    if (file.flag === 'ORIGINAL') {
      file.flag = 'DELETED';
    }
    inst.destroy();
    self.updateList();
    this.$emit(
        'remove',
        _.extend(info, {
          fileList: this.data.fileList,
        }),
    );

    self.updateFilesZone();
    resetStatus();

    function resetStatus() {
      let allUploaded = true;
      let hasFailed = false;
      self.data.fileUnitList.forEach((item) => {
        allUploaded = allUploaded && item.status === 'success';
        hasFailed = hasFailed || item.status === 'fail';
      });

      if (allUploaded) {
        self.data.status = 'success';
      } else if (hasFailed) {
        self.data.status = 'fail';
      }

      self.$update();
    }
  },

  updateFilesZone() {
    const data = this.data;
    const filesZone = this.$refs.fileszone;
    const entryWrapper = this.$refs.entrywrapper;
    const inputWrapper = this.$refs.inputwrapper;

    if (data.fileUnitList.length < data.numMax) {
      filesZone.style.width = '125px';
      entryWrapper.style['margin-right'] = '20px';
      inputWrapper.style.display = 'inline-block';
    } else if (data.fileUnitList.length === data.numMax) {
      filesZone.style.width = '50px';
      entryWrapper.style['margin-right'] = '0';
      inputWrapper.style.display = 'none';
    }
  },

  uploadFiles() {
    const self = this;
    const data = this.data;
    const fileUnitList = data.fileUnitList;

    data.status = 'success';
    data.info = '';

    fileUnitList.forEach((item, index) => {
      if (item.status === 'fail') {
        const fileunit = self.$refs[`fileunit${index}`];
        if (fileunit) {
          const file = fileunit.data.file;
          if (file.rawFile) {
            fileunit.uploadFile(file.rawFile);
          }
        }
      }
    });
  },

  toggle(open, e) {
    e && e.stopPropagation();

    const data = this.data;
    if (typeof open === 'undefined') {
      data.open = !data.open;
    } else {
      data.open = open;
    }

    this.setPosition(!data.open);

    const index = UploadCard.opens.indexOf(this);
    if (data.open && index < 0) {
      UploadCard.opens.push(this);
    } else if (!data.open && index >= 0) {
      UploadCard.opens.splice(index, 1);
    }
  },

  setPosition(hidden) {
    const filesBanner = this.$refs.filesbanner;
    const filesWrapper = this.$refs.fileswrapper;
    if (hidden) {
      filesBanner.style.left = '-9999px';
      filesWrapper.style.left = '-9999px';
      return;
    }
    this.setVerticalPosition();
    this.setHorizontalPosition();
  },

  setVerticalPosition() {
    const filesEntry = this.$refs.filesentry;
    const filesEntryCoors = filesEntry.getBoundingClientRect();
    const filesWrapper = this.$refs.fileswrapper;
    const filesWrapperCoors = filesWrapper.getBoundingClientRect();
    const viewHeight = document.documentElement.clientHeight;

    // show at vertical bottom side
    let vertical = 'bottom';
    // show at vertical top side
    const isVerticalTopSide =
      filesEntryCoors.top - filesWrapperCoors.height > 0;
    const isVerticalBottomSide =
      filesEntryCoors.bottom + filesWrapperCoors.height < viewHeight;
    if (isVerticalTopSide && !isVerticalBottomSide) {
      vertical = 'top';
    }

    if (vertical === 'bottom') {
      this.data.isTopBanner = false;
      filesWrapper.style.top = '53px';
      filesWrapper.style.bottom = 'auto';
      filesWrapper.style.boxShadow = 'auto';
      filesWrapper.style.boxShadow = '0 2px 3px 0 rgba(0,0,0,0.1)';
    } else {
      this.data.isTopBanner = true;
      filesWrapper.style.top = 'auto';
      filesWrapper.style.bottom = '53px';
      filesWrapper.style.boxShadow = '0 -2px 3px 0 rgba(0,0,0,0.1)';
    }
  },

  setHorizontalPosition() {
    const filesEntry = this.$refs.filesentry;
    const filesEntryCoors = filesEntry.getBoundingClientRect();
    const filesBanner = this.$refs.filesbanner;
    const filesWrapper = this.$refs.fileswrapper;
    const filesWrapperCoors = filesWrapper.getBoundingClientRect();
    const viewWidth = document.documentElement.clientWidth;

    // show at central
    let horizontal = 'left';
    const offsetWidth = (filesWrapperCoors.width / 2) - (filesEntryCoors.width / 2);
    const isHorizontalLeftEdge = filesEntryCoors.left - offsetWidth < 0;
    const isHorizontalRightEdge =
      filesEntryCoors.right + offsetWidth > viewWidth;
    if (isHorizontalRightEdge) {
      horizontal = 'right';
    }
    const isHorizontalCenter = !isHorizontalLeftEdge && !isHorizontalRightEdge;
    if (isHorizontalCenter) {
      horizontal = 'central';
    }

    if (horizontal === 'left') {
      filesWrapper.style.left = '0';
      filesWrapper.style.right = 'auto';
    } else if (horizontal === 'right') {
      filesWrapper.style.left = 'auto';
      filesWrapper.style.right = '0';
    } else if (horizontal === 'central') {
      filesWrapper.style.left = `-${offsetWidth}px`;
    }

    filesBanner.style.left = '20px';
  },
});

UploadCard.opens = [];
const opens = UploadCard.opens;
document.addEventListener(
  'click',
  (e) => {
    for (let len = opens.length, i = len - 1; i >= 0; i -= 1) {
      let close = true;

      const upload = opens[i];
      const uploadElement = upload.$refs.element;
      let iterator = e.target;

      while (iterator) {
        if (uploadElement === iterator) {
          close = false;
          break;
        }
        iterator = iterator.parentElement;
      }

      if (close) {
        upload.toggle(false, e);
        upload.$update();
      }
    }
  },
  false,
);

module.exports = UploadCard;
