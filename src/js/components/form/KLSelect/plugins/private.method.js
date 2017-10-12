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
      const targetSource = source.filter((item, index) => {
        const text = `${item[nameKey]}`;
        const value = isCaseSensitive ? text.toLowerCase() : text;
        return (
          (searchValue && value.indexOf(searchValue) >= 0) ||
          (!searchValue && index < maxShowCount)
        );
      }).sort((pre, next) => this.Levenshtein_Distance_Percent(pre[data.nameKey], searchValue) - this.Levenshtein_Distance_Percent(next[data.nameKey], searchValue));
      if (data.limit) return targetSource.slice(0, data.limit);
      return targetSource;
    },
    Levenshtein_Distance(s, t) {
      const n = s.length;// length of s
      const m = t.length;// length of t
      const d = [];// matrix
      let i;// iterates through s
      let j;// iterates through t
      let si;// ith character of s
      let tj;// jth character of t
      let cost;// cost
    // Step 1
      if (n === 0) return m;
      if (m === 0) return n;
    // Step 2
      for (i = 0; i <= n; i += 1) {
        d[i] = [];
        d[i][0] = i;
      }
      for (j = 0; j <= m; j += 1) {
        d[0][j] = j;
      }
    // Step 3
      for (i = 1; i <= n; i += 1) {
        si = s.charAt(i - 1);
      // Step 4
        for (j = 1; j <= m; j += 1) {
          tj = t.charAt(j - 1);
    // Step 5
          if (si === tj) {
            cost = 0;
          } else {
            cost = 1;
          }
    // Step 6
          d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
        }
      }
    // Step 7
      return d[n][m];
    },

    Levenshtein_Distance_Percent(s, t) {
      const l = s.length > t.length ? s.length : t.length;
      const d = this.Levenshtein_Distance(s, t);
      return (1 - (d / l)).toFixed(4);
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
