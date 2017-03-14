---
title: 多级选择
type: components
name: select.group
cate: 表单
order: 206
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<select.group source={source} depth=3 />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '理学', children: [
                {name: '物理学', children: [
                    {name: '理论物理'},
                    {name: '凝聚态物理'},
                    {name: '材料物理'}
                ]},
                {name: '数学', children: [
                    {name: '基础数学'},
                    {name: '计算数学'},
                    {name: '应用数学'}
                ]},
                {name: '化学'}
            ]},
            {name: '工学', children: [
                {name: '计算机科学与技术', children: [
                    {name: '计算机系统结构'},
                    {name: '计算机软件与理论'},
                    {name: '计算机应用技术'}
                ]},
                {name: '软件工程'},
                {name: '机械工程', children: [
                    {name: '机械制造及其自动化'},
                    {name: '机械电子工程'},
                    {name: '机械设计及理论'},
                    {name: '车辆工程'}
                ]}
            ]}
        ]
    }
});
```
<!-- demo_end -->

### 表单项

在表单中使用

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.form>
    <form.item cols="12" title="用户名" hint="用户名的用途">
        <select.group source={source} depth=3 />
    </form.item>
</ui.form>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '理学', children: [
                {name: '物理学', children: [
                    {name: '理论物理'},
                    {name: '凝聚态物理'},
                    {name: '材料物理'}
                ]},
                {name: '数学', children: [
                    {name: '基础数学'},
                    {name: '计算数学'},
                    {name: '应用数学'}
                ]},
                {name: '化学'}
            ]},
            {name: '工学', children: [
                {name: '计算机科学与技术', children: [
                    {name: '计算机系统结构'},
                    {name: '计算机软件与理论'},
                    {name: '计算机应用技术'}
                ]},
                {name: '软件工程'},
                {name: '机械工程', children: [
                    {name: '机械制造及其自动化'},
                    {name: '机械电子工程'},
                    {name: '机械设计及理论'},
                    {name: '车辆工程'}
                ]}
            ]}
        ]
    }
});
```
<!-- demo_end -->

### 禁用某一项，禁用组件

<!-- demo_start -->
<div class="m-example"></div>

```xml
<p><select.group source={source} depth=3 /></p>
<p><select.group source={source} depth=3 disabled /></p>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '理学', disabled: true, children: [
                {name: '物理学', children: [
                    {name: '理论物理'},
                    {name: '凝聚态物理'},
                    {name: '材料物理'}
                ]},
                {name: '数学', children: [
                    {name: '基础数学'},
                    {name: '计算数学'},
                    {name: '应用数学'}
                ]},
                {name: '化学'}
            ]},
            {name: '工学', children: [
                {name: '计算机科学与技术', children: [
                    {name: '计算机系统结构'},
                    {name: '计算机软件与理论', disabled: true},
                    {name: '计算机应用技术'}
                ]},
                {name: '软件工程', disabled: true},
                {name: '机械工程', children: [
                    {name: '机械制造及其自动化'},
                    {name: '机械电子工程'},
                    {name: '机械设计及理论', disabled: true},
                    {name: '车辆工程', disabled: true}
                ]}
            ]}
        ]
    }
});
```
<!-- demo_end -->

### 设置默认项

<!-- demo_start -->
<div class="m-example"></div>

```xml
<select.group source={source} depth=3 placeholders={['学科门类', '一级学科', '二级学科']} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '理学', children: [
                {name: '物理学', children: [
                    {name: '理论物理'},
                    {name: '凝聚态物理'},
                    {name: '材料物理'}
                ]},
                {name: '数学', children: [
                    {name: '基础数学'},
                    {name: '计算数学'},
                    {name: '应用数学'}
                ]},
                {name: '化学'}
            ]},
            {name: '工学', children: [
                {name: '计算机科学与技术', children: [
                    {name: '计算机系统结构'},
                    {name: '计算机软件与理论'},
                    {name: '计算机应用技术'}
                ]},
                {name: '软件工程'},
                {name: '机械工程', children: [
                    {name: '机械制造及其自动化'},
                    {name: '机械电子工程'},
                    {name: '机械设计及理论'},
                    {name: '车辆工程'}
                ]}
            ]}
        ]
    }
});
```
<!-- demo_end -->

### 远程数据

*待完成……*

### 数据绑定

<!-- demo_start -->
<div class="m-example"></div>

```xml
<select.group source={source} depth=3 on-select={this._onSelect($event)} />
<p>当前的选择项：{selectedTexts}</p>
<p>当前的选择值：{selectedValues}</p>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '理学', children: [
                {name: '物理学', children: [
                    {name: '理论物理'},
                    {name: '凝聚态物理'},
                    {name: '材料物理'}
                ]},
                {name: '数学', children: [
                    {name: '基础数学'},
                    {name: '计算数学'},
                    {name: '应用数学'}
                ]},
                {name: '化学'}
            ]},
            {name: '工学', children: [
                {name: '计算机科学与技术', children: [
                    {name: '计算机系统结构'},
                    {name: '计算机软件与理论'},
                    {name: '计算机应用技术'}
                ]},
                {name: '软件工程'},
                {name: '机械工程', children: [
                    {name: '机械制造及其自动化'},
                    {name: '机械电子工程'},
                    {name: '机械设计及理论'},
                    {name: '车辆工程'}
                ]}
            ]}
        ],
        selecteds: []
    },
    _onSelect: function($event) {
        setTimeout(function() {
            this.data.selectedTexts = $event.selecteds.map(function(item) {
                return item && item.name;
            }).join(' > ');
            this.$update();
        }.bind(this), 0);
    }
});
```
<!-- demo_end -->

### 事件

请打开浏览器的控制台查看结果。

<!-- demo_start -->
<div class="m-example"></div>

```xml
<select.group source={source} depth=3
    on-select={console.log('on-select:', '$event:', $event)}
    on-change={console.log('on-change:', '$event:', $event)} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '理学', children: [
                {name: '物理学', children: [
                    {name: '理论物理'},
                    {name: '凝聚态物理'},
                    {name: '材料物理'}
                ]},
                {name: '数学', children: [
                    {name: '基础数学'},
                    {name: '计算数学'},
                    {name: '应用数学'}
                ]},
                {name: '化学'}
            ]},
            {name: '工学', children: [
                {name: '计算机科学与技术', children: [
                    {name: '计算机系统结构'},
                    {name: '计算机软件与理论'},
                    {name: '计算机应用技术'}
                ]},
                {name: '软件工程'},
                {name: '机械工程', children: [
                    {name: '机械制造及其自动化'},
                    {name: '机械电子工程'},
                    {name: '机械设计及理论'},
                    {name: '车辆工程'}
                ]}
            ]}
        ]
    }
});
```
<!-- demo_end -->

### 行政区（部分）示例

该示例可以进行省市区三级的选择，并且处理了直辖市少一级的问题。

<!-- demo_start -->
<div class="m-example"></div>

```xml
<select.group source={source} depth=3 on-select={this._onSelect($event)} ref="select.group" />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '北京', children: [
                {name: '北京', children: [
                    {name: '东城区'},
                    {name: '西城区'},
                    {name: '海淀区'},
                    {name: '朝阳区'},
                    {name: '丰台区'}
                ]}
            ]},
            {name: '上海', children: [
                {name: '上海', children: [
                    {name: '黄浦区'},
                    {name: '浦东新区'},
                    {name: '徐汇区'},
                    {name: '长宁区'}
                ]}
            ]},
            {name: '浙江', children: [
                {name: '杭州', children: [
                    {name: '上城区'},
                    {name: '下城区'},
                    {name: '江干区'},
                    {name: '西湖区'},
                    {name: '滨江区'}
                ]},
                {name: '宁波', children: [
                    {name: '海曙区'},
                    {name: '江东区'},
                    {name: '江北区'},
                    {name: '北仑区'},
                    {name: '镇海区'},
                    {name: '鄞州区'}
                ]},
                {name: '绍兴', children: [
                    {name: '越城区'},
                    {name: '柯桥区'},
                    {name: '上虞区'}
                ]}
            ]},
            {name: '江苏', children: [
                {name: '南京'},
                {name: '苏州'}
            ]}
        ]
    },
    _onSelect: function($event) {
        if($event.level === 0) {
            var selected = $event.selected;
            if(selected && (selected.name === '北京' || selected.name === '上海'))
                $event.sender.data.placeholders[1] = '';
            else
                $event.sender.data.placeholders[1] = '请选择';
        }
    }
});
```
<!-- demo_end -->

## API
## Classes

<dl>
<dt><a href="#SelectGroup">SelectGroup</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#config">config()</a></dt>
<dd></dd>
<dt><a href="#validate_new 根据required验证组件的值是否正确">validate() 根据required验证组件的值是否正确()</a> ⇒ <code>object</code></dt>
<dd></dd>
</dl>

## Events

<dl>
<dt><a href="#event_change 最后的选择项改变时触发">"change 最后的选择项改变时触发"</a></dt>
<dd></dd>
<dt><a href="#event_select 选择某一项时触发">"select 选择某一项时触发"</a></dt>
<dd></dd>
</dl>

<a name="SelectGroup"></a>

## SelectGroup
**Kind**: global class  
**Extend**: Component  
<a name="new_SelectGroup_new"></a>

### new SelectGroup()

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options.data] | <code>object</code> |  | = 绑定属性 |
| [options.data.source] | <code>Array.&lt;object&gt;</code> | <code>[]</code> | <=> 数据源 |
| [options.data.source[].name] | <code>string</code> |  | => 每项的内容 |
| [options.data.source[].disabled] | <code>boolean</code> | <code>false</code> | => 禁用此项 |
| [options.data.source[].divider] | <code>boolean</code> | <code>false</code> | => 设置此项为分隔线 |
| [options.data.depth] | <code>number</code> | <code>1</code> | => 层级数 |
| [options.data.required] | <code>boolean</code> |  | => 是否必填 |
| [options.data.selected] | <code>object</code> | <code>[]</code> | <=  最后的选择项 |
| [options.data.selecteds] | <code>Array.&lt;object&gt;</code> | <code>[]</code> | <=> 所有的选择项 |
| [options.data.values] | <code>Array.&lt;string&gt;</code> &#124; <code>Array.&lt;number&gt;</code> | <code>[]</code> | <=> 所有的选择值 |
| [options.data.key] | <code>string</code> | <code>&quot;id&quot;</code> | => 数据项的键 |
| [options.data.placeholders] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | => 默认项的文字 |
| [options.data.readonly] | <code>boolean</code> | <code>false</code> | => 是否只读 |
| [options.data.disabled] | <code>boolean</code> | <code>false</code> | => 是否禁用 |
| [options.data.visible] | <code>boolean</code> | <code>true</code> | => 是否显示 |
| [options.data.class] | <code>string</code> |  | => 补充class |
| [options.service] | <code>object</code> |  | @=> 数据服务 |

<a name="config"></a>

## config()
**Kind**: global function  
**Access:** protected  
<a name="validate_new 根据required验证组件的值是否正确"></a>

## validate() 根据required验证组件的值是否正确() ⇒ <code>object</code>
**Kind**: global function  
**Returns**: <code>object</code> - result 结果  
**Access:** public  
<a name="event_change 最后的选择项改变时触发"></a>

## "change 最后的选择项改变时触发"
**Kind**: event emitted  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| sender | <code>object</code> | 事件发送对象 |
| selected | <code>object</code> | 最后的选择项 |
| selecteds | <code>object</code> | 所有的选择项 |
| key | <code>string</code> | 数据项的键 |
| values | <code>Array.&lt;string&gt;</code> &#124; <code>Array.&lt;number&gt;</code> | 所有的选择值 |

<a name="event_select 选择某一项时触发"></a>

## "select 选择某一项时触发"
**Kind**: event emitted  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| sender | <code>object</code> | 事件发送对象 |
| selected | <code>object</code> | 当前选择项 |
| level | <code>object</code> | 当前选择的层级 |


{% raw %}
<script>
var index = 0;

    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<select.group source={source} depth=3 />

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '理学', children: [
                {name: '物理学', children: [
                    {name: '理论物理'},
                    {name: '凝聚态物理'},
                    {name: '材料物理'}
                ]},
                {name: '数学', children: [
                    {name: '基础数学'},
                    {name: '计算数学'},
                    {name: '应用数学'}
                ]},
                {name: '化学'}
            ]},
            {name: '工学', children: [
                {name: '计算机科学与技术', children: [
                    {name: '计算机系统结构'},
                    {name: '计算机软件与理论'},
                    {name: '计算机应用技术'}
                ]},
                {name: '软件工程'},
                {name: '机械工程', children: [
                    {name: '机械制造及其自动化'},
                    {name: '机械电子工程'},
                    {name: '机械设计及理论'},
                    {name: '车辆工程'}
                ]}
            ]}
        ]
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<ui.form>
    <form.item cols="12" title="用户名" hint="用户名的用途">
        <select.group source={source} depth=3 />
    </form.item>
</ui.form>

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '理学', children: [
                {name: '物理学', children: [
                    {name: '理论物理'},
                    {name: '凝聚态物理'},
                    {name: '材料物理'}
                ]},
                {name: '数学', children: [
                    {name: '基础数学'},
                    {name: '计算数学'},
                    {name: '应用数学'}
                ]},
                {name: '化学'}
            ]},
            {name: '工学', children: [
                {name: '计算机科学与技术', children: [
                    {name: '计算机系统结构'},
                    {name: '计算机软件与理论'},
                    {name: '计算机应用技术'}
                ]},
                {name: '软件工程'},
                {name: '机械工程', children: [
                    {name: '机械制造及其自动化'},
                    {name: '机械电子工程'},
                    {name: '机械设计及理论'},
                    {name: '车辆工程'}
                ]}
            ]}
        ]
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<p><select.group source={source} depth=3 /></p>
<p><select.group source={source} depth=3 disabled /></p>

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '理学', disabled: true, children: [
                {name: '物理学', children: [
                    {name: '理论物理'},
                    {name: '凝聚态物理'},
                    {name: '材料物理'}
                ]},
                {name: '数学', children: [
                    {name: '基础数学'},
                    {name: '计算数学'},
                    {name: '应用数学'}
                ]},
                {name: '化学'}
            ]},
            {name: '工学', children: [
                {name: '计算机科学与技术', children: [
                    {name: '计算机系统结构'},
                    {name: '计算机软件与理论', disabled: true},
                    {name: '计算机应用技术'}
                ]},
                {name: '软件工程', disabled: true},
                {name: '机械工程', children: [
                    {name: '机械制造及其自动化'},
                    {name: '机械电子工程'},
                    {name: '机械设计及理论', disabled: true},
                    {name: '车辆工程', disabled: true}
                ]}
            ]}
        ]
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<select.group source={source} depth=3 placeholders={['学科门类', '一级学科', '二级学科']} />

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '理学', children: [
                {name: '物理学', children: [
                    {name: '理论物理'},
                    {name: '凝聚态物理'},
                    {name: '材料物理'}
                ]},
                {name: '数学', children: [
                    {name: '基础数学'},
                    {name: '计算数学'},
                    {name: '应用数学'}
                ]},
                {name: '化学'}
            ]},
            {name: '工学', children: [
                {name: '计算机科学与技术', children: [
                    {name: '计算机系统结构'},
                    {name: '计算机软件与理论'},
                    {name: '计算机应用技术'}
                ]},
                {name: '软件工程'},
                {name: '机械工程', children: [
                    {name: '机械制造及其自动化'},
                    {name: '机械电子工程'},
                    {name: '机械设计及理论'},
                    {name: '车辆工程'}
                ]}
            ]}
        ]
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<select.group source={source} depth=3 on-select={this._onSelect($event)} />
<p>当前的选择项：{selectedTexts}</p>
<p>当前的选择值：{selectedValues}</p>

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '理学', children: [
                {name: '物理学', children: [
                    {name: '理论物理'},
                    {name: '凝聚态物理'},
                    {name: '材料物理'}
                ]},
                {name: '数学', children: [
                    {name: '基础数学'},
                    {name: '计算数学'},
                    {name: '应用数学'}
                ]},
                {name: '化学'}
            ]},
            {name: '工学', children: [
                {name: '计算机科学与技术', children: [
                    {name: '计算机系统结构'},
                    {name: '计算机软件与理论'},
                    {name: '计算机应用技术'}
                ]},
                {name: '软件工程'},
                {name: '机械工程', children: [
                    {name: '机械制造及其自动化'},
                    {name: '机械电子工程'},
                    {name: '机械设计及理论'},
                    {name: '车辆工程'}
                ]}
            ]}
        ],
        selecteds: []
    },
    _onSelect: function($event) {
        setTimeout(function() {
            this.data.selectedTexts = $event.selecteds.map(function(item) {
                return item && item.name;
            }).join(' > ');
            this.$update();
        }.bind(this), 0);
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<select.group source={source} depth=3
    on-select={console.log('on-select:', '$event:', $event)}
    on-change={console.log('on-change:', '$event:', $event)} />

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '理学', children: [
                {name: '物理学', children: [
                    {name: '理论物理'},
                    {name: '凝聚态物理'},
                    {name: '材料物理'}
                ]},
                {name: '数学', children: [
                    {name: '基础数学'},
                    {name: '计算数学'},
                    {name: '应用数学'}
                ]},
                {name: '化学'}
            ]},
            {name: '工学', children: [
                {name: '计算机科学与技术', children: [
                    {name: '计算机系统结构'},
                    {name: '计算机软件与理论'},
                    {name: '计算机应用技术'}
                ]},
                {name: '软件工程'},
                {name: '机械工程', children: [
                    {name: '机械制造及其自动化'},
                    {name: '机械电子工程'},
                    {name: '机械设计及理论'},
                    {name: '车辆工程'}
                ]}
            ]}
        ]
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<select.group source={source} depth=3 on-select={this._onSelect($event)} ref="select.group" />

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '北京', children: [
                {name: '北京', children: [
                    {name: '东城区'},
                    {name: '西城区'},
                    {name: '海淀区'},
                    {name: '朝阳区'},
                    {name: '丰台区'}
                ]}
            ]},
            {name: '上海', children: [
                {name: '上海', children: [
                    {name: '黄浦区'},
                    {name: '浦东新区'},
                    {name: '徐汇区'},
                    {name: '长宁区'}
                ]}
            ]},
            {name: '浙江', children: [
                {name: '杭州', children: [
                    {name: '上城区'},
                    {name: '下城区'},
                    {name: '江干区'},
                    {name: '西湖区'},
                    {name: '滨江区'}
                ]},
                {name: '宁波', children: [
                    {name: '海曙区'},
                    {name: '江东区'},
                    {name: '江北区'},
                    {name: '北仑区'},
                    {name: '镇海区'},
                    {name: '鄞州区'}
                ]},
                {name: '绍兴', children: [
                    {name: '越城区'},
                    {name: '柯桥区'},
                    {name: '上虞区'}
                ]}
            ]},
            {name: '江苏', children: [
                {name: '南京'},
                {name: '苏州'}
            ]}
        ]
    },
    _onSelect: function($event) {
        if($event.level === 0) {
            var selected = $event.selected;
            if(selected && (selected.name === '北京' || selected.name === '上海'))
                $event.sender.data.placeholders[1] = '';
            else
                $event.sender.data.placeholders[1] = '请选择';
        }
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
</script>
{% endraw %}