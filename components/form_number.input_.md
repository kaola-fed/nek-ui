---
title: 数字输入
type: components
name: number.input
cate: 表单
order: 204
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<numberInput value=6 />
```
<!-- demo_end -->

### 禁用组件

<!-- demo_start -->
<div class="m-example"></div>

```xml
<numberInput disabled />
```
<!-- demo_end -->

### 最大值和最小值

<!-- demo_start -->
<div class="m-example"></div>

```xml
<numberInput min=5 max=8 />
```
<!-- demo_end -->

### 数据绑定

<!-- demo_start -->
<div class="m-example"></div>

```xml
<numberInput value={number} />
<numberInput value={number} min=5 max=12 />
```
<!-- demo_end -->

### 事件

请打开浏览器的控制台查看结果。

<!-- demo_start -->
<div class="m-example"></div>

```xml
<numberInput on-change={console.log('on-change:', '$event.value:', $event.value)} />
```
<!-- demo_end -->

## API
## Classes

<dl>
<dt><a href="#NumberInput">NumberInput</a></dt>
<dd></dd>
</dl>

## Members

<dl>
<dt><a href="#Input">Input</a></dt>
<dd><hr>
<p>NumberInput 输入扩展</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#config">config()</a></dt>
<dd></dd>
<dt><a href="#add(value) 调整数值">add(value) 调整数值([value])</a> ⇒ <code>number</code></dt>
<dd></dd>
<dt><a href="#isOutOfRange(value) 是否超出规定的数值范围">isOutOfRange(value) 是否超出规定的数值范围(value)</a> ⇒ <code>boolean</code> | <code>number</code></dt>
<dd></dd>
</dl>

## Events

<dl>
<dt><a href="#event_change 数值改变时触发">"change 数值改变时触发"</a></dt>
<dd></dd>
</dl>

<a name="NumberInput"></a>

## NumberInput
**Kind**: global class  
**Extend**: Input  
<a name="new_NumberInput_new"></a>

### new NumberInput()

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options.data] | <code>object</code> |  | = 绑定属性 |
| [options.data.value] | <code>string</code> | <code>0</code> | <=> 文本框的值 |
| [options.data.state] | <code>string</code> |  | <=> 文本框的状态 |
| [options.data.min] | <code>number</code> |  | => 最小值 |
| [options.data.max] | <code>number</code> |  | => 最大值 |
| [options.data.autofocus] | <code>boolean</code> | <code>false</code> | => 是否自动获得焦点 |
| [options.data.readonly] | <code>boolean</code> | <code>false</code> | => 是否只读 |
| [options.data.disabled] | <code>boolean</code> | <code>false</code> | => 是否禁用 |
| [options.data.visible] | <code>boolean</code> | <code>true</code> | => 是否显示 |
| [options.data.class] | <code>string</code> |  | => 补充class |

<a name="Input"></a>

## Input
------------------------------------------------------------
NumberInput 输入扩展

**Kind**: global variable  
**Author:** sensen(rainforest92@126.com)
------------------------------------------------------------  
<a name="config"></a>

## config()
**Kind**: global function  
**Access:** protected  
<a name="add(value) 调整数值"></a>

## add(value) 调整数值([value]) ⇒ <code>number</code>
**Kind**: global function  
**Returns**: <code>number</code> - value 计算后的值  
**Access:** public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [value] | <code>number</code> | <code>0</code> | 加/减的值 |

<a name="isOutOfRange(value) 是否超出规定的数值范围"></a>

## isOutOfRange(value) 是否超出规定的数值范围(value) ⇒ <code>boolean</code> &#124; <code>number</code>
**Kind**: global function  
**Returns**: <code>boolean</code> &#124; <code>number</code> - number 如果没有超出数值范围，则返回false；如果超出数值范围，则返回范围边界的数值  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | 待测的值 |

<a name="event_change 数值改变时触发"></a>

## "change 数值改变时触发"
**Kind**: event emitted  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| sender | <code>object</code> | 事件发送对象 |
| value | <code>number</code> | 改变后的数值 |


{% raw %}
<script>
var index = 0;

    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<numberInput value=6 />

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<numberInput disabled />

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<numberInput min=5 max=8 />

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<numberInput value={number} />
<numberInput value={number} min=5 max=12 />

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<numberInput on-change={console.log('on-change:', '$event.value:', $event.value)} />

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
</script>
{% endraw %}