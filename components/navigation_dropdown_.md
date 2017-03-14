---
title: 下拉菜单
type: components
name: dropdown
cate: 导航
order: 401
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class="f-cb">
    <dropdown source={source} class="g-col g-col-3"/>
</div>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'}
        ]
    }
});
```
<!-- demo_end -->

### 修改标题

<!-- demo_start -->
<div class="m-example"></div>

```xml
<dropdown source={source} title="修改标题" />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'}
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
    <dropdown source={source} class="g-col g-col-6" />
    <dropdown source={source} class="g-col g-col-6" disabled />
</div>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3（禁用）', disabled: true}
        ]
    }
});
```
<!-- demo_end -->

### 分隔线

<!-- demo_start -->
<div class="m-example"></div>

```xml
<dropdown source={source} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {divider: true},
            {name: '选项3（禁用）', disabled: true}
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
    <dropdown source={source} class="g-col g-col-3">
        <a class="u-btn u-btn-primary">Primary</a>
    </dropdown>
    <dropdown source={source} class="g-col g-col-3">
        <a class="u-btn u-btn-success">Success</a>
    </dropdown>
    <dropdown source={source} class="g-col g-col-3">
        <a class="u-btn u-btn-warning">Warning</a>
    </dropdown>
    <dropdown source={source} class="g-col g-col-3">
        <a class="u-btn u-btn-error">Error</a>
    </dropdown>
</div>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'}
        ]
    }
});
```
<!-- demo_end -->

### 单项模板自定义

<!-- demo_start -->
<div class="m-example"></div>

```xml
<dropdown source={source} itemTemplate={@(this.itemTemplate)} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    itemTemplate: `
<a href={item.url}>{item.name}</a>`,
    data: {
        source: [
            {name: 'Dropdown', url: 'dropdown.html'},
            {name: 'Menu', url: 'menu.html'},
            {name: 'Input2', url: 'input2.html'}
        ]
    }
});
```
<!-- demo_end -->

### 数据绑定

<!-- demo_start -->
<div class="m-example"></div>

```xml
<dropdown source={source} open={open} /> 当前切换的状态：{open}
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'}
        ]
    }
});
```
<!-- demo_end -->

### 事件

请打开浏览器的控制台查看结果。

<!-- demo_start -->
<div class="m-example"></div>

```xml
<dropdown source={source}
    on-toggle={console.log('on-toggle:', '$event.open:', $event.open)}
    on-select={console.log('on-select:', '$event.selected:', $event.selected)} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'}
        ]
    }
});
```
<!-- demo_end -->

## API
## Classes

<dl>
<dt><a href="#Dropdown">Dropdown</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#config">config()</a></dt>
<dd></dd>
<dt><a href="#toggle(open) 展开/收起">toggle(open) 展开/收起(open)</a> ⇒ <code>void</code></dt>
<dd></dd>
<dt><a href="#select(item) 选择某一项">select(item) 选择某一项(item)</a> ⇒ <code>void</code></dt>
<dd></dd>
</dl>

## Events

<dl>
<dt><a href="#event_toggle  展开/收起时触发">"toggle  展开/收起时触发"</a></dt>
<dd></dd>
<dt><a href="#event_select 选择某一项时触发">"select 选择某一项时触发"</a></dt>
<dd></dd>
</dl>

<a name="Dropdown"></a>

## Dropdown
**Kind**: global class  
**Extend**: SourceComponent  
<a name="new_Dropdown_new"></a>

### new Dropdown()

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
<a name="toggle(open) 展开/收起"></a>

## toggle(open) 展开/收起(open) ⇒ <code>void</code>
**Kind**: global function  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| open | <code>boolean</code> | 展开/收起状态。如果无此参数，则在两种状态之间切换。 |

<a name="select(item) 选择某一项"></a>

## select(item) 选择某一项(item) ⇒ <code>void</code>
**Kind**: global function  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>object</code> | 选择项 |

<a name="event_toggle  展开/收起时触发"></a>

## "toggle  展开/收起时触发"
**Kind**: event emitted  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| sender | <code>object</code> | 事件发送对象 |
| open | <code>object</code> | 展开/收起状态 |

<a name="event_select 选择某一项时触发"></a>

## "select 选择某一项时触发"
**Kind**: event emitted  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| sender | <code>object</code> | 事件发送对象 |
| selected | <code>object</code> | 当前选择项 |


{% raw %}
<script>
var index = 0;

    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<div class="f-cb">
    <dropdown source={source} class="g-col g-col-3"/>
</div>

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'}
        ]
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<dropdown source={source} title="修改标题" />

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'}
        ]
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<div class="f-cb">
    <dropdown source={source} class="g-col g-col-6" />
    <dropdown source={source} class="g-col g-col-6" disabled />
</div>

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3（禁用）', disabled: true}
        ]
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<dropdown source={source} />

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {divider: true},
            {name: '选项3（禁用）', disabled: true}
        ]
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<div class="f-cb">
    <dropdown source={source} class="g-col g-col-3">
        <a class="u-btn u-btn-primary">Primary</a>
    </dropdown>
    <dropdown source={source} class="g-col g-col-3">
        <a class="u-btn u-btn-success">Success</a>
    </dropdown>
    <dropdown source={source} class="g-col g-col-3">
        <a class="u-btn u-btn-warning">Warning</a>
    </dropdown>
    <dropdown source={source} class="g-col g-col-3">
        <a class="u-btn u-btn-error">Error</a>
    </dropdown>
</div>

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'}
        ]
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<dropdown source={source} itemTemplate={@(this.itemTemplate)} />

      */});
      
var component = new NEKUI.Component({
    template: template,
    itemTemplate: `
<a href={item.url}>{item.name}</a>`,
    data: {
        source: [
            {name: 'Dropdown', url: 'dropdown.html'},
            {name: 'Menu', url: 'menu.html'},
            {name: 'Input2', url: 'input2.html'}
        ]
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<dropdown source={source} open={open} /> 当前切换的状态：{open}

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'}
        ]
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<dropdown source={source}
    on-toggle={console.log('on-toggle:', '$event.open:', $event.open)}
    on-select={console.log('on-select:', '$event.selected:', $event.selected)} />

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'}
        ]
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
</script>
{% endraw %}