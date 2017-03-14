---
title: 时间选择
type: components
name: time.picker
cate: 表单
order: 208
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<time.picker />
<time.picker time="15:45" />
```
<!-- demo_end -->

### 禁用组件

<!-- demo_start -->
<div class="m-example"></div>

```xml
<time.picker disabled />
```
<!-- demo_end -->

### 日期范围

<!-- demo_start -->
<div class="m-example"></div>

```xml
<time.picker minTime="12:00" maxTime="14:45" />
```
<!-- demo_end -->

### 数据绑定

<!-- demo_start -->
<div class="m-example"></div>

```xml
<time.picker time={time} />
<time.picker time={time} minTime="18:00" maxTime="19:30" />
<p>当前选择的时间为：{time}</p>
```
<!-- demo_end -->

### 事件

请打开浏览器的控制台查看结果。

<!-- demo_start -->
<div class="m-example"></div>

```xml
<time.picker on-change={console.log('on-change:', '$event.time:', $event.time)} />
```
<!-- demo_end -->

## API
## Classes

<dl>
<dt><a href="#TimePicker">TimePicker</a></dt>
<dd></dd>
</dl>

## Members

<dl>
<dt><a href="#Component">Component</a></dt>
<dd><hr>
<p>TimePicker 时间选择</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#config">config()</a></dt>
<dd></dd>
<dt><a href="#isOutOfRange(time) 是否超出规定的时间范围">isOutOfRange(time) 是否超出规定的时间范围(time)</a> ⇒ <code>boolean</code> | <code>Time</code></dt>
<dd></dd>
</dl>

## Events

<dl>
<dt><a href="#event_change 时间改变时触发">"change 时间改变时触发"</a></dt>
<dd></dd>
</dl>

<a name="TimePicker"></a>

## TimePicker
**Kind**: global class  
**Extend**: Component  
<a name="new_TimePicker_new"></a>

### new TimePicker()

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options.data] | <code>object</code> |  | = 绑定属性 |
| [options.data.time] | <code>string</code> | <code>&quot;00:00&quot;</code> | <=> 当前的时间值 |
| [options.data.minTime] | <code>string</code> | <code>&quot;00:00&quot;</code> | => 最小时间 |
| [options.data.maxTime] | <code>string</code> | <code>&quot;23:59&quot;</code> | => 最大时间 |
| [options.data.autofocus] | <code>boolean</code> | <code>false</code> | => 是否自动获得焦点 |
| [options.data.readonly] | <code>boolean</code> | <code>false</code> | => 是否只读 |
| [options.data.disabled] | <code>boolean</code> | <code>false</code> | => 是否禁用 |
| [options.data.visible] | <code>boolean</code> | <code>true</code> | => 是否显示 |
| [options.data.class] | <code>string</code> |  | => 补充class |

<a name="Component"></a>

## Component
------------------------------------------------------------
TimePicker 时间选择

**Kind**: global variable  
**Author:** sensen(rainforest92@126.com)
------------------------------------------------------------  
<a name="config"></a>

## config()
**Kind**: global function  
**Access:** protected  
<a name="isOutOfRange(time) 是否超出规定的时间范围"></a>

## isOutOfRange(time) 是否超出规定的时间范围(time) ⇒ <code>boolean</code> &#124; <code>Time</code>
**Kind**: global function  
**Returns**: <code>boolean</code> &#124; <code>Time</code> - time 如果没有超出时间范围，则返回false；如果超出时间范围，则返回范围边界的时间  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| time | <code>Time</code> | 待测的时间 |

<a name="event_change 时间改变时触发"></a>

## "change 时间改变时触发"
**Kind**: event emitted  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| sender | <code>object</code> | 事件发送对象 |
| time | <code>object</code> | 改变后的时间 |


{% raw %}
<script>
var index = 0;

    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<time.picker />
<time.picker time="15:45" />

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<time.picker disabled />

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<time.picker minTime="12:00" maxTime="14:45" />

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<time.picker time={time} />
<time.picker time={time} minTime="18:00" maxTime="19:30" />
<p>当前选择的时间为：{time}</p>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<time.picker on-change={console.log('on-change:', '$event.time:', $event.time)} />

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
</script>
{% endraw %}