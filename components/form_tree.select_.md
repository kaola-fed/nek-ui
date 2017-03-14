---
title: 树形选择
type: components
name: tree.select
cate: 表单
order: 209
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<tree.select source={source} value={value} />
选择的是：{value}
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '节点1', children: [
                {name: '节点1.1'},
                {name: '节点1.2', children: [
                    {name: '节点1.2.1'},
                    {name: '节点1.2.2'}
                ]},
                {name: '节点1.3'},
                {name: '节点1.4'},
            ]},
            {name: '节点2'},
            {name: '节点3', children: [
                {name: '节点3.1'},
                {name: '节点3.2'}
            ]}
        ],
        value: ''
    }
});
```
<!-- demo_end -->

### 多选

<!-- demo_start -->
<div class="m-example"></div>

```xml
<tree.select source={source} multiple={true} value={value} />
选择的是：{value}
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '节点1', children: [
                {name: '节点1.1'},
                {name: '节点1.2', children: [
                    {name: '节点1.2.1'},
                    {name: '节点1.2.2'}
                ]},
                {name: '节点1.3'},
                {name: '节点1.4'},
            ]},
            {name: '节点2'},
            {name: '节点3', children: [
                {name: '节点3.1'},
                {name: '节点3.2'}
            ]}
        ],
        value: ''
    }
});
```
<!-- demo_end -->

### 禁用组件

<!-- demo_start -->
<div class="m-example"></div>

```xml
<tree.select source={source} disabled />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '节点1', children: [
                {name: '节点1.1'},
                {name: '节点1.2', children: [
                    {name: '节点1.2.1'},
                    {name: '节点1.2.2'}
                ]},
                {name: '节点1.3'},
                {name: '节点1.4'},
            ]},
            {name: '节点2'},
            {name: '节点3', children: [
                {name: '节点3.1'},
                {name: '节点3.2'}
            ]}
        ]
    }
});
```
<!-- demo_end -->

### 远程数据

<!-- demo_start -->
<div class="m-example"></div>

```xml
<tree.select service={@(this.service)} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    service: {
        getList: function(params, success) {
            NEKUI.ajax.request({
                url: '../data/tree.json',
                method: 'get',
                type: 'json',
                data: params,
                success: success
            });
        }
    }
});
```
<!-- demo_end -->

### 分级加载

<!-- demo_start -->
<div class="m-example"></div>

```xml
<tree.select service={@(this.service)} hierarchical />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    service: {
        getList: function(params, success) {
            NEKUI.ajax.request({
                url: '../data/tree2.json',
                method: 'get',
                type: 'json',
                data: params,
                success: success
            });
        }
    }
});
```
<!-- demo_end -->

## API
<a name="TreeSelect"></a>

## TreeSelect
**Kind**: global class  
**Extend**: Select  
<a name="new_TreeSelect_new"></a>

### new TreeSelect()

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options.data] | <code>object</code> |  | = 绑定属性 |
| [options.data.source] | <code>Array.&lt;object&gt;</code> | <code>[]</code> | <=> 数据源 |
| [options.data.source[].name] | <code>string</code> |  | => 每项的内容 |
| [options.data.source[].disabled] | <code>boolean</code> | <code>false</code> | => 禁用此项 |
| [options.data.source[].divider] | <code>boolean</code> | <code>false</code> | => 设置此项为分隔线 |
| [options.data.key] | <code>string</code> | <code>&quot;id&quot;</code> | => 数据项的键 |
| [options.data.nameKey] | <code>string</code> | <code>&quot;name&quot;</code> | => 数据项的name键 |
| [options.data.childKey] | <code>string</code> | <code>&quot;children&quot;</code> | => 数据子项的键 |
| [options.data.value] | <code>string</code> | <code>null</code> | <=> 当前选择值 |
| [options.data.selected] | <code>object</code> | <code></code> | <=> 当前选择项 |
| [options.data.separator] | <code>string</code> | <code>&quot;,&quot;</code> | => 多选时value分隔符 |
| [options.data.placeholder] | <code>string</code> | <code>&quot;请选择&quot;</code> | => 默认项的文字 |
| [options.data.hierarchical] | <code>boolean</code> | <code>false</code> | @=> 是否分级动态加载，需要service |
| [options.data.readonly] | <code>boolean</code> | <code>false</code> | => 是否只读 |
| [options.data.multiple] | <code>boolean</code> | <code>false</code> | => 是否多选 |
| [options.data.disabled] | <code>boolean</code> | <code>false</code> | => 是否禁用 |
| [options.data.visible] | <code>boolean</code> | <code>true</code> | => 是否显示 |
| [options.data.class] | <code>string</code> |  | => 补充class |
| [options.service] | <code>object</code> |  | @=> 数据服务 |


{% raw %}
<script>
var index = 0;

    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<tree.select source={source} value={value} />
选择的是：{value}

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '节点1', children: [
                {name: '节点1.1'},
                {name: '节点1.2', children: [
                    {name: '节点1.2.1'},
                    {name: '节点1.2.2'}
                ]},
                {name: '节点1.3'},
                {name: '节点1.4'},
            ]},
            {name: '节点2'},
            {name: '节点3', children: [
                {name: '节点3.1'},
                {name: '节点3.2'}
            ]}
        ],
        value: ''
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<tree.select source={source} multiple={true} value={value} />
选择的是：{value}

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '节点1', children: [
                {name: '节点1.1'},
                {name: '节点1.2', children: [
                    {name: '节点1.2.1'},
                    {name: '节点1.2.2'}
                ]},
                {name: '节点1.3'},
                {name: '节点1.4'},
            ]},
            {name: '节点2'},
            {name: '节点3', children: [
                {name: '节点3.1'},
                {name: '节点3.2'}
            ]}
        ],
        value: ''
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<tree.select source={source} disabled />

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '节点1', children: [
                {name: '节点1.1'},
                {name: '节点1.2', children: [
                    {name: '节点1.2.1'},
                    {name: '节点1.2.2'}
                ]},
                {name: '节点1.3'},
                {name: '节点1.4'},
            ]},
            {name: '节点2'},
            {name: '节点3', children: [
                {name: '节点3.1'},
                {name: '节点3.2'}
            ]}
        ]
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<tree.select service={@(this.service)} />

      */});
      
var component = new NEKUI.Component({
    template: template,
    service: {
        getList: function(params, success) {
            NEKUI.ajax.request({
                url: '../data/tree.json',
                method: 'get',
                type: 'json',
                data: params,
                success: success
            });
        }
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<tree.select service={@(this.service)} hierarchical />

      */});
      
var component = new NEKUI.Component({
    template: template,
    service: {
        getList: function(params, success) {
            NEKUI.ajax.request({
                url: '../data/tree2.json',
                method: 'get',
                type: 'json',
                data: params,
                success: success
            });
        }
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
</script>
{% endraw %}