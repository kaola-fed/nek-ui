/**
 * @file KLTabs       选项卡
 * @author   sensen(rainforest92@126.com)
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../ui-base/_');

/**
 * @class KLTabs
 * @extend Component
 * @param {object}        [options.data]                      = 绑定属性
 * @param {string}        [options.data.type=line]            => 显示类型,card/line
 * @param {object}        [options.data.selected=null]        <=> 当前选择卡
 * @param {string}        [options.data.titleTemplate=null]   @=> 标题模板
 * @param {string}        [options.data.defaultKey=null]      => 默认显示对应 key 的 Tab
 * @param {boolean}       [options.data.readonly=false]       => 是否只读
 * @param {boolean}       [options.data.disabled=false]       => 是否禁用
 * @param {boolean}       [options.data.visible=true]         => 是否显示
 * @param {string}        [options.data.class]                => 补充class
 */

/**
 * @class KLTab
 * @extend Component
 * @param {object}        [options.data]                      = 绑定属性
 * @param {string}        [options.data.title]             => 标题
 * @param {string}        [options.data.key=null]             => key 标识
 */

const KLTabs = Component.extend({
  name: 'kl-tabs',
  template: _.compressHtml(template),
  config() {
    _.extend(this.data, {
      tabs: [],
      selected: undefined,
      titleTemplate: null,
      offset: 0,
      navStyle: {
        transform: 'translateX(0)',
      },
      type: 'line',
      crtTabElem: null,
    });
    this.supr();

    this.$watch('selected', (newValue) => {
      /**
       * @event KLTabs#change 选项卡改变时触发
       * @property {object} sender 事件发送对象
       * @property {object} selected 改变后的选项卡
       */
      this.$emit('change', {
        sender: this,
        selected: newValue,
        key: newValue.key,
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
      // 初始化时检查 $refs.wrap 和 $refs.nav 是否已经加载了
      // 给个最大次数防止一直执行
      let count = 0;
      let interval = setInterval(() => {
        if (count >= 20) {
          interval && clearInterval(interval);
          interval = null;
          return;
        }
        count += 1;
        if (!this.$refs.wrap || !this.$refs.nav) {
          return;
        }
        this.update();
      }, 100);
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
      this.setOffset(0);
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
    this.data.scrollable && this.update();
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
  select(item, e) {
    if (this.data.readonly || this.data.disabled || item.data.disabled) return;

    this.data.selected = item;
    this.data.crtTabElem = e.target;
    /**
     * @event KLTabs#select 选择某一项时触发
     * @property {object} sender 事件发送对象
     * @property {object} selected 当前选择卡
     * @property {string} key 当前选择卡的key属性
     * @property {event} e 点击鼠标事件
     */
    this.$emit('select', {
      sender: this,
      selected: item,
      key: item.data.key,
      e,
    });
  },
  destroy() {
    this.supr();
    window.removeEventListener('resize', this._update);
  },
});

// eslint-disable-next-line
KLTabs.directive('active-bar', function(activeBarElem) {
  this.$watch('selected', (selected) => {
    if (this.data.type !== 'line' || !selected) { return; }
    setTimeout(() => {
      const elem = activeBarElem.parentElement.querySelector('.is-crt');

      activeBarElem.style.width = `${elem.clientWidth}px`;
      activeBarElem.style.transform = `translateX(${elem.offsetLeft}px)`;
    }, 100);
  });
});

module.exports = KLTabs;
