/**
 * ------------------------------------------------------------
 * JRDroppable    放入
 * ------------------------------------------------------------
 */

const Component = require('../../../ui-base/component');
const dom = require('regularjs').dom;
const manager = require('../dom/manager');

/**
 * @class JRDroppable
 * @extends Component
 * @param {Object}                  [options.data]                                   =  绑定属性
 * @param {var}                     [options.data.value]                            <=  拖放后传递过来的值
 * @param {boolean}                 [options.data.disabled=false]                    => 是否禁用
 * @param {string}                  [options.data.class ='z-droppable']              => 可放置时（即disabled=false）给元素附加此class
 * @param {string}                  [options.data.dragTarget='z-dragTarget']         => 拖拽在该元素上方时给该元素附加此class
 */
const JRDroppable = Component.extend({
  name: 'jr-droppable',
  template: '{#inc this.$body}',
  /**
     * @protected
     * @override
     */
  config() {
    this.defaults({
      data: null,
      class: 'z-droppable',
      dragTarget: 'z-dragTarget',
    });
    this.supr();

    manager.droppables.push(this);
  },
  /**
     * @protected
     * @override
     */
  init() {
    const inner = dom.element(this);
    this.$watch('disabled', disabled =>
      dom[disabled ? 'delClass' : 'addClass'](inner, this.data.class),
    );
    this.supr();
  },
  /**
     * @protected
     * @override
     */
  destroy() {
    manager.droppables.splice(manager.droppables.indexOf(this), 1);
    this.supr();
  },
  /**
     * @private
     */
  _dragEnter(origin) {
    const element = dom.element(this);
    dom.addClass(element, this.data.dragTarget);

    /**
         * @event dragenter 拖拽进入该元素时触发
         * @property {object} sender 事件发送对象，为当前droppable
         * @property {object} origin 拖拽源，为拖拽的draggable
         * @property {object} source 拖拽起始元素
         * @property {object} proxy 拖拽代理元素
         * @property {object} target 拖拽目标元素
         * @property {object} value 拖拽时接收到的值
         * @property {number} screenX 鼠标指针相对于屏幕的水平位置
         * @property {number} screenY 鼠标指针相对于屏幕的垂直位置
         * @property {number} clientX 鼠标指针相对于浏览器的水平位置
         * @property {number} clientY 鼠标指针相对于浏览器的垂直位置
         * @property {number} pageX 鼠标指针相对于页面的水平位置
         * @property {number} pageY 鼠标指针相对于页面的垂直位置
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
      'dragenter',
      Object.assign(
        {
          sender: this,
          origin,
          source: dom.element(origin),
          target: element,
          cancel: origin.cancel,
        },
        manager,
      ),
    );
  },
  /**
     * @private
     */
  _dragLeave(origin) {
    const element = dom.element(this);
    dom.delClass(element, this.data.dragTarget);

    /**
         * @event dragleave 拖拽离开该元素时触发
         * @property {object} sender 事件发送对象，为当前droppable
         * @property {object} origin 拖拽源，为拖拽的draggable
         * @property {object} source 拖拽起始元素
         * @property {object} proxy 拖拽代理元素
         * @property {object} target 拖拽目标元素
         * @property {object} value 拖拽时接收到的值
         * @property {number} screenX 鼠标指针相对于屏幕的水平位置
         * @property {number} screenY 鼠标指针相对于屏幕的垂直位置
         * @property {number} clientX 鼠标指针相对于浏览器的水平位置
         * @property {number} clientY 鼠标指针相对于浏览器的垂直位置
         * @property {number} pageX 鼠标指针相对于页面的水平位置
         * @property {number} pageY 鼠标指针相对于页面的垂直位置
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
      'dragleave',
      Object.assign(
        {
          sender: this,
          origin,
          source: dom.element(origin),
          target: element,
          cancel: origin.cancel,
        },
        manager,
      ),
    );
  },
  /**
     * @private
     */
  _dragOver(origin) {
    const element = dom.element(this);
    const dimension = dom.getDimension(element);

    /**
         * @event dragover 拖拽在该元素上方时触发
         * @property {object} sender 事件发送对象，为当前droppable
         * @property {object} origin 拖拽源，为拖拽的draggable
         * @property {object} source 拖拽起始元素
         * @property {object} proxy 拖拽代理元素
         * @property {object} target 拖拽目标元素
         * @property {object} value 拖拽时接收到的值
         * @property {number} ratioX 鼠标指针相对于接收元素所占的长度比
         * @property {number} ratioY 鼠标指针相对于接收元素所占的高度比
         * @property {number} screenX 鼠标指针相对于屏幕的水平位置
         * @property {number} screenY 鼠标指针相对于屏幕的垂直位置
         * @property {number} clientX 鼠标指针相对于浏览器的水平位置
         * @property {number} clientY 鼠标指针相对于浏览器的垂直位置
         * @property {number} pageX 鼠标指针相对于页面的水平位置
         * @property {number} pageY 鼠标指针相对于页面的垂直位置
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
      'dragover',
      Object.assign(
        {
          sender: this,
          origin,
          source: dom.element(origin),
          target: element,
          ratioX: (manager.clientX - dimension.left) / dimension.width,
          ratioY: (manager.clientY - dimension.top) / dimension.height,
          cancel: origin.cancel,
        },
        manager,
      ),
    );
  },
  /**
     * @private
     */
  _drop(origin) {
    const element = dom.element(this);
    dom.delClass(element, this.data.dragTarget);
    const dimension = dom.getDimension(element);

    this.data.value = origin.data.value;
    this.$update();

    /**
         * @event drop 拖拽放置时触发
         * @property {object} sender 事件发送对象，为当前droppable
         * @property {object} origin 拖拽源，为拖拽的draggable
         * @property {object} source 拖拽起始元素
         * @property {object} proxy 拖拽代理元素
         * @property {object} target 拖拽目标元素
         * @property {object} value 拖拽时接收到的值
         * @property {number} ratioX 鼠标指针相对于接收元素所占的长度比
         * @property {number} ratioY 鼠标指针相对于接收元素所占的高度比
         * @property {number} screenX 鼠标指针相对于屏幕的水平位置
         * @property {number} screenY 鼠标指针相对于屏幕的垂直位置
         * @property {number} clientX 鼠标指针相对于浏览器的水平位置
         * @property {number} clientY 鼠标指针相对于浏览器的垂直位置
         * @property {number} pageX 鼠标指针相对于页面的水平位置
         * @property {number} pageY 鼠标指针相对于页面的垂直位置
         * @property {number} startX 拖拽开始时鼠标指针的水平坐标
         * @property {number} startY 拖拽开始时鼠标指针的垂直坐标
         * @property {number} dragX 拖拽时鼠标指针相对于起始坐标的水平位移
         * @property {number} dragY 拖拽时鼠标指针相对于起始坐标的垂直位移
         * @property {number} startLeft 拖拽开始时代理元素的left值
         * @property {number} startTop 拖拽开始时代理元素的top值
         * @property {number} left 拖拽时代理元素的left值
         * @property {number} top 拖拽时代理元素的top值
         */
    this.$emit(
      'drop',
      Object.assign(
        {
          sender: this,
          origin,
          source: dom.element(origin),
          target: element,
          ratioX: (manager.clientX - dimension.left) / dimension.width,
          ratioY: (manager.clientY - dimension.top) / dimension.height,
        },
        manager,
      ),
    );
  },
});

module.exports = JRDroppable;
