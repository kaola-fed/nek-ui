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
  template: tpl.replace(/([>}])\s*([<{])/g, '$1$2'),
  config(data) {
    this.supr(data);
    
    _.extend(data, {
      numPerline: Infinity,
      fileUnitWidth: 50,
      fileUnitMargin: 25,
    });
  },

  init(data) {
    this.initData(data);
    this.supr(data);
  },

  initData(data) {
    data.inputWrapper = this.$refs.inputwrapper;
    data.filesWrapper = this.$refs.fileswrapper;
  }
});

module.exports = UploadList;
