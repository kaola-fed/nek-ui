### 示例
#### 基本形式

<div class="m-example"></div>

```xml
<pop.confirm content="Are you sure delete this task?"><span>删除</span></pop.confirm>
```

```javascript
var component = new RGUI.Component({
    template: template
});
```

#### 包裹元素

<div class="m-example"></div>

```xml
<pop.confirm content="Are you sure delete this task?">
    <button class="u-btn">保存提交</button>
</pop.confirm>
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
    <pop.confirm content="pop.confirm箭头的位置在中间" placement="top"><ui.button title="top" /></pop.confirm>
    <pop.confirm content="pop.confirm箭头的位置在左边" placement="topLeft"><ui.button title="topLeft" /></pop.confirm>
    <pop.confirm content="pop.confirm箭头的位置在右边" placement="topRight"><ui.button title="topRight" /></pop.confirm>
</div>
<div class="g-row">
    <pop.confirm content="pop.confirm箭头的位置在中间" placement="left"><ui.button title="left" /></pop.confirm>
    <pop.confirm content="pop.confirm箭头的位置在上边" placement="leftTop"><ui.button title="leftTop" /></pop.confirm>
    <pop.confirm content="pop.confirm箭头的位置在下边" placement="leftBottom"><ui.button title="leftBottom" /></pop.confirm>
</div>
<div class="g-row">
    <pop.confirm content="pop.confirm箭头的位置在中间" placement="right"><ui.button title="right" /></pop.confirm>
    <pop.confirm content="pop.confirm箭头的位置在上边" placement="rightTop"><ui.button title="rightTop" /></pop.confirm>
    <pop.confirm content="pop.confirm箭头的位置在下边" placement="rightBottom"><ui.button title="rightBottom" /></pop.confirm>
</div>
<div class="g-row">
    <pop.confirm content="pop.confirm箭头的位置在中间" placement="bottom"><ui.button title="bottom" /></pop.confirm>
    <pop.confirm content="pop.confirm箭头的位置在左边" placement="bottomLeft"><ui.button title="bottomLeft" /></pop.confirm>
    <pop.confirm content="pop.confirm箭头的位置在右边" placement="bottomRight"><ui.button title="bottomRight" /></pop.confirm>
</div>
```

```javascript
var component = new RGUI.Component({
    template: template
});
```
