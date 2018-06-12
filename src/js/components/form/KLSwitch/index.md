---
title: 开关
masonry: false
---

<!-- demo_start -->
### 基本形式
<div class="m-example"></div>

```xml
<kl-switch value={value} />
&emsp; 当前的value值: {value}
```
<!-- demo_end -->

<!-- demo_start -->
### 禁用
<div class="m-example"></div>

```xml
<kl-switch disabled />
<kl-switch disabled value={value} />
<kl-switch disabled checkedText="开" unCheckedText="关" />
<kl-switch disabled value={value} checkedText="开" unCheckedText="关" />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        value: true
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 扩展value值
<div class="m-example"></div>

```xml
<kl-switch checkedValue=10 unCheckedValue=20 value={value} />
&emsp;当前的value值: {value}
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        value: 10
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 开关描述
<div class="m-example"></div>

```xml
文字:
<kl-switch value={value1} checkedText="开" unCheckedText="关" />
&emsp;图标:
<kl-switch value={value2} checkedText="<kl-icon type='tick' />" unCheckedText="<kl-icon type='cancel' />" />
```
<!-- demo_end -->

<!-- demo_start -->
### 小尺寸
<div class="m-example"></div>

```xml
<kl-switch value={value1}  size="sm" />
```
<!-- demo_end -->