/**
 * @file Select2  选择扩展
 * @author   sensen(rainforest92@126.com)
 */

const Dropdown = require('../common/Dropdown');
const template = require('./index.html');
const _ = require('../../../ui-base/_');
require('../../../util/validation');
const validationMixin = require('../../../util/validationMixin');
const Multiple = require('./plugins/multiple');
const PrivateMethod = require('./plugins/private.method');

/**
 * @class KLSelect
 * @extend Dropdown
 * @param {object}            [options.data]                          = 绑定属性
 * @param {object[]}          [options.data.source=[]]                <=> 数据源
 * @param {string}            [options.data.source[].name]            => 每项的内容
 * @param {boolean}           [options.data.source[].disabled=false]  => 禁用此项
 * @param {string}            [options.data.source[].tip]             => 禁用此项显示的提示，如果没有则不显示
 * @param {string}            [options.data.source[].placement]       => 禁用此项显示提示的方向，默认下方
 * @param {function}          [options.data.filter]                   => 如果传了该参数会对 source 数组的每一项 item 进行 filter(item) 返回 true 则显示，否则不显示
 * @param {boolean}           [options.data.source[].divider=false]   => 设置此项为分隔线
 * @param {object}            [options.data.selected]                 <=> 当前选择项
 * @param {string/number}     [options.data.value]                    <=> 当前选择值
 * @param {string}            [options.data.key=id]                   => 数据项的键
 * @param {string}            [options.data.nameKey=name]             => 数据项的name键
 * @param {string}            [options.data.placeholder=请选择]        => 默认项的文字，如果`placeholder`为空并且没有选择项时，将会自动选中第一项。
 * @param {boolean}           [options.data.hideTip=false]            => 是否显示校验错误信息
 * @param {string}            [options.data.clearable=false]          => 单选时是否有清空按钮
 * @param {boolean}           [options.data.required=false]           => 是否必填
 * @param {boolean}           [options.data.readonly=false]           => 是否只读
 * @param {boolean}           [options.data.disabled=false]           => 是否禁用
 * @param {boolean}           [options.data.visible=true]             => 是否显示
 * @param {string}            [options.data.class]                    => 补充class
 * @param {object}            [options.service]                       @=> 数据服务
 * @param {boolean}           [options.data.canSearch=false]          => 是否可搜索
 * @param {boolean}           [options.data.isCaseSensitive=false]    => 是否区分大小写
 * @param {boolean}           [options.data.noMatchText=无匹配项]       => 搜索无结果文案
 * @param {Number}            [options.data.delaySearch=300]          => 异步搜索的延迟
 * @param {Number}            [options.data.maxShowCount=1000]        => 最大展示条数
 * @param {boolean}           [options.data.multiple=false]           => 是否多选
 * @param {string}            [options.data.separator=,]              => 多选value分隔符
 * @param {boolean}           [options.data.selectedClose=true]       => 多选时选中非全部和请选择项时 是否关闭
 * @param {boolean}           [options.data.canSelectAll=true]       => 是否有全选
 * @param {string}            [options.data.size]                     => 组件大小, sm/md/lg
 * @param {number}            [options.data.width]                    => 组件宽度
 * @param {number}            [options.data.limit]                    => 在选项过多的时候可能会有性能问题，limit 用来限制显示的数量
 */

const KLSelect = Dropdown.extend({
  name: 'kl-select',
  template,
  config() {
    const data = this.data;
    _.extend(data, {
      hideTip: false,
      selected: undefined,
      key: 'id',
      nameKey: 'name',
      value: undefined,

      // 搜索的文案
      searchValue: '',
      canSearch: undefined,
      filter: null,
      // 默认不区分大小写
      isCaseSensitive: true,
      noMatchText: this.$trans('NO_MATCH'),
      delaySearch: 300,
      maxShowCount: 1000,

      separator: ',',
      multiple: false,
      selectedClose: false,
      canSelectAll: true,
      limit: null,

      placeholder: this.$trans('PLEASE_SELECT'),
      required: false,
      clearable: false,
    });
    if (data.multiple && !Array.isArray(data.selected)) {
      data.selected = data.selected ? [data.selected] : [];
    }
    this.supr();

    this.$watch('selected', function (newValue, oldValue) {
      // 因为存在source异步获取的情况 如果source长度为0表示source还未获取
      if (
        oldValue === undefined &&
        !(Array.isArray(data.source) && data.source.length)
      ) {
        return;
      }
      // 多选下，同步数据且初始加载，selected设置默认[]不触发value同步,
      // 否则会丢失value默认值
      if (oldValue === undefined && data.multiple &&
        Array.isArray(newValue) && newValue.length === 0) {
        return;
      }
      data.value = this.getValue();
      if (!newValue && data.multiple) {
        data.selected = [];
      }
      /**
             * @event KLSelect#change 选择项改变时触发
             * @property {object} sender 事件发送对象
             * @property {object} selected 改变后的选择项
             * @property {string} key 数据项的键
             * @property {string/number} value 改变后的选择值
             */
      this.$emit('change', {
        sender: this,
        selected: newValue,
        key: data.key,
        value: data.value,
      });
    });

    this.$watch('value', function (newValue) {
      const source = data.source;
      const key = data.key;
      if (newValue === undefined || newValue === null) {
        data.selected = newValue;
        return;
      }

      if (source) {
        if (data.multiple) {
          const newValueArr = `${newValue}`.split(data.separator);
          data.selected = newValue
            ? source.filter(
                item => newValueArr.indexOf(`${item[key]}`) !== -1,
                this,
              )
            : [];
        } else {
          data.selected = source.find(
            item => `${item[key]}` === `${newValue}`,
            this,
          );
        }

        this.data.tip && this.validate();
      }
    });

    this.$watch('source', function (newValue) {
      if (newValue === undefined) {
        data.selected = undefined;
        return;
      }

      if (!(newValue instanceof Array)) {
        throw new TypeError('`source` is not an Array!');
      }

      const key = data.key;
      const nameKey = data.nameKey;
      const value = data.value;
      let itemHandleFn = function (_value) {
        return _value;
      };
      if (newValue.length) {
        if (
          typeof newValue[0] === 'string' ||
          typeof newValue[0] === 'number'
        ) {
          itemHandleFn = function (_value) {
            const item = {};
            item[key] = _value;
            item[nameKey] = _value;
            return item;
          };
        } else if (!newValue[0].hasOwnProperty(key)) {
          itemHandleFn = function (_value) {
            if (!_value.hasOwnProperty('divider')) {
              _value[key] = _value[nameKey];
            }
            return _value;
          };
        } else if (!newValue[0].hasOwnProperty(nameKey)) {
          itemHandleFn = function (_value) {
            _value[nameKey] = _value[key];
            return _value;
          };
        }
        data.source = newValue.map(_value => itemHandleFn(_value));
      }

      if (data.multiple) {
        if (value !== undefined && value !== null) {
          const valueArr = `${value}`.split(data.separator);
          data.selected = [].concat(
            value
              ? newValue.filter(
                  item => valueArr.indexOf(`${item[key]}`) !== -1,
                  this,
                ) || []
              : [],
          );
        } else if (data.selected) {
          data.selected = data.selected.filter(
            item => newValue.indexOf(item) !== -1,
          );
        }
      } else {
        if (value !== undefined && value !== null) {
          data.selected = newValue.find(item => `${item[key]}` === `${value}`, this);
        } else if (data.selected && newValue.indexOf(data.selected) < 0) {
          data.selected = undefined;
        }

        // 当placeholder为空时，自动选择第一项
        if (!data.placeholder && !data.selected) {
          data.selected = newValue[0];
        }
      }

      /**
             * 1.明确指定isCanSearch为true直接开始搜索项功能
             * 2.当选这项多余20个，没有指定可搜索时 自动开启
             */
      let canSearch;
      if (this.hasOwnProperty('__canSearch')) {
        canSearch = this.__canSearch;
      } else {
        this.__canSearch = data.canSearch;
        canSearch = this.__canSearch;
      }
      data.canSearch =
        canSearch === true ||
        (Array.isArray(newValue) &&
          newValue.length > 20 &&
          canSearch !== false);
    });

    this.$watch('multiple', (newValue, oldValue) => {
      if (oldValue === undefined) {
        return;
      }
      if (newValue) {
        if (!Array.isArray(data.selected)) {
          data.selected = data.selected ? [data.selected] : data.selected;
        }
      } else {
        data.value = '';
      }
    });
    this.$watch('limit', function (newValue, oldValue) {
      if (oldValue === undefined) {
        return;
      }
      try {
        const _newValue = Number(newValue);
        if (isNaN(_newValue)) {
          console.error(this.$trans('LIMIT_ERROR'));
        }
      } catch (e) {
        console.error(this.$trans('LIMIT_ERROR'));
      }
    });
    if (this.service && this.service.getList) {
      const $updateSource = _.throttle(
        this.$updateSource.bind(this),
        data.delaySearch,
      );
      this.$watch('searchValue', (newValue, oldValue) => {
        if (oldValue === undefined) {
          return;
        }
        $updateSource();
      });
    }

    this.initValidation();
  },
  select(item) {
    const data = this.data;
    const multiple = data.multiple;
    if (
      data.readonly ||
      data.disabled ||
      (item && (item.disabled || item.divider))
    ) {
      return;
    }
    if (multiple) {
      const selected = data.selected;
      const indexOf = this.indexOf(selected, item);
      if (indexOf !== -1) {
        selected.splice(indexOf, 1);
      } else if (item) {
        selected.push(item);
      } else {
        selected.length = 0;
      }
    } else {
      data.selected = item;
    }

    /**
         * @event KLSelect#select 选择某一项时触发
         * @property {object} sender 事件发送对象
         * @property {object} selected 当前选择项
         */
    this.$emit('select', {
      sender: this,
      selected: item,
    });
    if (multiple) {
      this.searchInputFocus();
      if (!data.selectedClose && item) {
        // 选择之后不清空已输入的内容
        // data.canSearch && this.clearSearchValue();
        return;
      }
    }
    this.toggle(false);
  },
  clearContent(e) {
    e && e.stopPropagation();
    this.data.searchValue = '';
  },
  selectNone(e) {
    e && e.stopPropagation();
    this.select(undefined);
    this.data.open = false;
  },
  toggle(open) {
    const data = this.data;
    data.canSearch && this.clearSearchValue();
    this.supr(open);
  },
  validate(on) {
    const data = this.data;

    // 如果是readonly或者disabled状态, 无需验证
    if (data.readonly || data.disabled) {
      return {
        success: true,
      };
    }

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
})
  .use(Multiple)
  .use(PrivateMethod)
  .use(validationMixin);

module.exports = KLSelect;
