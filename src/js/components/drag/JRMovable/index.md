---
title: 移动
is_new: true
---

## 示例
### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

<style>
.u-color {
    background: #fff;
    color: #fff;
    height: 128px;
    width: 128px;
    vertical-align: middle;
    display: inline-block;
    text-align: center;
    line-height: 128px;
}
.u-color-primary {
    background: #3c8dbc;
}
.u-color-warning{
    background:yellow;
}
.u-color-success{
    background:green;
}
.u-color-error{
    background:#ff0000;
}
.m-well {display: inline-block; vertical-align: bottom; width: 300px; height: 300px; padding: 20px; background: #f4f4f4; border: 4px solid #ccc; position: relative;}
.m-well .u-color {border: 2px solid black;}
.u-slider {position: relative; height: 6px; line-height: 6px; background: #e6e6e6;}
.u-slider .slider_bar {float: left; height: 6px; line-height: 6px; background: #67aaf5;}
.u-slider .slider_btn {
        box-sizing: border-box; position: absolute; left: 0;
        margin-top: -9px; margin-left: -7px; width: 14px; height: 24px;
        background: #fff; border: 1px solid #ccc; border-radius: 2px;
    }
    .m-pallette {}
.m-pallette .pallette_SV {position: relative; overflow: hidden; background: #f09; width: 256px; height: 256px;}
.m-pallette .pallette_SV:before, .m-pallette .pallette_SV:after {
    content: ''; display: block;
    position: absolute; left: 0; right: 0; top: 0; bottom: 0;
}
.m-pallette .pallette_SV:before {background: linear-gradient(to right, white, rgba(255, 255, 255, 0));}
.m-pallette .pallette_SV:after {background: linear-gradient(to top, black, rgba(0, 0, 0, 0));}
.m-pallette .pallette_SV_btn {box-sizing: border-box; position: absolute; z-index: 5; margin-left: -8px; margin-top: -8px; width: 16px; height: 16px; border: 1px solid white; border-radius: 100%; box-shadow: 0 0 1px rgba(0, 0, 0, .5), inset 0 0 1px rgba(0, 0, 0, .5);}
.m-panel {width: 100%; height: 100%; box-sizing: border-box;}
.m-resizable {position: relative;}
.m-resizable .resizable_handle {
    cursor: nwse-resize;
    position: absolute; z-index: 20; left: 100%; top: 100%;
    width: 10px; height: 10px;
    margin-left: -5px; margin-top: -5px;
}
</style>

```xml
<jr-movable><div class="u-color u-color-primary">拖我</div></jr-movable>
```
<!-- demo_end -->

### 轴向约束

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-movable axis="x"><div class="u-color u-color-info">水平</div></jr-movable>
<jr-movable axis="y"><div class="u-color u-color-warning">垂直</div></jr-movable>
```
<!-- demo_end -->

### 网格约束
<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-movable grid={ { x: 40, y: 30 } }><div class="u-color u-color-success">网格</div></jr-movable>
```
<!-- demo_end -->
### 范围约束
<!-- demo_start -->
<div class="m-example"></div>


```xml
<div class="m-well">
    <jr-movable range={ { left: 0, top: 0, right: 200, bottom: 200 } }><div class="u-color u-color-info">object</div></jr-movable>
</div>
<div class="m-well">
    <jr-movable range="offsetParent"><div class="u-color u-color-info" style="position: absolute;">offsetParent</div></jr-movable>
</div>
```
<!-- demo_end -->
### 范围约束模式
<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class="m-well">
    <jr-movable range="offsetParent" rangeMode="inside"><div class="u-color u-color-info" style="position: absolute;">inside</div></jr-movable>
</div>
<div class="m-well">
    <jr-movable range="offsetParent" rangeMode="center"><div class="u-color u-color-info" style="position: absolute; margin-left: -68px; margin-top: -68px;">center</div></jr-movable>
</div>
```
<!-- demo_end -->
### Slider

这是Slider的一个简单示例。
<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class="g-row">
    <div class="g-col g-col-6">
        <div class="u-slider">
            <div class="slider_bar" style="width: {percent}%"></div>
            <jr-movable axis="y" range="offsetParent" rangeMode="center"
                on-drag={this._onDrag($event)}>
                <div class="slider_btn" style="left: {percent}%"></div>
            </jr-movable>
        </div>
    </div>
</div>
```

```javascript
let component = new JRUI.Component({
    template: template,
    data: {percent: 20},
    _onDrag($event) {
        this.data.percent = $event.left/$event.range.right*100;
    }
});

```
<!-- demo_end -->
### Pallette

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class="m-pallette">
    <div class="pallette_SV">
        <jr-movable range="offsetParent" rangeMode="center">
            <div class="pallette_SV_btn" style="left: 100px; top: 100px;"></div>
        </jr-movable>
    </div>
</div>
```
<!-- demo_end -->

### Resizable
<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class="m-resizable" style="width: {width}px; height: {height}px;">
    <div class="m-panel m-panel-info">
        <div class="panel_bd">Content</div>
    </div>
    <jr-movable range={ { left: 100, top: 100, right: 300, bottom: 200 } } rangeMode="center" on-drag={this._onDrag($event)}>
        <div class="resizable_handle"></div>
    </jr-movable>
</div>
```

```javascript
let component = new JRUI.Component({
    template: template,
    data: {
        width: 240,
        height: 120
    },
    _onDrag($event) {
        this.data.width = $event.left;
        this.data.height = $event.top;
    }
});
```
<!-- demo_end -->
