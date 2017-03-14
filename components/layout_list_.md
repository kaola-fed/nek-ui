---
title: 列表
is_beta: true
type: components
name: list
cate: 布局
order: 100
---

## 代码演示

### 基本形式

对`ul`或`ol`标签添加`.m-list`，将不显示默认的列表样式。

<!-- demo_start -->
<div class="m-example"></div>

```html
<ul class="m-list">
    <li>List Item</li>
    <li>List Item</li>
    <li>List Item</li>
    <li>List Item</li>
    <li>List Item</li>
</ul>
```
<!-- demo_end -->

### 分割线
<!-- demo_start -->
<div class="m-example"></div>

```html
<ul class="m-list m-list-line">
    <li>List Item</li>
    <li>List Item</li>
    <li>List Item</li>
    <li>List Item</li>
    <li>List Item</li>
</ul>
```
<!-- demo_end -->
### Hover

<!-- demo_start -->
<div class="m-example"></div>

```html
<ul class="m-list m-list-line m-list-hover">
    <li>List Item</li>
    <li>List Item</li>
    <li>List Item</li>
    <li>List Item</li>
    <li>List Item</li>
</ul>
```
<!-- demo_end -->

### 条纹

<!-- demo_start -->
<div class="m-example"></div>

```html
<ul class="m-list m-list-line m-list-striped m-list-hover">
    <li>List Item</li>
    <li>List Item</li>
    <li>List Item</li>
    <li>List Item</li>
    <li>List Item</li>
</ul>
```
<!-- demo_end -->

{% raw %}
<script>
var index = 0;

    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<ul class="m-list">
    <li>List Item</li>
    <li>List Item</li>
    <li>List Item</li>
    <li>List Item</li>
    <li>List Item</li>
</ul>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<ul class="m-list m-list-line">
    <li>List Item</li>
    <li>List Item</li>
    <li>List Item</li>
    <li>List Item</li>
    <li>List Item</li>
</ul>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<ul class="m-list m-list-line m-list-hover">
    <li>List Item</li>
    <li>List Item</li>
    <li>List Item</li>
    <li>List Item</li>
    <li>List Item</li>
</ul>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<ul class="m-list m-list-line m-list-striped m-list-hover">
    <li>List Item</li>
    <li>List Item</li>
    <li>List Item</li>
    <li>List Item</li>
    <li>List Item</li>
</ul>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
</script>
{% endraw %}