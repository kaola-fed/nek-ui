---
title: 输入框
masonry: true
---

<!-- demo_start -->
### 基本形式
大部分属性的用法与`<input>`一致。

<div class="m-example"></div>

```xml
 <kl-input maxlength=6 placeholder="请输入" autofocus />
```
<!-- demo_end -->

<!-- demo_start -->
### 大小控制
可通过设置`size`来控制输入框的大小, 设置`width`来控制输入的宽度
* `sm`: height=24px
* `md`: height=32px

<div class="m-example"></div>

```xml
sm：
<kl-input size="sm" width="200px" placeholder="请输入"  />
&emsp;md：
<kl-input size="md" width="200px" placeholder="请输入"  />
```
<!-- demo_end -->

<!-- demo_start -->
### 单位
通过指定`unit`可在输入框末尾加上单位
<div class="m-example"></div>

```xml
速度：<kl-input value="340" unit="m/s" width="200px" />
&emsp;体重：<kl-input value="50" unit="kg" width="200px" />
```
<!-- demo_end -->

<!-- demo_start -->
### 表单项

<div class="m-example"></div>

```xml
<kl-form ref="form" labelSize="100px">
    <kl-form-item title="用户名" tip="请输入5-10位字母或者数字" required>
        <kl-input type="char" placeholder="请输入用户名" />
    </kl-form-item>
    <kl-form-item title="密码" tip="密码不能少于6位" required>
        <kl-input type="password" placeholder="请输入密码" />
    </kl-form-item>
    <kl-form-item title="年龄" required>
        <kl-input type="int" min=1 max=120 maxlength=3 placeholder="请输入年龄" />
    </kl-form-item>
    <kl-button type="secondary" title="提交" on-click={this.validate()} />
</kl-form>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    validate: function() {
        var $form = this.$refs.form;
        return $form.validate().success;
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 输入框类型
通知指定`type`值限制输入框输入的内容
* `char`: 任何字符串
* `int`: 整型数
* `float`：浮点数，可设置`decimalDigits`值来指定可输入几位小数

<div class="m-example"></div>

```xml
<kl-input class="f-mb10" type="char" placeholder="可输入任何字符串" value={char} />
<kl-input class="f-mb10" type="char" placeholder="可输入50个字以内的任何字符串" maxlength=50 value={char} />
<kl-input class="f-mb10" type="int" placeholder="可输入整数"  value={int} />
<kl-input class="f-mb10" type="float" placeholder="可输入浮点数"  value={float} />
<kl-input class="f-mb10" type="float" placeholder="可输入3位小数的浮点数" decimalDigits=3 value={float3} />
                
```
<!-- demo_end -->


<!-- demo_start -->
### 搜索(打开console,查看输出)

<div class="m-example"></div>

```xml
速度：<kl-input width="200px" on-search={this.onSearch($event)} />
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

<!-- demo_start -->
### 验证
通过`rules`设置验证规则
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
