/**
 *  ------------------------------
 *  image preview
 *  ------------------------------
 */

const Component = require('../../../../../ui-base/component');
const _ = require('../../../../../ui-base/_');
const KLModal = require('../../../../notice/KLModal');
const tpl = require('./index.html');

const ImagePreview = Component.extend({
  name: 'image-preview',
  template: tpl.replace(/([>}])\s*([<{])/g, '$1$2'),
  config(data) {
    _.extend(data, {
      imgList: [],
      curIndex: 0,
      uploaded: true,
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
          name: 'rotate',
          icon: 'rotate_right',
          fnName: 'rotate',
        },
        {
          name: 'delete',
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
    let data = this.data,
      curIndex = data.curIndex,
      length = data.imgList.length,
      toIndex = length - 1;

    if (curIndex > 0) {
      toIndex = --data.curIndex;
    }

    this.setCurrentTo(toIndex);
  },
  onNext() {
    let data = this.data,
      curIndex = data.curIndex,
      length = data.imgList.length,
      toIndex = 0;

    if (curIndex < length - 1) {
      toIndex = ++data.curIndex;
    }

    this.setCurrentTo(toIndex);
  },
  setCurrentTo(toIndex) {
    let data = this.data,
      refs = this.$refs,
      curIndex = data.curIndex;

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
    let data = this.data,
      virtualInfo = data.virtualInfo,
      step = this.getZoomInStep();

    data.showVirtual = true;

    virtualInfo.scale += step;

    this.$refs.virtualimage.style.transform = this.genTransform();
  },
  zoomOut() {
    let data = this.data,
      virtualInfo = data.virtualInfo,
      step = this.getZoomOutStep(),
      translateStepInfo = this.getTranslateStep(step);

    data.showVirtual = true;

    virtualInfo.scale -= step;
    virtualInfo.translateX -= translateStepInfo.xStep;
    virtualInfo.translateY -= translateStepInfo.yStep;

    this.$refs.virtualimage.style.transform = this.genTransform();
  },
  rezoom() {
    let data = this.data,
      virtualInfo = data.virtualInfo;

    data.showVirtual = true;

    virtualInfo.scale = 1;
    virtualInfo.translateX = 0;
    virtualInfo.translateY = 0;

    this.$refs.virtualimage.style.transform = this.genTransform();
  },
  getZoomInStep() {
    let virtualInfo = this.data.virtualInfo,
      scale = +virtualInfo.scale.toFixed(1),
      step = this.getScaleStep();

    if (scale <= 0.1) {
      return 0.1;
    }

    return step;
  },
  getZoomOutStep() {
    let virtualInfo = this.data.virtualInfo,
      scale = +virtualInfo.scale.toFixed(1),
      step = this.getScaleStep();

    if (scale >= 10) {
      return 1;
    }

    return step;
  },
  getScaleStep() {
    let virtualInfo = this.data.virtualInfo,
      scale = +virtualInfo.scale.toFixed(1);

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
    let virtualInfo = this.data.virtualInfo,
      scale = +virtualInfo.scale.toFixed(1);

    const totalSteps = (scale - 1) * 10;
    const translateX = virtualInfo.translateX;
    const translateY = virtualInfo.translateY;

    return {
      xStep: totalSteps ? translateX / totalSteps * scaleStep * 10 : 0,
      yStep: totalSteps ? translateY / totalSteps * scaleStep * 10 : 0,
    };
  },
  rotate() {
    let data = this.data,
      virtualInfo = data.virtualInfo,
      img = this.$refs.virtualimage;

    data.showVirtual = true;
    virtualInfo.rotate += 90;

    img.style.transform = this.genTransform();
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
    let self = this,
      data = this.data,
      imgList = data.imgList,
      img = imgList[index];

    const modal = new KLModal({
      data: {
        content: `${this.$trans('DELETE_CONFIRM') + img.name}?`,
      },
    });
    modal.$on('ok', () => {
      imgList = data.imgList.splice(index, 1);

      if (!imgList[index]) {
        data.curIndex = 0;
      }
      self.$emit('delete', {
        name: img.name,
        index,
      });
      self.$update();
    });
  },
  onMouseDown(e) {
    let data = this.data,
      virtualInfo = data.virtualInfo;

    virtualInfo.mouseDownX = e.pageX;
    virtualInfo.mouseDownY = e.pageY;
    virtualInfo.dragTarget = e.origin;
    virtualInfo.dragBoundary = this.getMaxMinTranslateValue();
  },
  onMouseMove(e) {
    let data = this.data,
      virtualImg = this.$refs.virtualimage,
      virtualInfo = data.virtualInfo,
      originX = virtualInfo.mouseDownX,
      originY = virtualInfo.mouseDownY,
      boundary = (virtualInfo.dragBoundary = this.getMaxMinTranslateValue());

    if (virtualInfo.dragTarget) {
      let translateX = e.pageX - originX;
      let translateY = e.pageY - originY;
      translateX =
        translateX > boundary.maxTranslateX
          ? boundary.maxTranslateX
          : translateX < boundary.minTranslateX
            ? boundary.minTranslateX
            : translateX;

      translateY =
        translateY > boundary.maxTranslateY
          ? boundary.maxTranslateY
          : translateY < boundary.minTranslateY
            ? boundary.minTranslateY
            : translateY;

      virtualInfo.translateX += translateX;
      virtualInfo.translateY += translateY;
      virtualInfo.mouseDownX = e.pageX;
      virtualInfo.mouseDownY = e.pageY;
      virtualImg.style.transform = this.genTransform();
    }
  },
  onMouseUp() {
    let data = this.data,
      virtualInfo = data.virtualInfo;

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
    let virtualImg = this.$refs.virtualimage,
      virtualZone = this.$refs.virtualzone;

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

module.exports = ImagePreview;
