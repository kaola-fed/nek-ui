---
title: 文字提示
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<kl-tooltip tip="基本的tooltip"><xx-button title="鼠标放上去,可以看到提示" /></kl-tooltip>
```

```javascript
var component = new REGUI.Component({
    template: template
});
```
<!-- demo_end -->

### 位置

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class="g-row">
    <kl-tooltip tip="tooltip箭头的位置在中间" placement="top"><xx-button title="top" /></kl-tooltip>
    <kl-tooltip tip="tooltip箭头的位置在左边" placement="topLeft"><xx-button title="topLeft" /></kl-tooltip>
    <kl-tooltip tip="tooltip箭头的位置在右边" placement="topRight"><xx-button title="topRight" /></kl-tooltip>
</div>
<div class="g-row">
    <kl-tooltip tip="tooltip箭头的位置在中间" placement="left"><xx-button title="left" /></kl-tooltip>
    <kl-tooltip tip="tooltip箭头的位置在上边" placement="leftTop"><xx-button title="leftTop" /></kl-tooltip>
    <kl-tooltip tip="tooltip箭头的位置在下边" placement="leftBottom"><xx-button title="leftBottom" /></kl-tooltip>
</div>
<div class="g-row">
    <kl-tooltip tip="tooltip箭头的位置在中间" placement="right"><xx-button title="right" /></kl-tooltip>
    <kl-tooltip tip="tooltip箭头的位置在上边" placement="rightTop"><xx-button title="rightTop" /></kl-tooltip>
    <kl-tooltip tip="tooltip箭头的位置在下边" placement="rightBottom"><xx-button title="rightBottom" /></kl-tooltip>
</div>
<div class="g-row">
    <kl-tooltip tip="tooltip箭头的位置在中间" placement="bottom"><xx-button title="bottom" /></kl-tooltip>
    <kl-tooltip tip="tooltip箭头的位置在左边" placement="bottomLeft"><xx-button title="bottomLeft" /></kl-tooltip>
    <kl-tooltip tip="tooltip箭头的位置在右边" placement="bottomRight"><xx-button title="bottomRight" /></kl-tooltip>
</div>
```

```javascript
var component = new REGUI.Component({
    template: template
});
```
<!-- demo_end -->
