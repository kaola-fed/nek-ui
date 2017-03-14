---
title: 复选框
type: components
name: check
cate: 表单
order: 200
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<check name="多选按钮" />
```
<!-- demo_end -->

### 表单项

在表单中使用

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.form>
    <form.item cols="12" title="用户名" hint="用户名的用途">
        <check name="多选按钮1" />
        <check name="多选按钮2" />
    </form.item>
</ui.form>
```
<!-- demo_end -->

### 半选状态

<!-- demo_start -->
<div class="m-example"></div>

```xml
<check name="半选状态" checked={test} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        test: null
    }
});
```
<!-- demo_end -->

### 禁用组件

<!-- demo_start -->
<div class="m-example"></div>

```xml
<check name="多选按钮" disabled />
```
<!-- demo_end -->

## API
## Classes

<dl>
<dt><a href="#Check">Check</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#config">config()</a></dt>
<dd></dd>
<dt><a href="#check(checked) 改变选中状态">check(checked) 改变选中状态(checked)</a> ⇒ <code>void</code></dt>
<dd></dd>
</dl>

## Events

<dl>
<dt><a href="#event_change 选中状态改变时触发">"change 选中状态改变时触发"</a></dt>
<dd></dd>
<dt><a href="#event_check 改变选中状态时触发">"check 改变选中状态时触发"</a></dt>
<dd></dd>
</dl>

<a name="Check"></a>

## Check
**Kind**: global class  
**Extend**: Component  
<a name="new_Check_new"></a>

### new Check()

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options.data | <code>object</code> |  | = 绑定属性 |
| [options.data.name] | <code>string</code> |  | => 多选按钮的文字 |
| [options.data.checked] | <code>boolean</code> | <code>false</code> | <=> 多选按钮的选择状态。`false`表示未选，`true`表示已选，`null`表示半选。 |
| [options.data.block] | <code>boolean</code> | <code>false</code> | => 是否以block方式显示 |
| [options.data.readonly] | <code>boolean</code> | <code>false</code> | => 是否只读 |
| [options.data.disabled] | <code>boolean</code> | <code>false</code> | => 是否禁用 |
| [options.data.visible] | <code>boolean</code> | <code>true</code> | => 是否显示 |
| [options.data.class] | <code>string</code> |  | => 补充class |

<a name="config"></a>

## config()
**Kind**: global function  
**Access:** protected  
<a name="check(checked) 改变选中状态"></a>

## check(checked) 改变选中状态(checked) ⇒ <code>void</code>
**Kind**: global function  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| checked | <code>boolean</code> | 选中状态。则在true/false之间切换。 |

<a name="event_change 选中状态改变时触发"></a>

## "change 选中状态改变时触发"
**Kind**: event emitted  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| sender | <code>object</code> | 事件发送对象 |
| date | <code>object</code> | 改变后的选中状态 |

<a name="event_check 改变选中状态时触发"></a>

## "check 改变选中状态时触发"
**Kind**: event emitted  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| sender | <code>object</code> | 事件发送对象 |
| checked | <code>boolean</code> | 选中状态 |


{% raw %}
<script>
var index = 0;

    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<check name="多选按钮" />

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<ui.form>
    <form.item cols="12" title="用户名" hint="用户名的用途">
        <check name="多选按钮1" />
        <check name="多选按钮2" />
    </form.item>
</ui.form>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<check name="半选状态" checked={test} />

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        test: null
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<check name="多选按钮" disabled />

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
</script>
{% endraw %}