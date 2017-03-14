---
title: 单选组
type: components
name: radio.group
cate: 表单
order: 205
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<radio.group source={source} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'},
            {name: '选项4'},
            {name: '选项5'},
            {name: '选项6'}
        ]
    }
});
```
<!-- demo_end -->

### 数据绑定

<!-- demo_start -->
<div class="m-example"></div>

```xml
<radio.group source={source} value={value} selected={selected} />
<div>value: {value}</div>
<div>selected: {selected ? JSON.stringify(selected) : ''}</div>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {id: 11, name: '选项1'},
            {id: 22, name: '选项2'},
            {id: 33, name: '选项3'},
        ]
    }
});
```
<!-- demo_end -->

### 表单项

在表单中使用

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.form>
    <form.item cols="12" title="用户名" hint="用户名的用途">
        <radio.group source={source} />
    </form.item>
</ui.form>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'},
            {name: '选项4'},
            {name: '选项5'},
            {name: '选项6'}
        ]
    }
});
```
<!-- demo_end -->

### 禁用组件

<!-- demo_start -->
<div class="m-example"></div>

```xml
<radio.group source={source} disabled />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'},
            {name: '选项4'},
            {name: '选项5'},
            {name: '选项6'}
        ]
    }
});
```
<!-- demo_end -->

### 远程数据

<!-- demo_start -->
<div class="m-example"></div>

```xml
<radio.group service={@(this.service)} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    service: {
        getList: function(params, success) {
            NEKUI.ajax.request({
                url: '../data/list.json',
                method: 'get',
                type: 'json',
                data: params,
                success: success
            });
        }
    }
});
```
<!-- demo_end -->

### 多行

<!-- demo_start -->
<div class="m-example"></div>

```xml
<radio.group source={source} block />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'},
            {name: '选项4'},
            {name: '选项5'},
            {name: '选项6'}
        ]
    }
});
```
<!-- demo_end -->

## API
## Classes

<dl>
<dt><a href="#RadioGroup">RadioGroup</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#config">config()</a></dt>
<dd></dd>
<dt><a href="#select(item) 选择某一">select(item) 选择某一(item)</a> ⇒ <code>void</code></dt>
<dd></dd>
<dt><a href="#validate_new 根据required验证组件的值是否正确">validate() 根据required验证组件的值是否正确()</a> ⇒ <code>object</code></dt>
<dd></dd>
</dl>

## Events

<dl>
<dt><a href="#event_select 选择某一项时触发">"select 选择某一项时触发"</a></dt>
<dd></dd>
</dl>

<a name="RadioGroup"></a>

## RadioGroup
**Kind**: global class  
**Extend**: SourceComponent  
<a name="new_RadioGroup_new"></a>

### new RadioGroup()

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options.data] | <code>object</code> |  | = 绑定属性 |
| [options.data.source] | <code>Array.&lt;object&gt;</code> | <code>[]</code> | <=> 数据源 |
| [options.data.nameKey] | <code>string</code> | <code>&quot;name&quot;</code> | => 数据项的name键 |
| [options.data.key] | <code>string</code> | <code>&quot;id&quot;</code> | => 数据项的key键 |
| [options.data.source[].name] | <code>string</code> |  | => 每项的内容 |
| [options.data.selected] | <code>object</code> |  | <=> 当前选择的对象 |
| [options.data.value] | <code>number</code> &#124; <code>string</code> |  | <=> 当前选择的值 |
| [options.data.block] | <code>boolean</code> | <code>false</code> | => 多行显 |
| [options.data.required] | <code>boolean</code> | <code>false</code> | => 是否必选 |
| [options.data.message] | <code>string</code> |  | => 验证错误提示 |
| [options.data.readonly] | <code>boolean</code> | <code>false</code> | => 是否只读 |
| [options.data.disabled] | <code>boolean</code> | <code>false</code> | => 是否禁用 |
| [options.data.visible] | <code>boolean</code> | <code>true</code> | => 是否显 |
| [options.data.class] | <code>string</code> |  | => 补充class |
| [options.service] | <code>object</code> |  | @=> 数据服务 |

<a name="config"></a>

## config()
**Kind**: global function  
**Access:** protected  
<a name="select(item) 选择某一"></a>

## select(item) 选择某一(item) ⇒ <code>void</code>
**Kind**: global function  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>object</code> | 选择 |

<a name="validate_new 根据required验证组件的值是否正确"></a>

## validate() 根据required验证组件的值是否正确() ⇒ <code>object</code>
**Kind**: global function  
**Returns**: <code>object</code> - result 结果  
**Access:** public  
<a name="event_select 选择某一项时触发"></a>

## "select 选择某一项时触发"
**Kind**: event emitted  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| sender | <code>object</code> | 事件发送对象 |
| selected | <code>object</code> | 当前选择 |


{% raw %}
<script>
var index = 0;

    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<radio.group source={source} />

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'},
            {name: '选项4'},
            {name: '选项5'},
            {name: '选项6'}
        ]
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<radio.group source={source} value={value} selected={selected} />
<div>value: {value}</div>
<div>selected: {selected ? JSON.stringify(selected) : ''}</div>

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {id: 11, name: '选项1'},
            {id: 22, name: '选项2'},
            {id: 33, name: '选项3'},
        ]
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<ui.form>
    <form.item cols="12" title="用户名" hint="用户名的用途">
        <radio.group source={source} />
    </form.item>
</ui.form>

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'},
            {name: '选项4'},
            {name: '选项5'},
            {name: '选项6'}
        ]
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<radio.group source={source} disabled />

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'},
            {name: '选项4'},
            {name: '选项5'},
            {name: '选项6'}
        ]
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<radio.group service={@(this.service)} />

      */});
      
var component = new NEKUI.Component({
    template: template,
    service: {
        getList: function(params, success) {
            NEKUI.ajax.request({
                url: '../data/list.json',
                method: 'get',
                type: 'json',
                data: params,
                success: success
            });
        }
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<radio.group source={source} block />

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'},
            {name: '选项4'},
            {name: '选项5'},
            {name: '选项6'}
        ]
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
</script>
{% endraw %}