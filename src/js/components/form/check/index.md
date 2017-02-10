---
title: 复选框
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<check name="多选按钮" />
```
<!-- demo_end -->

### 表单项

在表单中使用

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.form>
    <form.item cols="12" title="用户名" hint="用户名的用途">
        <check name="多选按钮1" />
        <check name="多选按钮2" />
    </form.item>
</ui.form>
```
<!-- demo_end -->

### 半选状态

<!-- demo_start -->
<div class="m-example"></div>

```xml
<check name="半选状态" checked={test} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        test: null
    }
});
```
<!-- demo_end -->

### 禁用组件

<!-- demo_start -->
<div class="m-example"></div>

```xml
<check name="多选按钮" disabled />
```
<!-- demo_end -->
