---
title: 拖出
is_new: true
---

## 示例
### 基本形式
<!-- demo_start -->
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
    background:#ff0000;
}
</style>
<div class="m-example"></div>

```xml
<jr-draggable><div class="u-color u-color-primary">拖我</div></jr-draggable>
```
<!-- demo_end -->

### 移动自身

如果DOM元素的CSS属性`position`默认为`static`，则在拖拽时会自动设置为`relative`。

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-draggable proxy="self"><div class="u-color u-color-info">自身</div></jr-draggable>
```
<!-- demo_end -->

### 设置代理
<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-draggable>
    <div class="u-color u-color-primary">拖我</div>
    <jr-draggable-proxy>
        <div class="u-color u-color-warning">代理</div>
    </jr-draggable-proxy>
</jr-draggable>
```
<!-- demo_end -->
### 事件

请打开浏览器的控制台查看结果。

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-draggable
    on-dragstart={console.log('on-dragstart:', '$event:', $event)}
    on-dragend={console.log('on-dragend:', '$event:', $event)}>
    <div class="u-color u-color-primary">拖我</div>
</jr-draggable>
```
<!-- demo_end -->

### 可拖动的弹窗
<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-button class="u-btn u-btn-primary" on-click={visible = true}>显示弹窗</jr-button>
<div class="m-modal" r-hide={!visible}>
    <div class="modal_dialog" ref="modalDialog">
        <jr-draggable proxy={this.$refs.modalDialog}>
        <div class="modal_hd">
            <a class="modal_close" on-click={visible = false}><i class="u-icon u-icon-close"></i></a>
            <h3 class="modal_title">提示</h3>
        </div>
        </jr-draggable>
        <div class="modal_bd">请拖动标题栏</div>
        <div class="modal_ft">
            <jr-button class="u-btn u-btn-primary" on-click={visible = false}>确定</jr-button>
        </div>
    </div>
</div>
```

```javascript
let component = new JRUI.Component({
    template,
    data: {visible: false}
});
```
<!-- demo_end -->
### 拖拽约束

<!-- demo_start -->
<style>
.m-well {
    position: relative; 
    overflow: hidden;
    width: 220px;
    height: 220px;
    background: #fafafa;
     border: 1px solid #eee; 
     color: #999; 
     text-align: center;
     }
.u-ball {
    position: absolute;
     left: 100px; 
     top: 100px; 
     width: 20px; 
     height: 20px; 
     border-radius: 100%; 
     background: #00c0ef;
     }
</style>
<div class="m-example"></div>

```xml
<div class="g-row">
    <div class="g-col g-col-4">
        <div class="m-well">
            <jr-draggable proxy="self" ref="draggable0"><div class="u-ball"></div></jr-draggable>
            水平约束
        </div>
    </div>
    <div class="g-col g-col-4">
        <div class="m-well">
            <jr-draggable proxy="self" ref="draggable1"><div class="u-ball"></div></jr-draggable>
            垂直约束
        </div>
    </div>
    <div class="g-col g-col-4">
        <div class="m-well">
            <jr-draggable proxy="self" ref="draggable2"><div class="u-ball"></div></jr-draggable>
            45度约束
        </div>
    </div>
</div>
<div class="g-row">
    <div class="g-col g-col-4">
        <div class="m-well">
            <jr-draggable proxy="self" ref="draggable3"><div class="u-ball"></div></jr-draggable>
            范围约束
        </div>
    </div>
    <div class="g-col g-col-4">
        <div class="m-well">
            <jr-draggable proxy="self" ref="draggable4"><div class="u-ball"></div></jr-draggable>
            网格约束
        </div>
    </div>
    <div class="g-col g-col-4">
        <div class="m-well">
            <jr-draggable proxy="self" ref="draggable5"><div class="u-ball" style="left: 160px; top: 120px;"></div></jr-draggable>
            圆约束
        </div>
    </div>
</div>
```

```javascript
let component = new JRUI.Component({
    template,
    init() {
        let free = this.$refs.draggable0.restrict;

        this.$refs.draggable0.restrict = (params) =>
            ({left: params.startLeft + params.dragX, top: params.startTop});
        this.$refs.draggable1.restrict = (params) =>
            ({left: params.startLeft, top: params.startTop + params.dragY});
        this.$refs.draggable2.restrict = (params) => {
            let min = Math.min(params.dragX, params.dragY);
            return {left: params.startLeft + min, top: params.startTop + min};
        };
        this.$refs.draggable3.restrict = (params) => {
            let next = free(params);

            let min = 80, max = 120;
            next.left = Math.min(Math.max(min, next.left), max);
            next.top = Math.min(Math.max(min, next.top), max);

            return next;
        };
        this.$refs.draggable4.restrict = (params) => {
            let next = free(params);

            let grid = 40;
            next.left = Math.round(next.left/grid)*grid;
            next.top = Math.round(next.top/grid)*grid;
            
            return next;
        };
        this.$refs.draggable5.restrict = (params) => {
            let next = free(params);

            let nextNorm = Math.sqrt(next.left*next.left + next.top*next.top);
            let radius = 20;
            next.left *= radius/nextNorm;
            next.top *= radius/nextNorm;
            
            return next;
        };
    }
});
```
<!-- demo_end -->



