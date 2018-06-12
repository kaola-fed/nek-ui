/**
 * @file KLMultiSelect 多级选择
 * @author   lilang
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
 * @param {boolean}         [options.data.onlyChild=true]           => 在单选模式下，是否只允许选中末级
 * @param {string}          [options.data.value=null]               <=> 当前选择值
 * @param {string}          [options.data.rootValue=null]           <=> 模式2种的选择值(具体见文档 demo)
 * @param {string}          [options.data.showRoot=false]           => 是否用模式2(具体见文档 demo)，这种模式下如果 value 和 rootValue 都传入，回显以 rootValue 为准
 * @param {object}          [options.data.selected=null]            <=> 当前选择项
 * @param {object}          [options.data.server=false]             => 是否远程获取数据
 * @param {object}          [options.data.hasChildKey=hasChild]     => 远程获取数据时标识是否有子级的字段的 key
 * @param {object}          [options.data.serverFn]                 => 远程获取数据的方法，传入当前的 item，返回一个 promise，promose.resolve(list)
 * @param {string}          [options.data.placeholder='']           => 默认提示
 * @param {string}          [options.data.separator=,]              => 多选时value分隔符
 * @param {boolean}         [options.data.showPath=false]           => 单选时是否展示路径
 * @param {string}          [options.data.placement=top]            => 单选时展示路径的 tooltip 位置，只有在showPath=true的时候生效，如果填 false 则不展示 tooltip
 * @param {string}          [options.data.pathString='>']           => 链接每一级路径的字符串，避免名字中包含该字符串
 * @param {boolean}         [options.data.showPathName=false]       => 是否用 path 代替原来的 namekey 显示
 * @param {boolean}         [options.data.readonly=false]           => 是否只读
 * @param {boolean}         [options.data.multiple=false]           => 是否多选
 * @param {boolean}         [options.data.disabled=false]           => 是否禁用
 * @param {boolean}         [options.data.visible=true]             => 是否显示
 * @param {string}          [options.data.class]                    => 补充class
 * @param {number}          [options.data.width]                    => 组件宽度
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
      rootValue: null,
      selected: [],
      rootSelected: [],
      separator: ',',
      server: false,
      hasChildKey: 'hasChild',
      placeholder: '',
      key: 'id',
      nameKey: 'name',
      childKey: 'children',
      checkKey: 'checked',
      hierarchical: false,
      updateAuto: false,
      showPathName: false,
      onlyChild: true,
      pathString: '>',
      placement: 'top',
      showPath: false,
      LI_WEITH: 137,
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
      this.addPath();
      data.tree[0] = data._source;
      if (data._source && data._source.length) {
        if (data.showRoot) {
          this.initRootSelected();
        } else {
          this.initSelected();
        }
      }
      this.$update();
    });
    this.$watch('value', function (newValue, oldValue) {
      if (data._source && data._source.length) {
        this.initSelected();
      }
      if (oldValue !== null && oldValue !== undefined) {
        /**
         * @event KLMultiSelect#value 改变时触发
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

    this.$watch('rootValue', (newValue, oldValue) => {
      if (data._source && data._source.length && data.showRoot) {
        this.initRootSelected();
      }
      if (oldValue !== null && oldValue !== undefined) {
        /**
         * @event KLMultiSelect#rootValue 改变时触发
         * @property {object} sender 事件发送对象
         * @property {object} value 当前 value 的值
         */
        this.$emit('rootChange', {
          sender: this,
          value: newValue,
          key: data.key,
        });
      }
      this.$update();
    });
    this.supr();

    this.initValidation();
  },
  toggle(open) {
    this.supr(open);
  },
  // 处理 source ，给每一项添加 path
  addPath() {
    const data = this.data;
    const dealPath = function (array, path) {
      array.forEach((item) => {
        item.path = path ? path + data.pathString + item[data.nameKey] : item[data.nameKey];
        if (item[data.childKey] && item[data.childKey].length) {
          dealPath(item[data.childKey], item.path);
        }
      });
    };
    dealPath(data._source, '');
  },
  // 以 value 为标准，对整个 source 数组的每一项进行检测，value 里面是否包含这一项，设置 checked 是 true 还是 false
  initSelected() {
    const data = this.data;
    if (data.value !== null && data.value !== undefined) {
      const _list = data.value.toString().split(data.separator);
      const _checkedItem = function (list) {
        list.map((item2) => {
          if (item2[data.childKey] && item2[data.childKey].length) {
            _checkedItem(item2[data.childKey]);
            if (!data.multiple && !data.onlyChild) {
              if (_list.indexOf((item2[data.key].toString() || '').toString()) > -1 || _list.indexOf(item2[data.key].toString()) > -1) {
                item2[data.checkKey] = true;
              } else {
                item2[data.checkKey] = false;
              }
            }
          } else if (
            _list.indexOf((item2[data.key].toString() || '').toString()) > -1 ||
            _list.indexOf(item2[data.key].toString()) > -1
          ) {
            item2[data.checkKey] = true;
          } else {
            item2[data.checkKey] = false;
          }
          return undefined;
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
          }
          return undefined;
        });
      };
      _checkedItem(data._source);
      if (data.multiple) {
        _checkedSelf(data._source);
      }
      this.watchValue();
    } else {
      data.value = '';
    }
    this.$update();
  },
  // 将 rootValue 转换成对应的 value
  initRootSelected() {
    const data = this.data;
    const self = this;
    if (data.rootValue !== undefined && data.rootValue !== null) {
      const _list = data.rootValue.split(data.separator);
      const _checkItem = function (list) {
        list.map((item) => {
          if (_list.indexOf(item[data.key].toString()) > -1) {
            item.checked = true;
            self.setCheck(item[data.childKey], true);
          } else if (item[data.childKey] && item[data.childKey].length) {
            _checkItem(item[data.childKey]);
          }
          return undefined;
        });
      };
      _checkItem(data._source);
      this.watchValue();
    } else {
      data.rootValue = '';
    }
    this.$update();
  },
  viewCate(cate, level, show, e) {
    e && e.stopPropagation();
    const data = this.data;
    if (data.disabled || data.readonly) {
      return;
    }
    if (data.server && cate[data.hasChildKey] && (!cate[data.childKey] || !cate[data.childKey].length)) {
      data.serverFn(cate).then((list) => {
        cate[data.childKey] = list;
        this.dealCate(cate, level, show);
      });
    } else {
      this.dealCate(cate, level, show);
    }
  },
  dealCate(cate, level, show) {
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
      data.tree[i] = [];
    }

    // 处理路径逻辑
    const pathArray = [];
    let path = [];
    data.tree.map((item, index) => {
      if (index <= level) {
        item.map((item2) => {
          if (item2.active) {
            pathArray.push(item2);
            path.push(item2[data.nameKey]);
          }
          return undefined;
        });
      }
      return undefined;
    });
    path = path.join(data.pathString);

    if (
      !show &&
      (!data.multiple && (!(cate[data.childKey] && cate[data.childKey].length) || (!data.onlyChild)))
    ) {
      data.value = cate[data.key].toString();
      if (data.showPath && !data.multiple) {
        cate.path = path;
        cate.pathArray = pathArray;
      }
      data.selected = [cate];
      data.open = false;
      /**
             * @event KLMultiSelect#select 选择某一项时触发
             * @property {object} sender 事件发送对象
             * @property {object} selected 当前选择项
             */
      this.$emit('select', {
        sender: this,
        selected: cate,
      });
    }
    setTimeout(() => {
      this.scroll(level);
    }, 0);
  },
  scroll(level) {
    const data = this.data;
    const target = document.getElementsByClassName('cateWrap')[0];
    const startWidth = target.scrollLeft;
    const WIDTH = (level - 1) * data.LI_WEITH;
    const TIME = 300;
    let start = null;
    const frameFunc = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (func) {
      window.setTimeout(func, 1000 / 45);
    };
    function step(timestamp) {
      if (start === null) start = timestamp;
      const progress = timestamp - start;
      target.scrollLeft = startWidth + (parseFloat(progress / TIME) * (WIDTH - startWidth));
      if (progress < TIME) {
        frameFunc(step);
      }
    }
    frameFunc(step);
    this.$update();
  },
  checkCate(cate, level, checked) {
    const _checked = !checked;
    const data = this.data;
    if (data.disabled || data.readonly) {
      return;
    }
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
  // 循环列表获取 value 值和 rootValue 值
  watchValue() {
    const data = this.data;
    data.selected = [];
    const _value = [];
    data.rootSelected = [];
    const _rootValue = [];
    const _getChecked = function (list) {
      list.map((item) => {
        if (item[data.childKey] && item[data.childKey].length) {
          _getChecked(item[data.childKey]);
          if (item[data.checkKey] && !data.multiple && !data.onlyChild) {
            _value.push(item[data.key].toString());
            data.selected.push(item);
          }
        } else if (item[data.checkKey]) {
          _value.push(item[data.key].toString());
          data.selected.push(item);
        }
        return undefined;
      });
    };
    const _getRootChecked = function (list) {
      list.map((item) => {
        if (item.checked) {
          _rootValue.push(item[data.key]).toString();
          data.rootSelected.push(item);
        } else if (item[data.childKey] && item[data.childKey].length) {
          _getRootChecked(item[data.childKey]);
        }
        return undefined;
      });
    };
    _getChecked(data._source);
    if (_value.length) {
      data.value = _value.join([data.separator]);
    } else {
      data.value = '';
    }
    if (data.showRoot) {
      _getRootChecked(data._source);
      if (_rootValue.length) {
        data.rootValue = _rootValue.join([data.separator]);
      } else {
        data.rootValue = '';
      }
    }
    this.$update();
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
    const data = this.data;
    event && event.stopPropagation();
    if (data.disabled || data.readonly) {
      return;
    }
    this.toggle(true);
    const _list = data.value.toString().split(data.separator);
    // 如果是模式2，把删除的 item 的所有子项的 id 从 value 中去除，然后把当前的 id 从 rootValue 中去除
    if (data.showRoot) {
      this.deleteRoot(item);
      return;
    }
    const _index = _list.indexOf((item[data.key].toString() || ''));
    if (_index > -1) {
      _list.splice(_index, 1);
    }
    data.value = _list.join(data.separator);
    this.initSelected();
    this.watchValue();
  },
  deleteRoot(item) {
    const data = this.data;
    const _list = data.value.toString().split(data.separator);
    let _index;
    const calcValue = function (list) {
      list.map((child) => {
        if (child[data.childKey] && child[data.childKey].length) {
          calcValue(child[data.childKey]);
        } else {
          _index = _list.indexOf((child[data.key].toString() || ''));
          if (_index > -1) {
            _list.splice(_index, 1);
          }
        }
        return undefined;
      });
    };
    if (item[data.childKey] && item[data.childKey].length) {
      calcValue(item[data.childKey]);
    } else {
      _index = _list.indexOf((item[data.key].toString() || ''));
      if (_index > -1) {
        _list.splice(_index, 1);
      }
    }
    data.value = _list.join(data.separator);
    const _rootList = data.rootValue.toString().split(data.separator);
    _index = _rootList.indexOf((item[data.key].toString() || ''));
    if (_index > -1) {
      _rootList.splice(_index, 1);
    }
    data.rootValue = _rootList.join(data.separator);
    this.initSelected();
    this.watchValue();
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
