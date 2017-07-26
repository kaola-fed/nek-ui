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
 * @param {object}         [options.data]                  = 绑定属性
 * @param {string}         [options.data.action]           => 必选，上传地址
 * @param {array}          [options.data.file-list]        => 上传的文件列表, 可以指定初始值，代表已经上传的文件，见demo，每次操作文件后，
 *                                                             都可以通过该参数绑定的变量，得到最新的文件列表，其中每个文件项包含下面的字段:
 *                                                             name: 文件名称
 *                                                             url: 文件的路径
 *                                                             flag: 0, 新增的文件; 1, 已经上传未被删除的文件，2，已经上传被删除的文件
 * @param {boolean}        [options.data.deletable]        => 可选，上传文件是否允许删除, 可选值true/false，默认true，可删除
 */

const KLImagePreview = Component.extend({
  name: 'kl-image-preview',
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
    const length = data.imgList.length;
    let toIndex = length - 1;

    if (data.curIndex > 0) {
      data.curIndex -= 1;
      toIndex = data.curIndex;
    }

    this.setCurrentTo(toIndex);
  },
  onNext() {
    const data = this.data;
    const length = data.imgList.length;
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
    const img = this.$refs.virtualimage;

    data.showVirtual = true;

    if (dir === 'right') {
      virtualInfo.rotate += 90;
    } else if (dir === 'left') {
      virtualInfo.rotate -= 90;
    }

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
    const self = this;
    const data = this.data;
    let imgList = data.imgList;
    const img = imgList[index];

    const modal = new KLModal({
      data: {
        content: `${this.$trans('REMOVE_CONFIRM') + img.name}?`,
      },
    });
    modal.$on('ok', () => {
      imgList = data.imgList.splice(index, 1);

      if (!imgList[index]) {
        data.curIndex = 0;
      }
      self.$emit('remove', {
        name: img.name,
        index,
      });
      self.$update();
    });
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
