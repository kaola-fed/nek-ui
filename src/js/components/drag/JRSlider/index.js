/**
 * ------------------------------------------------------------
 * JRSlider    滑动条
 * ------------------------------------------------------------
 */
const Component = require('../../../ui-base/component');
const template = require('./index.html');
const dom = require('regularjs').dom;
require('../../form/JRDatePicker/NumberInput');
/**
 * @class JRSlider
 * @extends Component
 * @param {Object}                [options.data]                       =  绑定属性
 * @param {number}                [options.data.value=0]               <=> 数值
 * @param {number}                [options.data.min=0]                 <=> 最小值
 * @param {number}                [options.data.max=100]               <=> 最大值
 * @param {number}                [options.data.width=250]             <=> 宽度
 * @param {number}                [options.data.height=10]             <=> 高度
 * @param {number}                [options.data.step=0]                <=> 间隔
 * @param {boolean}               [options.data.showStep=true]         <=> 是否显示间隔，step大于等于1的时候默认显示
 * @param {boolean}               [options.data.readonly]              => 是否只读
 * @param {boolean}               [options.data.disabled]              => 是否禁用
 * @param {boolean}               [options.data.visible]               => 是否显示
 * @param {string}                [options.data.axis='x']              => 轴向约束，默认为x
 * @param {string}                [options.data.class]                 => 补充class
 */
const JRSlider = Component.extend({
  name: 'jr-slider',
  template,
  /**
     * @protected
     * @override
     */
  config() {
    this.defaults({
      value: 0,
      min: 0,
      max: 100,
      width: 250,
      height: 10,
      axis: 'x',
      step: 0,
      pointArr: [],
      showStep: true,
      _grid: {
        x: 0,
        y: 0,
      },
    });
    this.supr();
    this.getStepPoint();
    this.watch();
  },

  getStepPoint() {
    if (!(this.data.showStep && +this.data.step > 1)) {
      return;
    }
    this.data.pointArr = [];
    let c = this.data.min;
    while (c < this.data.max) {
      this.data.pointArr.push(
        100 * (c - this.data.min) / (this.data.max - this.data.min),
      );
      c += this.data.step;
    }
  },
  watch() {
    this.$watch('value', (value) => {
      const isOutOfRange = this.isOutOfRange(value);
      if (isOutOfRange) {
        this.data.value = isOutOfRange;
      }
      if (this.data.showStep && +this.data.step > 1) {
        const ext = (value - this.data.min) % this.data.step;
        this.data.value = ext > this.data.step / 2
            ? value + this.data.step - ext
            : value - ext;
      }
      this.$emit('change', {
        sender: this,
        value: this.data.value,
      });
      this.$update();
    });

    this.$watch(['min', 'max'], () => {
      const isOutOfRange = this.isOutOfRange(this.data.value);
      if (isOutOfRange) {
        this.data.value = isOutOfRange;
      }
    });
  },
  computed: {
    percent: {
      get() {
        return (
          (this.data.value - this.data.min) /
          (this.data.max - this.data.min) *
          100
        );
      },
      set(percent) {
        let value =
          +this.data.min + (this.data.max - this.data.min) * percent / 100;
        if (this.data.step) {
          value = Math.round(value / this.data.step) * this.data.step;
        }
        this.data.value = value;
      },
    },
  },
  isOutOfRange(value) {
    const min = +this.data.min;
    const max = +this.data.max;

    // minDate && date < minDate && minDate，先判断是否为空，再判断是否超出范围，如果超出则返回范围边界的日期
    return (value < min && min) || (value > max && max);
  },
  /**
     * @private
     */
  _onMouseDown($event) {
    if (this.data.readonly || this.data.disabled) return;

    const e = $event.event;
    const $handle = this.$refs.handle;
    const $parent = $handle.offsetParent;
    const dimension = dom.getDimension($parent, 'center');
    let percent = (e.clientX - dimension.left) / dimension.width * 100;
    if (this.data.pointArr && this.data.showStep) {
      percent = this.data.pointArr.filter(
        item =>
          (item < percent && item + this.data.step / 2 > percent) ||
          (item > percent && item - this.data.step / 2 < percent),
      )[0];
    }
    this.$set('percent', percent);
  },
  /**
     * @private
     */
  _onDragStart($event) {
    this.data._grid.x =
      this.data.step / (this.data.max - this.data.min) * $event.range.width;
  },
  /**
     * @private
     */
  _onDrag($event) {
    this.$set('percent', $event.left / $event.range.width * 100);
  },
});

export default JRSlider;
