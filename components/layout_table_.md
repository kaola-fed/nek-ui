---
title: 表格
is_beta: true
type: components
name: table
cate: 布局
order: 102
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```html
<table class="m-table">
    <thead>
        <tr><th>表格标题</th><th>表格标题</th><th>表格标题</th></tr>
    </thead>
    <tbody>
        <tr><td>表格内容</td><td>表格内容</td><td>表格内容</td></tr>
        <tr><td>表格内容</td><td>表格内容</td><td>表格内容</td></tr>
        <tr><td>表格内容</td><td>表格内容</td><td>表格内容</td></tr>
    </tbody>
</table>
```
<!-- demo_end -->

### Hover

<!-- demo_start -->
<div class="m-example"></div>

```html
<table class="m-table m-table-hover">
    <thead>
        <tr><th>表格标题</th><th>表格标题</th><th>表格标题</th></tr>
    </thead>
    <tbody>
        <tr><td>表格内容</td><td>表格内容</td><td>表格内容</td></tr>
        <tr><td>表格内容</td><td>表格内容</td><td>表格内容</td></tr>
        <tr><td>表格内容</td><td>表格内容</td><td>表格内容</td></tr>
    </tbody>
</table>
```
<!-- demo_end -->

### 条纹

<!-- demo_start -->
<div class="m-example"></div>

```html
<table class="m-table m-table-striped m-table-hover">
    <thead>
        <tr><th>表格标题</th><th>表格标题</th><th>表格标题</th></tr>
    </thead>
    <tbody>
        <tr><td>表格内容</td><td>表格内容</td><td>表格内容</td></tr>
        <tr><td>表格内容</td><td>表格内容</td><td>表格内容</td></tr>
        <tr><td>表格内容</td><td>表格内容</td><td>表格内容</td></tr>
    </tbody>
</table>
```
<!-- demo_end -->

### 颜色扩展

颜色扩展，*待完成……*
{% raw %}
<script>
var index = 0;

    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<table class="m-table">
    <thead>
        <tr><th>表格标题</th><th>表格标题</th><th>表格标题</th></tr>
    </thead>
    <tbody>
        <tr><td>表格内容</td><td>表格内容</td><td>表格内容</td></tr>
        <tr><td>表格内容</td><td>表格内容</td><td>表格内容</td></tr>
        <tr><td>表格内容</td><td>表格内容</td><td>表格内容</td></tr>
    </tbody>
</table>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<table class="m-table m-table-hover">
    <thead>
        <tr><th>表格标题</th><th>表格标题</th><th>表格标题</th></tr>
    </thead>
    <tbody>
        <tr><td>表格内容</td><td>表格内容</td><td>表格内容</td></tr>
        <tr><td>表格内容</td><td>表格内容</td><td>表格内容</td></tr>
        <tr><td>表格内容</td><td>表格内容</td><td>表格内容</td></tr>
    </tbody>
</table>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<table class="m-table m-table-striped m-table-hover">
    <thead>
        <tr><th>表格标题</th><th>表格标题</th><th>表格标题</th></tr>
    </thead>
    <tbody>
        <tr><td>表格内容</td><td>表格内容</td><td>表格内容</td></tr>
        <tr><td>表格内容</td><td>表格内容</td><td>表格内容</td></tr>
        <tr><td>表格内容</td><td>表格内容</td><td>表格内容</td></tr>
    </tbody>
</table>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
</script>
{% endraw %}