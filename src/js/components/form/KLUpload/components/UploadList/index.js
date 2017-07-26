/**
 *  ------------------------------
 *  UploadList 上传
 *  ------------------------------
 */

const _ = require('../../../../../ui-base/_');
const UploadBase = require('../UploadBase');
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
    this.initFileWrapperStyle(data);
  },
  
  initFileWrapperStyle: function(data) {
    const fileUnitWidth = data.fileUnitWidth;
    const numPerline = data.numPerline;
    const fileUnitMargin = data.fileUnitMargin;
    if (isFinite(numPerline)) {
      data.fileWrapperWidth = fileUnitWidth * numPerline + fileUnitMargin * (numPerline - 1) + 'px';
    }
  }
});

module.exports = UploadList;
