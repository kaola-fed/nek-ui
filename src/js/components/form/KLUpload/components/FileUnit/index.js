/**
 *  ------------------------------
 *  FileUnit
 *  ------------------------------
 */

const Component = require('../../../../../ui-base/component');
const _ = require('../../../../../ui-base/_');
const tpl = require('./index.html');
const utils = require('../../utils');
const KLModal = require('../../../../notice/KLModal');

const FileUnit = Component.extend({
  name: 'file-unit',
  template: tpl.replace(/([>}])\s*([<{])/g, '$1$2'),
  config(data) {
    _.extend(data, {
      file: {},
      options: {},
    });

    _.extend(data, {
      info: '',
      status: '',
      progress: '0%',
      delConfirm: false,
    });

    this.initData(data);

    this.supr(data);
  },
  
  init: function(data) {
  },

  initData(data) {
    const file = data.file;
    data.name = this.getFileName(file);
    data.type = this.getFileType(file);

    // for initial uploaded files
    if (file.url) {
      data.src = file.url;
      data.status = 'uploaded';
    } else {
      data.src = window.URL.createObjectURL(file);
      this.uploadFile(file);
    }
  },

  getFileName(file) {
    return file.name;
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

  uploadFile(file) {
    const self = this;
    const data = this.data;

    data.info = '';
    data.status = 'uploading';

    let options = {
      upload: {
        onprogress(e) {
          data.status = 'uploading';
          data.progress = `${parseInt((e.loaded / e.total || 0) * 100)}%`;
          self.$update();
          
          const emitItem = {
            sender: self,
            event: e,
            progress: data.progress,
            file: file,
            status: data.status
          };
          
          self.$emit('progress', emitItem);
        }
      },
      onload(e) {
        const target = e.target;
        const status = target.status;
        data.progress = '100%';
        const emitItem = {
          sender: self,
          event: e,
          progress: data.progress,
          file: file
        };
        
        if ((status >= 200 && status < 300) || status == 304) {
          const response = JSON.parse(target.responseText);
          data.file.url = response.url;
          data.status = 'uploaded';
          data.info = '';
          emitItem.status = data.status;
          self.$emit('success', emitItem);
        } else {
          data.status = 'failed';
          data.info = self.$trans('UPLOAD_FAIL');
          emitItem.status = data.status;
          self.$emit('error', emitItem);
        }
        
        self.$update();
      },
      onerror(e) {
        data.status = 'failed';
        data.info = self.$trans('UPLOAD_FAIL');
        self.$update();

        const emitItem = {
          sender: self,
          event: e,
          progress: data.progress,
          file: file,
          status: data.status
        };
        self.$emit('error', emitItem);
      },
    };

    options = _.extend(options, data.options);
    
    if (data.type.toLowerCase() === 'image') {
      this.uploadImage(file, options);
    } else {
      utils.upload(options.url, file, options);
    }
    
    this.$update();
  },

  onRemove(e) {
    const self = this;
    const data = this.data;
    const emitItem = {
      sender: this,
      event: e,
      file: data.file,
      status: data.status
    };

    if (data.delConfirm) {
      const modal = new KLModal({
        data: {
          content: `${this.$trans('REMOVE_CONFIRM') + data.name}?`,
        },
      });
      modal.$on('ok', () => {
        self.$emit('remove', emitItem);
      });
    } else {
      self.$emit('remove', emitItem);
    }
  },

  onPreview(e) {
    const data = this.data;
    const emitItem = {
      sender: this,
      event: e,
      file: data.file,
      status: data.status
    };
    this.$emit('preview', emitItem);
  },

  uploadImage: function(file, options) {
    const self = this;
    const data = this.data;
    const imageWidth = options.imageWidth;
    const imageHeight = options.imageHeight;
    const imageScale = options.imageScale;
    const type = data.type.toLowerCase();

    const img = new Image();
    img.onload = function() {
      const width = img.width;
      const height = img.height;
      if (isFinite(imageWidth) && imageWidth !== width) {
        data.info = self.$trans('IMAGE_WIDTH_ERROR');
      }
      if (isFinite(imageHeight) && imageHeight !== height) {
        data.info = self.$trans('IMAGE_HEIGHT_ERROR');
      }
      if (!!imageScale) {
        const scaleList = imageScale.split(':');
        const scaleW = scaleList[0];
        const scaleH = scaleList[1];
        if (Math.abs(width / height - scaleW / scaleH) > 0.01) {
          data.info = self.$trans('IMAGE_SCALE_ERROR');
        }
      }
      
      if (!data.info) {
        utils.upload(options.url, file, options);
      } else {
        window.setTimeout(function() {
          self.destroy();
        }, 1000);
      }
      
      self.$update();
    };
    img.src = data.src;
  }
});

module.exports = FileUnit;
