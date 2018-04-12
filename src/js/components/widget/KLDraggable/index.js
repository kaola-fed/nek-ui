/**
 * ------------------------------------------------------------
 * @file KLDraggable  拖拽
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

const Component = require('../../../ui-base/component');
const _ = require('../../../ui-base/_');
const dragdrop = require('./dragdrop.js');

/**
 * @class KLDraggable
 * @extend Component
 * @param {object}                                   [options.data]                       =  绑定属性
 * @param {object}                                   [options.data.data]                  => 拖拽时需要传递的数据
 * @param {string/Dragable.Proxy/Element/function}   [options.data.proxy]                 @=> 拖拽代理，即拖拽时显示的元素。默认值为`clone`，拖拽时拖起自身的一个拷贝；当值为`self`，拖拽时直接拖起自身。也可以用`<draggable.proxy>`自定义代理，或直接传入一个元素或函数。其他值表示不使用拖拽代理。
 * @param {string}                                   [options.data.direction=all]         => 拖拽代理可以移动的方向，`all`为任意方向，`horizontal`为水平方向，`vertical`为垂直方向
 * @param {boolean}                                  [options.data.disabled=false]        => 是否禁用
 * @param {string}                                   [options.data.class=z-draggable]     => 可拖拽时（即disabled=false）给元素附加此class
 * @param {string}                                   [options.data.dragClass=z-drag]      => 拖拽该元素时给元素附加此class
 */
const Draggable = Component.extend({
  name: 'kl-draggable',
  template: '{#inc this.$body}',
  config() {
    _.extend(this.data, {
      data: null,
      proxy: 'clone',
      direction: 'all',
      class: 'z-draggable',
      dragClass: 'z-drag',
    });
    this.supr();

    this._onMouseDown = this._onMouseDown.bind(this);
    this._onBodyMouseMove = this._onBodyMouseMove.bind(this);
    this._onBodyMouseUp = this._onBodyMouseUp.bind(this);
    this.cancel = this.cancel.bind(this);
  },
  init() {
    const inner = _.dom.element(this);
    _.dom.on(inner, 'mousedown', this._onMouseDown);
    this.supr();

    this.$watch('disabled', (newValue) => {
      if (newValue) {
        _.dom.delClass(inner, this.data.class);
      } else {
        _.dom.addClass(inner, this.data.class);
      }
    });
  },
  _getProxy() {
    if (typeof this.data.proxy === 'function') {
      return this.data.proxy();
    } else if (this.data.proxy instanceof window.Element) {
      return this.data.proxy;
    } else if (this.data.proxy instanceof Draggable.Proxy) {
      const proxy = _.dom.element(this.data.proxy);
      const dimension = _.dom.getDimension(_.dom.element(this));
      this._initProxy(proxy, dimension);
      document.body.appendChild(proxy);
      return proxy;
    } else if (this.data.proxy === 'clone') {
      const self = _.dom.element(this);
      const dimension = _.dom.getDimension(self);
      const proxy = self.cloneNode(true);
      this._initProxy(proxy, dimension);
      self.parentElement.appendChild(proxy);
      return proxy;
    } else if (this.data.proxy === 'self') {
      const proxy = _.dom.element(this);
      const dimension = _.dom.getDimension(proxy);
      this._initProxy(proxy, dimension);
      return proxy;
    }
  },
  _initProxy(proxy, dimension) {
    proxy.style.left = `${dimension.left}px`;
    proxy.style.top = `${dimension.top}px`;
    proxy.style.zIndex = '2000';
    proxy.style.position = 'fixed';
    proxy.style.display = '';
  },
  _onMouseDown($event) {
    if (this.data.disabled) {
      return;
    }
    $event.preventDefault();
    _.dom.on(document, 'mousemove', this._onBodyMouseMove);
    _.dom.on(document, 'mouseup', this._onBodyMouseUp);
  },
  _onBodyMouseMove($event) {
    const e = $event.event;
    $event.preventDefault();
    if (dragdrop.dragging === false) {
      _.extend(dragdrop, {
        dragging: true,
        data: this.data.data,
        proxy: this._getProxy(),
        screenX: e.screenX,
        screenY: e.screenY,
        clientX: e.clientX,
        clientY: e.clientY,
        pageX: e.pageX,
        pageY: e.pageY,
        movementX: 0,
        movementY: 0,
        droppable: undefined,
      }, true);

      this._dragStart();
    } else {
      _.extend(dragdrop, {
        screenX: e.screenX,
        screenY: e.screenY,
        clientX: e.clientX,
        clientY: e.clientY,
        pageX: e.pageX,
        pageY: e.pageY,
        movementX: e.screenX - dragdrop.screenX,
        movementY: e.screenY - dragdrop.screenY,
      }, true);

      if (dragdrop.proxy) {
        if (this.data.direction === 'all' || this.data.direction === 'horizontal') {
          dragdrop.proxy.style.left = `${dragdrop.proxy.offsetLeft + dragdrop.movementX}px`;
        }
        if (this.data.direction === 'all' || this.data.direction === 'vertical') {
          dragdrop.proxy.style.top = `${dragdrop.proxy.offsetTop + dragdrop.movementY}px`;
        }
      }

      this._drag();
      if (!dragdrop.dragging) {
        return;
      }

      // Drop
      let pointElement = null;
      if (dragdrop.proxy) {
        dragdrop.proxy.style.display = 'none';
        pointElement = document.elementFromPoint(e.clientX, e.clientY);
        dragdrop.proxy.style.display = '';
      } else {
        pointElement = document.elementFromPoint(e.clientX, e.clientY);
      }

      const pointDroppable = dragdrop.droppables.find((droppable) => { // eslint-disable-line array-callback-return
        let element = pointElement;
        const target = _.dom.element(droppable);
        while (element) {
          if (element === target) {
            return true;
          }
          element = element.parentElement;
        }
      });

      if (dragdrop.droppable !== pointDroppable) {
        dragdrop.droppable && dragdrop.droppable._dragLeave(this);
        if (!dragdrop.dragging) {
          return;
        }
        pointDroppable && pointDroppable._dragEnter(this);
        if (!dragdrop.dragging) {
          return;
        }
        dragdrop.droppable = pointDroppable;
      } else {
        pointDroppable && pointDroppable._dragOver(this);
      }
    }
  },
  _onBodyMouseUp($event) {
    $event.preventDefault();

    dragdrop.droppable && dragdrop.droppable._drop(this);
    this.cancel();
  },
  cancel() {
    this._dragEnd();

    _.extend(dragdrop, {
      dragging: false,
      data: null,
      proxy: null,
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      movementX: 0,
      movementY: 0,
      droppable: undefined,
    }, true);

    _.dom.off(document, 'mousemove', this._onBodyMouseMove);
    _.dom.off(document, 'mouseup', this._onBodyMouseUp);
  },
  _dragStart() {
    if (dragdrop.proxy) {
      _.dom.addClass(dragdrop.proxy, this.data.dragClass);
    }

    /**
     * @event KLDraggable#dragstart 拖拽开始时触发
     * @property {object} sender 事件发送对象，为当前draggable
     * @property {object} origin 拖拽源，为当前draggable
     * @property {object} source 拖拽起始元素
     * @property {object} proxy 拖拽代理元素
     * @property {object} data 拖拽时需要传递的数据
     * @property {number} screenX 鼠标指针相对于屏幕的水平位置
     * @property {number} screenY 鼠标指针相对于屏幕的垂直位置
     * @property {number} clientX 鼠标指针相对于浏览器的水平位置
     * @property {number} clientY 鼠标指针相对于浏览器的垂直位置
     * @property {number} pageX 鼠标指针相对于页面的水平位置
     * @property {number} pageY 鼠标指针相对于页面的垂直位置
     * @property {number} movementX 鼠标指针水平位置相对于上次操作的偏移量
     * @property {number} movementY 鼠标指针垂直位置相对于上次操作的偏移量
     * @property {function} cancel 取消拖拽操作
     */
    this.$emit('dragstart', _.extend({
      sender: this,
      origin: this,
      source: _.dom.element(this),
      proxy: dragdrop.proxy,
      cancel: this.cancel,
    }, dragdrop));
  },
  _drag() {
    /**
     * @event KLDraggable#drag 正在拖拽时触发
     * @property {object} sender 事件发送对象，为当前draggable
     * @property {object} origin 拖拽源，为当前draggable
     * @property {object} source 拖拽起始元素
     * @property {object} proxy 拖拽代理元素
     * @property {object} data 拖拽时需要传递的数据
     * @property {number} screenX 鼠标指针相对于屏幕的水平位置
     * @property {number} screenY 鼠标指针相对于屏幕的垂直位置
     * @property {number} clientX 鼠标指针相对于浏览器的水平位置
     * @property {number} clientY 鼠标指针相对于浏览器的垂直位置
     * @property {number} pageX 鼠标指针相对于页面的水平位置
     * @property {number} pageY 鼠标指针相对于页面的垂直位置
     * @property {number} movementX 鼠标指针水平位置相对于上次操作的偏移量
     * @property {number} movementY 鼠标指针垂直位置相对于上次操作的偏移量
     * @property {function} cancel 取消拖拽操作
     */
    this.$emit('drag', _.extend({
      sender: this,
      origin: this,
      source: _.dom.element(this),
      proxy: dragdrop.proxy,
      cancel: this.cancel,
    }, dragdrop));
  },
  /**
   * @private
   */
  _dragEnd() {
    /**
     * @event KLDraggable#dragend 拖拽结束时触发
     * @property {object} sender 事件发送对象，为当前draggable
     * @property {object} origin 拖拽源，为当前draggable
     * @property {object} source 拖拽起始元素
     * @property {object} proxy 拖拽代理元素
     */
    this.$emit('dragend', {
      sender: this,
      origin: this,
      source: _.dom.element(this),
      proxy: dragdrop.proxy,
    });

    if (dragdrop.proxy) {
      if (this.data.proxy instanceof Draggable.Proxy || this.data.proxy === 'clone') {
        dragdrop.proxy.parentElement.removeChild(dragdrop.proxy);
      }
      _.dom.delClass(dragdrop.proxy, this.data.dragClass);
    }
  },
});

Draggable.Proxy = Component.extend({
  name: 'draggable.proxy',
  template: '{#inc this.$body}',
  init() {
    if (this.$outer instanceof Draggable) {
      _.dom.element(this).style.display = 'none';
      this.$outer.data.proxy = this;
    }
  },
  // node: _.noop
});

module.exports = Draggable;
