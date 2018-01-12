/**
 * ------------------------------------------------------------
 * JRCollapse  折叠文本
 * ------------------------------------------------------------
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');
// const group = require('../JRCollapseGroup');

/**
 * @class JRCollapse
 * @extend Component
 * @param {object}      [options.data]                       = 绑定属性
 * @param {string}      [options.data.title]                 => 标题
 * @param {boolean}     [options.data.active=true]           => 是否默认显示内容区域
 * @param {boolean}     [options.data.showIcon=true]         => 是否显示右侧标签
 * @param {boolean}     [options.data.accordion=true]        => 是否手风琴模式
 * @param {string}      [options.data.width='100%']          => 宽度
 * @param {string}      [options.data.class]                 => 补充样式
 * */
const JRCollapse = Component.extend({
  name: 'jr-collapse',
  template,
  config() {
    this.defaults({
      title: '',
      active: true,
      showIcon: true,
      width: '100%',
      accordion: true,
    });
    this.supr();
  },

  init() {
    // if (this.$outer && this.$outer instanceof group) {
    if (this.$parent) {
      !this.$parent.collapseChildren && (this.$parent.collapseChildren = []);
      this.$parent.collapseChildren.push(this);
    }
  },

  toggle(flag) {
    if (typeof flag === 'boolean') {
      this.data.active = flag;
    } else {
      this.data.active = !this.data.active;
    }
    if (this.data.active) {
      if (this.data.accordion && this.$parent) {
        this.$parent._children.forEach((item) => {
          if (item.name === 'jr-collapse' && item.data.accordion) {
            item.toggle && item.toggle(false);
          }
        });
      }

      this.data.active = true;
      /**
     * @event JRCollapse#open 打开面板回调
     * @param {object} 事件句柄
     */
      this.$emit('open');
    }
  },
});

module.exports = JRCollapse;
