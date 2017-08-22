---
title: 文字提示
masonry: true
---

<!-- demo_start -->
*基本形式*

<div class="m-example"></div>

```xml
<kl-tooltip tip="基本的tooltip">
    <kl-button title="鼠标放上去,可以看到提示" />
</kl-tooltip>
```

```javascript
var component = new NEKUI.Component({
    template: template
});
```
<!-- demo_end -->

<!-- demo_start -->
*位置*

<div class="m-example"></div>

```xml
<div class="g-row">
    <kl-tooltip tip="tooltip箭头的位置在中间" placement="top"><kl-button title="top" /></kl-tooltip>
    <kl-tooltip tip="tooltip箭头的位置在左边" placement="topLeft"><kl-button title="topLeft" /></kl-tooltip>
    <kl-tooltip tip="tooltip箭头的位置在右边" placement="topRight"><kl-button title="topRight" /></kl-tooltip>
</div>
<div class="g-row">
    <kl-tooltip tip="tooltip箭头的位置在中间" placement="left"><kl-button title="left" /></kl-tooltip>
    <kl-tooltip tip="tooltip箭头的位置在上边" placement="leftTop"><kl-button title="leftTop" /></kl-tooltip>
    <kl-tooltip tip="tooltip箭头的位置在下边" placement="leftBottom"><kl-button title="leftBottom" /></kl-tooltip>
</div>
<div class="g-row">
    <kl-tooltip tip="tooltip箭头的位置在中间" placement="right"><kl-button title="right" /></kl-tooltip>
    <kl-tooltip tip="tooltip箭头的位置在上边" placement="rightTop"><kl-button title="rightTop" /></kl-tooltip>
    <kl-tooltip tip="tooltip箭头的位置在下边" placement="rightBottom"><kl-button title="rightBottom" /></kl-tooltip>
</div>
<div class="g-row">
    <kl-tooltip tip="tooltip箭头的位置在中间" placement="bottom"><kl-button title="bottom" /></kl-tooltip>
    <kl-tooltip tip="tooltip箭头的位置在左边" placement="bottomLeft"><kl-button title="bottomLeft" /></kl-tooltip>
    <kl-tooltip tip="tooltip箭头的位置在右边" placement="bottomRight"><kl-button title="bottomRight" /></kl-tooltip>
</div>
```

```javascript
var component = new NEKUI.Component({
    template: template
});
```
<!-- demo_end -->
