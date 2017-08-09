---
title: 开关
is_new: true
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-switch></jr-switch>
<jr-switch width=60 open={false}></jr-switch>
<jr-switch width=70 showText={false}></jr-switch>
```
```javascript
var component = new JRUI.Component({
    template: template
});
```
<!-- demo_end -->

### 自定义背景色

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-switch onColor='blue' offColor='#e96900'></jr-switch>
```
```javascript
var component = new JRUI.Component({
    template: template
});
```
<!-- demo_end -->

### 自定义文字

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-switch onText='开' offText='关'></jr-switch>
```
```javascript
var component = new JRUI.Component({
    template: template
});
```
<!-- demo_end -->

### 禁用

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-switch disabled={true}></jr-switch>
```
```javascript
var component = new JRUI.Component({
    template: template
});
```
<!-- demo_end -->