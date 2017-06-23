/**
 * ------------------------------------------------------------
 * TreeSelect 树型选择
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Dropdown = require('../../navigation/dropdown');
var Validation = require('../../../util/validation');
var validationMixin = require('../../../util/validationMixin');
var template = require('./index.html');
var _ = require('../../../ui-base/_');
var Treeview = require('../common/tree.view');

/**
 * @class TreeSelect
 * @extend Select
 * @param {object}          [options.data]                          = 绑定属性
 * @param {object[]}        [options.data.source=[]]                <=> 数据源
 * @param {string}          [options.data.source[].name]            => 每项的内容
 * @param {boolean}         [options.data.source[].disabled=false]  => 禁用此项
 * @param {boolean}         [options.data.source[].divider=false]   => 设置此项为分隔线
 * @param {string}          [options.data.key=id]                   => 数据项的键
 * @param {string}          [options.data.nameKey=name]             => 数据项的name键
 * @param {string}          [options.data.childKey=children]        => 数据子项的键
 * @param {string}          [options.data.value=null]               <=> 当前选择值
 * @param {object}          [options.data.selected=null]            <=> 当前选择项
 * @param {string}          [options.data.separator=,]              => 多选时value分隔符
 * @param {string}          [options.data.placeholder=请选择]      => 默认项的文字
 * @param {boolean}         [options.data.hierarchical=false]       @=> 是否分级动态加载，需要service
 * @param {boolean}         [options.data.readonly=false]           => 是否只读
 * @param {boolean}         [options.data.multiple=false]           => 是否多选
 * @param {boolean}         [options.data.disabled=false]           => 是否禁用
 * @param {boolean}         [options.data.visible=true]             => 是否显示
 * @param {string}          [options.data.class]                 => 补充class
 * @param {object}          [options.service]                       @=> 数据服务
 */

// TODO: value 数据回显
var TreeSelect = Dropdown.extend({
    name: 'tree.select',
    template: template,
    config: function(data) {
        _.extend(this.data, {
            // @inherited source: [],
            // @inherited open: false,
            multiple: false,
            value: null,
            selected: null,
            separator: ',',
            placeholder: this.$trans('PLEASE_SELECT'),
            key: 'id',
            nameKey: 'name',
            childKey: 'children',
            hierarchical: false,
            updateAuto: false
        });
        this.supr();

        this.initValidation();
    },
    computed: {
        phShow: function(data) {
            if (!data.selected) return data.placeholder;
            if (Array.isArray(data.selected)) return data.selected.map(function(d) {
                return d[data.nameKey];
            }).join(data.separator);
            return data.selected[data.nameKey];
        }
    }
});

TreeSelect.use(validationMixin);
module.exports = TreeSelect;