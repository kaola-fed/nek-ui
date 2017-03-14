---
title: 表单
type: components
name: ui.form
cate: 表单
order: 211
---

## 代码演示

### 基本形式
required写在form.item上和写在表单元素上验证效果是一样的, 但是如果label要显示红色星号,form.item上必须要有required属性

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.form ref="form">
    <form.item title="用户名" cols=6 row required>
        <ui.select required message="请选择用户名" />
    </form.item>
    <form.item title="密码" cols=6 row required message="请输入密码">
        <ui.input type="password" />
    </form.item>
    <ui.button title="验证" on-click={this.validate()} />
</ui.form>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    validate: function() {
        var $form = this.$refs.form;
        return $form.validate().success;
    }
});
```
<!-- demo_end -->

## 代码演示

### inline排列

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.form inline>
    <form.item title="用户名" row>
        <ui.select size="mdw" />
    </form.item>
    <form.item title="密码" row>
        <ui.input size="mdw" />
    </form.item>
</ui.form>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {}
});
```
<!-- demo_end --> 

### 获取select数据接口

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.form service={api.selector} ref="formgroup">
    <form.item title="标题1" cols=12 sourceKey="importTypeList">
        <ui.select />
    </form.item>
    <form.item title="标题2" cols=12>
        <ui.input />
    </form.item>
</ui.form>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        api: {
            selector: '../../data/selector.json'
        }
    }
});
```
<!-- demo_end -->

## API
<a name="UIForm"></a>

## UIForm
**Kind**: global class  
**Extend**: Validation  
<a name="new_UIForm_new"></a>

### new UIForm()

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options.data] | <code>object</code> |  | = 绑定属性 |
| [options.data.service] | <code>string</code> |  | => 全站异步获取source的接口地址 |
| [options.data.class] | <code>string</code> |  | => 扩展样式 |
| [options.data.inline] | <code>boolean</code> | <code>&#x27;&#x27;</code> | => 如果true,form.item按照inline-block排列 |
| [options.data.sourcePath] | <code>string</code> | <code>&quot;data&quot;</code> | => 获取到select数据后,读取json数据的路径 |


{% raw %}
<script>
var index = 0;

    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<ui.form ref="form">
    <form.item title="用户名" cols=6 row required>
        <ui.select required message="请选择用户名" />
    </form.item>
    <form.item title="密码" cols=6 row required message="请输入密码">
        <ui.input type="password" />
    </form.item>
    <ui.button title="验证" on-click={this.validate()} />
</ui.form>

      */});
      
var component = new NEKUI.Component({
    template: template,
    validate: function() {
        var $form = this.$refs.form;
        return $form.validate().success;
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<ui.form inline>
    <form.item title="用户名" row>
        <ui.select size="mdw" />
    </form.item>
    <form.item title="密码" row>
        <ui.input size="mdw" />
    </form.item>
</ui.form>

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {}
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<ui.form service={api.selector} ref="formgroup">
    <form.item title="标题1" cols=12 sourceKey="importTypeList">
        <ui.select />
    </form.item>
    <form.item title="标题2" cols=12>
        <ui.input />
    </form.item>
</ui.form>

      */});
      
var component = new NEKUI.Component({
    template: template,
    data: {
        api: {
            selector: '../../data/selector.json'
        }
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
</script>
{% endraw %}