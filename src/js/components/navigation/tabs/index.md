---
title: 选项卡
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
