/**
 * ------------------------------------------------------------
 * TreeSelect 树型选择
 * @author   lilang
 * ------------------------------------------------------------
 */

'use strict';

var Dropdown = require('../../navigation/dropdown');
var Validation = require('../../../util/validation');
var template = require('./index.html');
var _ = require('../../../ui-base/_');


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
        data._source = _.clone(data.source);
        data.tree = [data._source, [], [], [], []];
        data.search = ['','','','',''];
        this.initSelected();
        this.supr();

        var $outer = this.$outer;
        if($outer && $outer instanceof Validation) {
            $outer.controls.push(this);

            this.$on('destroy', function() {
                var index = $outer.controls.indexOf(this);
                $outer.controls.splice(index, 1);
            });
        }
    },
    initSelected: function() {
    	var data = this.data;
    	if(data.value) {
        	var _list = data.value.split(data.separator);
        	var _checked = function(list) {
        		_list.map(function(item) {
        			list.map(function(item2) {
        				if(item == item2[data.key]) {
        					item2[data.checkKey] = true;
        				}
        				if(item2[data.childKey] && item2[data.childKey].length) {
        					_checked(item2[data.childKey]);
        				}
        			})
        		})
        	}
        	_checked(data._source);
        	this.watchValue();
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
        for(i = level + 2; i < 5; i++) {
            data.tree[i] = {};
        }

        if(!data.multiple && !(cate[data.childKey] && cate[data.childKey].length)) {
        	data.value = cate[data.key];
        	data.selected = [cate];
        	data.open = false;
        }
    },
    checkCate: function(cate, level, checked) {
        var data = this.data;
        this.setCheck(cate[data.childKey], checked);

        // 取消勾选的情况，找到前面各级active的cate，设置为不勾选
        if(level > 0 && !checked) {
            for(var i = 0; i < level; i++) {
                data.tree[i].forEach(function(item) {
                    if(item.active) {
                        item[data.checkKey] = false;
                    }
                })
            }
        }

        // 勾选的情况，判断本级是否全选，全选则设置上一级为勾选
        if(level > 0 && checked) {
            for(var i = level; i > 0; i--) {
                var flag = true;
                data.tree[i].forEach(function(item) {
                    if(!item[data.checkKey]) {
                        flag = false;
                    }
                })
                if(flag) {
                    data.tree[i - 1].forEach(function(item) {
                        if(item.active) {
                            item[data.checkKey] = true;
                        }
                    })
                }
            }
        }
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
	    				_value.push(item[data.key]);
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
    delete: function(item) {
    	var data = this.data;
    	var _list = data.value.split(data.separator);
    	_list.splice(_list.indexOf(item[data.key]), 1);
    	data.value = _list.join(data.separator);
    	this.initSelected();
    	this.watchValue();
    }
}).filter('search', function(category, search) {
	var data = this.data;
    if(category && category.filter) {
        return category.filter(function(item, index) {
            return item[data.nameKey].indexOf(search) != -1;
        })
    }
    return category;
})