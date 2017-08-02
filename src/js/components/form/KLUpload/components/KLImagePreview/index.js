/**
 *  ------------------------------
 *  KLImagePreview 图片预览
 *  ------------------------------
 */

const Component = require('../../../../../ui-base/component');
const _ = require('../../../../../ui-base/_');
const KLModal = require('../../../../notice/KLModal');
const tpl = require('./index.html');

/**
 * @class KLImagePreview
 * @extend Component
 * @param {object}     [options.data]               = 绑定属性
 * @param {array}      [options.data.image-list]    => 必选，图片文件列表, 其中每个文件项包含下面的字段:
 *                                                     name: 图片文件名称
 *                                                     src: 图片文件的路径
 * @param {number}     [options.data.cur-index=0]   => 必选，当前图片文件的索引, 默认第一项为当前项
 */

const KLImagePreview = Component.extend({
  name: 'kl-image-preview',
  template: tpl.replace(/([>}])\s*([<{])/g, '$1$2'),
  config(data) {
    _.extend(data, {
      imageList: [],
      curIndex: 0,
      delConfirm: false
    });

    _.extend(data, {
      showVirtual: false,
      virtualInfo: {
        rotate: 0,
        scale: 1,
        translateX: 0,
        translateY: 0,
        mouseDownX: 0,
        mouseDownY: 0,
        dragTarget: null,
      },
      opList: [
        {
          name: 'zoomIn',
          icon: 'zoomin',
          fnName: 'zoomIn',
        },
        {
          name: 'zoomOut',
          icon: 'zoomout',
          fnName: 'zoomOut',
        },
        {
          name: 'rezoom',
          icon: 'rezoom',
          fnName: 'rezoom',
        },
        {
          name: 'rotate_left',
          icon: 'rotate_left',
          fnName: 'rotateLeft',
        },
        {
          name: 'rotate_right',
          icon: 'rotate_right',
          fnName: 'rotateRight',
        },
        {
          name: 'remove',
          icon: 'delete',
          fnName: 'onDel',
        },
      ],
    });

    this.supr(data);
  },
  init(data) {
    this.supr(data);
  },
  onClose() {
    this.destroy();
  },
  onPrev() {
    const data = this.data;
    const length = data.imageList.length;
    let toIndex = length - 1;

    if (data.curIndex > 0) {
      data.curIndex -= 1;
      toIndex = data.curIndex;
    }

    this.setCurrentTo(toIndex);
  },
  onNext() {
    const data = this.data;
    const length = data.imageList.length;
    let toIndex = 0;

    if (data.curIndex < length - 1) {
      data.curIndex += 1;
      toIndex = data.curIndex;
    }

    this.setCurrentTo(toIndex);
  },
  setCurrentTo(toIndex) {
    const data = this.data;
    const refs = this.$refs;
    const curIndex = data.curIndex;

    data.showVirtual = false;
    data.virtualInfo.scale = 1;
    data.virtualInfo.rotate = 0;
    data.virtualInfo.translateX = 0;
    data.virtualInfo.translateY = 0;

    refs[`full-${curIndex}`].style.opacity = 0;
    refs[`full-${toIndex}`].style.opacity = 1;

    this.data.curIndex = toIndex;
  },
  zoomIn() {
    const data = this.data;
    const virtualInfo = data.virtualInfo;
    const step = this.getZoomInStep();

    data.showVirtual = true;

    virtualInfo.scale += step;

    this.$refs.virtualimage.style.transform = this.genTransform();
  },
  zoomOut() {
    const data = this.data;
    const virtualInfo = data.virtualInfo;
    const step = this.getZoomOutStep();
    const translateStepInfo = this.getTranslateStep(step);

    data.showVirtual = true;

    virtualInfo.scale -= step;
    virtualInfo.translateX -= translateStepInfo.xStep;
    virtualInfo.translateY -= translateStepInfo.yStep;

    this.$refs.virtualimage.style.transform = this.genTransform();
  },
  rezoom() {
    const data = this.data;
    const virtualInfo = data.virtualInfo;

    data.showVirtual = true;

    virtualInfo.scale = 1;
    virtualInfo.translateX = 0;
    virtualInfo.translateY = 0;

    this.$refs.virtualimage.style.transform = this.genTransform();
  },
  getZoomInStep() {
    const virtualInfo = this.data.virtualInfo;
    const scale = +virtualInfo.scale.toFixed(1);
    const step = this.getScaleStep();

    if (scale <= 0.1) {
      return 0.1;
    }

    return step;
  },
  getZoomOutStep() {
    const virtualInfo = this.data.virtualInfo;
    const scale = +virtualInfo.scale.toFixed(1);
    const step = this.getScaleStep();

    if (scale >= 10) {
      return 1;
    }

    return step;
  },
  getScaleStep() {
    const virtualInfo = this.data.virtualInfo;
    const scale = +virtualInfo.scale.toFixed(1);

    if (scale > 0.1 && scale < 1.5) {
      return 0.1;
    } else if (scale >= 1.5 && scale < 4) {
      return 0.5;
    } else if (scale >= 4 && scale < 10) {
      return 1;
    }

    return 0;
  },
  getTranslateStep(scaleStep) {
    const virtualInfo = this.data.virtualInfo;
    const scale = +virtualInfo.scale.toFixed(1);

    const totalSteps = (scale - 1) * 10;
    const translateX = virtualInfo.translateX;
    const translateY = virtualInfo.translateY;

    return {
      xStep: totalSteps ? (translateX / totalSteps) * scaleStep * 10 : 0,
      yStep: totalSteps ? (translateY / totalSteps) * scaleStep * 10 : 0,
    };
  },
  rotateLeft() {
    this.rotate('left');
  },
  rotateRight() {
    this.rotate('right');
  },
  rotate(dir) {
    const data = this.data;
    const virtualInfo = data.virtualInfo;
    const image = this.$refs.virtualimage;

    data.showVirtual = true;

    if (dir === 'right') {
      virtualInfo.rotate += 90;
    } else if (dir === 'left') {
      virtualInfo.rotate -= 90;
    }

    image.style.transform = this.genTransform();
  },
  genTransform() {
    const virtualInfo = this.data.virtualInfo;
    return (
      `translateX(${virtualInfo.translateX}px)` +
      ` translateY(${virtualInfo.translateY}px)` +
      ` rotate(${virtualInfo.rotate}deg)` +
      ` scale(${virtualInfo.scale})`
    );
  },
  onDel(index) {
    const self = this;
    const data = this.data;
    let imageList = data.imageList;
    const image = imageList[index];

    if (data.delConfirm) {
      const modal = new KLModal({
        data: {
          content: `${this.$trans('REMOVE_CONFIRM') + image.name}?`,
        },
      });
      modal.$on('ok', () => {
        self.removeImage(index);
      });
    } else {
      self.removeImage(index);
    }
  },
  removeImage: function(index) {
    const data = this.data;
    const imageList = data.imageList;
    const image = imageList.splice(index, 1);

    if (!imageList[index]) {
      data.curIndex = 0;
    }
    this.$emit('remove', {
      image,
      index,
    });
    this.$update();
  },
  onMouseDown(e) {
    const data = this.data;
    const virtualInfo = data.virtualInfo;

    virtualInfo.mouseDownX = e.pageX;
    virtualInfo.mouseDownY = e.pageY;
    virtualInfo.dragTarget = e.origin;
    virtualInfo.dragBoundary = this.getMaxMinTranslateValue();
  },
  onMouseMove(e) {
    const data = this.data;
    const virtualImg = this.$refs.virtualimage;
    const virtualInfo = data.virtualInfo;
    const originX = virtualInfo.mouseDownX;
    const originY = virtualInfo.mouseDownY;
    virtualInfo.dragBoundary = this.getMaxMinTranslateValue();

    const boundary = virtualInfo.dragBoundary;
    if (virtualInfo.dragTarget) {
      let translateX = e.pageX - originX;
      let translateY = e.pageY - originY;

      if (translateX > boundary.maxTranslateX) {
        translateX = boundary.maxTranslateX;
      } else if (translateX < boundary.minTranslateX) {
        translateX = boundary.minTranslateX;
      }

      if (translateY > boundary.maxTranslateY) {
        translateY = boundary.maxTranslateY;
      } else if (translateY < boundary.minTranslateY) {
        translateY = boundary.minTranslateY;
      }

      virtualInfo.translateX += translateX;
      virtualInfo.translateY += translateY;
      virtualInfo.mouseDownX = e.pageX;
      virtualInfo.mouseDownY = e.pageY;
      virtualImg.style.transform = this.genTransform();
    }
  },
  onMouseUp() {
    const data = this.data;
    const virtualInfo = data.virtualInfo;

    if (virtualInfo.dragTarget) {
      virtualInfo.mouseDownX = 0;
      virtualInfo.mouseDownY = 0;
      virtualInfo.dragTarget = null;
    }
  },
  onMouseWheel(e) {
    if (e.wheelDelta > 0) {
      this.zoomIn();
    } else if (e.wheelDelta < 0) {
      this.zoomOut();
    }
  },
  getMaxMinTranslateValue() {
    const virtualImg = this.$refs.virtualimage;
    const virtualZone = this.$refs.virtualzone;

    const virtualImgRect = virtualImg.getBoundingClientRect();
    const virtualZoneRect = virtualZone.getBoundingClientRect();
    const maxDeltaX = virtualZoneRect.left - virtualImgRect.left;
    const maxDeltaY = virtualZoneRect.top - virtualImgRect.top;
    const minDeltaX = virtualZoneRect.right - virtualImgRect.right;
    const minDeltaY = virtualZoneRect.bottom - virtualImgRect.bottom;

    return {
      maxTranslateX: maxDeltaX > 0 ? maxDeltaX : 0,
      maxTranslateY: maxDeltaY > 0 ? maxDeltaY : 0,
      minTranslateX: minDeltaX < 0 ? minDeltaX : 0,
      minTranslateY: minDeltaY < 0 ? minDeltaY : 0,
    };
  },
});

module.exports = KLImagePreview;
