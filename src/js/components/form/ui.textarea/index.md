---
title: 文本输入
---

## 代码演示

### 基本形式

大部分属性的用法与`<textarea>`一致。

<!-- demo_start -->
<div class="m-example"></div>

```xml
<label>备注：<ui.textarea placeholder="请输入备注" /></label>
```
<!-- demo_end -->

### 表单项

在表单中使用

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.form>
    <form.item cols="12" title="备注" hint="写点备注吧">
        <ui.textarea placeholder="请输入备注" />
    </form.item>
</ui.form>
```
<!-- demo_end -->

### 验证

<!-- demo_start -->
<div class="m-example"></div>

```xml
<label>邮箱：<ui.textarea rules={rules} maxlength=20 /></label>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        rules: [
            {type: 'isFilled', on: 'blur', message: '请输入邮箱！'},
            {type: 'isEmail', on: 'keyup+blur', message: '请输入正确的邮箱！'}
        ]
    }
});
```
<!-- demo_end -->
