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
  KLCheck: require('./components/form/KLCheck'),
  KLCheckGroup: require('./components/form/KLCheckGroup'),
  KLDatePicker: require('./components/form/KLDatePicker'),
  KLRadioGroup: require('./components/form/KLRadioGroup'),
  KLMultiSelect: require('./components/form/KLMultiSelect'),
  KLButton: require('./components/form/KLButton'),
  KLForm: require('./components/form/KLForm'),
  KLFormItem: require('./components/form/KLForm/KLFormItem'),
  KLInput: require('./components/form/KLInput'),
  KLSelect: require('./components/form/KLSelect'),
  KLText: require('./components/form/KLText'),
  KLTextArea: require('./components/form/KLTextArea'),
  KLUpload: require('./components/form/KLUpload'),
  KLTreeView: require('./components/form/KLTreeView'),
  KLSwitch: require('./components/form/KLSwitch'),

  // Navigation
  KLSidebar: require('./components/navigation/KLSidebar'),
  KLMenu: require('./components/navigation/KLMenu'),
  KLMenuItem: require('./components/navigation/KLMenu/KLMenuItem'),
  KLSubMenu: require('./components/navigation/KLMenu/KLSubMenu'),
  KLPager: require('./components/navigation/KLPager'),
  KLTabs: require('./components/navigation/KLTabs'),
  KLTab: require('./components/navigation/KLTabs/KLTab'),
  KLSteps: require('./components/navigation/KLSteps'),
  KLCrumb: require('./components/navigation/KLCrumb'),
  KLCrumbItem: require('./components/navigation/KLCrumb/KLCrumbItem'),

  // Notice
  KLModal: require('./components/notice/KLModal'),
  KLNotify: require('./components/notice/KLNotify'),
  KLPopConfirm: require('./components/notice/KLPopConfirm'),
  KLMessage: require('./components/notice/KLMessage'),

  // Widget
  KLBadge: require('./components/widget/KLBadge'),
  KLProgress: require('./components/widget/KLProgress'),
  KLLoading: require('./components/widget/KLLoading'),
  KLTooltip: require('./components/widget/KLTooltip'),
  KLIcon: require('./components/widget/KLIcon'),
  KLImagePreview: require('./components/widget/KLImagePreview'),
  KLLocaleProvider: require('./components/widget/KLLocaleProvider'),
  KLDraggable: require('./components/widget/KLDraggable'),

  // Layout
  KLTable: require('./components/layout/KLTable'),
  KLTableCol: require('./components/layout/KLTable/KLTableCol'),
  KLTableTemplate: require('./components/layout/KLTable/KLTableTemplate'),
  KLRow: require('./components/layout/KLRow'),
  KLCol: require('./components/layout/KLRow/KLCol'),
  KLCard: require('./components/layout/KLCard'),
  KLCardTools: require('./components/layout/KLCard/KLCardTools'),
  KLSearch: require('./components/layout/KLSearch'),
  KLSearchMore: require('./components/layout/KLSearch/KLSearchMore'),
  KLLayout: require('./components/layout/KLLayout'),
  KLHeader: require('./components/layout/KLHeader'),
  KLFooter: require('./components/layout/KLFooter'),
  KLMain: require('./components/layout/KLMain'),
};

backward(Components);

module.exports = Object.assign(
  {
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
