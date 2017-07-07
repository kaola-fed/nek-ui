const backward = require('./backward');

const Base = {
    Regular: require('regularjs'),
    Component: require('./ui-base/component'),
    SourceComponent: require('./ui-base/sourceComponent'),
    _: require('./ui-base/_'),
    ajax: require('./ui-base/ajax'),
    Validation: require('./util/validation'),
};

const Components = {
    // Form
    JRCheck: require('./components/form/JRCheck'),
    JRCheckGroup: require('./components/form/JRCheckGroup'),
    JRDatePicker: require('./components/form/JRDatePicker'),
    JRRadioGroup: require('./components/form/JRRadioGroup'),
    JRMultiSelect: require('./components/form/JRMultiSelect'),
    JRButton: require('./components/form/JRButton'),
    JRForm: require('./components/form/JRForm'),
    JRFormItem: require('./components/form/JRForm/JRFormItem'),
    JRInput: require('./components/form/JRInput'),
    JRSelect: require('./components/form/JRSelect'),
    JRText: require('./components/form/JRText'),
    JRTextArea: require('./components/form/JRTextArea'),
    JRUpload: require('./components/form/JRUpload'),

    // Navigation
    JRSidebar: require('./components/navigation/JRSidebar'),
    JRMenu: require('./components/navigation/JRMenu'),
    JRMenuItem: require('./components/navigation/JRMenu/JRMenuItem'),
    JRSubMenu: require('./components/navigation/JRMenu/JRSubMenu'),
    JRPager: require('./components/navigation/JRPager'),
    JRTabs: require('./components/navigation/JRTabs'),
    JRTab: require('./components/navigation/JRTabs/JRTab'),
    JRSteps: require('./components/navigation/JRSteps'),
    JRCrumb: require('./components/navigation/JRCrumb'),
    JRCrumbItem: require('./components/navigation/JRCrumb/JRCrumbItem'),

    // Notice
    JRModal: require('./components/notice/JRModal'),
    JRMask: require('./components/notice/JRMask'),
    JRNotify: require('./components/notice/JRNotify'),
    JRPopConfirm: require('./components/notice/JRPopConfirm'),

    // Widget
    JRProgress: require('./components/widget/JRProgress'),
    JRLoading: require('./components/widget/JRLoading'),
    JRTooltip: require('./components/widget/JRTooltip'),
    JRIcon: require('./components/widget/JRIcon'),
    JRLocaleProvider: require('./components/widget/JRLocaleProvider'),

    // Layout
    JRTable: require('./components/layout/JRTable'),
    JRTableCol: require('./components/layout/JRTable/JRTableCol'),
    JRTableTemplate: require('./components/layout/JRTable/JRTableTemplate'),
    JRRow: require('./components/layout/JRRow'),
    JRCol: require('./components/layout/JRCol'),
    JRCard: require('./components/layout/JRCard'),
    JRCardTools: require('./components/layout/JRCard/JRCardTools'),
};

backward(Components);

module.exports = Object.assign({
        // Register
        install(Regular) {
            for (const m of Object.values(Components)) {
                const name = m.prototype && m.prototype.name;
                if (name) Regular.component(name, m);
            }
        },
    },
    Base,
    Components,
);
