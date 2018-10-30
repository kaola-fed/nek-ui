const Component = require('../../../../ui-base/component');
const _ = require('../../../../ui-base/_');
const template = require('./index.html');
const KLDrop = require('../index');
const KLDropHeader = require('../KLDropHeader/index');

const KLDropItem = Component.extend({
  name: 'kl-drop-item',
  template,
  config() {
    _.extend(this.data, {});
    this.supr();
  },
  onClick() {
    if (this.$outer && this.$outer instanceof KLDropHeader) {
      return;
    }

    // 找到kl-drop，设置他是否隐藏下拉；
    let $outer = this;
    do {
      if ($outer.$outer) {
        $outer = $outer.$outer;
      } else if ($outer.$parent) {
        $outer = $outer.$parent;
      }
    } while (
      !($outer instanceof KLDrop) && ($outer.$outer || $outer.$parent)
    );
    $outer.$emit('on-item-click', this.id);

    $outer.data.isShow = false;
    // if (this.$outer && this.$outer.$outer && this.$outer.$outer instanceof KLDrop) {
    //   $outer = this.$outer.$tools;
    // }
    // console.log(this.$outer.$outer);
  },
});

module.exports = KLDropItem;
