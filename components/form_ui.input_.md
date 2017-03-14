---
title: 输入框
type: components
name: ui.input
cate: 表单
order: 212
---

## 代码演示

### 基本形式

大部分属性的用法与`<input>`一致。

<!-- demo_start -->
<div class="m-example"></div>

```xml
 <ui.input type="password" maxlength=6 placeholder="请输入密码" autofocus />
```
<!-- demo_end -->

### 表单项

在表单中使用

<!-- demo_start -->
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
<!-- demo_end -->

### 单位

<!-- demo_start -->
<div class="m-example"></div>

```xml
<label>速度：<ui.input width="smw" value="340" unit="m/s" /></label>
```
<!-- demo_end -->

### 搜索(打开console,查看输出)

<!-- demo_start -->
<div class="m-example"></div>

```xml
<label>速度：<ui.input width="smw" on-search={this.onSearch($event)} /></label>
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
        <ui.input type="int" placeholder="请输入整数" value={value1} />
        {value1}
    </div>
    <div class="g-col g-col-6">
        <ui.input type="float" placeholder="保留三位小数" decimalDigits=3 value={value2} />
        {value2}
    </div>
</div>
```
<!-- demo_end -->

### 验证

<!-- demo_start -->
<div class="m-example"></div>

```xml
<label>邮箱：<ui.input rules={rules} maxlength=20 /></label>
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

## API
## Classes

<dl>
<dt><a href="#Input">Input</a></dt>
<dd></dd>
</dl>

## Members

<dl>
<dt><a href="#Component">Component</a></dt>
<dd><hr>
<p>Input   输入扩展</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#config">config()</a></dt>
<dd></dd>
<dt><a href="#rules">rules()</a></dt>
<dd></dd>
<dt><a href="#addRule">addRule()</a></dt>
<dd></dd>
<dt><a href="#validate_new 根据`rules`验证组件的值是否正确">validate() 根据`rules`验证组件的值是否正确()</a> ⇒ <code>object</code></dt>
<dd></dd>
<dt><a href="#__valueFilter">__valueFilter()</a></dt>
<dd><ol>
<li>type=char时,去除前后的空格;</li>
<li>type=int/float时, 只能输入对应类型的数字;</li>
</ol>
</dd>
</dl>

<a name="Input"></a>

## Input
**Kind**: global class  
**Extend**: Component  
**Oaram**: <code>string</code>          [options.data.message]            => 【验证规则】验证失败时，提示的消息  
<a name="new_Input_new"></a>

### new Input()

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options.data] | <code>object</code> |  | = 绑定属性 |
| [options.data.value] | <code>string</code> |  | <=> 文本框的值 |
| [options.data.type] | <code>string</code> |  | => 文本框的类型, 6种类型：int, float, email, url，char，password |
| [options.data.placeholder] | <code>string</code> |  | => 占位符 |
| [options.data.state] | <code>string</code> |  | <=> 文本框的状态 |
| [options.data.maxlength] | <code>number</code> |  | => 文本框的最大长度 |
| [options.data.unit] | <code>string</code> |  | => 单位 |
| [options.data.rules] | <code>Array.&lt;object&gt;</code> | <code>[]</code> | => 验证规则 |
| [options.data.autofocus] | <code>boolean</code> | <code>false</code> | => 是否自动获得焦点 |
| [options.data.readonly] | <code>boolean</code> | <code>false</code> | => 是否只读 |
| [options.data.disabled] | <code>boolean</code> | <code>false</code> | => 是否禁用 |
| [options.data.visible] | <code>boolean</code> | <code>true</code> | => 是否显示 |
| [options.data.class] | <code>string</code> |  | => 补充class |
| [options.data.decimalDigits] | <code>number</code> |  | => type=float时,最多输入几位小数的filter |
| [options.data.required] | <code>boolean</code> |  | => 【验证规则】是否必填 |
| [options.data.min] | <code>number</code> |  | => 【验证规则】type=int/float时的最小值, type=char时，最小长度 |
| [options.data.max] | <code>number</code> |  | => 【验证规则】type=int/float时的最大值, type=char时，最大长度 |
| [options.data.size] | <code>string</code> |  | => 组件大小, sm/md/lg |
| [options.data.width] | <code>number</code> |  | => 组件宽度 |

<a name="Component"></a>

## Component
------------------------------------------------------------
Input   输入扩展

**Kind**: global variable  
**Author:** sensen(rainforest92@126.com)
------------------------------------------------------------  
<a name="config"></a>

## config()
**Kind**: global function  
**Access:** protected  
<a name="rules"></a>

## rules()
**Kind**: global function  
<a name="addRule"></a>

## addRule()
**Kind**: global function  
**Access:** protected  
<a name="validate_new 根据`rules`验证组件的值是否正确"></a>

## validate() 根据`rules`验证组件的值是否正确() ⇒ <code>object</code>
**Kind**: global function  
**Returns**: <code>object</code> - result 结果  
**Access:** public  
<a name="__valueFilter"></a>

## __valueFilter()
1. type=char时,去除前后的空格;
2. type=int/float时, 只能输入对应类型的数字;

**Kind**: global function  

{% raw %}
<script>
var index = 0;

    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
 <ui.input type="password" maxlength=6 placeholder="请输入密码" autofocus />

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<ui.form>
    <form.item cols="6" title="用户名" tip="用户名的用途" required>
        <ui.input type="password" maxlength=6 placeholder="请输入密码" autofocus required />
    </form.item>
    <form.item cols="6" labelCols=4 title="密码" tip="密码的用途">
        <ui.input type="password" maxlength=6 placeholder="请输入密码" autofocus />
    </form.item>
</ui.form>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<label>速度：<ui.input width="smw" value="340" unit="m/s" /></label>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<label>速度：<ui.input width="smw" on-search={this.onSearch($event)} /></label>

      */});
      
var component = new NEKUI.Component({
    template: template,
    onSearch: function(json) {
        console.log(json);
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<div class="g-row">
    <div class="g-col g-col-6">
        <ui.input type="int" placeholder="请输入整数" value={value1} />
        {value1}
    </div>
    <div class="g-col g-col-6">
        <ui.input type="float" placeholder="保留三位小数" decimalDigits=3 value={value2} />
        {value2}
    </div>
</div>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<label>邮箱：<ui.input rules={rules} maxlength=20 /></label>

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        rules: [
            {type: 'isFilled', on: 'blur', message: '请输入邮箱！'},
            {type: 'isEmail', on: 'keyup+blur', message: '请输入正确的邮箱！'}
        ]
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
</script>
{% endraw %}