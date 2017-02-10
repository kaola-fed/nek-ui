---
title: 表单
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.form ref="formgroup">
    <form.item title="标题1" cols=12>
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
    data: {}
});
```
<!-- demo_end -->

## 代码演示

### 基本形式 垂直布局

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.form ref="formgroup">
    <form.item title="标题1" cols=12 column="column">
        <ui.select />
    </form.item>
    <form.item title="标题2" cols=12 column="column">
        <ui.input />
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
