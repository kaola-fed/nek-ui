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
    this.$table = this.$parent;
    this.$tableData = this.$parent.data;
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
    if (column.expandable) {
      this._updateSubTrHeight(item, itemIndex);
    }
  },
  _updateSubTrHeight(item, itemIndex) {
    const self = this;
    const timer = setInterval(() => {
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
  _onTrHover(e, item) {
    item._hover = true;
  },
  _onTrBlur(e, item) {
    item._hover = false;
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
