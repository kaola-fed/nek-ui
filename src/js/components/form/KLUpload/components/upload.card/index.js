/**
 *  ------------------------------
 *  upload.card 上传
 *  ------------------------------
 */
'use strict';

var _ = require('../../../../../ui-base/_');
var FileUnit = require('../file.unit');
var UploadBase = require('../upload.base');
var ImagePreview = require('../image.preview');
var tpl = require('./index.html');

/**
 * @class UploadCard
 * @extend UploadBase
 */

var UploadCard = UploadBase.extend({
    name: 'upload.card',
    template: tpl.replace(/([>}])\s*([<{])/g, '$1$2'),
    config: function(data) {
        _.extend(data, {
            status: 'uploaded',
            info: '',
            fileUnitListPadding: 22
        });
        
        this.supr(data);
    },
    
    init: function(data) {
        this.initFilesZone();
        this.supr(data);
    },

    initFilesZone: function() {
        var data = this.data,
            numPerline = data.numPerline,
            fileUnitWidth = data.fileUnitWidth,
            fileUnitMargin = data.fileUnitMargin;

        data.filesWrapper = this.$refs.fileswrapper;
        data.fileUnitListWidth = fileUnitWidth * numPerline + fileUnitMargin * (numPerline - 1);
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
        
        this.toggle(false);

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
                this.updateFilesZone();
            }
        }
        
        this.updateFileList();
    },
    
    updateFilesZone: function() {
        var data = this.data,
            filesZone = this.$refs.fileszone,
            entryWrapper = this.$refs.entrywrapper,
            inputWrapper = this.$refs.inputwrapper;
        
        if (data.fileUnitList.length < data.numLimit) {
            filesZone.style.width = '125px';
            entryWrapper.style['margin-right'] = '20px';
            inputWrapper.style.display = 'inline-block';
        } else if (data.fileUnitList.length == data.numLimit) {
            filesZone.style.width = '50px';
            entryWrapper.style['margin-right'] = '0';
            inputWrapper.style.display = 'none';
        }
    },
    
    createFileUnit: function(data) {
        var self = this,
            imagePreview = this.$refs.imagepreview,
            fileunit = new FileUnit({ data: data });
        
        fileunit.$on('preview', previewCb);
        
        function previewCb() {
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
        }

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
        
        fileunit.$on('progress', progressCb);
        
        function progressCb(info) {
            var data = self.data,
                curInst = this,
                curIndex = -1,
                lastIndex = -1;

            self.data.fileUnitList.forEach(function(item, index) {
                if (item.inst.data.status === 'uploading') {
                    lastIndex = index;
                }
                if (item.inst === curInst) {
                    curIndex = index;
                }
            });
            
            if (curIndex >= lastIndex && data.status != 'failed') {
                data.status = 'uploading';
                data.progress = info.progress;
                self.$update();
            }
        }

        fileunit.$on('onload', successCb);
        fileunit.$on('success', successCb);
        
        function successCb() {
            var allUploaded = true;
            self.data.fileUnitList.forEach(function(item) {
                allUploaded &= item.inst.data.status === 'uploaded';
            });
            if (allUploaded) {
                self.data.status = 'uploaded';
                self.$update();
            }
            self.updateFileList();
        }

        fileunit.$on('error', function() {
            self.data.status = 'failed';
            self.data.info = '上传失败';
            self.$update();
        });
        
        fileunit.$on('delete', function() {
            if (this.flag === 'ORIGINAL') {
                this.flag = 'DELETED';
                this.file = this.data.file;
            }
            this.destroy();
        });
        
        fileunit.$on('$destroy', function() {
            self.toggle(false);
            this.destroyed = true;
            this.$off('preview', previewCb);
            this.$off('success', successCb);
            self.updateFileList();
            self.updateFilesZone();
            resetStatus();
        });

        function resetStatus() {
            successCb();
        }
        
        return fileunit;
    },

    updateFileList: function() {
        this.supr();
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
    
    uploadFiles: function() {
        var data = this.data,
            fileUnitList = data.fileUnitList;
        
        data.status = 'uploaded';
        data.info = '';
        
        fileUnitList.forEach(function(item) {
            var inst = item.inst,
                data = inst.data;
            
            if (data.status === 'failed') {
                inst.uploadFile(data.file);
            }
        });
    },

    toggle: function(open, e) {
        e && e.stopPropagation();
        
        var data = this.data;
        if (typeof open === 'undefined') {
            open = !data.open;
        }
        data.open = open;

        this.setPosition(!open);

        var index = UploadCard.opens.indexOf(this);
        if (open && index < 0) {
            UploadCard.opens.push(this);
        } else if (!open && index >= 0) {
            UploadCard.opens.splice(index, 1);
        }
    },

    setPosition: function(hidden) {
        var filesBanner = this.$refs.filesbanner;
        var filesWrapper = this.$refs.fileswrapper;
        if (hidden) {
            filesBanner.style.left = '-9999px';
            filesWrapper.style.left = '-9999px';
            return;
        }
        this.setVerticalPosition();
        this.setHorizontalPosition();
    },
    
    setVerticalPosition: function() {
        var filesEntry = this.$refs.filesentry;
        var filesEntryCoors = filesEntry.getBoundingClientRect();
        var filesWrapper = this.$refs.fileswrapper;
        var filesWrapperCoors = filesWrapper.getBoundingClientRect();
        var viewHeight = document.documentElement.clientHeight;

        // show at vertical bottom side
        var vertical = 'bottom';
        // show at vertical top side
        var isVerticalTopSide = filesEntryCoors.top - filesWrapperCoors.height > 0;
        var isVerticalBottomSide = filesEntryCoors.bottom + filesWrapperCoors.height < viewHeight;
        if (isVerticalTopSide && !isVerticalBottomSide) {
            vertical = 'top';
        }
        
        if (vertical === 'bottom') {
            this.data.isTopBanner = false;
            filesWrapper.style.top = '53px';
            filesWrapper.style.bottom = 'auto';
            filesWrapper.style.boxShadow = 'auto';
            filesWrapper.style.boxShadow = '0 2px 3px 0 rgba(0,0,0,0.1)';
        } else {
            this.data.isTopBanner = true;
            filesWrapper.style.top = 'auto';
            filesWrapper.style.bottom = '53px';
            filesWrapper.style.boxShadow = '0 -2px 3px 0 rgba(0,0,0,0.1)';
        }
    },
    
    setHorizontalPosition: function() {
        var filesEntry = this.$refs.filesentry;
        var filesEntryCoors = filesEntry.getBoundingClientRect();
        var filesBanner = this.$refs.filesbanner;
        var filesWrapper = this.$refs.fileswrapper;
        var filesWrapperCoors = filesWrapper.getBoundingClientRect();
        var viewWidth = document.documentElement.clientWidth;
        
        // show at central
        var horizontal = 'left';
        var offsetWidth = filesWrapperCoors.width / 2 - filesEntryCoors.width / 2;
        var isHorizontalLeftEdge = filesEntryCoors.left - offsetWidth < 0;
        var isHorizontalRightEdge = filesEntryCoors.right + offsetWidth > viewWidth;
        if (isHorizontalRightEdge) {
            horizontal = 'right';
        }
        var isHorizontalCenter = !isHorizontalLeftEdge && !isHorizontalRightEdge;
        if (isHorizontalCenter) {
            horizontal = 'central';
        }
        
        if (horizontal === 'left') {
            filesWrapper.style.left = '0';
            filesWrapper.style.right = 'auto';
        } else if (horizontal === 'right') {
            filesWrapper.style.left = 'auto';
            filesWrapper.style.right = '0';
        } else if (horizontal === 'central') {
            filesWrapper.style.left = '-' + offsetWidth + 'px';
        }
        
        filesBanner.style.left = '20px';
    }
});

var opens = UploadCard.opens = [];
document.addEventListener('click', function(e) {
    for (var len = opens.length, i = len - 1; i >= 0; i--) {
        var close = true;

        var upload = opens[i];
        var uploadElement = upload.$refs.element;
        var iterator = e.target;

        while (iterator) {
            if(uploadElement == iterator) {
                close = false;
                break;
            }
            iterator = iterator.parentElement;
        }

        if (close) {
            upload.toggle(false, e);
            upload.$update();
        }
    }
}, false);

module.exports = UploadCard;
