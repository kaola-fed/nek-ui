### 示例
#### 基本形式

<div class="m-example"></div>

```xml
<popconfirm content="Are you sure delete this task?">删除<popconfirm>
```

```javascript
var component = new RGUI.Component({
    template: template
});
```

#### 包裹元素

<div class="m-example"></div>

```xml
<popconfirm content="Are you sure delete this task?">
    <button class="u-btn">保存提交</button>
<popconfirm>
```

```javascript
var component = new RGUI.Component({
    template: template
});
```

#### 位置

<div class="m-example"></div>

```xml
<popconfirm placement="br" content="Are you sure delete this task?">删除<popconfirm>
```

```javascript
var component = new RGUI.Component({
    template: template
});
```
