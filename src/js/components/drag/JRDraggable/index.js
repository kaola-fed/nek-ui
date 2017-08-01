/**
 * ------------------------------------------------------------
 * Draggable    拖出
 * ------------------------------------------------------------
 */

const Component = require('../../../ui-base/component');
const dom = require('regularjs').dom;
const manager = require('../dom/manager');

/**
 * @class JRDraggable
 * @extends Component
 * @param {Object}                  [options.data]                               =  绑定属性
 * @param {}                        [options.data.proxy]                         @=> 拖拽代理，即拖拽时移动的元素。默认值为`clone`，拖拽时拖起自身的一个拷贝；当值为`self`，拖拽时直接拖起自身。也可以用`<jr-draggable-proxy>`自定义代理，或直接传入一个元素或函数。`''`表示不使用拖拽代理。
 * @param {var}                     [options.data.value]                         => 拖拽时需要传递的值
 * @param {boolean}                 [options.data.disabled=false]                => 是否禁用
 * @param {string}                  [options.data.class='z-draggable']           => 可拖拽时（即disabled=false）给该元素附加此class
 * @param {string}                  [options.data.sourceClass='z-dragSource']    => 拖拽时给起始元素附加此class
 * @param {string}                  [options.data.proxyClass='z-dragProxy']      => 拖拽时给代理元素附加此class
 */
const JRDraggable = Component.extend({
  name: 'jr-draggable',
  template: '{#inc this.$body}',
  /**
     * @protected
     * @override
     */
  config() {
    this.defaults({
      proxy: 'clone',
      value: undefined,
      class: 'z-draggable',
      sourceClass: 'z-dragSource',
      proxyClass: 'z-dragProxy',
    });
    this.supr();

    this._onMouseDown = this._onMouseDown.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);
    this.cancel = this.cancel.bind(this);
  },
  /**
     * @protected
     * @override
     */
  init() {
    const inner = dom.element(this);
    dom.on(inner, 'mousedown', this._onMouseDown);
    this.supr();

    this.$watch('disabled', disabled =>
      dom[disabled ? 'delClass' : 'addClass'](inner, this.data.class),
    );
  },
  /**
     * @method _getProxy() 获取拖拽代理
     * @private
     * @return {Element} 拖拽代理元素
     */
  _getProxy() {
    let proxy;
    const source = dom.element(this);

    if (typeof this.data.proxy === 'function') proxy = this.data.proxy();
    else if (this.data.proxy.nodeType && this.data.proxy.nodeType === 1) { proxy = this.data.proxy; } else if (this.data.proxy === 'self') proxy = source;
    else if (this.data.proxy === 'clone') {
      proxy = source.cloneNode(true);
      this._setProxyFixed(proxy, dom.getPosition(source));
      const size = dom.getSize(source);
      proxy.style.width = `${size.width}px`;
      proxy.style.height = `${size.height}px`;
      source.parentElement.appendChild(proxy);
    } else if (this.data.proxy instanceof JRDraggable.Proxy) {
      proxy = dom.element(this.data.proxy.$body());
      this._setProxyFixed(proxy, dom.getPosition(source));
      document.body.appendChild(proxy);
    }

    proxy && this._initProxy(proxy);
    return proxy;
  },
  /**
     * @method _setProxyFixed() 将拖拽代理的position设置fixed并设置初始位置
     * @param  {Element} proxy 拖拽代理元素
     * @param  {position} position 拖拽代理的初始位置
     * @private
     * @return {void}
     */
  _setProxyFixed(proxy, position = { left: 0, top: 0 }) {
    proxy.style.left = `${position.left}px`;
    proxy.style.top = `${position.top}px`;
    proxy.style.zIndex = '9999';
    proxy.style.position = 'fixed';
    proxy.style.display = '';
  },
  /**
     * @method _initProxy() 初始化拖拽代理
     * @private
     * @return {void}
     */
  _initProxy(proxy) {
    // 如果position为static，则设置为relative，保证可以移动
    if (dom.getComputedStyle(proxy, 'position') === 'static') {
      proxy.style.position = 'relative';
    }
  },
  /**
     * @private
     */
  _onMouseDown($event) {
    if (this.data.disabled) return;

    const e = $event.event;
    // 阻止浏览器的默认行为，特别是IE的选择行为
    $event.preventDefault();

    // 鼠标坐标从MouseDown开始算，防止出现第一次移动的误差
    Object.assign(manager, {
      screenX: e.screenX,
      screenY: e.screenY,
      clientX: e.clientX,
      clientY: e.clientY,
      pageX: e.pageX,
      pageY: e.pageY,
      startX: e.clientX,
      startY: e.clientY,
      dragX: 0,
      dragY: 0,
    });

    dom.on(window, 'mousemove', this._onMouseMove);
    dom.on(window, 'mouseup', this._onMouseUp);
  },
  /**
     * @private
     */
  _onMouseMove($event) {
    const e = $event.event;
    $event.preventDefault();

    Object.assign(manager, {
      screenX: e.screenX,
      screenY: e.screenY,
      clientX: e.clientX,
      clientY: e.clientY,
      pageX: e.pageX,
      pageY: e.pageY,
      dragX: e.clientX - manager.startX,
      dragY: e.clientY - manager.startY,
    });

    if (manager.dragging === false) this._onMouseMoveStart(e);
    else this._onMouseMoving(e);
  },
  /**
     * @method _onMouseMoveStart(e) 处理第一次鼠标移动事件
     * @private
     * @param  {MouseEvent} e 鼠标事件
     * @return {void}
     */
  _onMouseMoveStart(e, override) {
    const proxy = this._getProxy();

    // 代理元素的位置从MouseMoveStart开始算，这样在MouseDown中也可以预先处理位置
    // 获取初始的left和top值
    const computedStyle = proxy ? dom.getComputedStyle(proxy) : {};
    if (!computedStyle.left || computedStyle.left === 'auto') {
      computedStyle.left = '0px';
    }
    if (!computedStyle.top || computedStyle.top === 'auto') {
      computedStyle.top = '0px';
    }

    Object.assign(manager, {
      dragging: true,
      proxy,
      value: this.data.value,
      startLeft: +computedStyle.left.slice(0, -2),
      startTop: +computedStyle.top.slice(0, -2),
      droppable: undefined,
    });

    manager.left = manager.startLeft;
    manager.top = manager.startTop;

    !override && this._dragStart();
  },
  /**
     * @method _onMouseMoveStart(e) 处理后续鼠标移动事件
     * @param  {MouseEvent} e 鼠标事件
     * @private
     * @return {void}
     */
  _onMouseMoving(e) {
    // 拖拽约束
    const next = this.restrict(manager);
    // 设置位置
    if (manager.proxy) {
      manager.proxy.style.left = `${next.left}px`;
      manager.proxy.style.top = `${next.top}px`;
    }
    // 更新当前位置
    manager.left = next.left;
    manager.top = next.top;

    this._drag();
    if (!manager.dragging) return;

    // for Droppable
    let pointElement = null;
    if (manager.proxy) {
      manager.proxy.style.display = 'none';
      pointElement = document.elementFromPoint(e.clientX, e.clientY);
      manager.proxy.style.display = '';
    } else pointElement = document.elementFromPoint(e.clientX, e.clientY);

    let pointDroppable = null;
    while (pointElement) {
      pointDroppable = manager.droppables.find(
        droppable => dom.element(droppable) === pointElement,
      );

      if (pointDroppable) break;
      else pointElement = pointElement.parentElement;
    }

    if (manager.droppable !== pointDroppable) {
      manager.droppable && manager.droppable._dragLeave(this);
      if (!manager.dragging) return;
      pointDroppable && pointDroppable._dragEnter(this);
      if (!manager.dragging) return;
      manager.droppable = pointDroppable;
    }

    // dragEnter之后也要dragOver
    pointDroppable && pointDroppable._dragOver(this);
  },
  restrict(params) {
    return {
      left: params.startLeft + params.dragX,
      top: params.startTop + params.dragY,
    };
  },
  /**
     * @private
     */
  _onMouseUp() {
    if (manager.dragging) {
      manager.droppable && manager.droppable._drop(this);
      this.cancel();
    }

    dom.off(window, 'mousemove', this._onMouseMove);
    dom.off(window, 'mouseup', this._onMouseUp);
  },
  /**
     * @method cancel() 取消拖拽操作
     * @public
     * @return {void}
     */
  cancel() {
    this._dragEnd();

    Object.assign(manager, {
      dragging: false,
      value: undefined,
      proxy: undefined,
      range: undefined,
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      startX: 0,
      startY: 0,
      dragX: 0,
      dragY: 0,
      startLeft: 0,
      startTop: 0,
      left: 0,
      top: 0,
      droppable: undefined,
    });
  },
  /**
     * @private
     */
  _dragStart() {
    const source = dom.element(this);
    dom.addClass(source, this.data.sourceClass);
    manager.proxy && dom.addClass(manager.proxy, this.data.proxyClass);

    /**
         * @event dragstart 拖拽开始时触发
         * @property {object} sender 事件发送对象，为当前draggable
         * @property {object} origin 拖拽源，为当前draggable
         * @property {object} source 拖拽起始元素
         * @property {object} proxy 拖拽代理元素
         * @property {var} value 拖拽时需要传递的值
         * @property {number} screenX 鼠标指针相对于屏幕的水平坐标
         * @property {number} screenY 鼠标指针相对于屏幕的垂直坐标
         * @property {number} clientX 鼠标指针相对于浏览器的水平坐标
         * @property {number} clientY 鼠标指针相对于浏览器的垂直坐标
         * @property {number} pageX 鼠标指针相对于页面的水平坐标
         * @property {number} pageY 鼠标指针相对于页面的垂直坐标
         * @property {number} startX 拖拽开始时鼠标指针的水平坐标
         * @property {number} startY 拖拽开始时鼠标指针的垂直坐标
         * @property {number} dragX 拖拽时鼠标指针相对于起始坐标的水平位移
         * @property {number} dragY 拖拽时鼠标指针相对于起始坐标的垂直位移
         * @property {number} startLeft 拖拽开始时代理元素的left值
         * @property {number} startTop 拖拽开始时代理元素的top值
         * @property {number} left 拖拽时代理元素的left值
         * @property {number} top 拖拽时代理元素的top值
         * @property {function} cancel 取消拖拽操作
         */
    this.$emit(
      'dragstart',
      Object.assign(
        {
          sender: this,
          origin: this,
          source,
          cancel: this.cancel,
        },
        manager,
      ),
    );
  },
  /**
     * @private
     */
  _drag() {
    /**
         * @event drag 正在拖拽时触发
         * @property {object} sender 事件发送对象，为当前draggable
         * @property {object} origin 拖拽源，为当前draggable
         * @property {object} source 拖拽起始元素
         * @property {object} proxy 拖拽代理元素
         * @property {var} value 拖拽时需要传递的值
         * @property {number} screenX 鼠标指针相对于屏幕的水平坐标
         * @property {number} screenY 鼠标指针相对于屏幕的垂直坐标
         * @property {number} clientX 鼠标指针相对于浏览器的水平坐标
         * @property {number} clientY 鼠标指针相对于浏览器的垂直坐标
         * @property {number} pageX 鼠标指针相对于页面的水平坐标
         * @property {number} pageY 鼠标指针相对于页面的垂直坐标
         * @property {number} startX 拖拽开始时鼠标指针的水平坐标
         * @property {number} startY 拖拽开始时鼠标指针的垂直坐标
         * @property {number} dragX 拖拽时鼠标指针相对于起始坐标的水平位移
         * @property {number} dragY 拖拽时鼠标指针相对于起始坐标的垂直位移
         * @property {number} startLeft 拖拽开始时代理元素的left值
         * @property {number} startTop 拖拽开始时代理元素的top值
         * @property {number} left 拖拽时代理元素的left值
         * @property {number} top 拖拽时代理元素的top值
         * @property {function} cancel 取消拖拽操作
         */
    this.$emit(
      'drag',
      Object.assign(
        {
          sender: this,
          origin: this,
          source: dom.element(this),
          cancel: this.cancel,
        },
        manager,
      ),
    );
  },
  /**
     * @private
     */
  _dragEnd() {
    const source = this._watchers !== null ? dom.element(this) : null;
    source && dom.delClass(source, this.data.sourceClass);

    /**
         * @event dragend 拖拽结束时触发
         * @property {object} sender 事件发送对象，为当前draggable
         * @property {object} origin 拖拽源，为当前draggable
         * @property {object} source 拖拽起始元素
         * @property {object} proxy 拖拽代理元素
         * @property {var} value 拖拽时需要传递的值
         */
    this.$emit(
      'dragend',
      Object.assign(
        {
          sender: this,
          origin: this,
          source,
        },
        manager,
      ),
    );

    if (manager.proxy) {
      if (
        this.data.proxy instanceof JRDraggable.Proxy ||
        this.data.proxy === 'clone'
      ) {
        manager.proxy.parentElement.removeChild(manager.proxy);
      }

      dom.delClass(manager.proxy, this.data.proxyClass);
    }
  },
});

JRDraggable.Proxy = Component.extend({
  name: 'jr-draggable-proxy',
  /**
     * @protected
     */
  init() {
    if (this.$outer instanceof JRDraggable) this.$outer.data.proxy = this;
  },
});

module.exports = JRDraggable;
