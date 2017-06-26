/**
 *  ------------------------------
 *  file unit
 *  ------------------------------
 */

'use strict';

var Component = require('../../../../../ui-base/component');
var _ = require('../../../../../ui-base/_');
var tpl = require('./index.html');
var upload = require('../../utils');
var Modal = require('../../../../notice/modal');

var FileUnit = Component.extend({
    name: 'file.unit',
    template: tpl.replace(/([>}])\s*([<{])/g, '$1$2'),
    config: function(data) {
        _.extend(data, {
            file: {},
            options: {}
        });
        
        _.extend(data, {
            info: '',
            status: '',
            deletable: true,
            delConfirm: false
        });

        this.initData(data);
        
        this.supr(data);
    },
    
    initData: function(data) {
        var file = data.file;
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
    
    getFileName: function(file) {
        return file.name;
    },
    
    getFileType: function(file) {
        var type = file.type || '',
            name = file.name || '';

        if (/image\/.*/.test(type)
            || /jpg|gif|jpeg|png/i.test(name)
        ) {
            return 'IMAGE';
        } else if (/zip|rar|gz/i.test(name)) {
            return 'ZIP';
        } else if (/document|sheet|powerpoint|msword/.test(type)
                || /doc|xlsx|ppt/i.test(name)
        ) {
            return 'DOC';
        } else if (/video\/.*/.test(type)
                || /mp4|mkv|rmvb/i.test(name)
        ) {
            return 'VIDEO';
        } else if (/audio\/.*/.test(type)
                || /mp3/i.test(name)
        ) {
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
    
    uploadFile: function(file) {
        var self = this,
            data = this.data;
        
        data.info = '';

        var options = {
            upload: {
                onload: function(e) {
                    data.progress = '100%';
                    self.$update();
                    self.$emit('success', { progress: data.progress, info: e });
                },
                onprogress: function(e) {
                    data.status = 'uploading';
                    data.progress = parseInt((e.loaded / e.total) * 100) + '%';
                    self.$update();
                    self.$emit('progress', { progress: data.progress });
                }
            },
            onload: function(e) {
                var target = e.target;
                if (target.status === 200) {
                    var response = JSON.parse(target.responseText);
                    self.data.file.url = response.url;
                    self.data.status = 'uploaded';
                    self.data.info = '';
                } else {
                    data.status = 'failed';
                    data.info = this.$trans('UPLOAD_FAIL');
                }
                self.$update();
                self.$emit('onload', { info: e });
            },
            onerror: function(e) {
                data.status = 'failed';
                data.info = this.$trans('UPLOAD_FAIL');
                self.$update();
                self.$emit('error', { info: e });
            }
        };

        options = _.extend(options, data.options);
        upload(options.url, file, options);
    },
    
    onDelete: function() {
        var self = this,
            data = this.data;
        
        if (data.delConfirm) {
            var modal = new Modal({
                data: {
                    content: this.$trans('DELETE_CONFIRM') + data.name + '?'
                }
            });
            modal.$on('ok', function() {
                self.$emit('delete');
            });
        } else {
            self.$emit('delete');
        }
    },
    
    onPreview: function() {
        this.$emit('preview');
    }
});

module.exports = FileUnit;
