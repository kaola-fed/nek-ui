
const Base = {
    Regular : require('regularjs'),
    Component : require('./ui-base/component'),
    SourceComponent : require('./ui-base/sourceComponent'),
    _ : require('./ui-base/_'),
    ajax : require('./ui-base/ajax'),
    Validation : require('./util/validation'),
};

const Components = {
    // Form
    Check : require('./components/form/check'),
    CheckGroup : require('./components/form/check.group'),
    DatePicker : require('./components/form/date.picker'),
    FormItem : require('./components/form/form.item'),
    NumberInput : require('./components/form/number.input'),
    RadioGroup : require('./components/form/radio.group'),
    SelectGroup : require('./components/form/select.group'),
    Suggest : require('./components/form/suggest'),
    TimePicker : require('./components/form/time.picker'),
    TreeSelect : require('./components/form/tree.select'),
    UIButton : require('./components/form/ui.button'),
    UIForm : require('./components/form/ui.form'),
    UIInput : require('./components/form/ui.input'),
    UISelect : require('./components/form/ui.select'),
    UIText : require('./components/form/ui.text'),
    UITextArea : require('./components/form/ui.textarea'),
    Uploader : require('./components/form/uploader'),
    UIGroup : require('./components/form/ui.group'),

    // Navigation
    Collapse : require('./components/navigation/collapse'),
    Dropdown : require('./components/navigation/dropdown'),
    Menu : require('./components/navigation/menu'),
    Pager : require('./components/navigation/pager'),
    Tabs : require('./components/navigation/tabs'),
    Steps : require('./components/navigation/steps'),

    // Notice
    Modal : require('./components/notice/modal'),
    Mask : require('./components/notice/mask'),
    Notify : require('./components/notice/notify'),
    PopConfirm : require('./components/notice/pop.confirm'),

    // Widget
    Gotop : require('./components/widget/gotop'),
    Loading : require('./components/widget/loading'),
    Progress : require('./components/widget/progress'),
    Tooltip : require('./components/widget/tooltip'),
    PathTool : require('./tools/path.tool'),

    // Layout
    Panel : require('./components/layout/panel'),
    PanelTool : require('./components/layout/panel.tool'),

    //i18n
    LocaleProvider : require('./components/i18n/locale.provider'),
};

module.exports = Object.assign({
    // Register
    install: function(Regular) {
        for (let [k, m] of Object.entries(Components)) {
            let name = m.prototype && m.prototype.name;
            if (name) Regular.component(name, m);
        }
    },
}, Base, Components);
