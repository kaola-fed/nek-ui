---
title: 多级菜单
type: components
name: menu
cate: 导航
order: 402
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class="f-cb">
    <menu source={source} class="g-col g-col-4" />
</div>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1', children: [
                {name: '选项1.1'},
                {name: '选项1.2', children: [
                    {name: '选项1.2.1'},
                    {name: '选项1.2.2'}
                ]},
                {name: '选项1.3'},
                {name: '选项1.4'},
            ]},
            {name: '选项2'},
            {name: '选项3', children: [
                {name: '选项3.1'},
                {name: '选项3.2'}
            ]}
        ]
    }
});
```
<!-- demo_end -->

### 修改标题

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class="f-cb">
    <menu source={source} title="修改标题" class="g-col g-col-4" />
</div>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1', children: [
                {name: '选项1.1'},
                {name: '选项1.2', children: [
                    {name: '选项1.2.1'},
                    {name: '选项1.2.2'}
                ]},
                {name: '选项1.3'},
                {name: '选项1.4'},
            ]},
            {name: '选项2'},
            {name: '选项3', children: [
                {name: '选项3.1'},
                {name: '选项3.2'}
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
<div class="f-cb">
    <menu source={source} class="g-col g-col-4" />
    <menu source={source} class="g-col g-col-4" disabled />
</div>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1', children: [
                {name: '选项1.1'},
                {name: '选项1.2', children: [
                    {name: '选项1.2.1'},
                    {name: '选项1.2.2'}
                ]},
                {name: '选项1.3'},
                {name: '选项1.4'},
            ]},
            {name: '选项2'},
            {name: '选项3（禁用）', disabled: true, children: [
                {name: '选项3.1'},
                {name: '选项3.2'}
            ]}
        ]
    }
});
```
<!-- demo_end -->

### 分隔线

<!-- demo_start -->
<div class="m-example"></div>

```xml
<menu source={source} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1', children: [
                {name: '选项1.1'},
                {divider: true},
                {name: '选项1.2', children: [
                    {name: '选项1.2.1'},
                    {name: '选项1.2.2'}
                ]},
                {name: '选项1.3'},
                {name: '选项1.4'},
            ]},
            {name: '选项2'},
            {divider: true},
            {name: '选项3（禁用）', disabled: true, children: [
                {name: '选项3.1'},
                {name: '选项3.2'}
            ]}
        ]
    }
});
```
<!-- demo_end -->

### 按钮自定义

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class="f-cb">
    <menu source={source} class="g-col g-col-3">
        <a class="u-btn u-btn-primary">Primary</a>
    </menu>
    <menu source={source} class="g-col g-col-3">
        <a class="u-btn u-btn-success">Success</a>
    </menu>
    <menu source={source} class="g-col g-col-3">
        <a class="u-btn u-btn-warning">Warning</a>
    </menu>
    <menu source={source} class="g-col g-col-3">
        <a class="u-btn u-btn-error">Error</a>
    </menu>
</div>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1', children: [
                {name: '选项1.1'},
                {name: '选项1.2', children: [
                    {name: '选项1.2.1'},
                    {name: '选项1.2.2'}
                ]},
                {name: '选项1.3'},
                {name: '选项1.4'},
            ]},
            {name: '选项2'},
            {name: '选项3', children: [
                {name: '选项3.1'},
                {name: '选项3.2'}
            ]}
        ]
    }
});
```
<!-- demo_end -->

### 单项模板自定义

<!-- demo_start -->
<div class="m-example"></div>

```xml
<menu source={source} itemTemplate={@(itemTemplate)} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    itemTemplate: `<a href={item.url}>{item.name}</a>`,
    data: {
        source: [
            {name: '首页', url: '../index.html'},
            {name: 'CSS元件', url: '../cssunit/index.html', children: [
                {name: '基础', url: '../cssunit/base.html'},
                {name: '按钮', url: '../cssunit/button.html'},
                {name: '图标', url: '../cssunit/icon.html'}
            ]},
            {name: 'JS元件', url: 'index.html', children: [
                {name: 'Dropdown', url: 'dropdown.html'},
                {name: 'Menu', url: 'menu.html'},
                {name: 'Input2', url: 'input2.html'}
            ]}
        ]
    }
});
```
<!-- demo_end -->

## API
## Classes

<dl>
<dt><a href="#Menu">Menu</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#config">config()</a></dt>
<dd></dd>
</dl>

<a name="Menu"></a>

## Menu
**Kind**: global class  
**Extend**: Dropdown  
<a name="new_Menu_new"></a>

### new Menu()

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options.data] | <code>object</code> |  | = 绑定属性 |
| [options.data.title] | <code>string</code> |  | => 按钮文字 |
| [options.data.source] | <code>Array.&lt;object&gt;</code> | <code>[]</code> | <=> 数据源 |
| [options.data.source[].name] | <code>string</code> |  | => 每项的内容 |
| [options.data.source[].disabled] | <code>boolean</code> | <code>false</code> | => 禁用此项 |
| [options.data.source[].divider] | <code>boolean</code> | <code>false</code> | => 设置此项为分隔线 |
| [options.data.itemTemplate] | <code>string</code> | <code>null</code> | @=> 单项模板 |
| [options.data.open] | <code>boolean</code> | <code>false</code> | <=> 当前为展开/收起状态 |
| [options.data.disabled] | <code>boolean</code> | <code>false</code> | => 是否禁用 |
| [options.data.visible] | <code>boolean</code> | <code>true</code> | => 是否显示 |
| [options.data.class] | <code>string</code> |  | => 补充class |
| [options.service] | <code>object</code> |  | @=> 数据服务 |

<a name="config"></a>

## config()
**Kind**: global function  
**Access:** protected  

{% raw %}
<script>
var index = 0;

    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<div class="f-cb">
    <menu source={source} class="g-col g-col-4" />
</div>

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1', children: [
                {name: '选项1.1'},
                {name: '选项1.2', children: [
                    {name: '选项1.2.1'},
                    {name: '选项1.2.2'}
                ]},
                {name: '选项1.3'},
                {name: '选项1.4'},
            ]},
            {name: '选项2'},
            {name: '选项3', children: [
                {name: '选项3.1'},
                {name: '选项3.2'}
            ]}
        ]
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<div class="f-cb">
    <menu source={source} title="修改标题" class="g-col g-col-4" />
</div>

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1', children: [
                {name: '选项1.1'},
                {name: '选项1.2', children: [
                    {name: '选项1.2.1'},
                    {name: '选项1.2.2'}
                ]},
                {name: '选项1.3'},
                {name: '选项1.4'},
            ]},
            {name: '选项2'},
            {name: '选项3', children: [
                {name: '选项3.1'},
                {name: '选项3.2'}
            ]}
        ]
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<div class="f-cb">
    <menu source={source} class="g-col g-col-4" />
    <menu source={source} class="g-col g-col-4" disabled />
</div>

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1', children: [
                {name: '选项1.1'},
                {name: '选项1.2', children: [
                    {name: '选项1.2.1'},
                    {name: '选项1.2.2'}
                ]},
                {name: '选项1.3'},
                {name: '选项1.4'},
            ]},
            {name: '选项2'},
            {name: '选项3（禁用）', disabled: true, children: [
                {name: '选项3.1'},
                {name: '选项3.2'}
            ]}
        ]
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<menu source={source} />

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1', children: [
                {name: '选项1.1'},
                {divider: true},
                {name: '选项1.2', children: [
                    {name: '选项1.2.1'},
                    {name: '选项1.2.2'}
                ]},
                {name: '选项1.3'},
                {name: '选项1.4'},
            ]},
            {name: '选项2'},
            {divider: true},
            {name: '选项3（禁用）', disabled: true, children: [
                {name: '选项3.1'},
                {name: '选项3.2'}
            ]}
        ]
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<div class="f-cb">
    <menu source={source} class="g-col g-col-3">
        <a class="u-btn u-btn-primary">Primary</a>
    </menu>
    <menu source={source} class="g-col g-col-3">
        <a class="u-btn u-btn-success">Success</a>
    </menu>
    <menu source={source} class="g-col g-col-3">
        <a class="u-btn u-btn-warning">Warning</a>
    </menu>
    <menu source={source} class="g-col g-col-3">
        <a class="u-btn u-btn-error">Error</a>
    </menu>
</div>

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1', children: [
                {name: '选项1.1'},
                {name: '选项1.2', children: [
                    {name: '选项1.2.1'},
                    {name: '选项1.2.2'}
                ]},
                {name: '选项1.3'},
                {name: '选项1.4'},
            ]},
            {name: '选项2'},
            {name: '选项3', children: [
                {name: '选项3.1'},
                {name: '选项3.2'}
            ]}
        ]
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<menu source={source} itemTemplate={@(itemTemplate)} />

      */});
      
var component = new NEKUI.Component({
    template: template,
    itemTemplate: `<a href={item.url}>{item.name}</a>`,
    data: {
        source: [
            {name: '首页', url: '../index.html'},
            {name: 'CSS元件', url: '../cssunit/index.html', children: [
                {name: '基础', url: '../cssunit/base.html'},
                {name: '按钮', url: '../cssunit/button.html'},
                {name: '图标', url: '../cssunit/icon.html'}
            ]},
            {name: 'JS元件', url: 'index.html', children: [
                {name: 'Dropdown', url: 'dropdown.html'},
                {name: 'Menu', url: 'menu.html'},
                {name: 'Input2', url: 'input2.html'}
            ]}
        ]
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
</script>
{% endraw %}