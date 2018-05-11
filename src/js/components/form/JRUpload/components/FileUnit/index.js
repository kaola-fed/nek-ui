/**
 *  ------------------------------
 *  FileUnit
 *  ------------------------------
 */

const Component = require('../../../../../ui-base/component');
const _ = require('../../../../../ui-base/_');
const tpl = require('./index.html');
const utils = require('../../utils');

const FileUnit = Component.extend({
  template: tpl.replace(/([>}])\s*([<{])/g, '$1$2'),
  config(data) {
    _.extend(data, {
      file: {},
      action: '',
      url: '',
      name: '',
      readonly: false,
      data: {},
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

  initData(data) {
    const file = data.file;
    data.filename = file.name;
    data.type = file.type;

    if (!data.autoUpload) {
      this.$emit('success', {
        sender: this,
        file: data.file,
        status: data.status,
      });
      return true;
    }
    // for initial uploaded files
    if (data.status === 'ready') {
      this.uploadFile(file.rawFile);
    }
  },

  uploadFile(rawFile) {
    const self = this;
    const data = this.data;

    data.info = '';
    data.status = 'uploading';

    const options = {
      name: data.name || 'file',
      data: data.data,
      upload: {
        onprogress(e) {
          data.status = 'uploading';
          data.progress = `${parseInt((e.loaded / e.total || 0) * 100)}%`;
          self.$update();

          const emitItem = {
            sender: self,
            event: e,
            progress: data.progress,
            file: data.file,
            status: data.status,
          };

          self.$emit('progress', emitItem);
        },
      },
      onload(e) {
        const target = e.target;
        const status = target.status;
        data.progress = '100%';
        const emitItem = {
          sender: self,
          event: e,
          progress: data.progress,
          file: data.file,
        };

        let result = true;
        let response = {};
        try {
          response = JSON.parse(target.response);
        } catch (error) {
          console.log(error);
        }
        if (self.data.onLoadInterceptor) {
          result = self.data.onLoadInterceptor.call(self, response);
        }
        response.url = (result && result.url) || response.url;
        if (status >= 200 && status < 400 && result) {
          data.url = response.url;
          data.status = 'success';
          data.info = '';
          self.$update();

          emitItem.status = data.status;
          self.$emit('success', emitItem);
        } else {
          data.status = 'fail';
          data.info = self.$trans('UPLOAD_FAIL');
          self.$update();

          emitItem.status = data.status;
          self.$emit('error', emitItem);
        }
      },
      onerror(e) {
        if (self.data.onErrorInterceptor) {
          self.data.onErrorInterceptor.call(self, e);
        }
        data.status = 'fail';
        data.info = self.$trans('UPLOAD_FAIL');
        self.$update();

        const emitItem = {
          sender: self,
          event: e,
          progress: data.progress,
          file: data.file,
          status: data.status,
        };
        self.$emit('error', emitItem);
      },
    };

    utils.upload(data.action, rawFile, options);

    this.$update();
  },

  onRemove(e) {
    const self = this;
    const data = this.data;
    const emitItem = {
      sender: this,
      event: e,
      file: data.file,
      status: data.status,
    };
    const beforeRemove = data.beforeRemove && data.beforeRemove(emitItem);

    if (beforeRemove && beforeRemove.then) {
      beforeRemove.then((removeConfirm) => {
        if (removeConfirm !== false) {
          self.$emit('remove', emitItem);
        } else {
          return removeConfirm;
        }
      });
    } else if (beforeRemove !== false) {
      self.$emit('remove', emitItem);
    } else {
      return beforeRemove;
    }
  },

  onPreview(e) {
    const data = this.data;
    // 如果url不存在，则不允许预览
    if (data.url) {
      var emitItem = {
        sender: this,
        event: e,
        file: data.file,
        status: data.status
      };
      this.$emit('preview', emitItem);
    }
  },
});

module.exports = FileUnit;
