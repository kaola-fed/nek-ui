/**
 * ------------------------------------------------------------
 * JRTab       子选项卡
 * ------------------------------------------------------------
 */

const Component = require('../../../../ui-base/component');
const _ = require('../../../../ui-base/_');
const JRTabs = require('../index');

/**
 * @class JRTab
 * @extend Component
 * @param {object}        [options.data]                      = 绑定属性
 * @param {object}        [options.data.title='']             => 标题
 * @param {string}        [options.data.key=null]             => key 标识
 */
const JRTab = Component.extend({
  name: 'jr-tab',
  template:
    '<div r-hide={this.$outer.data.selected !== this}>{#inc this.$body}</div>',
  /**
     * @protected
     */
  config() {
    _.extend(this.data, {
      title: '',
    });
    this.supr();

    if (this.$outer && this.$outer instanceof JRTabs) {
      this.$outer.data.tabs.push(this);
    }

    if (!this.$outer.data.selected) this.$outer.data.selected = this;

    this._setDefaultTab();
  },

  _setDefaultTab() {
    const defaultKey = this.$outer.data.defaultKey;
    const key = this.data.key;

    if (!!defaultKey && !!key && `${defaultKey}` === `${key}`) {
      this.$outer.data.selected = this;
    }
  },
});

module.exports = JRTab;
