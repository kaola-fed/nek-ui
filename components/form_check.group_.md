---
title: 复选组
type: components
name: check.group
cate: 表单
order: 201
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<check.group source={source} />
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

### 表单项

在表单中使用

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.form>
    <form.item cols="12" title="用户名" hint="用户名的用途">
        <check.group source={source} />
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
<check.group source={source} disabled />
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

### 多行

<!-- demo_start -->
<div class="m-example"></div>

```xml
<check.group source={source} block />
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
<check.group service={@(this.service)} />
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

### 全选

<!-- demo_start -->
<div class="m-example"></div>

```xml
<label><input type="checkbox" class="u-check" r-model={checkedAll}> 全选</label>
<check.group source={source} />
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
    },
    computed: {
        checkedAll: {
            get: function() {
                var source = this.data.source;
                return source.filter(function(item) {
                    return item.checked;
                }).length === source.length;
            },
            set: function(value) {
                this.data.source.forEach(function(item) {
                    item.checked = !!value;
                })
            }
        }
    }
});
```
<!-- demo_end -->

## API
## Classes

<dl>
<dt><a href="#CheckGroup">CheckGroup</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#config">config()</a></dt>
<dd></dd>
<dt><a href="#validate_new 根据min, max验证组件的值是否正确"> max验证组件的值是否正确()</a> ⇒ <code>object</code></dt>
<dd></dd>
</dl>

<a name="CheckGroup"></a>

## CheckGroup
**Kind**: global class  
**Extend**: CheckGroup  
<a name="new_CheckGroup_new"></a>

### new CheckGroup()

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options.data] | <code>object</code> |  | = 绑定属性 |
| [options.data.source] | <code>Array.&lt;object&gt;</code> | <code>[]</code> | <=> 数据源 |
| [options.data.value] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | <=> 选择的值,逗号间隔的id值 |
| [options.data.source[].name] | <code>string</code> | <code>&quot;[]&quot;</code> | => 每项的内容 |
| [options.data.key] | <code>string</code> | <code>&quot;id&quot;</code> | => 数据项的键 |
| [options.data.nameKey] | <code>string</code> | <code>&quot;name&quot;</code> | => 数据项的name键 |
| [options.data.min] | <code>number</code> |  | => 最少选几项 |
| [options.data.max] | <code>number</code> |  | => 最多选几项 |
| [options.data.required] | <code>boolean</code> |  | => 是否必选 |
| [options.data.message] | <code>string</code> |  | => 校验错误提示信息 |
| [options.data.block] | <code>boolean</code> | <code>false</code> | => 多行显示 |
| [options.data.readonly] | <code>boolean</code> | <code>false</code> | => 是否只读 |
| [options.data.disabled] | <code>boolean</code> | <code>false</code> | => 是否禁用 |
| [options.data.visible] | <code>boolean</code> | <code>true</code> | => 是否显示 |
| [options.data.class] | <code>string</code> |  | => 补充class |
| [options.service] | <code>object</code> |  | @=> 数据服务 |

<a name="config"></a>

## config()
**Kind**: global function  
**Access:** protected  

{% raw %}
<script>
var index = 0;

    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<check.group source={source} />

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
      
<ui.form>
    <form.item cols="12" title="用户名" hint="用户名的用途">
        <check.group source={source} />
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
      
<check.group source={source} disabled />

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
      
<check.group source={source} block />

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
      
<check.group service={@(this.service)} />

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
      
<label><input type="checkbox" class="u-check" r-model={checkedAll}> 全选</label>
<check.group source={source} />

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
    },
    computed: {
        checkedAll: {
            get: function() {
                var source = this.data.source;
                return source.filter(function(item) {
                    return item.checked;
                }).length === source.length;
            },
            set: function(value) {
                this.data.source.forEach(function(item) {
                    item.checked = !!value;
                })
            }
        }
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
</script>
{% endraw %}