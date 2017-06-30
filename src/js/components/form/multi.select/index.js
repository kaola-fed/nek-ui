/**
 * ------------------------------------------------------------
 * TreeSelect 树型选择
 * @author   lilang
 * ------------------------------------------------------------
 */

'use strict';

var Dropdown = require('../../navigation/dropdown');
var Validation = require('../../../util/validation');
var validationMixin = require('../../../util/validationMixin');
var template = require('./index.html');
var _ = require('../../../ui-base/_');
var check = require('../check');
var Input = require('../ui.input');

/**
 * @class TreeSelect
 * @extend Select
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


var MultiSelect = Dropdown.extend({
	name: 'multi.select',
	template: template,
	config: function(data) {
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
            updateAuto: false
        });
        data._source = _.clone(data.source || []);
        data.tree = [data._source, [], [], [], [], [], [], [], [], []];
        data.search = ['','','','','','','','','',''];
        data.empty = [];
        this.$watch('source', function(newValue, oldValue) {
            if (!(newValue instanceof Array)) {
                throw new TypeError('`source` is not an Array!');
                return;
            }
            data._source = _.clone(data.source || []);
            data.tree[0] = data._source;
            this.initSelected()
            this.$update();
        }.bind(this));
        this.$watch('value', function(newValue, oldValue) {
            this.initSelected();
            if(oldValue !== null && oldValue !== undefined) {
                /**
                 * @event value 改变时触发
                 * @property {object} sender 事件发送对象
                 * @property {object} value 当前 value 的值
                 */
                this.$emit('change', {
                    sender: this,
                    value: newValue,
                    key: data.key,
                    value: data.value
                });
                if(data.source && data.source.length) {
                    this.validate();
                }
            }
            this.$update();
        }.bind(this));
        this.supr();

        this.initValidation();
    },
    initSelected: function() {
    	var data = this.data;
    	if(data.value !== null && data.value !== undefined) {
        	var _list = data.value.toString().split(data.separator);
        	var _checkedItem = function(list) {
        			list.map(function(item2) {
        				if(item2[data.childKey] && item2[data.childKey].length) {
        					_checkedItem(item2[data.childKey]);
        				} else {
        					if(_list.indexOf((item2[data.key].toString() || '').toString()) > -1 || _list.indexOf(item2[data.key].toString()) > -1) {
	        					item2[data.checkKey] = true;
	        				} else {
	        					item2[data.checkKey] = false;
	        				}
        				}
        			})
        	}
        	var _checkedSelf = function(list) {
        		list.map(function(item) {
        			if(item[data.childKey] && item[data.childKey].length) {
                        _checkedSelf(item[data.childKey]);
                        if (item[data.childKey].every(function(item2) {
                            return item2[data.checkKey];
                        })) {
                            item[data.checkKey] = true;
                        }
        				else if (item[data.childKey].some(function(item2) {
                            return item2[data.checkKey] === true || item2[data.checkKey] === null;
                        })) {
                            item[data.checkKey] = null;
                        } else {
                            item[data.checkKey] = false;
                        }
        			}
        		})
        	}
        	_checkedItem(data._source);
        	_checkedSelf(data._source);
        	this.watchValue();
        } else {
            data.value = '';
        }
    },
    viewCate: function(cate, level) {
        var data = this.data;
        data.tree[level + 1] = cate[data.childKey] || [];
        // 将本级和下一级的active都置为false
        for(var i = level; i < level + 2; i++) {
            data.tree[i].forEach(function(item) {
                item.active = false;
            })
        }
        // 当前项active设为true
        cate.active = true;

        // 将下一级后面的都置空
        for(i = level + 2; i < data.tree.length; i++) {
            data.tree[i] = {};
        }

        if(!data.multiple && !(cate[data.childKey] && cate[data.childKey].length)) {
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
                selected: cate
            });
        }
    },
    checkCate: function(cate, level, checked) {
    	checked = !checked;
        var data = this.data;
        cate[data.checkKey] = checked;
        this.setCheck(cate[data.childKey], checked);

        for(var i = level - 1; i >= 0; i--) {
            data.tree[i].forEach(function(item) {
                if(item.active) {
                    var checkedCount = 0;
                    item[data.childKey].forEach(function(child) {
                        if(child.checked)
                            checkedCount++;
                        else if(child.checked === null)
                            checkedCount += 0.5;
                    });

                    if(checkedCount === 0)
                        item.checked = false;
                    else if(checkedCount === item[data.childKey].length)
                        item.checked = true;
                    else
                        item.checked = null;
                }
            })
        }
        this.$emit('select', {
            sender: this,
            selected: cate
        });
        this.watchValue();
    },
    // 循环列表获取 value 值
    watchValue: function() {
    	var data = this.data;
    	data.selected = [];
    	var _value = [];
    	var _getChecked = function(list) {
    		list.map(function(item) {
    			if(item[data.childKey] && item[data.childKey].length) {
	    			_getChecked(item[data.childKey]);
	    		} else {
	    			if(item[data.checkKey]) {
	    				_value.push(item[data.key].toString());
	    				data.selected.push(item);
	    			}
	    		}
    		})
    	}
    	_getChecked(data._source);
    	if(_value.length) {
    		data.value = _value.join([data.separator]);
    	} else {
    		data.value = '';
    	}
    },
    // 循环设置类目及其子类目的check状态
    setCheck: function(category, value) {
        var data = this.data;
        var self = this;
        if (!category) return;
        category.forEach(function(item) {
            item[data.checkKey] = value;
            if (item[data.childKey]) self.setCheck(item[data.childKey], value);
        })
    },
    // 删除某一项
    delete: function(event, item) {
    	event && event.stopPropagation();
    	this.toggle(true);
    	var data = this.data;
    	var _list = data.value.toString().split(data.separator);
    	_list.splice(_list.indexOf((item[data.key].toString() || '').toString()), 1);
    	data.value = _list.join(data.separator);
    	this.initSelected();
    	this.watchValue();
    },
    validate: function (on) {
        var data = this.data;

        var result = {success: true, message: ''},
            value = this.data.value;

        value = ( typeof value == 'undefined' ) ? '' : value + '';
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
            on: on,
            result: result
        });

        return result;
    }
}).filter('search', function(category, search, level) {
	var data = this.data;
    var target = [];
    if(category && category.filter) {
        target =  category.filter(function(item, index) {
            if(!item[data.nameKey]) return true;
            return item[data.nameKey].toUpperCase().indexOf(search.toUpperCase()) != -1;
        })
    }
    if(target.length) {
        data.empty[level] = false;
        return target;
    } else {
        data.empty[level] = true;
        return [];
    }
});


MultiSelect.use(validationMixin);
module.exports = MultiSelect;