/**
 * ------------------------------------------------------------
 * Dropdown  下拉菜单
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

const SourceComponent = require('../../../../ui-base/sourceComponent');
const template = require('./index.html');
const _ = require('../../../../ui-base/_');

/**
 * @class Dropdown
 * @extend SourceComponent
 * @param {object}            [options.data]                          = 绑定属性
 * @param {string}            [options.data.title]                    => 按钮文字
 * @param {object[]}          [options.data.source=[]]                <=> 数据源
 * @param {string}            [options.data.source[].name]            => 每项的内容
 * @param {boolean}           [options.data.source[].disabled=false]  => 禁用此项
 * @param {boolean}           [options.data.source[].divider=false]   => 设置此项为分隔线
 * @param {string}            [options.data.itemTemplate=null]        @=> 单项模板
 * @param {boolean}           [options.data.open=false]               <=> 当前为展开/收起状态
 * @param {boolean}           [options.data.disabled=false]           => 是否禁用
 * @param {boolean}           [options.data.visible=true]             => 是否显示
 * @param {string}            [options.data.class]                    => 补充class
 * @param {object}            [options.service]                       @=> 数据服务
 */
const Dropdown = SourceComponent.extend({
    name: 'dropdown',
    template,
    /**
     * @protected
     */
    config() {
        _.extend(this.data, {
            // @inherited source: [],
            itemTemplate: null,
            open: false,
        });
        this.supr();
    },
    /**
     * @method toggle(open) 展开/收起
     * @public
     * @param  {boolean} open 展开/收起状态。如果无此参数，则在两种状态之间切换。
     * @return {void}
     */
    toggle(_open) {
        if (this.data.disabled) return;

        let open = _open;
        if (open === undefined) open = !this.data.open;
        this.data.open = open;

        // 根据状态在Dropdown.opens列表中添加/删除管理项
        const index = Dropdown.opens.indexOf(this);
        if (open && index < 0) Dropdown.opens.push(this);
        else if (!open && index >= 0) Dropdown.opens.splice(index, 1);

        /**
         * @event toggle  展开/收起时触发
         * @property {object} sender 事件发送对象
         * @property {object} open 展开/收起状态
         */
        this.$emit('toggle', {
            sender: this,
            open,
        });
    },
    /**
     * @method select(item) 选择某一项
     * @public
     * @param  {object} item 选择项
     * @return {void}
     */
    select(item) {
        if (this.data.disabled || item.disabled || item.divider) return;

        /**
         * @event select 选择某一项时触发
         * @property {object} sender 事件发送对象
         * @property {object} selected 当前选择项
         */
        this.$emit('select', {
            sender: this,
            selected: item,
        });

        this.toggle(false);
    },
    destroy() {
        const index = Dropdown.opens.indexOf(this);
        index >= 0 && Dropdown.opens.splice(index, 1);
        this.supr();
    },
});

// 处理点击dropdown之外的地方后的收起事件。
Dropdown.opens = [];

_.dom.on(document, 'click', (e) => {
    const opens = Dropdown.opens.map(d => d);
    opens.forEach((dropdown) => {
        // 这个地方不能用stopPropagation来处理，因为展开一个dropdown的同时要收起其他dropdown
        const element = dropdown.$refs.element;
        let element2 = e.target;
        while (element2) {
            if (element === element2) return;
            element2 = element2.parentElement;
        }
        dropdown.toggle(false);
        dropdown.$update();
    });
});

module.exports = Dropdown;
