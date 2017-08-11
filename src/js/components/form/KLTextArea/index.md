---
title: 文本输入
masonry: true
---

<!-- demo_start -->
*基本形式*

大部分属性的用法与`<textarea>`一致。

<div class="m-example"></div>

```xml
<label>备注：<kl-textarea placeholder="请输入备注" /></label>
```
<!-- demo_end -->

<!-- demo_start -->
*表单项*

在表单中使用

<div class="m-example"></div>

```xml
<kl-form>
    <kl-form-item cols="12" title="备注" hint="写点备注吧">
        <kl-textarea placeholder="请输入备注" />
    </kl-form-item>
</kl-form>
```
<!-- demo_end -->

<!-- demo_start -->
*验证*
<div class="m-example"></div>

```xml
<label>邮箱：<kl-textarea rules={rules} maxlength=20 /></label>
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
*字数实时统计*
<div class="m-example"></div>

```xml
<label>
最大长度{maxLength}字，已经输入了{(value || '').length}字
<kl-textarea rules={rules} value={value} />
</label>
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
