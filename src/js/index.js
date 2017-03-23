'use strict';

// Base
var Regular = require('regularjs');
var Component = require('./ui-base/component');
var SourceComponent = require('./ui-base/sourceComponent');
var _ = require('./ui-base/_');
var ajax = require('./ui-base/ajax');
var Validation = require('./util/validation');

// Form
var Check = require('./components/form/check');
var CheckGroup = require('./components/form/check.group');
var DatePicker = require('./components/form/date.picker');
var FormItem = require('./components/form/form.item');
var NumberInput = require('./components/form/number.input');
var RadioGroup = require('./components/form/radio.group');
var SelectGroup = require('./components/form/select.group');
var Suggest = require('./components/form/suggest');
var TimePicker = require('./components/form/time.picker');
var TreeSelect = require('./components/form/tree.select');
var UIButton = require('./components/form/ui.button');
var UIForm = require('./components/form/ui.form');
var UIInput = require('./components/form/ui.input');
var UISelect = require('./components/form/ui.select');
var UIText = require('./components/form/ui.text');
var UITextArea = require('./components/form/ui.textarea');
var Uploader = require('./components/form/uploader');
var UIGroup = require('./components/form/ui.group');

// Navigation
var Collapse = require('./components/navigation/collapse');
var Dropdown = require('./components/navigation/dropdown');
var Menu = require('./components/navigation/menu');
var Pager = require('./components/navigation/pager');
var Tabs = require('./components/navigation/tabs');
var Steps = require('./components/navigation/steps');

// Notice
var Modal = require('./components/notice/modal');
var Notify = require('./components/notice/notify');
var PopConfirm = require('./components/notice/pop.confirm');

// Widget
var Gotop = require('./components/widget/gotop');
var Loading = require('./components/widget/loading');
var Progress = require('./components/widget/progress');
var Tooltip = require('./components/widget/tooltip');

// Layout
var Panel = require('./components/layout/panel');
var PanelTool = require('./components/layout/panel.tool');

//i18n
var LocaleProvider = require('./components/i18n/locale.provider');

// Tools
var PathTool = require('./tools/path.tool');

var components = {
  'check': Check,
  'chekc.group': CheckGroup,
  'date.picker': DatePicker,
  'form.item': FormItem,
  'number.input': NumberInput,
  'radio.group': RadioGroup,
  'select.group': SelectGroup,
  'suggest': Suggest,
  'time.picker': TimePicker,
  'tree.select': TreeSelect,
  'ui.button': UIButton,
  'ui.form': UIForm,
  'ui.input': UIInput,
  'ui.select': UISelect,
  'ui.text': UIText,
  'ui.textarea': UITextArea,
  'uploader': Uploader,
  'ui.group': UIGroup,
  'collapse': Collapse,
  'dropdown': Dropdown,
  'menu': Menu,
  'pager': Pager,
  'tabs': Tabs,
  'steps': Steps,
  'modal': Modal,
  'notify': Notify,
  'pop.confirm': PopConfirm,
  'gotop': Gotop,
  'loading': Loading,
  'progress': Progress,
  'tooltip': Tooltip,
  'panel': Panel,
  'panel.tool': PanelTool,
  'locale.provider': LocaleProvider
};

var install = function(Regular) {
  for (var component in components) {
    Regular.component(component, components[component]);
  }
}

'use strict';

module.exports = {
// Base
  Regular,
  Component,
  SourceComponent,
  _,
  ajax,
  Validation,

// Form
  Check,
  CheckGroup,
  DatePicker,
  FormItem,
  NumberInput,
  RadioGroup,
  SelectGroup,
  Suggest,
  TimePicker,
  TreeSelect,
  UIButton,
  UIForm,
  UIInput,
  UISelect,
  UIText,
  UITextArea,
  Uploader,
  UIGroup,

// Navigation
  Collapse,
  Dropdown,
  Menu,
  Pager,
  Tabs,
  Steps,

// Notice
  Modal,
  Notify,
  PopConfirm,

// Widget
  Gotop,
  Loading,
  Progress,
  Tooltip,
  PathTool,

// Layout
  Panel,
  PanelTool,

//i18n
  LocaleProvider,

// install
  install
};
