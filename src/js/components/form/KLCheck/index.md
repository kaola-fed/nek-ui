---
title: 复选框
masonry: true
---

## 代码演示

<div id="grid-itemOuter"></div>

<!-- demo_start -->
*基本形式*
<div class="m-example"></div>

```xml
<kl-check name="多选按钮" />
```
<!-- demo_end -->

<!-- demo_start -->
*在表单中使用*
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

<!-- demo_start -->
*半选状态*
<div class="m-example"></div>

```xml
<kl-check name="半选状态" checked={test} />
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

<!-- demo_start -->
*禁用组件*
<div class="m-example"></div>

```xml
<kl-check name="多选按钮" disabled />
```
<!-- demo_end -->
