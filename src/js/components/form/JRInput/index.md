---
title: 输入框
---

## 代码演示

### 基本形式

大部分属性的用法与`<input>`一致。

<!-- demo_start -->
<div class="m-example"></div>

```xml
 <jr-input type="password" maxlength=6 placeholder="请输入密码" autofocus />
```
<!-- demo_end -->

### 表单项

在表单中使用

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-form>
    <jr-form-item cols="6" title="用户名" tip="用户名的用途" required>
        <jr-input type="password" maxlength=6 placeholder="请输入密码" autofocus required />
    </jr-form-item>
    <jr-form-item cols="6" labelCols=4 title="密码" tip="密码的用途">
        <jr-input type="password" maxlength=6 placeholder="请输入密码" autofocus />
    </jr-form-item>
</jr-form>
```
<!-- demo_end -->

### 单位

<!-- demo_start -->
<div class="m-example"></div>

```xml
<label>速度：<jr-input width="smw" value="340" unit="m/s" /></label>
```
<!-- demo_end -->

### 搜索(打开console,查看输出)

<!-- demo_start -->
<div class="m-example"></div>

```xml
<label>速度：<jr-input width="smw" on-search={this.onSearch($event)} /></label>
```

```javascript
var component = new JRUI.Component({
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
        <jr-input type="int" placeholder="请输入整数" value={value1} />
        {value1}
    </div>
    <div class="g-col g-col-6">
        <jr-input type="float" placeholder="保留三位小数" decimalDigits=3 value={value2} />
        {value2}
    </div>
</div>
```
<!-- demo_end -->

### 验证

<!-- demo_start -->
<div class="m-example"></div>

```xml
<label>邮箱：<jr-input rules={rules} maxlength=20 /></label>
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

### 验证2

<!-- demo_start -->
<div class="m-example"></div>

```xml
<label>姓名：<jr-input required rules={rules.rulesA} ref='name'/></label>
<label>金额：<jr-input required rules={rules.rulesB} ref='amount'/></label>
<jr-button action="submit" on-click={this.submit()} title="提交" />
```

```javascript
var component = new JRUI.Component({
    template: template,
    data: {
        rules: {
             rulesA:[
                  { type: 'isRequired', on: 'keyup+blur', success: false, message: '不能为空' },
                  { type: 'isNot', options: /^[^a-z]/,success: false, on: 'blur', message: '以小写字母开头' },
                  { type: 'method', on: 'blur',message:'名字中必须包含x', success: false, method(value){
                       return value==""||(""+value).indexOf('x')!== -1
                  }},
             ],
             rulesB:[
                  { type: 'isRequired', on: 'keyup+blur', success: false, message: '不能为空' },
                  { type: 'isFloat', options:{min:10,max:10000},success: false, on: 'keyup+blur', message: '10-10000之间' }
             ]
        }
    },
    submit(){
      //防止按钮直接点击，没有触发验证函数，此处为手动触发验证
      ["name","amount"].forEach((key)=>{
          this.$refs[key].validate()
      })
      let succ =  Object.keys(this.data.rules).every((key)=> {
                    return this.data.rules[key].every((rule)=> {
                        return rule.success;
                    });
       })
      if(succ){
          alert("提交成功")
      }
    }
});
```
<!-- demo_end -->
