---
title: 表单项
type: components
name: form.item
cate: 表单
order: 203
---

## 代码演示

### 基本形式

与表单组件一起使用; 建议一个form.item内部只放一个表单组件;

<!-- demo_start -->
<div class="m-example"></div>

```xml
<form.item title="用户名">
    <ui.input type="text" placeholder="请输入用户名" autofocus />
</form.item>
```
<!-- demo_end -->

### 表单项

在表单中使用

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.form>
    <form.item cols="6" title="用户名" tip="优先输入国内邮箱" required>
        <ui.input type="email" placeholder="请输入用户名" />
    </form.item>
    <form.item cols="6" title="密码">
        <ui.input type="password" placeholder="请输入密码" />
    </form.item>
</ui.form>
```
<!-- demo_end -->

### 横向排列

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.form>
    <form.item cols="6" title="用户名" tip="优先输入国内邮箱" required row>
        <ui.input type="email" placeholder="请输入用户名" />
    </form.item>
    <form.item cols="6" title="密码" tip="推荐人的全名" row>
        <ui.input type="password" placeholder="请输入密码" />
    </form.item>
</ui.form>
```
<!-- demo_end -->

### label固定宽度

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.form>
    <form.item cols="6" title="用户名" tip="优先输入国内邮箱" required row labelSize="80px">
        <ui.input type="email" placeholder="请输入用户名" />
    </form.item>
    <form.item cols="6" title="密码" tip="推荐人的全名" row labelSize="80px">
        <ui.input type="password" placeholder="请输入密码" />
    </form.item>
</ui.form>
```
<!-- demo_end -->

### label对齐方式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.form>
    <form.item cols="6" title="用户名" tip="优先输入国内邮箱" required row textAlign="left">
        <ui.input type="email" placeholder="请输入用户名" />
    </form.item>
    <form.item cols="6" title="密码" tip="推荐人的全名" row textAlign="left">
        <ui.input type="password" placeholder="请输入密码" />
    </form.item>
</ui.form>
```
<!-- demo_end -->
## API
<a name="FormItem"></a>

## FormItem
**Kind**: global class  
**Extend**: Validation  
<a name="new_FormItem_new"></a>

### new FormItem()

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options.data] | <code>object</code> |  | = 绑定属性 |
| [options.data.title] | <code>string</code> |  | => label显示的文字 |
| [options.data.cols] | <code>number</code> |  | => 布局列数 |
| [options.data.labelCols] | <code>number</code> | <code>12</code> | => 如果有title, label占的列数 |
| [options.data.labelSize] | <code>string</code> &#124; <code>number</code> | <code>200</code> | => 如果有title, label占的宽度,可以是px单位的数字,也可以是sm, md, lg, xlg |
| [options.data.offset] | <code>number</code> |  | => 布局offset |
| [options.data.row] | <code>string</code> |  | => 水平布局row |
| [options.data.textAlign] | <code>string</code> | <code>&quot;none&quot;</code> | => label text-align 属性：none/left/right |
| [options.data.required] | <code>boolean</code> | <code>false</code> | => 是否必选项 |
| [options.data.tip] | <code>string</code> |  | => 字段说明 |
| [options.data.class] | <code>string</code> |  | => 样式扩展 |
| [options.data.sourceKey] | <code>string</code> |  | => 异步获取下拉列表接口的索引值 |


{% raw %}
<script>
var index = 0;

    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<form.item title="用户名">
    <ui.input type="text" placeholder="请输入用户名" autofocus />
</form.item>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<ui.form>
    <form.item cols="6" title="用户名" tip="优先输入国内邮箱" required>
        <ui.input type="email" placeholder="请输入用户名" />
    </form.item>
    <form.item cols="6" title="密码">
        <ui.input type="password" placeholder="请输入密码" />
    </form.item>
</ui.form>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<ui.form>
    <form.item cols="6" title="用户名" tip="优先输入国内邮箱" required row>
        <ui.input type="email" placeholder="请输入用户名" />
    </form.item>
    <form.item cols="6" title="密码" tip="推荐人的全名" row>
        <ui.input type="password" placeholder="请输入密码" />
    </form.item>
</ui.form>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<ui.form>
    <form.item cols="6" title="用户名" tip="优先输入国内邮箱" required row labelSize="80px">
        <ui.input type="email" placeholder="请输入用户名" />
    </form.item>
    <form.item cols="6" title="密码" tip="推荐人的全名" row labelSize="80px">
        <ui.input type="password" placeholder="请输入密码" />
    </form.item>
</ui.form>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<ui.form>
    <form.item cols="6" title="用户名" tip="优先输入国内邮箱" required row textAlign="left">
        <ui.input type="email" placeholder="请输入用户名" />
    </form.item>
    <form.item cols="6" title="密码" tip="推荐人的全名" row textAlign="left">
        <ui.input type="password" placeholder="请输入密码" />
    </form.item>
</ui.form>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
</script>
{% endraw %}