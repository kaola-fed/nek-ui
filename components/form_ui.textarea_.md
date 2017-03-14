---
title: 文本输入
type: components
name: ui.textarea
cate: 表单
order: 215
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

## API
## Classes

<dl>
<dt><a href="#TextArea">TextArea</a></dt>
<dd></dd>
</dl>

## Members

<dl>
<dt><a href="#Component">Component</a></dt>
<dd><hr>
<p>TextArea2   输入扩展</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#config">config()</a></dt>
<dd></dd>
<dt><a href="#validate_new 根据`rules`验证组件的值是否正确">validate() 根据`rules`验证组件的值是否正确()</a> ⇒ <code>object</code></dt>
<dd></dd>
</dl>

<a name="TextArea"></a>

## TextArea
**Kind**: global class  
**Extend**: Component  
<a name="new_TextArea_new"></a>

### new TextArea()

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options.data] | <code>object</code> |  | = 绑定属性 |
| [options.data.value] | <code>string</code> |  | <=> 文本框的值 |
| [options.data.placeholder] | <code>string</code> |  | => 占位符 |
| [options.data.state] | <code>string</code> |  | <=> 文本框的状态 |
| [options.data.maxlength] | <code>number</code> |  | => 文本框的最大长度 |
| [options.data.rules] | <code>Array.&lt;object&gt;</code> | <code>[]</code> | => 验证规则 |
| [options.data.autofocus] | <code>boolean</code> | <code>false</code> | => 是否自动获得焦点 |
| [options.data.height] | <code>number</code> | <code>120</code> | => 高度 |
| [options.data.required] | <code>boolean</code> | <code>false</code> | => 是否必填 |
| [options.data.readonly] | <code>boolean</code> | <code>false</code> | => 是否只读 |
| [options.data.disabled] | <code>boolean</code> | <code>false</code> | => 是否禁用 |
| [options.data.visible] | <code>boolean</code> | <code>true</code> | => 是否显示 |
| [options.data.class] | <code>string</code> |  | => 补充class |
| [options.data.size] | <code>string</code> |  | => 组件大小, sm/md/lg |
| [options.data.width] | <code>number</code> |  | => 组件宽度 |

<a name="Component"></a>

## Component
------------------------------------------------------------
TextArea2   输入扩展

**Kind**: global variable  
**Author:** sensen(rainforest92@126.com)
------------------------------------------------------------  
<a name="config"></a>

## config()
**Kind**: global function  
**Access:** protected  
<a name="validate_new 根据`rules`验证组件的值是否正确"></a>

## validate() 根据`rules`验证组件的值是否正确() ⇒ <code>object</code>
**Kind**: global function  
**Returns**: <code>object</code> - result 结果  
**Access:** public  

{% raw %}
<script>
var index = 0;

    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<label>备注：<ui.textarea placeholder="请输入备注" /></label>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<ui.form>
    <form.item cols="12" title="备注" hint="写点备注吧">
        <ui.textarea placeholder="请输入备注" />
    </form.item>
</ui.form>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<label>邮箱：<ui.textarea rules={rules} maxlength=20 /></label>

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