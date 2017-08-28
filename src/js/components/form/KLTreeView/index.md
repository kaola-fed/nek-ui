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
### selected, value和key

`selected`表示当前选择项，`value`表示当前选择值。`key`表示数据项的键，默认为`'id'`。

它们三者的关系如下：`selected[key] == value`。其中`selected`和`value`是联动的，当一项变化时会同时改变另一项。

*注意：暂时不支持`value`赋初始值。

<div class="m-example"></div>

```xml
<kl-form>
    <kl-col span=6>
        <kl-tree-view  source={source} selected={selected} />
    </kl-col>
    <kl-col span=6>
        <kl-tree-view  source={source} value={value} />
    </kl-col>
</kl-form>
<p>选择的分别是是: {selected.name} {value}</p>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {id: 1, name: '母婴儿童'},
            {id: 2, name: '美容彩妆'},
            {id: 3, name: '服饰鞋包'}
        ]
    },
    config: function() {
        this.data.selected = this.data.source[0];
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 禁用某一项，禁用组件

<div class="m-example"></div>

```xml
<kl-row>
    <kl-col span=6>
        <kl-tree-view source={source} value={value} />
    </kl-col>
    <kl-col span=6>
        <kl-tree-view source={source} disabled />
    </kl-col>
</kl-row>
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
        }]
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
            {name: '家居个护', checked: true, children: [
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
