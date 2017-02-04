---
title: 提示
type: components
order: 5.4
---

### 示例
#### 基本形式

<div class="m-example"></div>

```xml
<tooltip tip="基本的tooltip"><ui.button title="鼠标放上去,可以看到提示" /></tooltip>
```

```javascript
var component = new RGUI.Component({
    template: template
});
```

#### 位置

<div class="m-example"></div>

```xml
<div class="g-row">
    <tooltip tip="tooltip箭头的位置在中间" placement="top"><ui.button title="top" /></tooltip>
    <tooltip tip="tooltip箭头的位置在左边" placement="topLeft"><ui.button title="topLeft" /></tooltip>
    <tooltip tip="tooltip箭头的位置在右边" placement="topRight"><ui.button title="topRight" /></tooltip>
</div>
<div class="g-row">
    <tooltip tip="tooltip箭头的位置在中间" placement="left"><ui.button title="left" /></tooltip>
    <tooltip tip="tooltip箭头的位置在上边" placement="leftTop"><ui.button title="leftTop" /></tooltip>
    <tooltip tip="tooltip箭头的位置在下边" placement="leftBottom"><ui.button title="leftBottom" /></tooltip>
</div>
<div class="g-row">
    <tooltip tip="tooltip箭头的位置在中间" placement="right"><ui.button title="right" /></tooltip>
    <tooltip tip="tooltip箭头的位置在上边" placement="rightTop"><ui.button title="rightTop" /></tooltip>
    <tooltip tip="tooltip箭头的位置在下边" placement="rightBottom"><ui.button title="rightBottom" /></tooltip>
</div>
<div class="g-row">
    <tooltip tip="tooltip箭头的位置在中间" placement="bottom"><ui.button title="bottom" /></tooltip>
    <tooltip tip="tooltip箭头的位置在左边" placement="bottomLeft"><ui.button title="bottomLeft" /></tooltip>
    <tooltip tip="tooltip箭头的位置在右边" placement="bottomRight"><ui.button title="bottomRight" /></tooltip>
</div>
```

```javascript
var component = new RGUI.Component({
    template: template
});
```
