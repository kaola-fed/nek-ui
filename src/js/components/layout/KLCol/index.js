/**
 * ------------------------------------------------------------
 * KLCol 栅格布局-列
 * ------------------------------------------------------------
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');
const KLRow = require('../KLRow');

/**
 * @class KLCol
 * @extend Component
 * @param {object}          [options.data]                        => 绑定数据
 * @param {string}          [options.data.class]                  => 补充class
 * @param {number}          [options.data.span='']              => 栅格占据的列数
 * @param {number}          [options.data.offset='']            => 栅格左侧的间隔格数
 */
const KLCol = Component.extend({
  name: 'kl-col',
  template,
  config(data) {
    this.defaults({
      span: '',
      offset: '',
      gutter: 40,
    });

    let $outer = this;
    do {
      if ($outer.$outer) {
        $outer = $outer.$outer;
      } else if ($outer.$parent) {
        $outer = $outer.$parent;
      }
    } while (!($outer instanceof KLRow) && ($outer.$outer || $outer.$parent));

    if ($outer && $outer instanceof KLRow) {
      this.data.gutter = $outer.data.gutter;
    }

    this.supr(data);
  },
});

KLCol.directive('gutter', function (ele, value) {
  this.$watch(value, (gutter) => {
    if (gutter) {
      const padding = `${gutter / 2}px`;
      ele.style.paddingLeft = padding;
      ele.style.paddingRight = padding;
    }
  });
});

module.exports = KLCol;
