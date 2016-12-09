/**
 * ------------------------------------------------------------
 * TreeViewList  树型视图列表
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var SourceComponent = require('../../ui-base/sourceComponent.js');
var template = require('./tree.view.html');
var _ = require('../../ui-base/_.js');

/**
 * @class TreeView
 * @extend SourceComponent
 * @param {object}                  options.data                     =  绑定属性
 * @param {object[]=[]}             options.data.source             <=> 数据源
 * @param {string}                  options.data.source[].name       => 每项的内容
 * @param {boolean=false}           options.data.source[].open       => 此项为展开/收起状态
 * @param {boolean=false}           options.data.source[].disabled   => 禁用此项
 * @param {boolean=false}           options.data.source[].divider    => 设置此项为分隔线
 * @param {object=null}             options.data.selected           <=> 当前选择项。多选时无效。
 * @param {string=null}             options.data.itemTemplate       @=> 单项模板
 * @param {boolean=false}           options.data.hierarchical       @=> 是否分级动态加载，需要service
 * @param {boolean=false}           options.data.readonly            => 是否只读
 * @param {boolean=false}           options.data.disabled            => 是否禁用
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string=''}               options.data.class               => 补充class
 * @param {object}                  options.service                 @=> 数据服务
 */
var TreeView = SourceComponent.extend({
    name: 'tree.view',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            itemTemplate: null,
            visible: false,
            selected: null,
            multiple: false,
            hierarchical: false
        });
        this.supr();

        this.$parent = this.$parent;
        this.service = this.$parent.service;
        this.data.itemTemplate = this.$parent.data.itemTemplate;
        this.data.hierarchical = this.$parent.data.hierarchical;

        this.$watch('visible', function(newValue) {
            if(!this.data.hierarchical)
                return;

            if(!newValue || this.$parent.name !== 'treeViewList')
                return;

            this.$updateSource(function() {
                this.data.hierarchical = false;
            });
        });
    },
    /**
     * @override
     */
    getParams: function() {
        if(this.data.parent)
            return _.extend({parentId: this.data.parent.id}, this.$ancestor.getParams());
    },
    /**
     * @method $updateSource() 从service中更新数据源
     * @public
     * @deprecated
     * @return {SourceComponent} this
     */
    $updateSource: function() {
        this.service.getList(this.getParams(), function(result) {
            // 给每个节点item添加parent
            result.forEach(function(item) {
                item.parent = this.data.parent;
            }.bind(this));

            this.$update('source', result);

            this.$emit('updateSource', {
                sender: this,
                result: result
            });
        }.bind(this));
        return this;
    },
    /**
     * @note 移交$ancestor处理
     */
    select: function() {
        this.$ancestor.select.apply(this.$ancestor, arguments);
    },
    /**
     * @note 移给$ancestor处理
     */
    toggle: function() {
        this.$ancestor.toggle.apply(this.$ancestor, arguments);
    },
    /**
     * @private
     */
    _onItemCheckedChange: function($event, item) {
        item.checked = $event.checked;

        if($event.checked !== null && item.children) {
            item.children.forEach(function(child) {
                child.checked = $event.checked;
            });
        }

        var parent = this.data.parent;
        if(parent && parent.checked !== item.checked) {    // 剪枝
            var checkedCount = 0;
            parent.children.forEach(function(child) {
                if(child.checked)
                    checkedCount++;
                else if(child.checked === null)
                    checkedCount += 0.5;
            });

            if(checkedCount === 0)
                parent.checked = false;
            else if(checkedCount === parent.children.length)
                parent.checked = true;
            else
                parent.checked = null;
        }

        /**
         * @event check 改变选中状态时触发
         * @property {object} sender 事件发送对象
         * @property {object} item 处理项
         * @property {boolean} checked 选中状态
         */
        this.$ancestor.$emit('check', {
            sender: this,
            item: item,
            checked: item.checked
        });
    }
});

module.exports = TreeView;