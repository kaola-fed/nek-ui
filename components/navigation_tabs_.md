---
title: 选项卡
type: components
name: tabs
cate: 导航
order: 405
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<tabs>
    <tab title="Tab1">Content1</tab>
    <tab title="Tab2">Content2</tab>
    <tab title="Tab3">Content3</tab>
    <tab title="Tab4">Content4</tab>
</tabs>
```
<!-- demo_end -->

### 禁用某一项，禁用组件

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class="g-row">
    <div class="g-col g-col-6">
        <tabs>
            <tab title="Tab1">Content1</tab>
            <tab title="Tab2">Content2</tab>
            <tab title="Tab3" disabled>Content3</tab>
            <tab title="Tab4">Content4</tab>
        </tabs>
    </div>
    <div class="g-col g-col-6">
        <tabs disabled>
            <tab title="Tab1">Content1</tab>
            <tab title="Tab2">Content2</tab>
            <tab title="Tab3">Content3</tab>
            <tab title="Tab4">Content4</tab>
        </tabs>
    </div>
</div>
```
<!-- demo_end -->

### 居中

<!-- demo_start -->
<div class="m-example"></div>

```xml
<tabs class="m-tabs-center">
    <tab title="Tab1">Content1</tab>
    <tab title="Tab2">Content2</tab>
    <tab title="Tab3">Content3</tab>
    <tab title="Tab4">Content4</tab>
</tabs>
```
<!-- demo_end -->

### 垂直居左

<!-- demo_start -->
<div class="m-example"></div>

```xml
<tabs class="m-tabs-left">
    <tab title="Tab1">Content1</tab>
    <tab title="Tab2">Content2</tab>
    <tab title="Tab3">Content3</tab>
    <tab title="Tab4">Content4</tab>
</tabs>
```
<!-- demo_end -->

### 垂直居右

<!-- demo_start -->
<div class="m-example"></div>

```xml
<tabs class="m-tabs-right">
    <tab title="Tab1">Content1</tab>
    <tab title="Tab2">Content2</tab>
    <tab title="Tab3">Content3</tab>
    <tab title="Tab4">Content4</tab>
</tabs>
```
<!-- demo_end -->

### 标题模板自定义

<!-- demo_start -->
<div class="m-example"></div>

```xml
<tabs titleTemplate={@(this.titleTemplate)}>
    <tab title="Tab1">Content1</tab>
    <tab title="Tab2" mark={true}>Content2</tab>
    <tab title="Tab3" mark={true}>Content3</tab>
    <tab title="Tab4">Content4</tab>
</tabs>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    titleTemplate: `
{item.data.title} {#if item.data.mark}<span class="u-text u-text-success"><i class="u-icon u-icon-check-circle"></i></span>{/if}`
});
```
<!-- demo_end -->

### 事件

请打开浏览器的控制台查看结果。

<!-- demo_start -->
<div class="m-example"></div>

```xml
<tabs on-select={console.log('on-select:', '$event.selected:', $event.selected)}
      on-change={console.log('on-change:', '$event.selected:', $event.selected)}>
    <tab title="Tab1">Content1</tab>
    <tab title="Tab2">Content2</tab>
    <tab title="Tab3">Content3</tab>
    <tab title="Tab4">Content4</tab>
</tabs>
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
<dt><a href="#Tabs">Tabs</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#config">config()</a></dt>
<dd></dd>
<dt><a href="#select(item) 选择某一项">select(item) 选择某一项(item)</a> ⇒ <code>void</code></dt>
<dd></dd>
<dt><a href="#config">config()</a></dt>
<dd></dd>
</dl>

## Events

<dl>
<dt><a href="#event_change 选项卡改变时触发">"change 选项卡改变时触发"</a></dt>
<dd></dd>
<dt><a href="#event_select 选择某一项时触发">"select 选择某一项时触发"</a></dt>
<dd></dd>
</dl>

<a name="Tabs"></a>

## Tabs
**Kind**: global class  
**Extend**: Component  
<a name="new_Tabs_new"></a>

### new Tabs()

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options.data] | <code>object</code> |  | = 绑定属性 |
| [options.data.selected] | <code>object</code> | <code></code> | <=> 当前选择卡 |
| [options.data.titleTemplate] | <code>string</code> | <code>null</code> | @=> 标题模板 |
| [options.data.readonly] | <code>boolean</code> | <code>false</code> | => 是否只读 |
| [options.data.disabled] | <code>boolean</code> | <code>false</code> | => 是否禁用 |
| [options.data.visible] | <code>boolean</code> | <code>true</code> | => 是否显示 |
| [options.data.class] | <code>string</code> |  | => 补充class |

<a name="config"></a>

## config()
**Kind**: global function  
**Access:** protected  
<a name="select(item) 选择某一项"></a>

## select(item) 选择某一项(item) ⇒ <code>void</code>
**Kind**: global function  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>object</code> | 选择项 |

<a name="config"></a>

## config()
**Kind**: global function  
**Access:** protected  
<a name="event_change 选项卡改变时触发"></a>

## "change 选项卡改变时触发"
**Kind**: event emitted  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| sender | <code>object</code> | 事件发送对象 |
| selected | <code>object</code> | 改变后的选项卡 |

<a name="event_select 选择某一项时触发"></a>

## "select 选择某一项时触发"
**Kind**: event emitted  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| sender | <code>object</code> | 事件发送对象 |
| selected | <code>object</code> | 当前选择卡 |


{% raw %}
<script>
var index = 0;

    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<tabs>
    <tab title="Tab1">Content1</tab>
    <tab title="Tab2">Content2</tab>
    <tab title="Tab3">Content3</tab>
    <tab title="Tab4">Content4</tab>
</tabs>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<div class="g-row">
    <div class="g-col g-col-6">
        <tabs>
            <tab title="Tab1">Content1</tab>
            <tab title="Tab2">Content2</tab>
            <tab title="Tab3" disabled>Content3</tab>
            <tab title="Tab4">Content4</tab>
        </tabs>
    </div>
    <div class="g-col g-col-6">
        <tabs disabled>
            <tab title="Tab1">Content1</tab>
            <tab title="Tab2">Content2</tab>
            <tab title="Tab3">Content3</tab>
            <tab title="Tab4">Content4</tab>
        </tabs>
    </div>
</div>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<tabs class="m-tabs-center">
    <tab title="Tab1">Content1</tab>
    <tab title="Tab2">Content2</tab>
    <tab title="Tab3">Content3</tab>
    <tab title="Tab4">Content4</tab>
</tabs>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<tabs class="m-tabs-left">
    <tab title="Tab1">Content1</tab>
    <tab title="Tab2">Content2</tab>
    <tab title="Tab3">Content3</tab>
    <tab title="Tab4">Content4</tab>
</tabs>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<tabs class="m-tabs-right">
    <tab title="Tab1">Content1</tab>
    <tab title="Tab2">Content2</tab>
    <tab title="Tab3">Content3</tab>
    <tab title="Tab4">Content4</tab>
</tabs>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<tabs titleTemplate={@(this.titleTemplate)}>
    <tab title="Tab1">Content1</tab>
    <tab title="Tab2" mark={true}>Content2</tab>
    <tab title="Tab3" mark={true}>Content3</tab>
    <tab title="Tab4">Content4</tab>
</tabs>

      */});
      
var component = new NEKUI.Component({
    template: template,
    titleTemplate: `
{item.data.title} {#if item.data.mark}<span class="u-text u-text-success"><i class="u-icon u-icon-check-circle"></i></span>{/if}`
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<tabs on-select={console.log('on-select:', '$event.selected:', $event.selected)}
      on-change={console.log('on-change:', '$event.selected:', $event.selected)}>
    <tab title="Tab1">Content1</tab>
    <tab title="Tab2">Content2</tab>
    <tab title="Tab3">Content3</tab>
    <tab title="Tab4">Content4</tab>
</tabs>

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