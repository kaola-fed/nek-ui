---
title: 输入框
---

## 代码演示

### 基本形式

大部分属性的用法与`<input>`一致。

<!-- demo_start -->
<div class="m-example"></div>

```xml
 <kl-input type="password" maxlength=6 placeholder="请输入密码" autofocus />
```
<!-- demo_end -->

### 表单项

在表单中使用

<!-- demo_start -->
<div class="m-example"></div>

```xml
<kl-form>
    <kl-form-item cols="6" title="用户名" tip="用户名的用途" required>
        <kl-input type="password" maxlength=6 placeholder="请输入密码" autofocus required />
    </kl-form-item>
    <kl-form-item cols="6" labelCols=4 title="密码" tip="密码的用途">
        <kl-input type="password" maxlength=6 placeholder="请输入密码" autofocus />
    </kl-form-item>
</kl-form>
```
<!-- demo_end -->

### 单位

<!-- demo_start -->
<div class="m-example"></div>

```xml
<label>速度：<kl-input width="smw" value="340" unit="m/s" /></label>
```
<!-- demo_end -->

### 搜索(打开console,查看输出)

<!-- demo_start -->
<div class="m-example"></div>

```xml
<label>速度：<kl-input width="smw" on-search={this.onSearch($event)} /></label>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    onSearch: function(json) {
        console.log(json);
    }
});
```
<!-- demo_end -->

### type=int/float, 固定输入小数位

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class="g-row">
    <div class="g-col g-col-6">
        <kl-input type="int" placeholder="请输入整数" value={value1} />
        {value1}
    </div>
    <div class="g-col g-col-6">
        <kl-input type="float" placeholder="保留三位小数" decimalDigits=3 value={value2} />
        {value2}
    </div>
</div>
```
<!-- demo_end -->

### 验证

<!-- demo_start -->
<div class="m-example"></div>

```xml
<label>邮箱：<kl-input rules={rules} maxlength=20 /></label>
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
