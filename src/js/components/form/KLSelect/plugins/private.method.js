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
      searchValue = isCaseSensitive ? searchValue.toLowerCase() : searchValue;
      let targetSource = source.filter((item, index) => {
        const text = `${item[nameKey]}`;
        const value = isCaseSensitive ? text.toLowerCase() : text;
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
  });
};
