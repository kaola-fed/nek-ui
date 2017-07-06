---
title: 复选框
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<kl-check name="多选按钮" />
```
<!-- demo_end -->

### 表单项

在表单中使用

<!-- demo_start -->
<div class="m-example"></div>

```xml
<kl-form>
    <kl-form-item cols="12" title="用户名" hint="用户名的用途">
        <kl-check name="多选按钮1" />
        <kl-check name="多选按钮2" />
    </kl-form-item>
</kl-form>
```
<!-- demo_end -->

### 半选状态

<!-- demo_start -->
<div class="m-example"></div>

```xml
<kl-check name="半选状态" checked={test} />
```

```javascript
var component = new REGUI.Component({
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
<kl-check name="多选按钮" disabled />
```
<!-- demo_end -->
