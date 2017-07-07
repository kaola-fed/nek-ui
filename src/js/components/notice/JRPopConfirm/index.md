---
title: 确认提示
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-pop-confirm content="Are you sure delete this task?"><span>删除</span></jr-pop-confirm>
```

```javascript
var component = new JRUI.Component({
    template: template
});
```
<!-- demo_end -->

### 事件(打开console, 查看输出)

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-pop-confirm content="Are you sure delete this task?" on-ok={this.onok()}>
    <button class="u-btn">保存提交</button>
</jr-pop-confirm>
```

```javascript
var component = new JRUI.Component({
    template: template,
    onok: function() {
        console.log(123);
    }
});
```
<!-- demo_end -->

### 自定义模板(打开console, 查看输出)

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-pop-confirm contentTemplate={testTemplate} on-ok={this.onok($event)}>
    <button class="u-btn">保存提交</button>
</jr-pop-confirm>
```

```javascript
var component = new JRUI.Component({
    template: template,
    config: function() {
        this.data.testTemplate = '<jr-textarea required showTip=false value={remark} height=50 />';
    },
    onok: function(json) {
        console.log(json.data.remark);
        console.log(json.sender);
    }
});
```
<!-- demo_end -->

### 位置

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class="g-row">
    <jr-pop-confirm content="jr-pop-confirm箭头的位置在中间" placement="top"><jr-button title="top" /></jr-pop-confirm>
    <jr-pop-confirm content="jr-pop-confirm箭头的位置在左边" placement="topLeft"><jr-button title="topLeft" /></jr-pop-confirm>
    <jr-pop-confirm content="jr-pop-confirm箭头的位置在右边" placement="topRight"><jr-button title="topRight" /></jr-pop-confirm>
</div>
<div class="g-row">
    <jr-pop-confirm content="jr-pop-confirm箭头的位置在中间" placement="left"><jr-button title="left" /></jr-pop-confirm>
    <jr-pop-confirm content="jr-pop-confirm箭头的位置在上边" placement="leftTop"><jr-button title="leftTop" /></jr-pop-confirm>
    <jr-pop-confirm content="jr-pop-confirm箭头的位置在下边" placement="leftBottom"><jr-button title="leftBottom" /></jr-pop-confirm>
</div>
<div class="g-row">
    <jr-pop-confirm content="jr-pop-confirm箭头的位置在中间" placement="right"><jr-button title="right" /></jr-pop-confirm>
    <jr-pop-confirm content="jr-pop-confirm箭头的位置在上边" placement="rightTop"><jr-button title="rightTop" /></jr-pop-confirm>
    <jr-pop-confirm content="jr-pop-confirm箭头的位置在下边" placement="rightBottom"><jr-button title="rightBottom" /></jr-pop-confirm>
</div>
<div class="g-row">
    <jr-pop-confirm content="jr-pop-confirm箭头的位置在中间" placement="bottom"><jr-button title="bottom" /></jr-pop-confirm>
    <jr-pop-confirm content="jr-pop-confirm箭头的位置在左边" placement="bottomLeft"><jr-button title="bottomLeft" /></jr-pop-confirm>
    <jr-pop-confirm content="jr-pop-confirm箭头的位置在右边" placement="bottomRight"><jr-button title="bottomRight" /></jr-pop-confirm>
</div>
```

```javascript
var component = new JRUI.Component({
    template: template
});
```
<!-- demo_end -->
