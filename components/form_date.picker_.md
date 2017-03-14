---
title: 日期选择
type: components
name: date.picker
cate: 表单
order: 202
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.form>
    <form.item cols=6>
        <date.picker />
    </form.item>
    <form.item cols=6>
        <date.picker date="2008-08-08" />
    </form.item>
</ui.form>
```
<!-- demo_end -->

### 日期时间选择

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class="f-cb">
<ui.form>
    <form.item cols=4>
        <date.picker showTime date={date1} />
    </form.item>
    <form.item cols=4>
        <date.picker showTime date={date2} />
    </form.item>
</ui.form>
</div>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        date1: 1481287269287,
        date2: '2016-12-09 09:03'
    }
});
```
<!-- demo_end -->

### 禁用组件

<!-- demo_start -->
<div class="m-example"></div>

```xml
<date.picker disabled />
```
<!-- demo_end -->

### 日期范围

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class="f-cb">
    <date.picker minDate={minDate} maxDate={maxDate} class="g-col g-col-6" />
    <date.picker minDate="2008-08-08" maxDate="2008-08-16" class="g-col g-col-6" />
</div>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        minDate: new Date(+new Date + 2*24*3600*1000),
        maxDate: new Date(+new Date + 7*24*3600*1000)
    }
});
```
<!-- demo_end -->

### 数据绑定

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class="f-cb">
    <date.picker date={date} class="g-col g-col-6" />
    <date.picker date={date} class="g-col g-col-6" />
</div>
<p>当前选择的日期为：{date | format: 'yyyy-MM-dd'}</p>
```
<!-- demo_end -->

### 事件

请打开浏览器的控制台查看结果。

<!-- demo_start -->
<div class="m-example"></div>

```xml
<date.picker
    on-toggle={console.log('on-toggle:', '$event.open:', $event.open)}
    on-select={console.log('on-select:', '$event.date:', $event.date)}
    on-change={console.log('on-change:', '$event.date:', $event.date)} />
```
<!-- demo_end -->

## API
## Classes

<dl>
<dt><a href="#DatePicker">DatePicker</a></dt>
<dd></dd>
</dl>

## Members

<dl>
<dt><a href="#Dropdown">Dropdown</a></dt>
<dd><hr>
<p>DatePicker 日期选择</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#config">config()</a></dt>
<dd></dd>
<dt><a href="#select(date) 选择一个日期">select(date) 选择一个日期(date)</a> ⇒ <code>void</code></dt>
<dd></dd>
<dt><a href="#isOutOfRange(date) 是否超出规定的日期时间范围">isOutOfRange(date) 是否超出规定的日期时间范围(date)</a> ⇒ <code>boolean</code> | <code>Date</code></dt>
<dd></dd>
</dl>

## Events

<dl>
<dt><a href="#event_change 日期时间改变时触发">"change 日期时间改变时触发"</a></dt>
<dd></dd>
<dt><a href="#event_select 选择某一项时触发">"select 选择某一项时触发"</a></dt>
<dd></dd>
</dl>

<a name="DatePicker"></a>

## DatePicker
**Kind**: global class  
**Extend**: Dropdown  
<a name="new_DatePicker_new"></a>

### new DatePicker()

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options.data] | <code>object</code> |  | = 绑定属性 |
| [options.data.date] | <code>object</code> | <code></code> | <=> 当前选择的日期时间 |
| [options.data.showTime] | <code>boolean</code> | <code>false</code> | => 是否显示时间选择 |
| [options.data.placeholder] | <code>string</code> | <code>&quot;&#x27;请输入&#x27;&quot;</code> | => 文本框的占位文字 |
| [options.data.minDate] | <code>Date</code> &#124; <code>string</code> | <code></code> | => 最小日期时间，如果为空则不限制 |
| [options.data.maxDate] | <code>Date</code> &#124; <code>string</code> | <code></code> | => 最大日期时间，如果为空则不限制 |
| [options.data.autofocus] | <code>boolean</code> | <code>false</code> | => 是否自动获得焦点 |
| [options.data.required] | <code>boolean</code> | <code>false</code> | => 是否必填 |
| [options.data.readonly] | <code>boolean</code> | <code>false</code> | => 是否只读 |
| [options.data.disabled] | <code>boolean</code> | <code>false</code> | => 是否禁用 |
| [options.data.visible] | <code>boolean</code> | <code>true</code> | => 是否显示 |
| [options.data.size] | <code>string</code> |  | => 组件大小, sm/md/lg |
| [options.data.width] | <code>number</code> |  | => 组件宽度 |
| [options.data.class] | <code>string</code> |  | => 补充class |

<a name="Dropdown"></a>

## Dropdown
------------------------------------------------------------
DatePicker 日期选择

**Kind**: global variable  
**Author:** sensen(rainforest92@126.com)
------------------------------------------------------------  
<a name="config"></a>

## config()
**Kind**: global function  
**Access:** protected  
<a name="select(date) 选择一个日期"></a>

## select(date) 选择一个日期(date) ⇒ <code>void</code>
**Kind**: global function  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Date</code> | 选择的日期 |

<a name="isOutOfRange(date) 是否超出规定的日期时间范围"></a>

## isOutOfRange(date) 是否超出规定的日期时间范围(date) ⇒ <code>boolean</code> &#124; <code>Date</code>
**Kind**: global function  
**Returns**: <code>boolean</code> &#124; <code>Date</code> - date 如果没有超出日期时间范围，则返回false；如果超出日期时间范围，则返回范围边界的日期时间  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Date</code> | 待测的日期时间 |

<a name="event_change 日期时间改变时触发"></a>

## "change 日期时间改变时触发"
**Kind**: event emitted  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| sender | <code>object</code> | 事件发送对象 |
| date | <code>object</code> | 改变后的日期时间 |

<a name="event_select 选择某一项时触发"></a>

## "select 选择某一项时触发"
**Kind**: event emitted  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| sender | <code>object</code> | 事件发送对象 |
| date | <code>object</code> | 当前选择项 |


{% raw %}
<script>
var index = 0;

    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<ui.form>
    <form.item cols=6>
        <date.picker />
    </form.item>
    <form.item cols=6>
        <date.picker date="2008-08-08" />
    </form.item>
</ui.form>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<div class="f-cb">
<ui.form>
    <form.item cols=4>
        <date.picker showTime date={date1} />
    </form.item>
    <form.item cols=4>
        <date.picker showTime date={date2} />
    </form.item>
</ui.form>
</div>

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        date1: 1481287269287,
        date2: '2016-12-09 09:03'
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<date.picker disabled />

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<div class="f-cb">
    <date.picker minDate={minDate} maxDate={maxDate} class="g-col g-col-6" />
    <date.picker minDate="2008-08-08" maxDate="2008-08-16" class="g-col g-col-6" />
</div>

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        minDate: new Date(+new Date + 2*24*3600*1000),
        maxDate: new Date(+new Date + 7*24*3600*1000)
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<div class="f-cb">
    <date.picker date={date} class="g-col g-col-6" />
    <date.picker date={date} class="g-col g-col-6" />
</div>
<p>当前选择的日期为：{date | format: 'yyyy-MM-dd'}</p>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<date.picker
    on-toggle={console.log('on-toggle:', '$event.open:', $event.open)}
    on-select={console.log('on-select:', '$event.date:', $event.date)}
    on-change={console.log('on-change:', '$event.date:', $event.date)} />

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
</script>
{% endraw %}