---
title: 回到顶部
type: components
name: gotop
cate: 其它
order: 501
---

## 代码演示

### 基本形式

请看屏幕右下角的例子。

<!-- demo_start -->
<div class="m-example"></div>

```xml
<gotop />
```
<!-- demo_end -->

### 位置扩展

请看屏幕左下角的例子。

<!-- demo_start -->
<div class="m-example"></div>

```xml
<gotop position="bottomleft" />
```
<!-- demo_end -->

### 嵌入文档流

<!-- demo_start -->
<div class="m-example"></div>

```xml
<gotop position="static" />
```
<!-- demo_end -->

### 自定义

*待完成……*

## API
## Classes

<dl>
<dt><a href="#Gotop">Gotop</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#config">config()</a></dt>
<dd></dd>
<dt><a href="#gotop_new 回到顶部">gotop() 回到顶部()</a> ⇒ <code>void</code></dt>
<dd></dd>
</dl>

<a name="Gotop"></a>

## Gotop
**Kind**: global class  
<a name="new_Gotop_new"></a>

### new Gotop()

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options.data] | <code>object</code> |  | = 绑定属性 |
| [options.data.position] | <code>string</code> | <code>&quot;bottomright&quot;</code> | => 组件的位置，可选参数：`topcenter`、`topleft`、`topright`、`bottomcenter`、`bottomleft`、`bottomright`、`static` |
| [options.data.disabled] | <code>boolean</code> | <code>false</code> | => 是否禁用 |
| [options.data.visible] | <code>boolean</code> | <code>true</code> | => 是否显示 |
| [options.data.class] | <code>string</code> |  | => 补充class |

<a name="config"></a>

## config()
**Kind**: global function  
**Access:** protected  
<a name="gotop_new 回到顶部"></a>

## gotop() 回到顶部() ⇒ <code>void</code>
**Kind**: global function  
**Access:** public  

{% raw %}
<script>
var index = 0;

    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<gotop />

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<gotop position="bottomleft" />

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<gotop position="static" />

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
</script>
{% endraw %}