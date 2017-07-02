const _ = require('../utils');

const Component = require('../../../../ui-base/component');
const tpl = require('./index.html');
const templates = require('../TDElements');

const _parseFormat = function (str) {
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

const TableBody = Component.extend({
  template: tpl,
  config(data) {
    this.defaults({
      type: '',
      enableHover: true,
      show: true,
      columns: [],
      config: {},
    });
    this.supr(data);
  },
  _onExpand(item, itemIndex, column) {
    if (!this.data.fixedCol) {
      this._expandTr(item, itemIndex, column);
    }

    this.$emit('expand', {
      sender: this,
      expand: item.expand,
      column,
      item,
      index: itemIndex,
    });
  },
  _onItemCheckChange(item, e) {
    this.$emit('checkchange', {
      item,
      checked: e.checked,
      event: e,
    });
  },
  _expandTr(item, itemIndex, column) {
    item._expanddingColumn = column;
    item.expand = !item.expand;

    this._updateSubTrHeight(item, itemIndex);
  },
  _updateSubTrHeight(item, itemIndex) {
    const self = this;
    var timer = setInterval(() => {
      const tdElement = self.$refs[`td${itemIndex}`];
      if (tdElement && item._expandHeight !== tdElement.clientHeight) {
        item._expandHeight = tdElement.clientHeight;
        self.$update();
      }
      if (!item.expand) {
        clearInterval(timer);
      }
    }, 100);
  },
  _onSubEvent(type, table, e) {
    this.$emit('subevent', {
      sender: table,
      type,
      event: e,
    });
  },
  _getTypeTemplate(column) {
    return templates.get(column.type);
  },
  _getFormatter(column, item) {
    const formatter = column.formatter;
    return formatter.call(this, column, item) || '';
  },
  _getFormat(column) {
    const format = column.format;
    return _parseFormat(format);
  },
  _filter(column, val) {
    const args = [].slice.call(arguments, 1);
    if (column.filter && typeof column.filter === 'function') {
      return column.filter.apply(this, args);
    }
    return val;
  },
  emitEvent(type) {
    const args = [].slice.call(arguments, 1);
    this.$emit('customevent', {
      type,
      sender: this,
      args: {
        param: args,
      },
    });
  },
  emit() {
    const args = [].slice.call(arguments, 0);
    this.$parent.$emit.apply(this.$parent, args);
  },
  _onTrHover($event, item) {
    item._hover = true;
  },
  _onTrBlur($event, item) {
    item._hover = false;
  },
})
  .filter('placeholder', (val) => {
    if (val === null || val === undefined) {
      return '-';
    }
    return val;
  })
  .filter('expandSign', item => (item.expand ? '-' : '+'));

module.exports = TableBody;
