---
title: 树型视图
masonry: true
---

<!-- demo_start -->
*基本形式*

<div class="m-example"></div>

```xml
<kl-tree-view source={source} value={value}/>
选择的是：{value}
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '节点1', children: [
                {name: '节点1.1'},
                {name: '节点1.2', children: [
                    {name: '节点1.2.1'},
                    {name: '节点1.2.2'}
                ]},
                {name: '节点1.3'},
                {name: '节点1.4'},
            ]},
            {name: '节点2'},
            {name: '节点3', children: [
                {name: '节点3.1'},
                {name: '节点3.2'}
            ]}
        ]
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
*禁用某一项，禁用组件*

<div class="m-example"></div>

```xml
<div class="g-row">
    <div class="g-col g-col-6">
        <kl-tree-view source={source} />
    </div>
    <div class="g-col g-col-6">
        <kl-tree-view source={source} disabled />
    </div>
</div>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '节点1', children: [
                {name: '节点1.1'},
                {name: '节点1.2', disabled: true, children: [
                    {name: '节点1.2.1'},
                    {name: '节点1.2.2'}
                ]},
                {name: '节点1.3', disabled: true},
                {name: '节点1.4'},
            ]},
            {name: '节点2', disabled: true},
            {name: '节点3', children: [
                {name: '节点3.1'},
                {name: '节点3.2'}
            ]}
        ]
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
*分隔线*

<div class="m-example"></div>

```xml
<kl-tree-view source={source} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '节点1', children: [
                {name: '节点1.1'},
                {name: '节点1.2', disabled: true, children: [
                    {name: '节点1.2.1'},
                    {name: '节点1.2.2'}
                ]},
                {divider: true},
                {name: '节点1.3', disabled: true},
                {name: '节点1.4'},
            ]},
            {name: '节点2', disabled: true},
            {divider: true},
            {name: '节点3', children: [
                {name: '节点3.1'},
                {name: '节点3.2'}
            ]}
        ]
    }
});
```
<!-- demo_end -->
