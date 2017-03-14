---
title: 折叠面板
type: components
name: collapse
cate: 导航
order: 400
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<collapse>
    <panel title="Panel1">Content1</panel>
    <panel title="Panel2" open>Content2</panel>
    <panel title="Panel3">Content3</panel>
    <panel title="Panel4">Content4</panel>
</collapse>
```
<!-- demo_end -->

### 每次只展开一个

<!-- demo_start -->
<div class="m-example"></div>

```xml
<collapse accordion>
    <panel title="Panel1">Content1</panel>
    <panel title="Panel2">Content2</panel>
    <panel title="Panel3">Content3</panel>
    <panel title="Panel4">Content4</panel>
</collapse>
```
<!-- demo_end -->

### 禁用

待完成。。。
## API
## Classes

<dl>
<dt><a href="#Collapse">Collapse</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#config">config()</a></dt>
<dd></dd>
</dl>

<a name="Collapse"></a>

## Collapse
**Kind**: global class  
**Extend**: Component  
<a name="new_Collapse_new"></a>

### new Collapse()

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options.data] | <code>object</code> |  | = 绑定属性 |
| [options.data.accordion] | <code>boolean</code> | <code>false</code> | => 是否每次只展开一个 |
| [options.data.disabled] | <code>boolean</code> | <code>false</code> | => 是否禁用 |
| [options.data.visible] | <code>boolean</code> | <code>true</code> | => 是否显示 |
| [options.data.class] | <code>string</code> |  | => 补充class |

<a name="config"></a>

## config()
**Kind**: global function  
**Access:** protected  

{% raw %}
<script>
var index = 0;

    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<collapse>
    <panel title="Panel1">Content1</panel>
    <panel title="Panel2" open>Content2</panel>
    <panel title="Panel3">Content3</panel>
    <panel title="Panel4">Content4</panel>
</collapse>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<collapse accordion>
    <panel title="Panel1">Content1</panel>
    <panel title="Panel2">Content2</panel>
    <panel title="Panel3">Content3</panel>
    <panel title="Panel4">Content4</panel>
</collapse>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
</script>
{% endraw %}