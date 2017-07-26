/**
 *  ------------------------------
 *  UploadList 上传
 *  ------------------------------
 */

const _ = require('../../../../../ui-base/_');
const utils = require('../../utils');
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
          fileunit = self.createFileUnit({ file, options });
          fileunit.flag = 'ADDED';
          data.fileUnitList.push({
            inst: fileunit,
            uid: utils.genUid()
          });
        }
      }
    });

    this.updateList();
  }
});

module.exports = UploadList;
