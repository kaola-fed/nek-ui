---
title: 多级选择
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<multi.select source={source} value={value} />
选择的是：{value}
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '节点1', id: '1', children: [
                {name: '节点1.1', id: '1.1'},
                {name: '节点1.2', id: '1.2', children: [
                    {name: '节点1.2.1', id: '1.2.1', children: [
                        {name: '节点1.2.1.1', id: '1.2.1.1', children: [
                            {name: '节点1.2.1.1.1', id: '1.2.1.1.1'},
                            {name: '节点1.2.1.1.2', id: '1.2.1.1.2'}
                            ]},
                        {name: '节点1.2.1.3', id: '1.2.1.2'},
                        {name: '节点1.2.1.3', id: '1.2.1.3'}
                        ]},
                    {name: '节点1.2.2', id: '1.2.2'}
                ]},
                {name: '节点1.3', id: '1.3'},
                {name: '节点1.4', id: '1.4'},
            ]},
            {name: '节点2', id: '2'},
            {name: '节点3', id: '3', children: [
                {name: '节点3.1', id: '3.1'},
                {name: '节点3.2', id: '3.2'}
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
<multi.select source={source} multiple={multiple} value={value} />
选择的是：{value}
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '节点1', id: '1', children: [
                {name: '节点1.1', id: '1.1'},
                {name: '节点1.2', id: '1.2', children: [
                    {name: '节点1.2.1', id: '1.2.1', children: [
                        {name: '节点1.2.1.1', id: '1.2.1.1', children: [
                            {name: '节点1.2.1.1.1', id: '1.2.1.1.1'},
                            {name: '节点1.2.1.1.2', id: '1.2.1.1.2'}
                            ]},
                        {name: '节点1.2.1.3', id: '1.2.1.2'},
                        {name: '节点1.2.1.3', id: '1.2.1.3'}
                        ]},
                    {name: '节点1.2.2', id: '1.2.2'}
                ]},
                {name: '节点1.3', id: '1.3'},
                {name: '节点1.4', id: '1.4'},
            ]},
            {name: '节点2', id: '2'},
            {name: '节点3', id: '3', children: [
                {name: '节点3.1', id: '3.1'},
                {name: '节点3.2', id: '3.2'}
            ]}
        ],
        value: '',
        multiple: true
    }
});
```
<!-- demo_end -->
