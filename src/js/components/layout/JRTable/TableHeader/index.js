const Component = require('../../../../ui-base/component');
const tpl = require('./index.html');

const HEADER_MIN_WIDTH = 30;
const SHOULD_ENABLE_RESIZE_THRESHOLD = 12;

const hasChildren = function (column) {
  return column.children && column.children.length > 0;
};

const setColumnWidth = function (column, width) {
  const children = column.children;
  if (hasChildren(column)) {
    setColumnWidth(children[children.length - 1], width);
    return;
  }
  column.width = Math.max(width, HEADER_MIN_WIDTH);
  column._width = column.width;
};

const getColumnWidth = function (column) {
  const ret = {
    width: 0,
    lastLeafWidth: 0,
  };
  if (hasChildren(column)) {
    column.children.forEach((item, index) => {
      const tmp = getColumnWidth(item);
      if (index === column.children.length - 1) {
        ret.lastLeafWidth = tmp.width;
      }
      ret.width += tmp.width;
    });
  } else {
    return {
      width: column._width,
      lastLeafWidth: column._width,
    };
  }
  return ret;
};

const getLeftLeavesWidth = function (column) {
  const info = getColumnWidth(column);
  return info.width - info.lastLeafWidth;
};

const _parseFormat = function (str) {
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

const TableHeader = Component.extend({
  template: tpl,
  config(data) {
    this.defaults({
      type: '',
      show: true,
      columns: [],
      sorting: {},
      config: {},
    });
    this.supr(data);
    this.$table = this.$parent;
    this.$tableData = this.$parent.data;
    this.data.$table = this.$table;
    this.data.$tableData = this.$tableData;
  },
  _onHeaderClick(header, headerIndex) {
    if (!header.sortable) {
      return;
    }
    this._onSort(header, headerIndex);
  },
  _onSort(header, headerIndex) {
    if (header._isDragging) {
      return;
    }
    const sorting = this.data.sorting;

    if (sorting.key === header.key) {
      sorting.isAsc = !sorting.isAsc;
    } else {
      sorting.isAsc = header.isDefaultAsc || false;
    }

    sorting.columnIndex = headerIndex;
    sorting.key = header.key;

    this.$emit('sort', {
      sender: this,
      sorting,
      column: header,
      columnIndex: headerIndex,
      key: header.key,
      asc: sorting.isAsc,
    });
  },
  _onMouseDown(e, header, headerIndex, headerTrIndex) {
    const data = this.data;
    if (!data._ok2ResizeCol) {
      return;
    }
    header._isDragging = true;
    this._startResizing(e, header, headerIndex, headerTrIndex);
  },
  _startResizing(e, header, headerIndex, headerTrIndex) {
    const self = this;
    const tableLeft = self.$parent.$refs.table.getBoundingClientRect().left;
    const mouseLeft = e.pageX;
    const headerEle = self.$refs[`table_th_${headerTrIndex}_${headerIndex}`];
    const headerLeft = headerEle.getBoundingClientRect().left;

    header._resizeParam = {
      tableLeft,
      mouseLeft,
      headerLeft,
    };

    const resizeProxy = self.$parent.$refs.resizeProxy;
    resizeProxy.style.visibility = 'visible';

    const onMouseMove = function (_e) {
      _e.preventDefault();

      const proxyLeft = _e.pageX - tableLeft;
      const headerWidth = _e.pageX - headerLeft;

      if (headerWidth > HEADER_MIN_WIDTH) {
        resizeProxy.style.left = `${proxyLeft}px`;
      }
    };

    const onMouseUp = function (_e) {
      _e.preventDefault();
      resizeProxy.style.visibility = 'hidden';

      const headerWidth = _e.pageX - headerLeft;
      const leftLeavesWidth = getLeftLeavesWidth(header);
      setColumnWidth(
        header,
        headerWidth - leftLeavesWidth,
      );

      self.$emit('columnresize', {
        sender: self,
      });

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      header._isDragging = false;
      self._disableResize();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  },
  _onMouseOut(e, header) {
    if (!header._isDragging) {
      this._disableResize();
    }
  },
  _onMouseMove(e, header) {
    if (!header._isDragging && this._shouldEnableResize(e)) {
      this._enableResize();
    } else {
      this._disableResize();
    }
  },
  _shouldEnableResize(e) {
    let target = e.target;
    while (target && target.tagName !== 'TH') {
      target = target.parentNode;
    }
    const rect = target.getBoundingClientRect();
    return (
      rect.width > 12 &&
      rect.right - e.event.pageX < SHOULD_ENABLE_RESIZE_THRESHOLD
    );
  },
  _enableResize() {
    document.body.style.cursor = 'col-resize';
    this.data._ok2ResizeCol = true;
  },
  _disableResize() {
    document.body.style.cursor = '';
    this.data._ok2ResizeCol = false;
  },
  _getFormatter(header, headers) {
    return header.headerFormatter.call(this, header, headers) || '';
  },
  _getFormat(header) {
    return _parseFormat(header.headerFormat);
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
}).filter('sortingClass', function (header) {
  const data = this.data;
  const sorting = data.sorting;
  if (sorting) {
    if (sorting.key === header.key) {
      return sorting.isAsc ? 'u-icon-sort-asc' : 'u-icon-sort-desc';
    }
    return '';
  }
});

module.exports = TableHeader;
