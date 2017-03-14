---
title: 文字提示
type: components
name: tooltip
cate: 其它
order: 506
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<tooltip tip="基本的tooltip"><ui.button title="鼠标放上去,可以看到提示" /></tooltip>
```

```javascript
var component = new NEKUI.Component({
    template: template
});
```
<!-- demo_end -->

### 位置

<!-- demo_start -->
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
var component = new NEKUI.Component({
    template: template
});
```
<!-- demo_end -->

## API
<a name="Tooltip"></a>

## Tooltip
**Kind**: global class  
**Extend**: Component  
<a name="new_Tooltip_new"></a>

### new Tooltip()

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options.data] | <code>object</code> |  | = 绑定属性 |
| [options.data.tip] | <code>string</code> |  | => 文字提示 |
| [options.data.placement] | <code>string</code> | <code>&quot;top&quot;</code> | => tips展示出的位置：top left right bottom topLeft topRight bottomLeft bottomRight leftTop leftBottom rightTop rightBottom |


{% raw %}
<script>
var index = 0;

    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<tooltip tip="基本的tooltip"><ui.button title="鼠标放上去,可以看到提示" /></tooltip>

      */});
      
var component = new NEKUI.Component({
    template: template
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
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

      */});
      
var component = new NEKUI.Component({
    template: template
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
</script>
{% endraw %}