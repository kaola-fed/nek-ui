---
title: 文本输入
---

## 代码演示

### 基本形式

大部分属性的用法与`<textarea>`一致。

<!-- demo_start -->
<div class="m-example"></div>

```xml
<label>备注：<jr-textarea placeholder="请输入备注" /></label>
```
<!-- demo_end -->

### 表单项

在表单中使用

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-form>
    <jr-form-item cols="12" title="备注" hint="写点备注吧">
        <jr-textarea placeholder="请输入备注" />
    </jr-form-item>
</jr-form>
```
<!-- demo_end -->

### 验证

<!-- demo_start -->
<div class="m-example"></div>

```xml
<label>邮箱：<jr-textarea rules={rules} maxlength=20 /></label>
```

```javascript
var component = new JRUI.Component({
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

### 字数实时统计

<!-- demo_start -->
<div class="m-example"></div>

```xml
<label>
最大长度{maxLength}字，已经输入了{(value || '').length}字
<jr-textarea rules={rules} value={value} />
</label>
```

```javascript
var component = new JRUI.Component({
    template: template,
    data: {
        maxLength: 10,
        value: '',
        rules: [
            {method: function(text) {
                return (text || '').length <= component.data.maxLength;
            }, on: 'keyup+blur', message: '字数超出限制！'}
        ]
    }
});
```
<!-- demo_end -->
