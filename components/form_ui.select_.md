---
title: 下拉选择
type: components
name: ui.select
cate: 表单
order: 213
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.select source={source} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'}
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
        <ui.select source={['简单选项1', '简单选项2', '简单选项3']} />
    </form.item>
</ui.form>
```
<!-- demo_end -->

### selected, value和key

`selected`表示当前选择项，`value`表示当前选择值。`key`表示数据项的键，默认为`'id'`。

它们三者的关系如下：`selected[key] == value`。其中`selected`和`value`是联动的，当一项变化时会同时改变另一项。

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.form>
    <form.item cols=4>
        <ui.select source={source} selected={selected} />
    </form.item>
    <form.item cols=4>
        <ui.select source={source} value=2 />
    </form.item>
    <form.item cols=4>
        <ui.select source={source} key="name" value="选项3" />
    </form.item>
</ui.form>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {id: 1, name: '选项1'},
            {id: 2, name: '选项2'},
            {id: 3, name: '选项3'}
        ]
    },
    config: function() {
        this.data.selected = this.data.source[0];
    }
});
```
<!-- demo_end -->

### 禁用某一项，禁用组件
`tip`表示禁用某一项时给出的提示，不给则无提示，`placement`表示给出提示的方向，具体参考文字提示组件Tooltip

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.form>
    <form.item cols=6>
        <ui.select source={source} />
    </form.item>
    <form.item cols=6>
        <ui.select source={source} disabled />
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
            {name: '选项3（禁用）', disabled: true},
            {name: '选项4（禁用）', disabled: true, tip: 'tip'},
            {name: '选项5（禁用）', disabled: true, tip: 'tip', placement: 'bottom'}
        ]
    }
});
```
<!-- demo_end -->

### 分隔线

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.form>
    <form.item cols=12>
        <ui.select source={source} />
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
            {divider: true},
            {name: '选项3（禁用）', disabled: true}
        ]
    }
});
```
<!-- demo_end -->

### 设置或取消默认项

如果`placeholder`为空，刚开始将会自动选中第一项。

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.form>
    <form.item cols=6>
        <ui.select source={source} placeholder="全部" />
    </form.item>
    <form.item cols=6>
        <ui.select source={source} placeholder="" />
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
            {name: '选项3'}
        ]
    }
});
```
<!-- demo_end -->

### 远程数据

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.select service={@(this.service)} value="2" />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    service: {
        getList: function(params, success) {
            this.request({
                url: '../../data/list.json',
                method: 'get',
                type: 'json',
                data: params,
                success: function(json) {
                     this.$update('source', json.result);
                 }.bind(this)
            });
        }
    }
});
```
<!-- demo_end -->

### 数据绑定

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.select source={source} selected={selected} value={value} /> 当前选择项：{selected ? selected.name : 'undefined'}，当前选择值：{value || 'undefined'}
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {id: 1, name: '选项1'},
            {id: 2, name: '选项2'},
            {id: 3, name: '选项3'}
        ]
    }
});
```
<!-- demo_end -->

### 事件

请打开浏览器的控制台查看结果。

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.select source={source}
    on-toggle={console.log('on-toggle:', '$event.open:', $event.open)}
    on-select={console.log('on-select:', '$event.selected:', $event.selected)}
    on-change={console.log('on-change:', '$event:', $event)} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'}
        ]
    }
});
```
<!-- demo_end -->

### 综合示例

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class=g-row>
    <ui.button title="是否多选" on-click={this.toggleMultiple(multiple)}/>
    {multiple?'true:可多选':'false:不可多选'}
</div>
<div class=g-row>
    <ui.button title="是否有全选" on-click={this.toggleCanSelectAll(canSelectAll)}/>
    {canSelectAll?'true:有':'false:无'}
</div>
<div class=g-row>
    <ui.button title="是否选中关闭" on-click={this.toggleSelectedClose(selectedClose)}/>
    {canSelectAll?'true:有':'false:无'}
</div>
<div class=g-row>
    展示字段分隔符：
    <ui.input value={showSeparator}/>
    value分隔符：
    <ui.input value={separator}/>
</div>
<div class=g-row>
    <ui.button title="是否可搜索" on-click={this.toggleCanSearch(canSearch)}/>
    {canSearch?'true:可搜索':'false:不可搜索'}
</div>
<div class=g-row>
    <ui.button title="区分大小写" on-click={this.toggleSensitive(isCaseSensitive)}/>
    {isCaseSensitive?'true:区分大小写':'false:不区分大小写'}
</div>
<ui.select source={source} multiple={multiple} canSearch={canSearch}
            showSeparator={showSeparator} separator={separator}
            selectedClose={selectedClose} canSelectAll={canSelectAll}
            isCaseSensitive={isCaseSensitive} searchInputPlaceholder="请输入"
            value={value}/>
<div class=g-row>
    选中值：{value}
</div>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        multiple: true,
        separator: ',',
        showSeparator: '、',
        selectedClose: false,
        canSelectAll: true,
        canSearch: true,
        isCaseSensitive: false,
        value: '',
        source: [
            {name: '选项A'},
            {name: '选项a'},
            {name: '选项B'},
            {name: '选项b'},
            {name: '选项C'},
            {name: '选项c'}
        ]
    },
    toggleSelectedClose: function(selectedClose){
        this.data.selectedClose = !selectedClose;
    },
    toggleCanSelectAll: function(canSelectAll){
        this.data.canSelectAll = !canSelectAll;
    },
    toggleMultiple: function(multiple){
        this.data.multiple = !multiple;
    },
    toggleCanSearch: function(CanSearch){
        this.data.canSearch = !CanSearch;
    },
    toggleSensitive: function(isCaseSensitive){
        this.data.isCaseSensitive = !isCaseSensitive;
    }
});
```
<!-- demo_end -->

## API
## Classes

<dl>
<dt><a href="#Select">Select</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#config">config()</a></dt>
<dd></dd>
<dt><a href="#select(item) 选择某一项">select(item) 选择某一项(item)</a> ⇒ <code>void</code></dt>
<dd></dd>
</dl>

## Events

<dl>
<dt><a href="#event_change 选择项改变时触发">"change 选择项改变时触发"</a></dt>
<dd></dd>
<dt><a href="#event_select 选择某一项时触发">"select 选择某一项时触发"</a></dt>
<dd></dd>
</dl>

<a name="Select"></a>

## Select
**Kind**: global class  
**Extend**: Dropdown  
<a name="new_Select_new"></a>

### new Select()

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options.data] | <code>object</code> |  | = 绑定属性 |
| [options.data.source] | <code>Array.&lt;object&gt;</code> | <code>[]</code> | <=> 数据源 |
| [options.data.source[].name] | <code>string</code> |  | => 每项的内容 |
| [options.data.source[].disabled] | <code>boolean</code> | <code>false</code> | => 禁用此项 |
| [options.data.source[].tip] | <code>string</code> |  | => 禁用此项显示的提示，如果没有则不显示 |
| [options.data.source[].placement] | <code>string</code> |  | => 禁用此项显示提示的方向，默认下方 |
| [options.data.source[].divider] | <code>boolean</code> | <code>false</code> | => 设置此项为分隔线 |
| [options.data.selected] | <code>object</code> |  | <=> 当前选择项 |
| [options.data.value] | <code>string</code> &#124; <code>number</code> |  | <=> 当前选择值 |
| [options.data.key] | <code>string</code> | <code>&quot;id&quot;</code> | => 数据项的键 |
| [options.data.nameKey] | <code>string</code> | <code>&quot;name&quot;</code> | => 数据项的name键 |
| [options.data.placeholder] | <code>string</code> | <code>&quot;请选择&quot;</code> | => 默认项的文字，如果`placeholder`为空并且没有选择项时，将会自动选中第一项。 |
| [options.data.required] | <code>boolean</code> | <code>false</code> | => 是否必填 |
| [options.data.readonly] | <code>boolean</code> | <code>false</code> | => 是否只读 |
| [options.data.disabled] | <code>boolean</code> | <code>false</code> | => 是否禁用 |
| [options.data.visible] | <code>boolean</code> | <code>true</code> | => 是否显示 |
| [options.data.class] | <code>string</code> |  | => 补充class |
| [options.service] | <code>object</code> |  | @=> 数据服务 |
| [options.data.canSearch] | <code>boolean</code> | <code>false</code> | => 是否可搜索 |
| [options.data.isCaseSensitive] | <code>boolean</code> | <code>false</code> | => 是否区分大小写 |
| [options.data.noMatchText] | <code>boolean</code> | <code>无匹配项</code> | => 搜索无结果文案 |
| [options.data.delaySearch] | <code>Number</code> | <code>300</code> | => 异步搜索的延迟 |
| [options.data.maxShowCount] | <code>Number</code> | <code>1000</code> | => 最大展示条数 |
| [options.data.multiple] | <code>boolean</code> | <code>false</code> | => 是否多选 |
| [options.data.separator] | <code>string</code> | <code>&quot;,&quot;</code> | => 多选value分隔符 |
| [options.data.selectedClose] | <code>boolean</code> | <code>true</code> | => 多选时选中非全部和请选择项时 是否关闭 |
| [options.data.canSelectAll] | <code>boolean</code> | <code>false</code> | => 是否有全选 |
| [options.data.size] | <code>string</code> |  | => 组件大小, sm/md/lg |
| [options.data.width] | <code>number</code> |  | => 组件宽度 |

<a name="config"></a>

## config()
**Kind**: global function  
**Access:** protected  
<a name="select(item) 选择某一项"></a>

## select(item) 选择某一项(item) ⇒ <code>void</code>
**Kind**: global function  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>object</code> | 选择项 |

<a name="event_change 选择项改变时触发"></a>

## "change 选择项改变时触发"
**Kind**: event emitted  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| sender | <code>object</code> | 事件发送对象 |
| selected | <code>object</code> | 改变后的选择项 |
| key | <code>string</code> | 数据项的键 |
| value | <code>string</code> &#124; <code>number</code> | 改变后的选择值 |

<a name="event_select 选择某一项时触发"></a>

## "select 选择某一项时触发"
**Kind**: event emitted  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| sender | <code>object</code> | 事件发送对象 |
| selected | <code>object</code> | 当前选择项 |


{% raw %}
<script>
var index = 0;

    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<ui.select source={source} />

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'}
        ]
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<ui.form>
    <form.item cols="12" title="用户名" hint="用户名的用途">
        <ui.select source={['简单选项1', '简单选项2', '简单选项3']} />
    </form.item>
</ui.form>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<ui.form>
    <form.item cols=4>
        <ui.select source={source} selected={selected} />
    </form.item>
    <form.item cols=4>
        <ui.select source={source} value=2 />
    </form.item>
    <form.item cols=4>
        <ui.select source={source} key="name" value="选项3" />
    </form.item>
</ui.form>

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {id: 1, name: '选项1'},
            {id: 2, name: '选项2'},
            {id: 3, name: '选项3'}
        ]
    },
    config: function() {
        this.data.selected = this.data.source[0];
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<ui.form>
    <form.item cols=6>
        <ui.select source={source} />
    </form.item>
    <form.item cols=6>
        <ui.select source={source} disabled />
    </form.item>
</ui.form>

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3（禁用）', disabled: true},
            {name: '选项4（禁用）', disabled: true, tip: 'tip'},
            {name: '选项5（禁用）', disabled: true, tip: 'tip', placement: 'bottom'}
        ]
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<ui.form>
    <form.item cols=12>
        <ui.select source={source} />
    </form.item>
</ui.form>

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {divider: true},
            {name: '选项3（禁用）', disabled: true}
        ]
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<ui.form>
    <form.item cols=6>
        <ui.select source={source} placeholder="全部" />
    </form.item>
    <form.item cols=6>
        <ui.select source={source} placeholder="" />
    </form.item>
</ui.form>

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'}
        ]
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<ui.select service={@(this.service)} value="2" />

      */});
      
var component = new NEKUI.Component({
    template: template,
    service: {
        getList: function(params, success) {
            this.request({
                url: '../../data/list.json',
                method: 'get',
                type: 'json',
                data: params,
                success: function(json) {
                     this.$update('source', json.result);
                 }.bind(this)
            });
        }
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<ui.select source={source} selected={selected} value={value} /> 当前选择项：{selected ? selected.name : 'undefined'}，当前选择值：{value || 'undefined'}

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {id: 1, name: '选项1'},
            {id: 2, name: '选项2'},
            {id: 3, name: '选项3'}
        ]
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<ui.select source={source}
    on-toggle={console.log('on-toggle:', '$event.open:', $event.open)}
    on-select={console.log('on-select:', '$event.selected:', $event.selected)}
    on-change={console.log('on-change:', '$event:', $event)} />

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'}
        ]
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<div class=g-row>
    <ui.button title="是否多选" on-click={this.toggleMultiple(multiple)}/>
    {multiple?'true:可多选':'false:不可多选'}
</div>
<div class=g-row>
    <ui.button title="是否有全选" on-click={this.toggleCanSelectAll(canSelectAll)}/>
    {canSelectAll?'true:有':'false:无'}
</div>
<div class=g-row>
    <ui.button title="是否选中关闭" on-click={this.toggleSelectedClose(selectedClose)}/>
    {canSelectAll?'true:有':'false:无'}
</div>
<div class=g-row>
    展示字段分隔符：
    <ui.input value={showSeparator}/>
    value分隔符：
    <ui.input value={separator}/>
</div>
<div class=g-row>
    <ui.button title="是否可搜索" on-click={this.toggleCanSearch(canSearch)}/>
    {canSearch?'true:可搜索':'false:不可搜索'}
</div>
<div class=g-row>
    <ui.button title="区分大小写" on-click={this.toggleSensitive(isCaseSensitive)}/>
    {isCaseSensitive?'true:区分大小写':'false:不区分大小写'}
</div>
<ui.select source={source} multiple={multiple} canSearch={canSearch}
            showSeparator={showSeparator} separator={separator}
            selectedClose={selectedClose} canSelectAll={canSelectAll}
            isCaseSensitive={isCaseSensitive} searchInputPlaceholder="请输入"
            value={value}/>
<div class=g-row>
    选中值：{value}
</div>

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        multiple: true,
        separator: ',',
        showSeparator: '、',
        selectedClose: false,
        canSelectAll: true,
        canSearch: true,
        isCaseSensitive: false,
        value: '',
        source: [
            {name: '选项A'},
            {name: '选项a'},
            {name: '选项B'},
            {name: '选项b'},
            {name: '选项C'},
            {name: '选项c'}
        ]
    },
    toggleSelectedClose: function(selectedClose){
        this.data.selectedClose = !selectedClose;
    },
    toggleCanSelectAll: function(canSelectAll){
        this.data.canSelectAll = !canSelectAll;
    },
    toggleMultiple: function(multiple){
        this.data.multiple = !multiple;
    },
    toggleCanSearch: function(CanSearch){
        this.data.canSearch = !CanSearch;
    },
    toggleSensitive: function(isCaseSensitive){
        this.data.isCaseSensitive = !isCaseSensitive;
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
</script>
{% endraw %}