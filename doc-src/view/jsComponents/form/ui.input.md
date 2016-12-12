### 示例

#### 基本形式

大部分属性的用法与`<input>`一致。

<div class="m-example"></div>

```xml
 <ui.input type="password" maxlength=6 placeholder="请输入密码" autofocus />
```

#### 表单项

在表单中使用

<div class="m-example"></div>

```xml
<ui.form>
    <form.item cols="6" title="用户名" tip="用户名的用途" required>
        <ui.input type="password" maxlength=6 placeholder="请输入密码" autofocus required />
    </form.item>
    <form.item cols="6" labelCols=4 title="密码" tip="密码的用途">
        <ui.input type="password" maxlength=6 placeholder="请输入密码" autofocus />
    </form.item>
</ui.form>
```

#### 单位

<div class="m-example"></div>

```xml
<label>速度：<ui.input width="smw" value="340" unit="m/s" /></label>
```

#### 验证

<div class="m-example"></div>

```xml
<label>邮箱：<ui.input rules={rules} maxlength=20 /></label>
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        rules: [
            {type: 'isFilled', on: 'blur', message: '请输入邮箱！'},
            {type: 'isEmail', on: 'keyup+blur', message: '请输入正确的邮箱！'}
        ]
    }
});
```
