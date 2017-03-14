---
title: 提示选择
type: components
name: suggest
cate: 表单
order: 207
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<suggest source={source} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: 'abandon'},
            {name: 'about'},
            {name: 'absent'},
            {name: 'bread'},
            {name: 'break'},
            {name: 'brief'},
            {name: 'calendar'},
            {name: 'cancel'},
            {name: 'column'}
        ]
    }
});
```
<!-- demo_end -->

### 获取选项的id

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class="f-cb">
    <suggest source={source} id={id} class="g-col g-col-4" />{id}
</div>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {id:1, name: 'abandon'},
            {id:2, name: 'about'},
            {id:3, name: 'absent'},
            {id:4, name: 'bread'},
            {id:5, name: 'brief'},
            {id:6, name: 'calendar'},
            {id:7, name: 'column'}
        ]
    }
});
```
<!-- demo_end -->

### 禁用某一项，禁用组件

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class="f-cb">
    <suggest source={source} class="g-col g-col-6" />
    <suggest source={source} disabled class="g-col g-col-6" />
</div>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: 'abandon'},
            {name: 'about'},
            {name: 'absent（禁用）', disabled: true},
            {name: 'bread'},
            {name: 'break（禁用）', disabled: true},
            {name: 'brief'},
            {name: 'calendar'},
            {name: 'cancel（禁用）', disabled: true},
            {name: 'column'}
        ]
    }
});
```
<!-- demo_end -->

### Placeholder

<!-- demo_start -->
<div class="m-example"></div>

```xml
<suggest source={source} placeholder="输入时会自动提示" />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: 'abandon'},
            {name: 'about'},
            {name: 'absent'},
            {name: 'bread'},
            {name: 'break'},
            {name: 'brief'},
            {name: 'calendar'},
            {name: 'cancel'},
            {name: 'column'}
        ]
    }
});
```
<!-- demo_end -->

### 开始提示长度

当输入长度>=`startLength`属性后开始提示。

<!-- demo_start -->
<div class="m-example"></div>

```xml
<suggest source={source} placeholder="输入2个字符后开始提示" startLength="2" />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: 'abandon'},
            {name: 'about'},
            {name: 'absent'},
            {name: 'bread'},
            {name: 'break'},
            {name: 'brief'},
            {name: 'calendar'},
            {name: 'cancel'},
            {name: 'column'}
        ]
    }
});
```
<!-- demo_end -->

### 匹配方式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.form>
    <form.item cols=4>
        <suggest source={source} placeholder="匹配全局" matchType="all" />
    </form.item>
    <form.item cols=4>
        <suggest source={source} placeholder="只匹配开头" matchType="start" />
    </form.item>
    <form.item cols=4>
        <suggest source={source} placeholder="只匹配结尾" matchType="end" />
    </form.item>
</ui.form>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: 'abandon'},
            {name: 'about'},
            {name: 'absent'},
            {name: 'bread'},
            {name: 'break'},
            {name: 'brief'},
            {name: 'calendar'},
            {name: 'cancel'},
            {name: 'column'}
        ]
    }
});
```
<!-- demo_end -->

### 严格模式

当为严格模式时，`value`属性必须在source中选择，否则为空。

<!-- demo_start -->
<div class="m-example"></div>

```xml
<p><suggest source={source} placeholder="非严格模式" value={value1} /> {value1}</p>
<p><suggest source={source} placeholder="严格模式" strict value={value2} /> {value2}</p>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: 'abandon'},
            {name: 'about'},
            {name: 'absent'},
            {name: 'bread'},
            {name: 'break'},
            {name: 'brief'},
            {name: 'calendar'},
            {name: 'cancel'},
            {name: 'column'}
        ]
    }
});
```
<!-- demo_end -->

### 远程数据

支持远程过滤。

<!-- demo_start -->
<div class="m-example"></div>

```xml
<suggest service={@(this.service)} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    service: {
        getList: function(params, success) {
            NEKUI.ajax.request({
                url: '../data/suggest.json',
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

## API
## Classes

<dl>
<dt><a href="#Suggest">Suggest</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#config">config()</a></dt>
<dd></dd>
<dt><a href="#init">init()</a></dt>
<dd></dd>
<dt><a href="#select(item) 选择某一项">select(item) 选择某一项(item)</a> ⇒ <code>void</code></dt>
<dd></dd>
<dt><a href="#toggle(open) 展开/收起">toggle(open) 展开/收起(open)</a> ⇒ <code>void</code></dt>
<dd></dd>
<dt><a href="#validate_new 根据验证组件的值是否正确">validate() 根据验证组件的值是否正确()</a> ⇒ <code>object</code></dt>
<dd></dd>
</dl>

## Events

<dl>
<dt><a href="#event_select 选择某一项时触发">"select 选择某一项时触发"</a></dt>
<dd></dd>
<dt><a href="#event_toggle  展开/收起时触发">"toggle  展开/收起时触发"</a></dt>
<dd></dd>
</dl>

<a name="Suggest"></a>

## Suggest
**Kind**: global class  
**Extend**: Dropdown  
<a name="new_Suggest_new"></a>

### new Suggest()

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options.data] | <code>object</code> |  | = 绑定属性 |
| [options.data.source] | <code>Array.&lt;object&gt;</code> | <code>[]</code> | <=> 数据源 |
| [options.data.source[].name] | <code>string</code> |  | => 每项的内容 |
| [options.data.key] | <code>string</code> | <code>&quot;id&quot;</code> | => 数据项的键 |
| [options.data.nameKey] | <code>string</code> | <code>&quot;name&quot;</code> | => 数据项的name键 |
| [options.data.source[].disabled] | <code>boolean</code> | <code>false</code> | => 禁用此项 |
| [options.data.selected] | <code>object</code> | <code></code> | <=> 当前选择项 |
| [options.data.value] | <code>string</code> |  | <=> 文本框中的值 |
| [options.data.id] | <code>string</code> |  | <=> 选项的id值; |
| [options.data.placeholder] | <code>string</code> | <code>&quot;请输入&quot;</code> | => 文本框的占位文字 |
| [options.data.maxlength] | <code>number</code> |  | => 文本框的最大长度 |
| [options.data.startLength] | <code>number</code> | <code>0</code> | => 开始提示长度。当输入长度>=该值后开始提示 |
| [options.data.matchType] | <code>string</code> | <code>&quot;all&quot;</code> | => 匹配方式，`all`表示匹配全局，`start`表示只匹配开头，`end`表示只匹配结尾 |
| [options.data.strict] | <code>boolean</code> |  | => 是否为严格模式。当为严格模式时，`value`属性必须在source中选择，否则为空。 |
| [options.data.autofocus] | <code>boolean</code> |  | => 是否自动获得焦点 |
| [options.data.itemTemplate] | <code>string</code> | <code>null</code> | @=> 单项模板 |
| [options.data.open] | <code>boolean</code> |  | <=> 当前为展开/收起状态 |
| [options.data.readonly] | <code>boolean</code> |  | => 是否只读 |
| [options.data.disabled] | <code>boolean</code> |  | => 是否禁用 |
| [options.data.visible] | <code>boolean</code> | <code>true</code> | => 是否显示 |
| [options.data.class] | <code>string</code> |  | => 补充class |
| [options.service] | <code>object</code> |  | @=> 数据服务 |

<a name="config"></a>

## config()
**Kind**: global function  
**Access:** protected  
<a name="init"></a>

## init()
**Kind**: global function  
**Access:** protected  
<a name="select(item) 选择某一项"></a>

## select(item) 选择某一项(item) ⇒ <code>void</code>
**Kind**: global function  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>object</code> | 选择项 |

<a name="toggle(open) 展开/收起"></a>

## toggle(open) 展开/收起(open) ⇒ <code>void</code>
**Kind**: global function  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| open | <code>boolean</code> | 展开/收起状态。如果无此参数，则在两种状态之间切换。 |

<a name="validate_new 根据验证组件的值是否正确"></a>

## validate() 根据验证组件的值是否正确() ⇒ <code>object</code>
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
| selected | <code>object</code> | 当前选择项 |

<a name="event_toggle  展开/收起时触发"></a>

## "toggle  展开/收起时触发"
**Kind**: event emitted  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| sender | <code>object</code> | 事件发送对象 |
| open | <code>object</code> | 展开/收起状态 |


{% raw %}
<script>
var index = 0;

    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<suggest source={source} />

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: 'abandon'},
            {name: 'about'},
            {name: 'absent'},
            {name: 'bread'},
            {name: 'break'},
            {name: 'brief'},
            {name: 'calendar'},
            {name: 'cancel'},
            {name: 'column'}
        ]
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<div class="f-cb">
    <suggest source={source} id={id} class="g-col g-col-4" />{id}
</div>

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {id:1, name: 'abandon'},
            {id:2, name: 'about'},
            {id:3, name: 'absent'},
            {id:4, name: 'bread'},
            {id:5, name: 'brief'},
            {id:6, name: 'calendar'},
            {id:7, name: 'column'}
        ]
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<div class="f-cb">
    <suggest source={source} class="g-col g-col-6" />
    <suggest source={source} disabled class="g-col g-col-6" />
</div>

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: 'abandon'},
            {name: 'about'},
            {name: 'absent（禁用）', disabled: true},
            {name: 'bread'},
            {name: 'break（禁用）', disabled: true},
            {name: 'brief'},
            {name: 'calendar'},
            {name: 'cancel（禁用）', disabled: true},
            {name: 'column'}
        ]
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<suggest source={source} placeholder="输入时会自动提示" />

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: 'abandon'},
            {name: 'about'},
            {name: 'absent'},
            {name: 'bread'},
            {name: 'break'},
            {name: 'brief'},
            {name: 'calendar'},
            {name: 'cancel'},
            {name: 'column'}
        ]
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<suggest source={source} placeholder="输入2个字符后开始提示" startLength="2" />

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: 'abandon'},
            {name: 'about'},
            {name: 'absent'},
            {name: 'bread'},
            {name: 'break'},
            {name: 'brief'},
            {name: 'calendar'},
            {name: 'cancel'},
            {name: 'column'}
        ]
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<ui.form>
    <form.item cols=4>
        <suggest source={source} placeholder="匹配全局" matchType="all" />
    </form.item>
    <form.item cols=4>
        <suggest source={source} placeholder="只匹配开头" matchType="start" />
    </form.item>
    <form.item cols=4>
        <suggest source={source} placeholder="只匹配结尾" matchType="end" />
    </form.item>
</ui.form>

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: 'abandon'},
            {name: 'about'},
            {name: 'absent'},
            {name: 'bread'},
            {name: 'break'},
            {name: 'brief'},
            {name: 'calendar'},
            {name: 'cancel'},
            {name: 'column'}
        ]
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<p><suggest source={source} placeholder="非严格模式" value={value1} /> {value1}</p>
<p><suggest source={source} placeholder="严格模式" strict value={value2} /> {value2}</p>

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: 'abandon'},
            {name: 'about'},
            {name: 'absent'},
            {name: 'bread'},
            {name: 'break'},
            {name: 'brief'},
            {name: 'calendar'},
            {name: 'cancel'},
            {name: 'column'}
        ]
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<suggest service={@(this.service)} />

      */});
      
var component = new NEKUI.Component({
    template: template,
    service: {
        getList: function(params, success) {
            NEKUI.ajax.request({
                url: '../data/suggest.json',
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
    
</script>
{% endraw %}