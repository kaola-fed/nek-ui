/**
 * 向下兼容
 */

const NumberInput = require('./components/form/KLDatePicker/NumberInput');
const TimePicker = require('./components/form/KLDatePicker/TimePicker');
const Dropdown = require('./components/form/common/Dropdown');

const KLFormItem = require('./components/form/KLForm/KLFormItem');
const KLCardTools = require('./components/layout/KLCard/KLCardTools');

const aliasList = [
    { oldObj: 'Check', newObj: 'KLCheck', oldName: 'check' },
    { oldObj: 'CheckGroup', newObj: 'KLCheckGroup', oldName: 'check.group' },
    { oldObj: 'DatePicker', newObj: 'KLDatePicker', oldName: 'date.picker' },
    { oldObj: 'RadioGroup', newObj: 'KLRadioGroup', oldName: 'radio.group' },
    { oldObj: 'MultiSelect', newObj: 'KLMultiSelect', oldName: 'multi.select' },
    { oldObj: 'UIButton', newObj: 'KLButton', oldName: 'ui.button' },
    { oldObj: 'UIForm', newObj: 'KLForm', oldName: 'ui.form', children: [
        { newName: 'kl-form-item', oldName: 'form.item' },
    ] },
    { oldObj: 'UIInput', newObj: 'KLInput', oldName: 'ui.input' },
    { oldObj: 'UISelect', newObj: 'KLSelect', oldName: 'ui.select' },
    { oldObj: 'UIText', newObj: 'KLText', oldName: 'ui.text' },
    { oldObj: 'UITextArea', newObj: 'KLTextArea', oldName: 'ui.textarea' },
    { oldObj: 'Sidebar', newObj: 'KLSidebar', oldName: 'ui.sidebar' },
    { oldObj: 'Menu', newObj: 'KLMenu', oldName: 'ui.menu' },
    { oldObj: 'Pager', newObj: 'KLPager', oldName: 'pager' },
    { oldObj: 'Tabs', newObj: 'KLTabs', oldName: 'tabs' },
    { oldObj: 'Steps', newObj: 'KLSteps', oldName: 'steps' },
    { oldObj: 'Modal', newObj: 'KLModal', oldName: 'modal' },
    { oldObj: 'Mask', newObj: 'KLMask', oldName: 'mask' },
    { oldObj: 'Notify', newObj: 'KLNotify', oldName: 'notify' },
    { oldObj: 'PopConfirm', newObj: 'KLPopConfirm', oldName: 'pop.confirm' },
    { oldObj: 'Loading', newObj: 'KLLoading', oldName: 'loading' },
    { oldObj: 'Progress', newObj: 'KLProgress', oldName: 'progress' },
    { oldObj: 'Tooltip', newObj: 'KLTooltip', oldName: 'tooltip' },
    { oldObj: 'LocaleProvider', newObj: 'KLLocaleProvider', oldName: 'locale.provider' },
    { oldObj: 'UITable', newObj: 'KLTable', oldName: 'ui.table' },
    { oldObj: 'Row', newObj: 'KLRow', oldName: 'ui.row' },
    { oldObj: 'Col', newObj: 'KLCol', oldName: 'ui.col' },
    { oldObj: 'Card', newObj: 'KLCard', oldName: 'ui.card' },
];

module.exports = function(Components) {
    // 别名
    aliasList.forEach(function(alias) {
        // 注册组件旧别名
        Components[alias.oldObj] = Components[alias.newObj].extend({ name: alias.oldName });

        注册子组件旧别名
        (alias.children || []).forEach(function(sub) {
            const subComponent = Components[alias.newObj]._components[sub.newName];
            Components[alias.oldObj].component(sub.oldName, subComponent);
        });
    });

    Object.assign(Components, {
        // 内部组件
        NumberInput: NumberInput.extend({ name: 'number.input' }),
        TimePicker: TimePicker.extend({ name: 'time.picker' }),
        Dropdown: Dropdown.extend({ name: 'dropdown' }),

        // 废弃组件
        SelectGroup: require('./components/_deprecated_/tree.select'),
        Suggest: require('./components/_deprecated_/tree.select'),
        TreeSelect: require('./components/_deprecated_/tree.select'),
        Uploader: require('./components/_deprecated_/uploader'),
        UIGroup: require('./components/_deprecated_/ui.group'),
        Collapse: require('./components/_deprecated_/collapse'),
        Gotop : require('./components/_deprecated_/gotop'),
        PathTool : require('./tools/path.tool'),
        Panel : require('./components/_deprecated_/panel'),
        PanelTool : require('./components/_deprecated_/panel.tool'),
    });
};