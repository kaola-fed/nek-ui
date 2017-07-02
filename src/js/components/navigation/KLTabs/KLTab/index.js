/**
 * ------------------------------------------------------------
 * KLTab       子选项卡
 * ------------------------------------------------------------
 */

const Component = require('../../../../ui-base/component');
const _ = require('../../../../ui-base/_');
const KLTabs = require('../index');

/**
 * @class KLTab
 * @extend Component
 * @param {object}        [options.data]                      = 绑定属性
 * @param {object}        [options.data.title='']             => 标题
 * @param {string}        [options.data.key=null]             => key 标识
 */
const KLTab = Component.extend({
  name: 'kl-tab',
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

    if (this.$outer && this.$outer instanceof KLTabs) {
      this.$outer.data.tabs.push(this);
    }

    if (!this.$outer.data.selected) this.$outer.data.selected = this;

    this._setDefaultTab();
  },

  _setDefaultTab() {
    let defaultKey = this.$outer.data.defaultKey,
      key = this.data.key;

    if (!!defaultKey && !!key && `${defaultKey}` === `${key}`) {
      this.$outer.data.selected = this;
    }
  },
});

module.exports = KLTab;
