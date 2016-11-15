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

exports.UI  = {
    Dropdown: require("./unit/dropdown.js"),
    Menu: require("./unit/menu.js"),
    Input: require("./unit/input.js"),
    TextArea: require("./unit/textarea.js"),
    NumberInput: require("./unit/numberInput.js"),
    Check: require("./unit/check.js"),
    CheckGroup: require("./unit/checkGroup.js"),
    RadioGroup: require("./unit/radioGroup.js"),
    Select: require("./unit/select.js"),
    SelectGroup: require("./unit/selectGroup.js"),
    TreeSelect: require("./unit/treeSelect.js"),
    Suggest: require("./unit/suggest.js"),
    Uploader: require("./unit/uploader.js"),
    DatePicker: require("./unit/datePicker.js"),
    TimePicker: require("./unit/timePicker.js"),
    DateTimePicker: require("./unit/dateTimePicker.js"),
    Progress: require("./unit/progress.js"),
    Loading: require("./unit/loading.js"),
    Gotop: require("./unit/gotop.js"),
    Tabs: require("./module/tabs.js"),
    Collapse: require("./module/collapse.js"),
    Pager: require("./module/pager.js"),
    Notify: require("./module/notify.js"),
    Modal: require("./module/modal.js"),
    ListView: require("./module/listView.js"),
    UltiListView: require("./module/ultiListView.js"),
    TreeView: require("./module/treeView.js"),
    MultiTreeView: require("./module/multiTreeView.js"),
    Calendar: require("./module/calendar.js"),
    HTMLEditor: require("./module/htmlEditor.js"),
    MarkEditor: require("./module/markEditor.js"),
    Form: require("./ui-nek/form/index.js"),
    Field: require("./ui-nek/field/index.js")
};