---
title: 输入框
masonry: true
---

<!-- demo_start -->
### 基本形式
大部分属性的用法与`<input>`一致。

<div class="m-example"></div>

```xml
 <kl-input  maxlength=6 placeholder="请输入" autofocus />
```
<!-- demo_end -->

<!-- demo_start -->
### 大小控制
通过设置`size`来控制输入框的大小
* `sm`: height=24px
* `md`: height=32px

通过设置`width`来控制输入的宽度，

<div class="m-example"></div>

```xml
<kl-row>
    <kl-col span=12>
        sm: <kl-input type="char" size="sm" placeholder="请输入"  />
        md: <kl-input type="char" size="md" placeholder="请输入"  />
      </kl-col>
</kl-row>
 
```
<!-- demo_end -->

<!-- demo_start -->
### 单位
通过指定`unit`来再输入框末尾加上单位
<div class="m-example"></div>

```xml
<label>速度：<kl-input value="340" unit="m/s" /></label>
<label>体重：<kl-input value="50" unit="kg" /></label>
```
<!-- demo_end -->

<!-- demo_start -->
### 表单项

<div class="m-example"></div>

```xml
<kl-form ref="form">
    <kl-form-item cols="12"   labelCols=4  title="用户名" tip="用户名的用途" required>
        <kl-input type="char"  placeholder="请输入用户名"  required />
    </kl-form-item>
    <kl-form-item cols="12" labelCols=4 title="密码" tip="密码的用途" required>
        <kl-input type="password"  placeholder="请输入密码"  required/>
    </kl-form-item>
    <kl-form-item cols="12" labelCols=4 title="年龄"  required>
        <kl-input type="int" min=1 max=120 maxlength=3 placeholder="请输入年龄"  required/>
    </kl-form-item>
    <kl-form-item cols="12" labelCols=4 title=" " >
            <kl-button title="提交" on-click={this.validate()} />
     </kl-form-item>
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

`maxlength`来控制输入的内容的长度
<div class="m-example"></div>

```xml
char:{char}
<kl-input type="char" placeholder="请输入任何字符串" value={char} />char:{char}
char50:{char}
<kl-input type="char" placeholder="请输入50个字以内的任何字符串" maxlength=50 value={char} />
int: {int}       
<kl-input type="int" placeholder="输入整数"  value={int} required />
float: {float}       
<kl-input type="float" placeholder="请输入浮点数"  value={float} />
float3: {float}       
<kl-input type="float" placeholder="请输入3位小数的浮点数" decimalDigits=3 value={float3} />
                
```
<!-- demo_end -->


<!-- demo_start -->
### 搜索(打开console,查看输出)

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
