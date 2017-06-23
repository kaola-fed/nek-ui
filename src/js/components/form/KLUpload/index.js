/**
 *  ------------------------------
 *  kl-upload 上传
 *  ------------------------------
 */
'use strict';

var Component = require('../../../ui-base/component');
var _ = require('../../../ui-base/_');
var UploadList = require('./components/upload.list');
var UploadCard = require('./components/upload.card');
var Config = require('./config');
var tpl = require('./index.html');

/**
 * @class KLUpload
 * @extend Component
 * @param {object}         [options.data]                  = 绑定属性
 * @param {string}         [options.data.action]           => 必选，上传地址
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
var KLUpload = Component.extend({
    name: 'kl-upload',
    template: tpl.replace(/([>}])\s*([<{])/g, '$1$2'),
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
        
        this.supr(data);
    },
    
    init: function(data) {
        this.preProcess(data);
        this.initUploadInst(data);
        this.supr(data);
    },
    
    preProcess: function(data) {
        if (typeof data.maxSize === 'number') {
            data.maxSize += '';
        }
    },

    initUploadInst: function(data) {
        var uploadNode = this.$refs['m-upload'],
            typeMap = {
                list: UploadList,
                card: UploadCard
            };
        
        new typeMap[data.listType]({
            data: data
        }).$inject(uploadNode);
    }
});

module.exports = KLUpload;
