---
title: 表单
---

## 代码演示

### 基本形式
required写在jr-form-item上和写在表单元素上验证效果是一样的, 但是如果label要显示红色星号,jr-form-item上必须要有required属性

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-form ref="form">
    <jr-form-item title="用户名" cols=6 row required>
        <jr-select required message="请选择用户名" />
    </jr-form-item>
    <jr-form-item title="密码" cols=6 row required message="请输入密码">
        <jr-input type="password" />
    </jr-form-item>
    <jr-button title="验证" on-click={this.validate()} />
</jr-form>
```

```javascript
var component = new JRUI.Component({
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
<jr-form inline>
    <jr-form-item title="用户名" row>
        <jr-select size="mdw" />
    </jr-form-item>
    <jr-form-item title="密码" row>
        <jr-input size="mdw" />
    </jr-form-item>
</jr-form>
```

```javascript
var component = new JRUI.Component({
    template: template,
    data: {}
});
```
<!-- demo_end --> 

### 获取select数据接口

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-form service={api.selector} ref="formgroup">
    <jr-form-item title="标题1" cols=12 sourceKey="importTypeList">
        <jr-select />
    </jr-form-item>
    <jr-form-item title="标题2" cols=12>
        <jr-input />
    </jr-form-item>
</jr-form>
```

```javascript
var component = new JRUI.Component({
    template: template,
    data: {
        api: {
            selector: '../../data/selector.json'
        }
    }
});
```
<!-- demo_end -->

### 验证示例

<!-- demo_start -->
如果不想使用Form标签
<div class="m-example"></div>

```xml
<jr-form service={api.selector} ref="formgroup">
    <jr-form-item title="标题1" cols=12 sourceKey="importTypeList">
        <jr-select />
    </jr-form-item>
    <jr-form-item title="标题2" cols=12>
        <jr-input />
    </jr-form-item>
</jr-form>
```

```javascript
var component = new JRUI.Component({
    template: template,
    data: {
        api: {
            selector: '../../data/selector.json'
        }
    }
});
```
<!-- demo_end -->
