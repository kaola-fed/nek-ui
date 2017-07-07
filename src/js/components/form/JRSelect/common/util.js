/**
 * ------------------------------------------------------------
 * jr-select  util
 * ------------------------------------------------------------
 */

const selectUtil = {
  /**
     * 设置对应的key为value
     * @param target   目标对象
     * @param key      需要设置的key
     * @param value    设置的值
     */
  clearDataToNUll(target, key, value) {
    target[key] = value || '';
  },
  /**
     * 根据是否多选获取selected中key对应的字段并返回
     * @param data          组件data
     * @param valueFn       非多选时获取selected中key对应值的函数
     * @param nullValue     未获取到key对应值时的默认值
     * @param separator     多选时拼接key对应的字段的分隔符
     * @param key           获取值的key
     * @returns {string}    最终返回值
     */
  getSelectedTextByKey(data, valueFn, nullValue, separator, key) {
    const selected = data.selected;
    let value = '';
    if (selected) {
      if (data.multiple) {
        value = selected.length
          ? selected.reduce((prev, next, index) => {
            let nextValue = next[key];
            if (index !== selected.length - 1) {
              nextValue += separator;
            }
            return prev + nextValue;
          }, '')
          : nullValue;
      } else {
        value = valueFn(selected);
      }
    }
    return value;
  },
};

module.exports = selectUtil;
