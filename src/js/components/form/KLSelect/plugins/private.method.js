/**
 * ------------------------------------------------------------
 * kl-select  内部私有方法
 * ------------------------------------------------------------
 */

const util = require('../common/util');

module.exports = function PrivateMethod(Component) {
  Component.implement({
    /**
     * 过滤可选的数据项
     * @param source
     * @returns {*}
     */
    filterData(source) {
      return source.filter(
        item =>
          (!item.hasOwnProperty('divider') &&
            !item.hasOwnProperty('disabled')) ||
          (item.hasOwnProperty('divider') && !item.divider) ||
          (item.hasOwnProperty('disabled') && !item.disabled),
      );
    },
    /**
     * 本地搜索时的过滤方法
     * @param source
     * @returns {*}
     */
    filterArray(source) {
      const data = this.data;
      if (this.service && this.service.getList) {
        return source;
      }
      if (!Array.isArray(source)) {
        return;
      }

      if (!data.canSearch) {
        return source;
      }
      const nameKey = data.nameKey;
      let searchValue = (data.searchValue || '').trim();
      const maxShowCount = data.maxShowCount;
      const isCaseSensitive = data.isCaseSensitive;
      searchValue = isCaseSensitive ? searchValue : searchValue.toLowerCase();
      let targetSource = source.filter((item, index) => {
        const text = `${item[nameKey]}`;
        const value = isCaseSensitive ? text : text.toLowerCase();
        return (
          (searchValue && value.indexOf(searchValue) >= 0) ||
          (!searchValue && index < maxShowCount)
        );
      });
      if (searchValue) {
        targetSource = targetSource.sort((pre, next) => pre[data.nameKey].length - next[data.nameKey].length);
      }
      if (data.limit) return targetSource.slice(0, data.limit);
      return targetSource;
    },
    /**
     * 获取 Map 在 List<Map> 中的索引，因为是数据，所以转化为字符串比较
     * @param source{List<Object>}
     * @param target{Object}
     * @returns {number}
     */
    indexOf(source, target) {
      let index = -1;
      if (Array.isArray(source)) {
        source.forEach((item, itemIndex) => {
          if (JSON.stringify(item) === JSON.stringify(target)) {
            index = itemIndex;
          }
        });
      }
      return index;
    },
    /**
     * 用于获取选中项对应的索引，多个时以separator配置连接
     * @returns {*|string|string}
     */
    getValue() {
      const data = this.data;
      const key = data.key;
      const separator = data.separator;
      return util.getSelectedTextByKey(
        data,
        selected => selected[key || data.nameKey],
        '',
        separator,
        key,
      );
    },
    /**
     * 获取搜索值
     * @returns {{searchValue: (*|string)}}
     */
    params() {
      return {
        searchValue: this.data.searchValue,
      };
    },
    /**
     * 键盘事件
     */
    keyup(event) {
      const data = this.data;
      if (data.open && [13, 27, 38, 40].indexOf(event.keyCode) > -1) {
        event.preventDefault();
        event.stopPropagation();
        switch (event.keyCode) {
          case 38:
            this.up();
            break;
          case 40:
            this.down();
            break;
          case 13:
            this.enter();
            break;
          case 27:
            data.open = false;
            this.$update();
            break;
          default:
        }
      }
    },
    /**
     * 键盘 arrow up 事件
     */
    up() {
      const data = this.data;
      const all = data.canSelectAll && data.multiple && (data.canSearch && !data.searchValue);
      if (data.key_index > 0) {
        data.key_index -= 1;
      } else if (data.key_index === 0) {
        data.key_index = all ? 'all' : -1;
      } else if (data.key_index === 'all') {
        data.key_index = -1;
      }
      let seeLength = Math.floor((this.$refs.listview.scrollTop + 4) / 38) - 1;
      if (data.placeholder) {
        seeLength -= 1;
      }
      if (all) {
        seeLength -= 1;
      }
      if (seeLength + 1 > data.key_index) {
        this.$refs.listview.scrollTop -= 38;
      }
      this.$update();
    },
    /**
     * 键盘 arrow down 事件
     */
    down() {
      const data = this.data;
      const length = this.filterArray(data.source).length;
      const all = data.canSelectAll && data.multiple && (data.canSearch && !data.searchValue);
      if (data.key_index >= 0 && data.key_index < length - 1) {
        data.key_index += 1;
      } else if (data.key_index === -1) {
        data.key_index = all ? 'all' : 0;
      } else if (data.key_index === 'all') {
        data.key_index = 0;
      }
      let seeLength = Math.floor((this.$refs.listview.scrollTop + 4) / 38);
      if (data.placeholder) {
        seeLength -= 1;
      }
      if (all) {
        seeLength -= 1;
      }
      if (seeLength + 4 < data.key_index) {
        this.$refs.listview.scrollTop += 38;
      }
      this.$update();
    },
    /**
     * 键盘 enter 事件
     */
    enter() {
      const data = this.data;
      const list = this.filterArray(data.source);
      if (data.key_index >= 0) {
        this.select(list[data.key_index]);
      } else if (data.key_index === -1) {
        this.select(undefined);
      } else {
        this.selectAll(data.selected.length !== this.filterData(data.source).length);
      }
      this.$update();
    },
  });
};
