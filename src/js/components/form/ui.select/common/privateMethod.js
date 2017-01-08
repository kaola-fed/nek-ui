/**
 * ------------------------------------------------------------
 * ui.select  内部私有方法
 * ------------------------------------------------------------
 */

'use strict';
var selectUtil = require('./selectUtil');

var privateMethod = {
    /**
     * 过滤可选的数据项
     * @param source
     * @returns {*}
     */
    filterData: function (source) {
        return source.filter(function (item) {
            return (!item.hasOwnProperty('divider') && !item.hasOwnProperty('disabled'))
                || (item.hasOwnProperty('divider') && !item.divider)
                || (item.hasOwnProperty('disabled') && !item.disabled);
        });
    },
    /**
     * 本地搜索时的过滤方法
     * @param source
     * @returns {*}
     */
    filterArray: function (source) {
        var data = this.data;
        if (this.service && this.service.getList) {
            return source;
        }
        if (!Array.isArray(source)) {
            return;
        }

        if (!data.canSearch) {
            return source;
        }
        var nameKey = data.nameKey;
        var searchValue = (data.searchValue || '').trim();
        var maxShowCount = data.maxShowCount;
        var isCaseSensitive = data.isCaseSensitive;
        searchValue = isCaseSensitive ? searchValue.toLowerCase() : searchValue;
        return source.filter(function (item, index) {
            var text = item[nameKey] + '';
            var value = isCaseSensitive ? text.toLowerCase() : text;
            return (searchValue && value.indexOf(searchValue) >= 0) || (!searchValue && index < maxShowCount)
        });
    },
    /**
     * 获取 Map 在 List<Map> 中的索引，因为是数据，所以转化为字符串比较
     * @param source{List<Object>}
     * @param target{Object}
     * @returns {number}
     */
    indexOf: function (source, target) {
        var index = -1;
        if(Array.isArray(source)){
            source.forEach(function (item, itemIndex) {
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
    getValue: function () {
        var data = this.data;
        var key = data.key;
        var separator = data.separator;
        return selectUtil.getSelectedTextByKey(
            data,
            function(selected){
                return selected[key || data.nameKey]
            },
            '',
            separator,
            key
        );
    },
    /**
     * 用于获取选中项对应的文案，多个时以showSeparator配置连接
     * @returns {*|string|string}
     */
    getShowText: function () {
        var data = this.data;
        var nameKey = data.nameKey;
        var showSeparator = data.showSeparator;
        var showName = data.placeholder;
        return selectUtil.getSelectedTextByKey(
            data,
            function(selected){
                return selected[nameKey]
            },
            showName,
            showSeparator,
            nameKey
        ) || showName;
    },
    /**
     * 获取搜索值
     * @returns {{searchValue: (*|string)}}
     */
    params: function () {
        return {
            searchValue: this.data.searchValue
        }
    }
};

module.exports = privateMethod;