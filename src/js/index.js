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

exports.Dropdown = require("./components/navigation/dropdown.js");
exports.Menu = require("./components/navigation/menu.js");

exports.UIInput = require("./components/form/ui.input.js");
exports.UITextArea = require("./components/form/ui.textarea.js");
exports.NumberInput = require("./components/form/number.input.js");
exports.Check = require("./components/form/check.js");
exports.CheckGroup = require("./components/form/check.group.js");
exports.RadioGroup = require("./components/form/radio.group.js");
exports.UISelect = require("./components/form/ui.select.js");
exports.SelectGroup = require("./components/form/select.group.js");
exports.TreeSelect = require("./components/form/tree.select.js");
exports.Suggest = require("./components/form/suggest.js");
exports.Uploader = require("./components/form/uploader.js");
exports.UIButton = require("./components/form/ui.button.js");
exports.UIText = require("./components/form/ui.text.js");

exports.DatePicker = require("./components/calendar/date.picker.js");
exports.TimePicker = require("./components/calendar/time.picker.js");

exports.Progress = require("./components/widget/progress.js");
exports.Loading = require("./components/widget/loading.js");
exports.Gotop = require("./components/widget/gotop.js");
exports.Tooltip = require("./components/widget/tooltip.js");

exports.Tabs = require("./components/navigation/tabs.js");
exports.Collapse = require("./components/navigation/collapse.js");
exports.Pager = require("./components/navigation/pager.js");

exports.Notify = require("./components/frame/notify.js");
exports.Modal = require("./components/frame/modal.js");
exports.PopConfirm = require("./components/frame/pop.confirm.js");

exports.ListView = require("./components/data.view/list.view.js");
exports.TreeView = require("./components/data.view/tree.view.js");

exports.Calendar = require("./components/calendar/calendar.js");

exports.UIForm = require("./components/form/ui.form.js");
exports.FormItem = require("./components/form/form.item.js");
