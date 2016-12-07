### 示例
#### 基本形式

<div class="m-example"></div>

```xml
<tooltip tip=123 />鼠标放上去,可以看到提示
```

```javascript
var component = new RGUI.Component({
    template: template
});
```

#### 包裹元素

<div class="m-example"></div>

```xml
<tooltip tip=123>
    <button class="u-btn">保存提交</button>
</tooltip>
```

```javascript
var component = new RGUI.Component({
    template: template
});
```