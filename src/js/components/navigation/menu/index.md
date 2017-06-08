---
title: 两级菜单
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class="f-cb">
    <menu source={source} class="g-col g-col-4" />
</div>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1', children: [
                {name: '选项1.1'},
                {name: '选项1.2', children: [
                    {name: '选项1.2.1'},
                    {name: '选项1.2.2'}
                ]},
                {name: '选项1.3'},
                {name: '选项1.4'},
            ]},
            {name: '选项2'},
            {name: '选项3', children: [
                {name: '选项3.1'},
                {name: '选项3.2'}
            ]}
        ]
    }
});
```
<!-- demo_end -->

### 修改标题

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class="f-cb">
    <menu source={source} title="修改标题" class="g-col g-col-4" />
</div>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1', children: [
                {name: '选项1.1'},
                {name: '选项1.2', children: [
                    {name: '选项1.2.1'},
                    {name: '选项1.2.2'}
                ]},
                {name: '选项1.3'},
                {name: '选项1.4'},
            ]},
            {name: '选项2'},
            {name: '选项3', children: [
                {name: '选项3.1'},
                {name: '选项3.2'}
            ]}
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
    <menu source={source} class="g-col g-col-4" />
    <menu source={source} class="g-col g-col-4" disabled />
</div>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1', children: [
                {name: '选项1.1'},
                {name: '选项1.2', children: [
                    {name: '选项1.2.1'},
                    {name: '选项1.2.2'}
                ]},
                {name: '选项1.3'},
                {name: '选项1.4'},
            ]},
            {name: '选项2'},
            {name: '选项3（禁用）', disabled: true, children: [
                {name: '选项3.1'},
                {name: '选项3.2'}
            ]}
        ]
    }
});
```
<!-- demo_end -->

### 分隔线

<!-- demo_start -->
<div class="m-example"></div>

```xml
<menu source={source} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1', children: [
                {name: '选项1.1'},
                {divider: true},
                {name: '选项1.2', children: [
                    {name: '选项1.2.1'},
                    {name: '选项1.2.2'}
                ]},
                {name: '选项1.3'},
                {name: '选项1.4'},
            ]},
            {name: '选项2'},
            {divider: true},
            {name: '选项3（禁用）', disabled: true, children: [
                {name: '选项3.1'},
                {name: '选项3.2'}
            ]}
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
    <menu source={source} class="g-col g-col-3">
        <a class="u-btn u-btn-primary">Primary</a>
    </menu>
    <menu source={source} class="g-col g-col-3">
        <a class="u-btn u-btn-success">Success</a>
    </menu>
    <menu source={source} class="g-col g-col-3">
        <a class="u-btn u-btn-warning">Warning</a>
    </menu>
    <menu source={source} class="g-col g-col-3">
        <a class="u-btn u-btn-error">Error</a>
    </menu>
</div>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1', children: [
                {name: '选项1.1'},
                {name: '选项1.2', children: [
                    {name: '选项1.2.1'},
                    {name: '选项1.2.2'}
                ]},
                {name: '选项1.3'},
                {name: '选项1.4'},
            ]},
            {name: '选项2'},
            {name: '选项3', children: [
                {name: '选项3.1'},
                {name: '选项3.2'}
            ]}
        ]
    }
});
```
<!-- demo_end -->

### 单项模板自定义

<!-- demo_start -->
<div class="m-example"></div>

```xml
<menu source={source} itemTemplate={@(itemTemplate)} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    itemTemplate: `<a href={item.url}>{item.name}</a>`,
    data: {
        source: [
            {name: '首页', url: '../index.html'},
            {name: 'CSS元件', url: '../cssunit/index.html', children: [
                {name: '基础', url: '../cssunit/base.html'},
                {name: '按钮', url: '../cssunit/button.html'},
                {name: '图标', url: '../cssunit/icon.html'}
            ]},
            {name: 'JS元件', url: 'index.html', children: [
                {name: 'Dropdown', url: 'dropdown.html'},
                {name: 'Menu', url: 'menu.html'},
                {name: 'Input2', url: 'input2.html'}
            ]}
        ]
    }
});
```
<!-- demo_end -->
