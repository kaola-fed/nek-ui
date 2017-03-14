---
title: 步骤
type: components
name: steps
cate: 导航
order: 404
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<steps current=2 steps={steps} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        steps: [{
            status: 0,
            title: '编辑',
            description: '这里是多信息的描述啊描述啊描述啊描述啊哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶',
        }, {
            status: 1,
            title: '保存',
            description: '这里是多信息的描述啊描述啊描述啊描述啊哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶',
        }, {
            status: 2,
            title: '提交',
            description: '这里是多信息的描述啊描述啊描述啊描述啊哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶',
        }, {
            status: 3,
            title: '审核',
            description: '这里是多信息的描述啊描述啊描述啊描述啊哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶',
        }]
    }
});
```
<!-- demo_end -->

### 迷你版

在表单中使用

<!-- demo_start -->
<div class="m-example"></div>

```xml
<steps size="sm" current=2 steps={steps} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        steps: [{
            status: 0,
            title: '编辑',
            description: '这里是多信息的描述啊描述啊描述啊描述啊哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶',
        }, {
            status: 1,
            title: '保存',
            description: '这里是多信息的描述啊描述啊描述啊描述啊哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶',
        }, {
            status: 2,
            title: '提交',
            description: '这里是多信息的描述啊描述啊描述啊描述啊哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶',
        }, {
            status: 3,
            title: '审核',
            description: '这里是多信息的描述啊描述啊描述啊描述啊哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶',
        }]
    }
});
```
<!-- demo_end -->

## API
## Classes

<dl>
<dt><a href="#Tabs">Tabs</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#config">config()</a></dt>
<dd></dd>
</dl>

<a name="Tabs"></a>

## Tabs
**Kind**: global class  
**Extend**: Component  
<a name="new_Tabs_new"></a>

### new Tabs()

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options.data] | <code>object</code> |  | = 绑定属性 |
| [options.data.steps] | <code>object</code> | <code></code> | <=> 类似于ui.select的source |
| [options.data.current] | <code>string</code> | <code>null</code> | <=> 当前状态 |
| [options.data.size] | <code>boolean</code> | <code>false</code> | =>  当前尺寸 |

<a name="config"></a>

## config()
**Kind**: global function  
**Access:** protected  

{% raw %}
<script>
var index = 0;

    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<steps current=2 steps={steps} />

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        steps: [{
            status: 0,
            title: '编辑',
            description: '这里是多信息的描述啊描述啊描述啊描述啊哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶',
        }, {
            status: 1,
            title: '保存',
            description: '这里是多信息的描述啊描述啊描述啊描述啊哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶',
        }, {
            status: 2,
            title: '提交',
            description: '这里是多信息的描述啊描述啊描述啊描述啊哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶',
        }, {
            status: 3,
            title: '审核',
            description: '这里是多信息的描述啊描述啊描述啊描述啊哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶',
        }]
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<steps size="sm" current=2 steps={steps} />

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        steps: [{
            status: 0,
            title: '编辑',
            description: '这里是多信息的描述啊描述啊描述啊描述啊哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶',
        }, {
            status: 1,
            title: '保存',
            description: '这里是多信息的描述啊描述啊描述啊描述啊哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶',
        }, {
            status: 2,
            title: '提交',
            description: '这里是多信息的描述啊描述啊描述啊描述啊哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶',
        }, {
            status: 3,
            title: '审核',
            description: '这里是多信息的描述啊描述啊描述啊描述啊哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶',
        }]
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
</script>
{% endraw %}