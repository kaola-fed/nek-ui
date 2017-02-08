---
title: 面板
---

## 基本形式

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

## 带操作的完整panel

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
var component = new RGUI.Component({
    template: template,
    test: function() {
        console.log(123);
    }
});
```