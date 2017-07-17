/**
 *  ------------------------------
 *  FileUnit
 *  ------------------------------
 */

const Component = require('../../../../../ui-base/component');
const _ = require('../../../../../ui-base/_');
const tpl = require('./index.html');
const upload = require('../../utils');
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
      readonly: false,
      delConfirm: false,
    });

    this.initData(data);

    this.supr(data);
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

    let options = {
      upload: {
        onprogress(e) {
          data.status = 'uploading';
          data.progress = `${parseInt((e.loaded / e.total) * 100)}%`;
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
    upload(options.url, file, options);
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
  }
});

module.exports = FileUnit;
