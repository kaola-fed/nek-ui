/**
 *  ------------------------------
 *  upload.list 上传
 *  ------------------------------
 */
'use strict';

var FileUnit = require('../file.unit');
var UploadBase = require('../upload.base');
var ImagePreview = require('../image.preview');
var tpl = require('./index.html');

/**
 * @class UploadList
 * @extend UploadBase
 */
var UploadList = UploadBase.extend({
    name: 'upload.list',
    template: tpl.replace(/([>}])\s*([<{])/g, '$1$2'),
    config: function(data) {
        this.supr(data);
    },
    
    init: function(data) {
        this.initFilesWrapper();
        this.supr(data);
    },

    initFilesWrapper: function() {
        var inputWrapper = this.data.inputWrapper = this.$refs.inputwrapper;
        var filesWrapper = this.data.filesWrapper = this.$refs.fileswrapper;
        filesWrapper.appendChild(inputWrapper);
        inputWrapper.style.display = 'inline-block';
    },

    onDragEnter: function(e) {
        e.stopPropagation();
        e.preventDefault();
    },

    onDragOver: function(e) {
        e.stopPropagation();
        e.preventDefault();
    },

    onDrop: function(e) {
        e.stopPropagation();
        e.preventDefault();

        if (!this.data.drag) {
            return;
        }
        
        var dt = e.event && e.event.dataTransfer;
        var files = dt.files;

        this.handleFiles(files);
    },
    
    fileSelect: function() {
        var inputNode = this.$refs.file,
            files = inputNode.files;
        
        this.handleFiles(files);
        
        inputNode.value = '';
    },

    handleFiles: function(files) {
        var data = this.data,
            index = 0,
            len = files.length,
            file, fileunit, options;

        options = this.setOptions(data);

        data.preCheckInfo = '';

        for (; index < len; index++) {
            if (data.fileUnitList.length < data.numLimit) {
                file = files[index];
                data.preCheckInfo = this.preCheck(file);
                if (data.preCheckInfo) {
                    continue;
                }
                fileunit = this.createFileUnit({
                    file: file,
                    options: options,
                    deletable: data.deletable
                });
                fileunit.flag = 'ADDED';
                data.fileUnitList.push({
                    inst: fileunit
                });
            }
        }

        this.updateFileList();
    },

    createFileUnit: function(data) {
        var self = this,
            imagePreview = this.$refs.imagepreview,
            fileunit = new FileUnit({ data: data });
        
        fileunit.$on('preview', function() {
            var current = this;
            
            function filterImgFile(file) {
                return file.inst.data.type === 'IMAGE';
            }
            
            function mapHelper(img) {
                if (current === img.inst) {
                    img.inst.current = true;
                }
                return img.inst;
            }
            
            var imgList = self.data.fileUnitList.filter(filterImgFile).map(mapHelper);
            
            var preview = createImagePreview(imgList);
            
            preview.$inject(imagePreview);
        });
        
        function createImagePreview(imgFileList) {
            function findHelper(img) {
                return img.current;
            }
            var curIndex = imgFileList.findIndex(findHelper);
            
            function mapHelper(img) {
                delete img.current;
                return {
                    src: img.data.src,
                    name: img.data.name,
                    status: img.data.status
                };
            }
            var imgList = imgFileList.map(mapHelper);
            
            var imagePreview = new ImagePreview({
                data: {
                    imgList: imgList,
                    curIndex: curIndex
                }
            });

            imagePreview.$on('delete', function(imgInfo) {
                var index = imgInfo.index,
                    imgInst = imgFileList[index];

                if (imgInst) {
                    imgInst.$emit('delete');
                }
            });
            
            imagePreview.$on('$destroy', function() {
                imgFileList = null;
            });
            
            return imagePreview;
        }
        
        fileunit.$on('onload', function() {
            self.updateFileList();
        });
        
        fileunit.$on('success', function() {
            self.updateFileList();
        });
        
        fileunit.$on('delete', function() {
            if (this.flag === 'ORIGINAL') {
                this.flag = 'DELETED';
                this.file = this.data.file;
            }
            this.destroy();
        });
        
        fileunit.$on('$destroy', function() {
            this.destroyed = true;
            self.updateFileList();
        });
        
        return fileunit;
    },

    updateFileList: function() {
        this.supr();
        this.appendInputWrapper();
        this.$update();
    },
    
    createFileUnitWrapper: function(parent, index) {
        var wrapper = document.createElement('li');
        
        parent.appendChild(wrapper);
        
        this.setFileUnitWrapperStyle(wrapper, index);
        
        return wrapper;
    },
    
    setFileUnitWrapperStyle: function(wrapper, index) {
        var data = this.data,
            numPerline = data.numPerline,
            fileUnitWidth = data.fileUnitWidth,
            fileUnitMargin = data.fileUnitMargin;
        
        wrapper.className = 'u-fileitem';
        wrapper.style.display = 'inline-block';
        wrapper.style.width = fileUnitWidth + 'px';
        
        if (index && index % numPerline) {
            wrapper.style.marginLeft = fileUnitMargin + 'px';
        }
    },
    
    appendInputWrapper: function() {
        var data = this.data,
            inputWrapper = data.inputWrapper,
            filesWrapper = data.filesWrapper,
            numPerline = data.numPerline,
            numLimit = data.numLimit,
            fileUnitMargin = data.fileUnitMargin,
            length = data.fileUnitList.length;

        if (length < numLimit) {
            filesWrapper.appendChild(inputWrapper);
            
            if (length % numPerline) {
                inputWrapper.style.marginLeft = fileUnitMargin + 'px';
            } else {
                inputWrapper.style.marginLeft = '0';
            }
        }
    }
});

module.exports = UploadList;
