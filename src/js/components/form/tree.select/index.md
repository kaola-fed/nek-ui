---
title: 树形选择
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<tree.select source={source} value={value} />
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
        ],
        value: ''
    }
});
```
<!-- demo_end -->

### 多选

<!-- demo_start -->
<div class="m-example"></div>

```xml
<tree.select source={source} multiple={true} value={value} />
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
        ],
        value: ''
    }
});
```
<!-- demo_end -->

### 禁用组件

<!-- demo_start -->
<div class="m-example"></div>

```xml
<tree.select source={source} disabled />
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

### 远程数据

<!-- demo_start -->
<div class="m-example"></div>

```xml
<tree.select service={@(this.service)} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    service: {
        getList: function(params, success) {
            NEKUI.ajax.request({
                url: '../data/tree.json',
                method: 'get',
                type: 'json',
                data: params,
                success: success
            });
        }
    }
});
```
<!-- demo_end -->

### 分级加载

<!-- demo_start -->
<div class="m-example"></div>

```xml
<tree.select service={@(this.service)} hierarchical />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    service: {
        getList: function(params, success) {
            NEKUI.ajax.request({
                url: '../data/tree2.json',
                method: 'get',
                type: 'json',
                data: params,
                success: success
            });
        }
    }
});
```
<!-- demo_end -->
