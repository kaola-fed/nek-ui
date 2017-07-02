const backward = require('./backward');

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
    KLCheck : require('./components/form/KLCheck'),
    KLCheckGroup : require('./components/form/KLCheckGroup'),
    KLDatePicker : require('./components/form/KLDatePicker'),
    KLRadioGroup : require('./components/form/KLRadioGroup'),
    KLMultiSelect : require('./components/form/KLMultiSelect'),
    KLButton : require('./components/form/KLButton'),
    KLForm : require('./components/form/KLForm'),
    KLInput : require('./components/form/KLInput'),
    KLSelect : require('./components/form/KLSelect'),
    KLText : require('./components/form/KLText'),
    KLTextArea : require('./components/form/KLTextArea'),
    KLUpload : require('./components/form/KLUpload'),

    // Navigation
    KLSidebar : require('./components/navigation/KLSidebar'),
    KLMenu : require('./components/navigation/KLMenu'),
    KLPager : require('./components/navigation/KLPager'),
    KLTabs : require('./components/navigation/KLTabs'),
    KLSteps : require('./components/navigation/KLSteps'),
    KLCrumb : require('./components/navigation/KLCrumb'),

    // Notice
    KLModal : require('./components/notice/KLModal'),
    KLMask : require('./components/notice/KLMask'),
    KLNotify : require('./components/notice/KLNotify'),
    KLPopConfirm : require('./components/notice/KLPopConfirm'),

    // Widget
    KLProgress : require('./components/widget/KLProgress'),
    KLLoading : require('./components/widget/KLLoading'),
    KLTooltip : require('./components/widget/KLTooltip'),
    KLIcon : require('./components/widget/KLIcon'),
    KLLocaleProvider : require('./components/widget/KLLocaleProvider'),

    // Layout
    KLTable : require('./components/layout/KLTable'),
    KLRow: require('./components/layout/KLRow'),
    KLCol: require('./components/layout/KLCol'),
    KLCard : require('./components/layout/KLCard'),
};

backward(Components);

module.exports = Object.assign({
    // Register
    install: function(Regular) {
        for (let [k, m] of Object.entries(Components)) {
            let name = m.prototype && m.prototype.name;
            if (name) Regular.component(name, m);
        }
    },
}, Base, Components);
