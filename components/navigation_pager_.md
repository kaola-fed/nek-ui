---
title: 分页
type: components
name: pager
cate: 导航
order: 403
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<pager current=6 total=11 />
```
<!-- demo_end -->

### 位置

<!-- demo_start -->
<div class="m-example"></div>

```xml
<pager current=6 total=11 position="left" />
<pager current=6 total=11 position="center" />
<pager current=6 total=11 position="right" />
```
<!-- demo_end -->

### 显示数目

<!-- demo_start -->
<div class="m-example"></div>

```xml
<pager current=6 total=11 middle=3 side=1 />
```
<!-- demo_end -->

### 禁用组件

<!-- demo_start -->
<div class="m-example"></div>

```xml
<pager current=6 total=11 disabled />
```
<!-- demo_end -->

## API
## Classes

<dl>
<dt><a href="#Pager">Pager</a></dt>
<dd></dd>
</dl>

## Members

<dl>
<dt><a href="#Component">Component</a></dt>
<dd><hr>
<p>Pager     分页</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#config">config()</a></dt>
<dd></dd>
<dt><a href="#select(page) 选择某一页">select(page) 选择某一页(page)</a> ⇒ <code>void</code></dt>
<dd></dd>
</dl>

## Events

<dl>
<dt><a href="#event_select 选择某一页时触发">"select 选择某一页时触发"</a></dt>
<dd></dd>
</dl>

<a name="Pager"></a>

## Pager
**Kind**: global class  
**Extend**: Component  
<a name="new_Pager_new"></a>

### new Pager()

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options.data] | <code>object</code> |  | = 绑定属性 |
| [options.data.current] | <code>number</code> | <code>1</code> | <=> 当前页 |
| [options.data.total] | <code>total</code> | <code>11</code> | => 总页数 |
| [options.data.position] | <code>string</code> | <code>&quot;center&quot;</code> | => 分页的位置，可选参数：`center`、`left`、`right` |
| [options.data.middle] | <code>middle</code> | <code>5</code> | => 当页数较多时，中间显示的页数 |
| [options.data.side] | <code>side</code> | <code>2</code> | => 当页数较多时，两端显示的页数 |
| [options.data.readonly] | <code>boolean</code> | <code>false</code> | => 是否只读 |
| [options.data.disabled] | <code>boolean</code> | <code>false</code> | => 是否禁用 |
| [options.data.visible] | <code>boolean</code> | <code>true</code> | => 是否显示 |
| [options.data.class] | <code>string</code> |  | => 补充class |

<a name="Component"></a>

## Component
------------------------------------------------------------
Pager     分页

**Kind**: global variable  
**Author:** sensen(rainforest92@126.com)
------------------------------------------------------------  
<a name="config"></a>

## config()
**Kind**: global function  
**Access:** protected  
<a name="select(page) 选择某一页"></a>

## select(page) 选择某一页(page) ⇒ <code>void</code>
**Kind**: global function  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| page | <code>object</code> | 选择页 |

<a name="event_select 选择某一页时触发"></a>

## "select 选择某一页时触发"
**Kind**: event emitted  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| sender | <code>object</code> | 事件发送对象 |
| current | <code>object</code> | 当前选择页 |


{% raw %}
<script>
var index = 0;

    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<pager current=6 total=11 />

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<pager current=6 total=11 position="left" />
<pager current=6 total=11 position="center" />
<pager current=6 total=11 position="right" />

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<pager current=6 total=11 middle=3 side=1 />

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<pager current=6 total=11 disabled />

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
</script>
{% endraw %}