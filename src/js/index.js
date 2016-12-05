/**
 * ------------------------------------------------------------
 * RGUI      Regular UI库
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

exports.Regular = require('regularjs');
exports.Component = require('./ui-base/component.js');
exports.SourceComponent = require('./ui-base/sourceComponent.js');
exports._ = require('./ui-base/_.js');
exports.ajax = require("./ui-base/ajax.js");
exports.Validation = require("./util/validation.js");

exports.Dropdown = require("./unit/navigation/dropdown.js");
exports.Menu = require("./unit/navigation/menu.js");

exports.UIInput = require("./unit/form/ui.input.js");
exports.UITextArea = require("./unit/form/ui.textarea.js");
exports.NumberInput = require("./unit/form/numberInput.js");
exports.Check = require("./unit/form/check.js");
exports.CheckGroup = require("./unit/form/checkGroup.js");
exports.RadioGroup = require("./unit/form/radioGroup.js");
exports.UISelect = require("./unit/form/ui.select.js");
exports.SelectGroup = require("./unit/form/selectGroup.js");
exports.TreeSelect = require("./unit/form/treeSelect.js");
exports.Suggest = require("./unit/form/suggest.js");
exports.Uploader = require("./unit/form/uploader.js");
exports.UIButton = require("./unit/form/ui.button.js");
exports.UIText = require("./unit/form/ui.text.js");

exports.DatePicker = require("./unit/calendar/datePicker.js");
exports.TimePicker = require("./unit/calendar/timePicker.js");
exports.DateTimePicker = require("./unit/calendar/dateTimePicker.js");

exports.Progress = require("./unit/widget/progress.js");
exports.Loading = require("./unit/widget/loading.js");
exports.Gotop = require("./unit/widget/gotop.js");
exports.Hint = require("./unit/widget/hint.js");

exports.Tabs = require("./module/navigation/tabs.js");
exports.Collapse = require("./module/navigation/collapse.js");
exports.Pager = require("./module/navigation/pager.js");

exports.Notify = require("./module/frame/notify.js");
exports.Modal = require("./module/frame/modal.js");

exports.ListView = require("./module/data.view/listView.js");
exports.UltiListView = require("./module/data.view/ultiListView.js");
exports.TreeView = require("./module/data.view/treeView.js");
exports.MultiTreeView = require("./module/data.view/multiTreeView.js");

exports.Calendar = require("./module/calendar/calendar.js");

exports.HTMLEditor = require("./module/editor/htmlEditor.js");
exports.MarkEditor = require("./module/editor/markEditor.js");

exports.UIForm = require("./module/form/ui.form.js");
exports.UIField = require("./module/form/ui.field.js");