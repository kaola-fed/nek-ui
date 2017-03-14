---
title: 面板
type: components
name: panel
cate: 布局
order: 101
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class="g-row">
    <panel title="自定义模块" class="g-col g-col-6">
        <div class="g-row">
            <form.item cols=6 title="用户名" tip="用户名的用途">
                <ui.input placeholder="请输入" />
            </form.item>
            <form.item cols=6 title="密码" tip="用户名的用途">
                <ui.input placeholder="请输入" />
            </form.item>
        </div>
    </panel>
</div>
```
<!-- demo_end -->

### 带操作的完整panel

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class="g-row">
    <panel title="自定义模块" class="g-col g-col-6">
        <panel.tool>
            <ui.button shape="circle" action="submit" size="xs" on-click="{this.test()}" />
        </panel.tool>
        <div class="g-row">
            <form.item cols=6 title="用户名" tip="用户名的用途">
                <ui.input placeholder="请输入" />
            </form.item>
            <form.item cols=6 title="密码" tip="用户名的用途">
                <ui.input placeholder="请输入" />
            </form.item>
        </div>
        <panel.tool foot>
            <ui.button shape="circle" action="submit" size="xs" on-click="{this.test()}" />
        </panel.tool>
    </panel>
</div>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    test: function() {
        console.log(123);
    }
});
```
<!-- demo_end -->

## API
## Classes

<dl>
<dt><a href="#Panel">Panel</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#config">config()</a></dt>
<dd></dd>
<dt><a href="#toggle(open) 展开/收起">toggle(open) 展开/收起(open)</a> ⇒ <code>void</code></dt>
<dd></dd>
</dl>

<a name="Panel"></a>

## Panel
**Kind**: global class  
**Extend**: Component  
<a name="new_Panel_new"></a>

### new Panel()

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options.data] | <code>object</code> |  | = 绑定属性 |
| [options.data.disabled] | <code>boolean</code> | <code>false</code> | => 是否禁用 |
| [options.data.visible] | <code>boolean</code> | <code>true</code> | => 是否显示 |
| [options.data.class] | <code>string</code> |  | => 补充class |

<a name="config"></a>

## config()
**Kind**: global function  
**Access:** protected  
<a name="toggle(open) 展开/收起"></a>

## toggle(open) 展开/收起(open) ⇒ <code>void</code>
**Kind**: global function  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| open | <code>boolean</code> | 展开/收起状态。如果无此参数，则在两种状态之间切换。 |


{% raw %}
<script>
var index = 0;

    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<div class="g-row">
    <panel title="自定义模块" class="g-col g-col-6">
        <div class="g-row">
            <form.item cols=6 title="用户名" tip="用户名的用途">
                <ui.input placeholder="请输入" />
            </form.item>
            <form.item cols=6 title="密码" tip="用户名的用途">
                <ui.input placeholder="请输入" />
            </form.item>
        </div>
    </panel>
</div>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<div class="g-row">
    <panel title="自定义模块" class="g-col g-col-6">
        <panel.tool>
            <ui.button shape="circle" action="submit" size="xs" on-click="{this.test()}" />
        </panel.tool>
        <div class="g-row">
            <form.item cols=6 title="用户名" tip="用户名的用途">
                <ui.input placeholder="请输入" />
            </form.item>
            <form.item cols=6 title="密码" tip="用户名的用途">
                <ui.input placeholder="请输入" />
            </form.item>
        </div>
        <panel.tool foot>
            <ui.button shape="circle" action="submit" size="xs" on-click="{this.test()}" />
        </panel.tool>
    </panel>
</div>

      */});
      
var component = new NEKUI.Component({
    template: template,
    test: function() {
        console.log(123);
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
</script>
{% endraw %}