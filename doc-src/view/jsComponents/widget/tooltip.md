### 示例
#### 基本形式

<div class="m-example"></div>

```xml
<tooltip tip=123><ui.button title="鼠标放上去,可以看到提示" /></tooltip>
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
    <tooltip tip=123 placement="top"><ui.button title="top" /></tooltip>
    <tooltip tip=123 placement="topLeft"><ui.button title="topLeft" /></tooltip>
    <tooltip tip=123 placement="topRight"><ui.button title="topRight" /></tooltip>
</div>
<div class="g-row">
    <tooltip tip=123 placement="left"><ui.button title="left" /></tooltip>
    <tooltip tip=123 placement="leftTop"><ui.button title="leftTop" /></tooltip>
    <tooltip tip=123 placement="leftBottom"><ui.button title="leftBottom" /></tooltip>
</div>
<div class="g-row">
    <tooltip tip=123 placement="right"><ui.button title="right" /></tooltip>
    <tooltip tip=123 placement="rightTop"><ui.button title="rightTop" /></tooltip>
    <tooltip tip=123 placement="rightBottom"><ui.button title="rightBottom" /></tooltip>
</div>
<div class="g-row">
    <tooltip tip=123 placement="bottom"><ui.button title="bottom" /></tooltip>
    <tooltip tip=123 placement="bottomLeft"><ui.button title="bottomLeft" /></tooltip>
    <tooltip tip=123 placement="bottomRight"><ui.button title="bottomRight" /></tooltip>
</div>
```

```javascript
var component = new RGUI.Component({
    template: template
});
```
