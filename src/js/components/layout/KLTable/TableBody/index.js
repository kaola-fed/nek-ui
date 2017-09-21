const Component = require('../../../../ui-base/component');
const tpl = require('./index.html');
const templates = require('../TDElements');
const _ = require('../utils');

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
    this.$table = this.$parent;
    this.$tableData = this.$parent.data;
    if (!this.data.fixedCol) {
      this.data.timer = setInterval(() => {
        this._updateItemHeight();
      }, 200);
    }
  },
  _updateItemHeight() {
    if (!this.data.source) {
      return;
    }
    this.data.source.forEach((row, index) => {
      const rowElement = this.$refs[`row${index}`];
      if (rowElement) {
        row._rowHeight = _.getElementHeight(rowElement);
      }
    });
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
    if (this.data.fixedCol) {
      return;
    }
    this.$emit('checkchange', {
      item,
      checked: e.checked,
      event: e,
    });
  },
  _expandTr(item, itemIndex, column) {
    item._expanddingColumn = column;
    item.expand = !item.expand;
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
  _filter(column, val, ...args) {
    if (column.filter && typeof column.filter === 'function') {
      return column.filter.call(this, val, ...args);
    }
    return val;
  },
  emitEvent(type, ...args) {
    this.$emit('customevent', {
      type,
      sender: this,
      args: {
        param: args,
      },
    });
  },
  emit(...args) {
    this.$parent.$emit.call(this.$parent, ...args);
  },
  _onRowHover(e, item) {
    item._hover = true;
  },
  _onRowBlur(e, item) {
    item._hover = false;
  },
  _onRowClick(e, item, itemIndex) {
    this.emit('rowclick', {
      sender: this.$parent,
      item,
      itemIndex,
    });
  },
  _onUnitClick(e, item, itemIndex, column, columnIndex) {
    this.emit('unitclick', {
      sender: this.$parent,
      item,
      itemIndex,
      key: column.key,
      column,
      columnIndex,
    });
  },
  destroy() {
    if (this.data.timer) {
      clearInterval(this.data.timer);
    }
    this.supr();
  },
})
  .filter('placeholder', (val, column, self) => {
    if (val === null || val === undefined) {
      if (column && column.placeholder !== undefined) {
        return column.placeholder;
      }
      return self.data.placeholder;
    }
    return val;
  })
  .filter('expandSign', item => (item.expand ? '-' : '+'));

module.exports = TableBody;
