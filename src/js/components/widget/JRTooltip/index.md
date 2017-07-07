---
title: 文字提示
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-tooltip tip="基本的tooltip"><jr-button title="鼠标放上去,可以看到提示" /></jr-tooltip>
```

```javascript
var component = new JRUI.Component({
    template: template
});
```
<!-- demo_end -->

### 位置

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class="g-row">
    <jr-tooltip tip="tooltip箭头的位置在中间" placement="top"><jr-button title="top" /></jr-tooltip>
    <jr-tooltip tip="tooltip箭头的位置在左边" placement="topLeft"><jr-button title="topLeft" /></jr-tooltip>
    <jr-tooltip tip="tooltip箭头的位置在右边" placement="topRight"><jr-button title="topRight" /></jr-tooltip>
</div>
<div class="g-row">
    <jr-tooltip tip="tooltip箭头的位置在中间" placement="left"><jr-button title="left" /></jr-tooltip>
    <jr-tooltip tip="tooltip箭头的位置在上边" placement="leftTop"><jr-button title="leftTop" /></jr-tooltip>
    <jr-tooltip tip="tooltip箭头的位置在下边" placement="leftBottom"><jr-button title="leftBottom" /></jr-tooltip>
</div>
<div class="g-row">
    <jr-tooltip tip="tooltip箭头的位置在中间" placement="right"><jr-button title="right" /></jr-tooltip>
    <jr-tooltip tip="tooltip箭头的位置在上边" placement="rightTop"><jr-button title="rightTop" /></jr-tooltip>
    <jr-tooltip tip="tooltip箭头的位置在下边" placement="rightBottom"><jr-button title="rightBottom" /></jr-tooltip>
</div>
<div class="g-row">
    <jr-tooltip tip="tooltip箭头的位置在中间" placement="bottom"><jr-button title="bottom" /></jr-tooltip>
    <jr-tooltip tip="tooltip箭头的位置在左边" placement="bottomLeft"><jr-button title="bottomLeft" /></jr-tooltip>
    <jr-tooltip tip="tooltip箭头的位置在右边" placement="bottomRight"><jr-button title="bottomRight" /></jr-tooltip>
</div>
```

```javascript
var component = new JRUI.Component({
    template: template
});
```
<!-- demo_end -->
