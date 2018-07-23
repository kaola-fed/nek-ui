/**
 * ------------------------------------------------------------
 * KLCol 栅格布局-列
 * ------------------------------------------------------------
 */

const Component = require('../../../../ui-base/component');
const template = require('./index.html');
const KLRow = require('../index.js');

/**
 * @class KLCol
 * @extend Component
 * @param {object}          [options.data]                        => 绑定数据
 * @param {string}          [options.data.class]                  => 补充class
 * @param {number}          [options.data.span='']              => 栅格占据的列数
 * @param {number}          [options.data.offset='']            => 栅格左侧的间隔格数
 * @param {number/object}   [options.data.xs='']                => <768px 响应式栅格数或者栅格属性对象, number/object (例如： {span: 4, offset: 4})
 * @param {number/object}   [options.data.sm='']                => ≥768px 响应式栅格数或者栅格属性对象, number/object (例如： {span: 4, offset: 4})
 * @param {number/object}   [options.data.md='']                => ≥992 响应式栅格数或者栅格属性对象, number/object (例如： {span: 4, offset: 4})
 * @param {number/object}   [options.data.lg='']                => ≥1200 响应式栅格数或者栅格属性对象, number/object (例如： {span: 4, offset: 4})
 */
const KLCol = Component.extend({
  name: 'kl-col',
  template,
  config(data) {
    this.defaults({
      span: '',
      offset: '',
      gutter: 24,
      xs: '',
      sm: '',
      md: '',
      lg: '',
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

KLCol.directive('mediaSize', function (ele) {
  const self = this;
  ['xs', 'sm', 'md', 'lg'].forEach((size) => {
    if (parseInt(self.data[size])) {
      ele.classList.add(`kl-col-${size}-${self.data[size]}`);
    } else if (typeof self.data[size] === 'object') {
      const props = self.data[size];
      Object.keys(props).forEach((prop) => {
        ele.classList.add(
          prop !== 'span'
            ? `kl-col-${size}-${prop}-${props[prop]}`
            : `kl-col-${size}-${props[prop]}`,
        );
      });
    }
  });
});

module.exports = KLCol;
