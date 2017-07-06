---
title: 确认提示
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<kl-pop-confirm content="Are you sure delete this task?"><span>删除</span></kl-pop-confirm>
```

```javascript
var component = new REGUI.Component({
    template: template
});
```
<!-- demo_end -->

### 事件(打开console, 查看输出)

<!-- demo_start -->
<div class="m-example"></div>

```xml
<kl-pop-confirm content="Are you sure delete this task?" on-ok={this.onok()}>
    <button class="u-btn">保存提交</button>
</kl-pop-confirm>
```

```javascript
var component = new REGUI.Component({
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
<kl-pop-confirm contentTemplate={testTemplate} on-ok={this.onok($event)}>
    <button class="u-btn">保存提交</button>
</kl-pop-confirm>
```

```javascript
var component = new REGUI.Component({
    template: template,
    config: function() {
        this.data.testTemplate = '<kl-textarea required showTip=false value={remark} height=50 />';
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
    <kl-pop-confirm content="kl-pop-confirm箭头的位置在中间" placement="top"><xx-button title="top" /></kl-pop-confirm>
    <kl-pop-confirm content="kl-pop-confirm箭头的位置在左边" placement="topLeft"><xx-button title="topLeft" /></kl-pop-confirm>
    <kl-pop-confirm content="kl-pop-confirm箭头的位置在右边" placement="topRight"><xx-button title="topRight" /></kl-pop-confirm>
</div>
<div class="g-row">
    <kl-pop-confirm content="kl-pop-confirm箭头的位置在中间" placement="left"><xx-button title="left" /></kl-pop-confirm>
    <kl-pop-confirm content="kl-pop-confirm箭头的位置在上边" placement="leftTop"><xx-button title="leftTop" /></kl-pop-confirm>
    <kl-pop-confirm content="kl-pop-confirm箭头的位置在下边" placement="leftBottom"><xx-button title="leftBottom" /></kl-pop-confirm>
</div>
<div class="g-row">
    <kl-pop-confirm content="kl-pop-confirm箭头的位置在中间" placement="right"><xx-button title="right" /></kl-pop-confirm>
    <kl-pop-confirm content="kl-pop-confirm箭头的位置在上边" placement="rightTop"><xx-button title="rightTop" /></kl-pop-confirm>
    <kl-pop-confirm content="kl-pop-confirm箭头的位置在下边" placement="rightBottom"><xx-button title="rightBottom" /></kl-pop-confirm>
</div>
<div class="g-row">
    <kl-pop-confirm content="kl-pop-confirm箭头的位置在中间" placement="bottom"><xx-button title="bottom" /></kl-pop-confirm>
    <kl-pop-confirm content="kl-pop-confirm箭头的位置在左边" placement="bottomLeft"><xx-button title="bottomLeft" /></kl-pop-confirm>
    <kl-pop-confirm content="kl-pop-confirm箭头的位置在右边" placement="bottomRight"><xx-button title="bottomRight" /></kl-pop-confirm>
</div>
```

```javascript
var component = new REGUI.Component({
    template: template
});
```
<!-- demo_end -->
