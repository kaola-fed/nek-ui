---
title: 表单项
type: components
order: 2.4
---

### 示例
#### 基本形式

<div class="m-example"></div>

```xml
<div class="f-cb">
    <form.item cols=4 offset=1>
        <ui.input placeholder="请输入" />
    </form.item>
</div>
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {}
});
```

#### 表单项
在表单中使用

<div class="m-example"></div>

```xml
<ui.form>
    <form.item cols=12 title="用户名" hint="用户名的用途">
        <ui.input placeholder="请输入" />
    </form.item>
</ui.form>
```

```javascript
var component = new RGUI.Component({
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

#### 表单项
在表单中使用时label横向放置

<div class="m-example"></div>

```xml
<ui.form>
    <form.item cols=12 title="用户名" hint="用户名的用途"  transverse>
        <ui.input placeholder="请输入" />
    </form.item>
</ui.form>
```

```javascript
var component = new RGUI.Component({
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
