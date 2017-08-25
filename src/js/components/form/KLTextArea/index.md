---
title: 文本输入
masonry: true
---

<!-- demo_start -->
### 基本形式

大部分属性的用法与`<textarea>`一致。

<div class="m-example"></div>

```xml
<kl-textarea  placeholder="请输入备注" />
```
<!-- demo_end -->

<!-- demo_start -->
### 表单项

在表单中使用

<div class="m-example"></div>

```xml
<kl-form>
    <kl-form-item title="备注">
        <kl-textarea placeholder="请输入备注" />
    </kl-form-item>
</kl-form>
```
<!-- demo_end -->

<!-- demo_start -->
### 验证
通过指定`rules`规则对文本进行验证
<div class="m-example"></div>

```xml
<kl-textarea rules={rules} placeholder="请输入邮箱, 失去焦点时验证" />
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

<!-- demo_start -->
### 限制输入长度
通过指定`maxlength`来限制输入内容长度
<div class="m-example"></div>

```xml
<kl-textarea  maxlength=100 placeholder="请输入备注" />
```
<!-- demo_end -->

<!-- demo_start -->
### 高宽设置
通过`height`和`width`设置输入框的高和宽
<div class="m-example"></div>

```xml
<kl-textarea height=100 width=400 placeholder="请输入备注"/>
```
<!-- demo_end -->

<!-- demo_start -->
### 字数实时统计
<div class="m-example"></div>

```xml
<p>最大长度{maxLength}字，已经输入了{(value || '').length}字</p>
<kl-textarea rules={rules} value={value} placeholder="请输入内容" />

```

```javascript
var component = new NEKUI.Component({
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
