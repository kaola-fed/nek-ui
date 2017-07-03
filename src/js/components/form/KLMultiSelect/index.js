/**
 * ------------------------------------------------------------
 * KLMultiSelect 树型选择
 * @author   lilang
 * ------------------------------------------------------------
 */

const Dropdown = require('../common/Dropdown');
require('../../../util/validation');
const validationMixin = require('../../../util/validationMixin');
const template = require('./index.html');
const _ = require('../../../ui-base/_');

/**
 * @class KLMultiSelect
 * @extend Dropdown
 * @param {object}          [options.data]                          = 绑定属性
 * @param {object[]}        [options.data.source=[]]                <=> 数据源
 * @param {string}          [options.data.source[].name]            => 每项的内容
 * @param {string}          [options.data.key=id]                   => 数据项的键
 * @param {string}          [options.data.nameKey=name]             => 数据项的name键
 * @param {string}          [options.data.childKey=children]        => 数据子项的键
 * @param {string}          [options.data.value=null]               <=> 当前选择值
 * @param {object}          [options.data.selected=null]            <=> 当前选择项
 * @param {string}          [options.data.separator=,]              => 多选时value分隔符
 * @param {boolean}         [options.data.readonly=false]           => 是否只读
 * @param {boolean}         [options.data.multiple=false]           => 是否多选
 * @param {boolean}         [options.data.disabled=false]           => 是否禁用
 * @param {boolean}         [options.data.visible=true]             => 是否显示
 * @param {string}          [options.data.class]                 => 补充class
 */

const KLMultiSelect = Dropdown.extend({
  name: 'kl-multi-select',
  template,
  config(data) {
    _.extend(this.data, {
      // @inherited source: [],
      // @inherited open: false,
      multiple: false,
      value: null,
      selected: [],
      separator: ',',
      placeholder: this.$trans('PLEASE_SELECT'),
      key: 'id',
      nameKey: 'name',
      childKey: 'children',
      checkKey: 'checked',
      hierarchical: false,
      updateAuto: false,
    });
    data._source = _.clone(data.source || []);
    data.tree = [data._source, [], [], [], [], [], [], [], [], []];
    data.search = ['', '', '', '', '', '', '', '', '', ''];
    data.empty = [];
    this.$watch('source', function (newValue) {
      if (!(newValue instanceof Array)) {
        throw new TypeError('`source` is not an Array!');
      }
      data._source = _.clone(data.source || []);
      data.tree[0] = data._source;
      this.initSelected();
      this.$update();
    });
    this.$watch('value', function (newValue, oldValue) {
      this.initSelected();
      if (oldValue !== null && oldValue !== undefined) {
        /**
                 * @event value 改变时触发
                 * @property {object} sender 事件发送对象
                 * @property {object} value 当前 value 的值
                 */
        this.$emit('change', {
          sender: this,
          value: newValue,
          key: data.key,
        });
        if (data.source && data.source.length) {
          this.validate();
        }
      }
      this.$update();
    });
    this.supr();

    this.initValidation();
  },
  initSelected() {
    const data = this.data;
    if (data.value !== null && data.value !== undefined) {
      const _list = data.value.toString().split(data.separator);
      const _checkedItem = function (list) {
        list.map((item2) => {
          if (item2[data.childKey] && item2[data.childKey].length) {
            _checkedItem(item2[data.childKey]);
          } else if (
            _list.indexOf((item2[data.key].toString() || '').toString()) > -1 ||
            _list.indexOf(item2[data.key].toString()) > -1
          ) {
            item2[data.checkKey] = true;
          } else {
            item2[data.checkKey] = false;
          }
          return '';
        });
      };
      const _checkedSelf = function (list) {
        list.map((item) => {
          if (item[data.childKey] && item[data.childKey].length) {
            _checkedSelf(item[data.childKey]);
            if (item[data.childKey].every(item2 => item2[data.checkKey])) {
              item[data.checkKey] = true;
            } else if (
              item[data.childKey].some(
                item2 =>
                  item2[data.checkKey] === true || item2[data.checkKey] === null,
              )
            ) {
              item[data.checkKey] = null;
            } else {
              item[data.checkKey] = false;
            }
            return '';
          }
        });
      };
      _checkedItem(data._source);
      _checkedSelf(data._source);
      this.watchValue();
    } else {
      data.value = '';
    }
  },
  viewCate(cate, level) {
    const data = this.data;
    data.tree[level + 1] = cate[data.childKey] || [];
    // 将本级和下一级的active都置为false
    for (let i = level; i < level + 2; i += 1) {
      data.tree[i].forEach((item) => {
        item.active = false;
      });
    }
    // 当前项active设为true
    cate.active = true;

    // 将下一级后面的都置空
    for (let i = level + 2; i < data.tree.length; i += 1) {
      data.tree[i] = {};
    }

    if (
      !data.multiple &&
      !(cate[data.childKey] && cate[data.childKey].length)
    ) {
      data.value = cate[data.key].toString();
      data.selected = [cate];
      data.open = false;
      /**
             * @event select 选择某一项时触发
             * @property {object} sender 事件发送对象
             * @property {object} selected 当前选择项
             */
      this.$emit('select', {
        sender: this,
        selected: cate,
      });
    }
  },
  checkCate(cate, level, checked) {
    const _checked = !checked;
    const data = this.data;
    cate[data.checkKey] = _checked;
    this.setCheck(cate[data.childKey], _checked);

    for (let i = level - 1; i >= 0; i -= 1) {
      data.tree[i].forEach((item) => {
        if (item.active) {
          let checkedCount = 0;
          item[data.childKey].forEach((child) => {
            if (child.checked) checkedCount += 1;
            else if (child.checked === null) checkedCount += 0.5;
          });

          if (checkedCount === 0) item.checked = false;
          else if (checkedCount === item[data.childKey].length) {
            item.checked = true;
          } else item.checked = null;
        }
      });
    }
    this.$emit('select', {
      sender: this,
      selected: cate,
    });
    this.watchValue();
  },
  // 循环列表获取 value 值
  watchValue() {
    const data = this.data;
    data.selected = [];
    const _value = [];
    const _getChecked = function (list) {
      list.map((item) => {
        if (item[data.childKey] && item[data.childKey].length) {
          _getChecked(item[data.childKey]);
        } else if (item[data.checkKey]) {
          _value.push(item[data.key].toString());
          data.selected.push(item);
        }
        return '';
      });
    };
    _getChecked(data._source);
    if (_value.length) {
      data.value = _value.join([data.separator]);
    } else {
      data.value = '';
    }
  },
  // 循环设置类目及其子类目的check状态
  setCheck(category, value) {
    const data = this.data;
    const self = this;
    if (!category) return;
    category.forEach((item) => {
      item[data.checkKey] = value;
      if (item[data.childKey]) self.setCheck(item[data.childKey], value);
    });
  },
  // 删除某一项
  delete(event, item) {
    event && event.stopPropagation();
    this.toggle(true);
    const data = this.data;
    const _list = data.value.toString().split(data.separator);
    _list.splice(
      _list.indexOf((item[data.key].toString() || '').toString()),
      1,
    );
    data.value = _list.join(data.separator);
    this.initSelected();
    this.watchValue();
  },
  validate(on) {
    const data = this.data;

    const result = { success: true, message: '' };
    let value = this.data.value;

    value = typeof value === 'undefined' ? '' : `${value}`;
    if (data.required && !value.length) {
      result.success = false;
      result.message = data.message || this.$trans('PLEASE_SELECT');
      data.state = 'error';
    } else {
      result.success = true;
      result.message = '';
      data.state = '';
    }
    data.tip = result.message;

    this.$emit('validate', {
      sender: this,
      on,
      result,
    });

    return result;
  },
}).filter('search', function (category, search, level) {
  const data = this.data;
  let target = [];
  if (category && category.filter) {
    target = category.filter((item) => {
      if (!item[data.nameKey]) return true;
      return (
        item[data.nameKey].toUpperCase().indexOf(search.toUpperCase()) !== -1
      );
    });
  }
  if (target.length) {
    data.empty[level] = false;
    return target;
  }
  data.empty[level] = true;
  return [];
});

KLMultiSelect.use(validationMixin);
module.exports = KLMultiSelect;
