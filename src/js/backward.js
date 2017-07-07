/**
 * 向下兼容
 */

const NumberInput = require('./components/form/JRDatePicker/NumberInput');
const TimePicker = require('./components/form/JRDatePicker/TimePicker');
const Dropdown = require('./components/form/common/Dropdown');

const aliasList = [
    { oldObj: 'Check', newObj: 'JRCheck', oldName: 'check' },
    { oldObj: 'CheckGroup', newObj: 'JRCheckGroup', oldName: 'check.group' },
    { oldObj: 'DatePicker', newObj: 'JRDatePicker', oldName: 'date.picker' },
    { oldObj: 'RadioGroup', newObj: 'JRRadioGroup', oldName: 'radio.group' },
    { oldObj: 'MultiSelect', newObj: 'JRMultiSelect', oldName: 'multi.select' },
    { oldObj: 'UIButton', newObj: 'JRButton', oldName: 'ui.button' },
    { oldObj: 'UIForm', newObj: 'JRForm', oldName: 'ui.form' },
    { oldObj: 'FormItem', newObj: 'JRFormItem', oldName: 'form.item' },
    { oldObj: 'UIInput', newObj: 'JRInput', oldName: 'ui.input' },
    { oldObj: 'UISelect', newObj: 'JRSelect', oldName: 'ui.select' },
    { oldObj: 'UIText', newObj: 'JRText', oldName: 'ui.text' },
    { oldObj: 'UITextArea', newObj: 'JRTextArea', oldName: 'ui.textarea' },
    { oldObj: 'Sidebar', newObj: 'JRSidebar', oldName: 'ui.sidebar' },
    { oldObj: 'Menu', newObj: 'JRMenu', oldName: 'ui.menu' },
    { oldObj: 'MenuItem', newObj: 'JRMenuItem', oldName: 'menu.item' },
    { oldObj: 'SubMenu', newObj: 'JRSubMenu', oldName: 'sub.menu' },
    { oldObj: 'Pager', newObj: 'JRPager', oldName: 'pager' },
    { oldObj: 'Tabs', newObj: 'JRTabs', oldName: 'tabs' },
    { oldObj: 'Tab', newObj: 'JRTab', oldName: 'tab' },
    { oldObj: 'Steps', newObj: 'JRSteps', oldName: 'steps' },
    {
        oldObj: 'Modal',
        newObj: 'JRModal',
        oldName: 'modal',
        staticMethods: ['alert', 'confirm'],
    },
    { oldObj: 'Mask', newObj: 'JRMask', oldName: 'mask' },
    {
        oldObj: 'Notify',
        newObj: 'JRNotify',
        oldName: 'notify',
        staticMethods: [
            'notify',
            'show',
            'close',
            'closeAll',
            'success',
            'warning',
            'info',
            'error',
        ],
    },
    { oldObj: 'PopConfirm', newObj: 'JRPopConfirm', oldName: 'pop.confirm' },
    {
        oldObj: 'Loading',
        newObj: 'JRLoading',
        oldName: 'loading',
        staticMethods: ['loading', 'show', 'hide'],
    },
    { oldObj: 'Progress', newObj: 'JRProgress', oldName: 'progress' },
    { oldObj: 'Tooltip', newObj: 'JRTooltip', oldName: 'tooltip' },
    {
        oldObj: 'LocaleProvider',
        newObj: 'JRLocaleProvider',
        oldName: 'locale.provider',
        staticMethods: [
            'translate',
        ],
    },
    { oldObj: 'UITable', newObj: 'JRTable', oldName: 'ui.table' },
    { oldObj: 'TableCol', newObj: 'JRTableCol', oldName: 'table.col' },
    {
        oldObj: 'TableTemplate',
        newObj: 'JRTableTemplate',
        oldName: 'table.template',
    },
    { oldObj: 'Row', newObj: 'JRRow', oldName: 'ui.row' },
    { oldObj: 'Col', newObj: 'JRCol', oldName: 'ui.col' },
    { oldObj: 'Card', newObj: 'JRCard', oldName: 'ui.card' },
    { oldObj: 'CardTools', newObj: 'JRCardTools', oldName: 'card.tools' },
];

module.exports = function (Components) {
    // 别名组件
    aliasList.forEach((alias) => {
        Components[alias.oldObj] = Components[alias.newObj].extend({
            name: alias.oldName,
        });
        // 静态方法
        (alias.staticMethods || []).forEach((_static) => {
            Components[alias.oldObj][_static] = Components[alias.newObj][_static];
        });
    });

    Object.assign(Components, {
        // 内部组件
        NumberInput: NumberInput.extend({ name: 'number.input' }),
        TimePicker: TimePicker.extend({ name: 'time.picker' }),
        Dropdown: Dropdown.extend({ name: 'dropdown' }),

        // 废弃组件
        SelectGroup: require('./components/_deprecated_/select.group'),
        Suggest: require('./components/_deprecated_/suggest'),
        TreeSelect: require('./components/_deprecated_/tree.select'),
        Uploader: require('./components/_deprecated_/uploader'),
        UIGroup: require('./components/_deprecated_/ui.group'),
        Collapse: require('./components/_deprecated_/collapse'),
        Gotop: require('./components/_deprecated_/gotop'),
        PathTool: require('./tools/path.tool'),
        Panel: require('./components/_deprecated_/panel'),
        PanelTool: require('./components/_deprecated_/panel.tool'),
    });
};
