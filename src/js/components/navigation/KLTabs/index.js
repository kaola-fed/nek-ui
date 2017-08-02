/**
 * ------------------------------------------------------------
 * KLTabs       选项卡
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../ui-base/_');

/**
 * @class KLTab
 * @extend Component
 * @param {object}        [options.data]                      = 绑定属性
 * @param {object}        [options.data.title='']             => 标题
 * @param {string}        [options.data.key=null]             => key 标识
 */

/**
 * @class KLTabs
 * @extend Component
 * @param {object}        [options.data]                      = 绑定属性
 * @param {object}        [options.data.selected=null]        <=> 当前选择卡
 * @param {string}        [options.data.titleTemplate=null]   @=> 标题模板
 * @param {string}        [options.data.defaultKey=null]      => 默认显示对应 key 的 Tab
 * @param {boolean}       [options.data.refresh=false]        => 切换 Tab 是否重新渲染
 * @param {boolean}       [options.data.readonly=false]       => 是否只读
 * @param {boolean}       [options.data.disabled=false]       => 是否禁用
 * @param {boolean}       [options.data.visible=true]         => 是否显示
 * @param {string}        [options.data.class]                => 补充class
 */
const KLTabs = Component.extend({
  name: 'kl-tabs',
  template,
  /**
     * @protected
     */
  config() {
    _.extend(this.data, {
      tabs: [],
      selected: undefined,
      titleTemplate: null,
      offset: 0,
      navStyle: {},
    });
    this.supr();

    this.$watch('selected', (newValue) => {
      /**
             * @event change 选项卡改变时触发
             * @property {object} sender 事件发送对象
             * @property {object} selected 改变后的选项卡
             */
      this.$emit('change', {
        sender: this,
        selected: newValue,
        key: newValue.data.key,
      });
    });
  },
  init() {
    this.supr();
    this._update = this.update.bind(this);
    window.addEventListener('resize', this._update);
  },
  events: {
    $init() {
      const self = this;
      setTimeout(() => {
        self.update();
      }, 10);
    },
  },
  update() {
    const wrap = this.$refs.wrap;
    const nav = this.$refs.nav;
    if (!wrap || !nav) {
      return false;
    }
    const wrapWidth = wrap.offsetWidth;
    const navWidth = nav.scrollWidth;
    const currentOffset = this.data.offset;
    if (wrapWidth < navWidth) {
      this.data.scrollable = this.data.scrollable || {};
      this.data.scrollable.prev = currentOffset;
      this.data.scrollable.next = (currentOffset + wrapWidth) < navWidth;
      if (navWidth - currentOffset < wrapWidth) {
        this.setOffset(navWidth - wrapWidth);
      }
    } else {
      this.data.scrollable = false;
    }
    this.$update();
  },
  setOffset(offset) {
    this.data.offset = offset;
    const transform = `translateX(-${this.data.offset}px)`;
    const navStyle = this.data.navStyle;
    navStyle.transform = transform;
    navStyle.msTransform = transform;
    navStyle.webkitTransform = transform;
    this.update();
  },
  prev() {
    if (!this.data.scrollable || !this.data.scrollable.prev) {
      return;
    }
    const wrap = this.$refs.wrap;
    const currentOffset = this.data.offset;
    if (!wrap || !currentOffset) {
      return;
    }
    const wrapWidth = wrap.offsetWidth;
    const newOffset = currentOffset > wrapWidth ? currentOffset - wrapWidth : 0;
    this.setOffset(newOffset);
  },
  next() {
    if (!this.data.scrollable || !this.data.scrollable.next) {
      return;
    }
    const wrap = this.$refs.wrap;
    const nav = this.$refs.nav;
    if (!wrap || !nav) {
      return;
    }
    const navWidth = nav.scrollWidth;
    const wrapWidth = wrap.offsetWidth;
    const currentOffset = this.data.offset;
    if (navWidth - currentOffset <= wrapWidth) {
      return;
    }
    const newOffset = navWidth - currentOffset > wrapWidth * 2 ? currentOffset + wrapWidth : (navWidth - wrapWidth);
    this.setOffset(newOffset);
  },
  /**
     * @method select(item) 选择某一项
     * @public
     * @param  {object} item 选择项
     * @return {void}
     */
  select(item) {
    if (this.data.readonly || this.data.disabled || item.data.disabled) return;

    this.data.selected = item;
    /**
         * @event select 选择某一项时触发
         * @property {object} sender 事件发送对象
         * @property {object} selected 当前选择卡
         */
    this.$emit('select', {
      sender: this,
      selected: item,
      key: item.data.key,
    });
  },
  destroy() {
    this.supr();
    window.removeEventListener('resize', this._update);
  },
});

module.exports = KLTabs;
