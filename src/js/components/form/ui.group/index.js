/**
 * ------------------------------------------------------------
 * Input   输入扩展
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var Component = require('../../../ui-base/component');

/**
 * @class UIGroup
 * @extend Component
 * @param {object}          [options.data]                    = 绑定属性
 * @param {string}          [options.data.class]              => 补充class
 */
var UIGroup = Component.extend({
    name: 'ui.group',
    template: '<span class="u-group {class}">{#inc this.$body}</span>',
    /**
     * @protected
     */
    config: function() {
        this.defaults({});

        this.supr();
    }
});

module.exports = UIGroup;
