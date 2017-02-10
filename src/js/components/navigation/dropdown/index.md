---
title: 下拉菜单
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class="f-cb">
    <dropdown source={source} class="g-col g-col-3"/>
</div>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'}
        ]
    }
});
```
<!-- demo_end -->

### 修改标题

<!-- demo_start -->
<div class="m-example"></div>

```xml
<dropdown source={source} title="修改标题" />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'}
        ]
    }
});
```
<!-- demo_end -->

### 禁用某一项，禁用组件

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class="f-cb">
    <dropdown source={source} class="g-col g-col-6" />
    <dropdown source={source} class="g-col g-col-6" disabled />
</div>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3（禁用）', disabled: true}
        ]
    }
});
```
<!-- demo_end -->

### 分隔线

<!-- demo_start -->
<div class="m-example"></div>

```xml
<dropdown source={source} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {divider: true},
            {name: '选项3（禁用）', disabled: true}
        ]
    }
});
```
<!-- demo_end -->

### 按钮自定义

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class="f-cb">
    <dropdown source={source} class="g-col g-col-3">
        <a class="u-btn u-btn-primary">Primary</a>
    </dropdown>
    <dropdown source={source} class="g-col g-col-3">
        <a class="u-btn u-btn-success">Success</a>
    </dropdown>
    <dropdown source={source} class="g-col g-col-3">
        <a class="u-btn u-btn-warning">Warning</a>
    </dropdown>
    <dropdown source={source} class="g-col g-col-3">
        <a class="u-btn u-btn-error">Error</a>
    </dropdown>
</div>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'}
        ]
    }
});
```
<!-- demo_end -->

### 单项模板自定义

<!-- demo_start -->
<div class="m-example"></div>

```xml
<dropdown source={source} itemTemplate={@(this.itemTemplate)} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    itemTemplate: `
<a href={item.url}>{item.name}</a>`,
    data: {
        source: [
            {name: 'Dropdown', url: 'dropdown.html'},
            {name: 'Menu', url: 'menu.html'},
            {name: 'Input2', url: 'input2.html'}
        ]
    }
});
```
<!-- demo_end -->

### 数据绑定

<!-- demo_start -->
<div class="m-example"></div>

```xml
<dropdown source={source} open={open} /> 当前切换的状态：{open}
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'}
        ]
    }
});
```
<!-- demo_end -->

### 事件

请打开浏览器的控制台查看结果。

<!-- demo_start -->
<div class="m-example"></div>

```xml
<dropdown source={source}
    on-toggle={console.log('on-toggle:', '$event.open:', $event.open)}
    on-select={console.log('on-select:', '$event.selected:', $event.selected)} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'}
        ]
    }
});
```
<!-- demo_end -->
