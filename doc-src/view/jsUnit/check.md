### 示例
#### 基本形式

<div class="m-example"></div>

```xml
<check name="多选按钮" />
```

#### 表单项

在表单中使用

<div class="m-example"></div>

```xml
<ui.form>
    <ui.field cols="12" title="用户名" hint="用户名的用途">
        <check name="多选按钮1" />
        <check name="多选按钮2" />
    </ui.field>
</ui.form>
```

#### 半选状态

<div class="m-example"></div>

```xml
<check name="半选状态" checked={test} />
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        test: null
    }
});
```

#### 禁用组件

<div class="m-example"></div>

```xml
<check name="多选按钮" disabled />
```
