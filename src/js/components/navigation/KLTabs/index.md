---
title: 选项卡
---

<!-- demo_start -->
### 基本形式

配置title
<div class="m-example"></div>

```xml
<kl-tabs>
    <kl-tab title="Tab1">Content1</kl-tab>
    <kl-tab title="Tab2">Content2</kl-tab>
    <kl-tab title="Tab3">Content3</kl-tab>
    <kl-tab title="Tab4">Content4</kl-tab>
</kl-tabs>
```
<!-- demo_end -->

<!-- demo_start -->
### 标题模板自定义

<div class="m-example"></div>

```xml
<kl-tabs titleTemplate={@(this.titleTemplate)}>
    <kl-tab title="Tab1">Content1</kl-tab>
    <kl-tab title="Tab2" mark={true}>Content2</kl-tab>
    <kl-tab title="Tab3" mark={true}>Content3</kl-tab>
    <kl-tab title="Tab4">Content4</kl-tab>
</kl-tabs>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    titleTemplate: `
{item.data.title} {#if item.data.mark}<kl-text type="success"><kl-icon type="check-circle" /></kl-text>{/if}`
});
```
<!-- demo_end -->

<!-- demo_start -->
### 默认选中Tab

需要同时设置 `tabs` 的 `defaultKey` 和 `tab` 的 `key`
<div class="m-example"></div>

```xml
<kl-tabs defaultKey={defaultKey}>
    <kl-tab title="Tab1" key=0>Content1</kl-tab>
    <kl-tab title="Tab2" key=1>Content2</kl-tab>
    <kl-tab title="Tab3" key=2>Content3</kl-tab>
    <kl-tab title="Tab4" key=3>Content4</kl-tab>
</kl-tabs>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        defaultKey: 1
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 切换重新渲染

on-change中可以做重新渲染逻辑
<div class="m-example"></div>

```xml
<kl-tabs on-change={this.tabChange($event)}>
    <kl-tab title="Tab1" key=0>Content1</kl-tab>
    <kl-tab title="Tab2" key=1>Content2</kl-tab>
    <kl-tab title="Tab3" key=2>Content3</kl-tab>
    <kl-tab title="Tab4" key=3>Content4</kl-tab>
</kl-tabs>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    tabChange: function(event){
        var key = event.key;
        console.log(event)
        //TODO
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 禁用某一项，禁用组件

`kl-tabs`标签和`kl-tab`标签均可设置disabled属性，控制整个tabs禁用或某个tab禁用

`kl-tabs`标签还可以设置visible属性，控制整个tabs显示或隐藏

<div class="m-example"></div>

```xml
<kl-row>
    <kl-col span=6>
        <kl-tabs>
            <kl-tab title="Tab1">Content1</kl-tab>
            <kl-tab title="Tab2">Content2</kl-tab>
            <kl-tab title="Tab3" disabled>Content3</kl-tab>
            <kl-tab title="Tab4">Content4</kl-tab>
        </kl-tabs>
    </kl-col>
    <kl-col span=6>
        <kl-tabs disabled>
            <kl-tab title="Tab1">Content1</kl-tab>
            <kl-tab title="Tab2">Content2</kl-tab>
            <kl-tab title="Tab3">Content3</kl-tab>
            <kl-tab title="Tab4">Content4</kl-tab>
        </kl-tabs>
    </kl-col>
</kl-row>
```
<!-- demo_end -->

<!-- demo_start -->
### 左右滚动箭头

当tab过多时会自动出现左右滚动箭头（与class: m-tabs-center冲突）

当DOM加载比较慢时，可能会出现初始左右滚动箭头不出现。是由于regular无法获取dom加载完成事件导致，待解决

<div class="m-example"></div>

```xml
<kl-row>
    <kl-col span=4>
        <kl-tabs>
            <kl-tab title="Tab1">Content1</kl-tab>
            <kl-tab title="Tab2">Content2</kl-tab>
            <kl-tab title="Tab3">Content3</kl-tab>
            <kl-tab title="Tab4">Content4</kl-tab>
            <kl-tab title="Tab5">Content5</kl-tab>
            <kl-tab title="Tab6">Content6</kl-tab>
        </kl-tabs>
    </kl-col>
</kl-row>
```
<!-- demo_end -->

<!-- demo_start -->
### 事件

请打开浏览器的控制台查看结果。

<div class="m-example"></div>

```xml
<kl-tabs on-select={this.tabSelected($event)} on-change={this.tabChanged($event)}>
    <kl-tab title="Tab1" key="1">Content1</kl-tab>
    <kl-tab title="Tab2" key="2">Content2</kl-tab>
    <kl-tab title="Tab3" key="3">Content3</kl-tab>
    <kl-tab title="Tab4" key="4">Content4</kl-tab>
</kl-tabs>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    tabSelected: function(event){
        console.log('selected: ', event.selected);
    },
    tabChanged: function(event){
        console.log('changed: ', event.key);
    }
});
```
<!-- demo_end -->