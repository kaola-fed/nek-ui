/**
 * ------------------------------------------------------------
 * JRCol 栅格布局-列
 * ------------------------------------------------------------
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');
const JRRow = require('../JRRow');

/**
 * @class JRCol
 * @extend Component
 * @param {object}          [options.data]                        => 绑定数据
 * @param {string}          [options.data.class]                  => 补充class
 * @param {number}          [options.data.span='']              => 栅格占据的列数
 * @param {number}          [options.data.offset='']            => 栅格左侧的间隔格数
 */
const JRCol = Component.extend({
  name: 'jr-col',
  template,
  config(data) {
    this.defaults({
      span: '',
      offset: '',
      gutter: 0,
    });

    let $outer = this;
    do {
      if ($outer.$outer) {
        $outer = $outer.$outer;
      } else if ($outer.$parent) {
        $outer = $outer.$parent;
      }
    } while (!($outer instanceof JRRow) && ($outer.$outer || $outer.$parent));

    if ($outer && $outer instanceof JRRow) {
      this.data.gutter = $outer.data.gutter;
    }

    this.supr(data);
  },
});

JRCol.directive('gutter', function (ele, value) {
  this.$watch(value, (gutter) => {
    if (gutter) {
      const padding = `${gutter / 2}px`;
      ele.style.paddingLeft = padding;
      ele.style.paddingRight = padding;
    }
  });
});

module.exports = JRCol;
