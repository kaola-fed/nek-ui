/**
 *  ------------------------------
 *  upload.base 上传基础类
 *  ------------------------------
 */
'use strict';

var Component = require('../../../../../ui-base/component');
var _ = require('../../../../../ui-base/_');
var Config = require('../../config');

/**
 * @class UploadBase
 * @extend Component
 * @param {object}         [options.data]                  = 绑定属性
 * @param {string}         [options.data.action]           => 必选，上传地址
 * @param {array}          [options.data.file-list]        => 上传的文件列表, 可以指定初始值，代表已经上传的文件，见demo，每次操作文件后，
 *                                                             都可以通过该参数绑定的变量，得到最新的文件列表，其中每个文件项包含下面的字段:
 *                                                             name: 文件名称
 *                                                             url: 文件的路径
 *                                                             flag: 0, 新增的文件; 1, 已经上传未被删除的文件，2，已经上传被删除的文件
 * @param {string}         [options.data.name]             => 可选，上传的文件字段名, 默认为'file'
 * @param {boolean}        [options.data.multiple]         => 可选，是否支持多选, 可选值true/false，默认false单选
 * @param {boolean}        [options.data.drag]             => 可选，是否支持拖拽上传，可选值true/false，默认false不支持拖拽
 * @param {string}         [options.data.accept]           => 可选，接受上传的文件类型, 同input的accept属性
 * @param {string}         [options.data.list-type]        => 可选，上传组件的展示形式, 可选值list/card，默认list
 * @param {number}         [options.data.num-limit]        => 可选，最大允许上传文件的个数，默认10个
 * @param {number}         [options.data.num-perline]      => 可选，每行展示的文件个数，默认每行展示5个
 * @param {number}         [options.data.max-size]         => 可选，上传文件大小的最大允许值, 支持数值大小以及KB,MB,GB为单元的指定
 * @param {boolean}        [options.data.deletable]        => 可选，上传文件是否允许删除, 可选值true/false，默认true，可删除
 */
var UploadBase = Component.extend({
    name: 'upload-list',
    config: function(data) {
        _.extend(data, {
            action: '',
            name: 'file',
            multiple: false,
            drag: false,
            accept: '*',
            listType: 'list',
            fileList: [],
            data: {},
            numLimit: 10,
            numPerline: 5,
            maxSize: Config.sizeMap.GB,
            deletable: true,
            encType: 'multipart/form-data'
        });
        
        _.extend(data, {
            fileUnitList: [],
            fileDeletedList: [],
            fileUnitWidth: 50,
            fileUnitMargin: 25
        });
        
        this.supr(data);
    },
    
    init: function(data) {
        this.initUploadedFileUnits();
        this.supr(data);
    },

    initUploadedFileUnits: function() {
        var self = this,
            data = this.data;
        
        if (data.fileList.length > 0) {
            var fileList = data.fileList.splice(0);
            fileList.forEach(function(file) {
                var fileunit = self.createFileUnit({
                    file: file,
                    options: {},
                    deletable: data.deletable
                });
                
                fileunit.flag = 'ORIGINAL';

                data.fileUnitList.push({
                    inst: fileunit
                });
            });

            this.updateFileList();
        }
    },
    
    updateFileList: function() {
        var self = this,
            data = this.data,
            filesWrapper = data.filesWrapper,
            fileList = data.fileList,
            fileDeletedList = data.fileDeletedList,
            fileUnitList;

        fileUnitList = data.fileUnitList = data.fileUnitList.filter(function(item) {
            var inst = item.inst,
                flag = inst.flag,
                file = inst.file,
                destroyed = inst.destroyed;

            // item.inst = {};
            
            if (flag === 'DELETED') {
                file.flag = 'DELETED';
                fileDeletedList.push(file);
                return false;
            }
            return !destroyed;
        });

        filesWrapper.innerHTML = '';
        fileUnitList.forEach(function(item, index) {
            var wrapper = item.wrapper = self.createFileUnitWrapper(filesWrapper, index);
            item.inst.$inject(wrapper);
        });

        fileList.splice(0);
        fileUnitList.forEach(function(item) {
            var inst = item.inst,
                file = inst.data.file || {};
            
            fileList.push({
                name: file.name,
                url: file.url,
                flag: Config.flagMap[inst.flag]
            });
        });
        
        fileDeletedList.forEach(function(file) {
            fileList.push({
                name: file && file.name,
                url: file && file.url,
                flag: file && Config.flagMap[file.flag]
            });
        });
    },
    
    fileDialogOpen: function() {
        this.$refs.file && this.$refs.file.click();
    },
    
    setOptions: function(data) {
        data = data || {};
        
        return {
            url: data.action
        };
    },

    preCheck: function(file) {
        var preCheckInfo = '';
        if (!this.isAcceptedFileSize(file)) {
            preCheckInfo = this.$trans('FILE_TOO_LARGE');
        }
        if (!this.isAcceptedFileType(file)) {
            preCheckInfo = this.$trans('FILE_TYPE_ERROR');
        }
        return preCheckInfo;
    },
    
    isAcceptedFileType: function(file) {
        var data = this.data,
            accept = data.accept,
            type = this.getFileType(file).toLowerCase(),
            isValid = false;

        accept.split(',').forEach(function(cond) {
            if ('*' === cond) {
                isValid = true;
            } else if (/image\/.*/.test(cond)) {
                isValid = isValid || type === 'image';
            } else if (/audio\/.*/.test(cond)) {
                isValid = isValid || type === 'audio';
            } else if (/video\/.*/.test(cond)) {
                isValid = isValid || type === 'video';
            } else {
                isValid = isValid || type === Config.typeMap[cond];
            }
        });

        return isValid;
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

    isAcceptedFileSize: function(file) {
        var data = this.data,
            maxSize = data.maxSize,
            fileSize = file.size;
        
        var patterns = maxSize.match(/(\d+)(\D+)?/i);
        var size = patterns[1];
        var unit = patterns[2];

        if (unit) {
            size *= Config.sizeMap[unit.toUpperCase()];
        }

        return size >= fileSize;
    }
});

module.exports = UploadBase;
