/**
 * @file KLPager     分页
 * @author   sensen(rainforest92@126.com)
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../ui-base/_');

/**
 * @class KLPager
 * @extend Component
 * @param {object}        [options.data]                  = 绑定属性
 * @param {number}        [options.data.current=1]        <=> 当前页
 * @param {number}        [options.data.total=0]          => 总页数
 * @param {number}        [options.data.sumTotal=0]       => 总个数
 * @param {number}        [options.data.pageSize=20]      => 每页个数
 * @param {number}        [options.data.middle=5]         => 当页数较多时，中间显示的页数
 * @param {number}        [options.data.side=2]           => 当页数较多时，两端显示的页数
 * @param {number}        [options.data.step=5]           => 每页条数选择步长
 * @param {number}        [options.data.maxPageSize=50]   => 最大可设置的每页条数
 * @param {boolean}       [options.data.isEllipsis=false] => 是否展示位总条数+
 * @param {number}        [options.data.maxTotal]         => 总条数超过maxTotal条数时，展示为maxTotal+条数
 * @param {string}        [options.data.class]            => 补充class
 */
const KLPager = Component.extend({
  name: 'kl-pager',
  template,
  /**
     * @protected
     */
  config() {
    _.extend(this.data, {
      current: 1,
      total: '',
      sumTotal: '',
      pageSize: '',
      position: 'center',
      middle: 5,
      side: 2,
      _start: 1,
      _end: 5,
      step: 5,
      maxPageSize: 50,
      pageSizeList: [],
      isEllipsis: false,
    });
    this.supr();

    this._setPageSizeList();

    this.$watch(['current', 'total'], function (_current, _total) {
      const current = +_current;
      const total = +_total;
      this.data.current = current;
      this.data.total = total;
      const show = Math.floor(this.data.middle / 2);
      const side = this.data.side;

      this.data._start = current - show;
      this.data._end = current + show;
      if (this.data._start < side + 1) this.data._start = side + 1;
      if (this.data._end > total - side) this.data._end = total - side;
      if (current - this.data._start < show) {
        this.data._end += ((this.data._start - current) + show);
      }
      if (this.data._end - current < show) {
        this.data._start += this.data._end - current - show;
      }
    });

    this.$watch(['middle', 'side'], function (middle, side) {
      this.data.middle = +middle;
      this.data.side = +side;
    });

    this.$watch('pageSize', function (val, oldVal) {
      if (!oldVal) return;
      this.initTotal();
      this.select(1);
    });

    this.$watch('sumTotal', () => {
      this.initTotal();
    });
  },

  initTotal() {
    if (this.data.pageSize) {
      this.data.total = Math.ceil(this.data.sumTotal / this.data.pageSize);
    }

    if (
      (!!this.data.sumTotal || this.data.sumTotal === 0) &&
      !this.data.pageSize
    ) {
      console.error('Pager组件需要传pageSize');
    }
  },

  _setPageSizeList() {
    const { step, maxPageSize } = this.data;
    for (let i = 1; i * step <= maxPageSize; i += 1) {
      this.data.pageSizeList.push({
        id: i * step,
        name: (i * step) + this.$trans('ITEM_PAGE'),
      });
    }
  },

  /**
     * @method select(page) 选择某一页
     * @public
     * @param  {object} page 选择页
     * @return {void}
     */
  select(page) {
    if (this.data.readonly || this.data.disabled) return;

    if (page < 1) return;
    if (page > this.data.total) return;

    this.data.current = page;
    /**
         * @event select 选择某一页时触发
         * @property {object} sender 事件发送对象
         * @property {object} current 当前选择页
         */
    this.$update();
    this.$emit('select', {
      sender: this,
      current: this.data.current,
    });
  },
  enter(ev) {
    if (ev.which === 13) {
      // ENTER key
      ev.preventDefault();
      this.goto();
    }
  },
  goto() {
    const data = this.data;
    if (!data.pageNo && data.pageNo / 1 !== 0) return;
    if (data.pageNo > data.total) {
      data.pageNo = data.total;
    } else if (data.pageNo < 1) {
      data.pageNo = 1;
    }
    this.select(this.data.pageNo);
  },
});

module.exports = KLPager;
