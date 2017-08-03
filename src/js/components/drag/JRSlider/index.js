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
 * @param {number}                [options.data.step=1]                <=> 间隔
 * @param {boolean}               [options.data.showStep=false]        <=> 是否显示间隔
 * @param {boolean}               [options.data.showInput=false]       <=> 是否显示输入框
 * @param {boolean}               [options.data.showTips=true]         => 是否显示tips
 * @param {boolean}               [options.data.readonly]              => 是否只读
 * @param {boolean}               [options.data.disabled]              => 是否禁用
 * @param {boolean}               [options.data.visible]               => 是否显示
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
      step: 1,
      pointArr: [],
      showStep: false,
      showInput: false,
      showTips: true,
      _grid: {
        x: 0,
        y: 0,
      },
    });
    this.data.height2 = this.data.height + 14;
    this.supr();
    this.getStepPoint();
    this.watch();
  },

  getStepPoint() {
    this.data.inputMax = this.data.max;
    if (+this.data.step <= 1) {
      return;
    }
    this.data.pointArr = [];
    let c = this.data.min;
    while (c <= this.data.max) {
      this.data.pointArr.push(
        100 * (c - this.data.min) / (this.data.max - this.data.min),
      );
      c += this.data.step;
    }
    this.data.inputMax = c - this.data.step;
    this.data.inputMaxLen = `${this.data.inputMax}`.length;
  },
  watch() {
    this.$watch('value', (value) => {
      const isOutOfRange = this.isOutOfRange(value);
      if (isOutOfRange) {
        this.data.value = isOutOfRange;
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
        this.data.value = Math.round(value);
      },
    },
  },
  isOutOfRange(value) {
    const min = +this.data.min;
    const max = +this.data.max;
    let backValue = value;
    if (backValue < min) {
      backValue = min;
    }
    if (backValue > max) {
      backValue = max;
    }
    if (+this.data.step > 1) {
      const ext = (backValue - min) % this.data.step;
      backValue = ext > this.data.step / 2 &&
        backValue + this.data.step - ext <= max
        ? backValue + this.data.step - ext
        : backValue - ext;
    }
    return backValue;
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
    console.log(percent);
    const sp = this.data.step / 2 / (this.data.max - this.data.min) * 100;
    if (this.data.pointArr && this.data.step > 1) {
      percent = this.data.pointArr.filter(
        item =>
          (item < percent && item + sp > percent) ||
          (item > percent && item - sp < percent),
      )[0];
    }
    console.log(percent);
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
