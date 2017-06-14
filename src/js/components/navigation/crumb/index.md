---
title: 面包屑组件
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.crumb>
    <crumb.item>一级页面</crumb.item>
    <crumb.item>二级页面</crumb.item>
</ui.crumb>
```
<!-- demo_end -->

### 带链接的形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.crumb>
    <crumb.item href="//www.kaola.com">一级页面</crumb.item>
    <crumb.item href="//www.kaola.com">二级页面</crumb.item>
</ui.crumb>
```
<!-- demo_end -->

### 自定义分隔符

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.crumb>
    <crumb.item separator="<i class='u-icon u-icon-angle-right'></i>">一级页面</crumb.item>
    <crumb.item separator="<i class='u-icon u-icon-angle-right'></i>">二级页面</crumb.item>
</ui.crumb>
```
<!-- demo_end -->

### 支持自定义

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.crumb isShowHome={false} class="m-crumb2">
    <crumb.item separator="">Home</crumb.item>
    <crumb.item separator=""><div>/自定义的结构一</div></crumb.item>
    <crumb.item separator=""><div>/自定义的结构二</div></crumb.item>
</ui.crumb>
```
<!-- demo_end -->
