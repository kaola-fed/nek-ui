/**
 * ------------------------------------------------------------
 * RGUI      Regular UI库
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

// Base
exports.Regular = require('regularjs');
exports.Component = require('./ui-base/component');
exports.SourceComponent = require('./ui-base/sourceComponent');
exports._ = require('./ui-base/_');
exports.ajax = require('./ui-base/ajax');
exports.Validation = require('./util/validation');

// Form
exports.Check = require('./components/form/check');
exports.CheckGroup = require('./components/form/check.group');
exports.DatePicker = require('./components/calendar/date.picker');
exports.FormItem = require('./components/form/form.item');
exports.NumberInput = require('./components/form/number.input');
exports.RadioGroup = require('./components/form/radio.group');
exports.SelectGroup = require('./components/form/select.group');
exports.Suggest = require('./components/form/suggest');
exports.TimePicker = require('./components/form/time.picker');
exports.TreeSelect = require('./components/form/tree.select');
exports.UIButton = require('./components/form/ui.button');
exports.UIForm = require('./components/form/ui.form');
exports.UIInput = require('./components/form/ui.input');
exports.UISelect = require('./components/form/ui.select');
exports.UIText = require('./components/form/ui.text');
exports.UITextArea = require('./components/form/ui.textarea');
exports.Uploader = require('./components/form/uploader');

// Navigation
exports.Collapse = require('./components/navigation/collapse');
exports.Dropdown = require('./components/navigation/dropdown');
exports.Menu = require('./components/navigation/menu');
exports.Pager = require('./components/navigation/pager');
exports.Tabs = require('./components/navigation/tabs');

// Notice
exports.Modal = require('./components/notice/modal');
exports.Notify = require('./components/notice/notify');
exports.PopConfirm = require('./components/notice/pop.confirm');

// Widget
exports.Gotop = require('./components/widget/gotop');
exports.Loading = require('./components/widget/loading');
exports.Progress = require('./components/widget/progress');
exports.Tooltip = require('./components/widget/tooltip');

// Layout
exports.Panel = require('./components/layout/panel');
exports.PanelTool = require('./components/layout/panel.tool');
