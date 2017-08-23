---
title: 树型视图
masonry: true
---

<!-- demo_start -->
### 基本形式

<div class="m-example"></div>

```xml
<kl-tree-view source={source} value={value}/>
<p>选择的是：{value}</p>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '家居个护', children: [
                {name: '洗护日用'},
                {name: '居家用品', children: [
                    {name: '杯子'},
                    {name: '锅具刀具'}
                ]},
                {name: '家装家纺'},
                {name: '其他个护'},
            ]},
            {name: '母婴儿童'},
            {name: '美容彩妆', children: [
                {name: '护肤'},
                {name: '彩妆'}
            ]}
        ]
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 禁用某一项，禁用组件

<div class="m-example"></div>

```xml
<div class="g-row">
    <div class="g-col g-col-6">
        <kl-tree-view source={source} value={value} />
    </div>
    <div class="g-col g-col-6">
        <kl-tree-view source={source} disabled />
    </div>
</div>
<p>选择的是：{value}</p>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [{   
            name: '家居个护', 
            id: 1,
            children: [{
                name: '洗护日用',
                id: 11
            },{
                name: '居家用品',
                id:12,
                disabled: true,
                children: [
                {name: '杯子', id: 121},
                {name: '锅具刀具', id: 122}
            ]},{
                name: '家装家纺', 
                id: 13,
                disabled: true
            },{
                name: '其他个护',
                id: 14
            }]
        },{
            name: '母婴儿童', 
            id: 2,
            disabled: true
        },{
            name: '美容彩妆', 
            id: 3,
            children: [
                {name: '护肤', id: 31},
                {name: '彩妆', id: 32}
            ]
        }],
        value: 11
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 分隔线

<div class="m-example"></div>

```xml
<kl-tree-view source={source} value={value} />
<p>选择的是：{value}</p>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '家居个护', children: [
                {name: '洗护日用'},
                {name: '居家用品', disabled: true, children: [
                    {name: '杯子'},
                    {name: '锅具刀具'}
                ]},
                {divider: true},
                {name: '家装家纺', disabled: true},
                {name: '其他个护'},
            ]},
            {name: '母婴儿童', disabled: true},
            {divider: true},
            {name: '美容彩妆', children: [
                {name: '护肤'},
                {name: '彩妆'}
            ]}
        ]
    }
});
```
<!-- demo_end -->
