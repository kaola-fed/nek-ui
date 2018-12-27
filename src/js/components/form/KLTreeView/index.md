---
title: 树型视图
masonry: true
new: true
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
### 多选

<div class="m-example"></div>

```xml
<kl-tree-view source={source} value={value} multiple />
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
### 默认展开项

<div class="m-example"></div>

```xml
<kl-row type="flex">
    <kl-col span=6>
        <kl-tree-view source={source} value={value} />
    </kl-col>
    <kl-col span=6>
        <kl-tree-view source={source} value={value} multiple />
    </kl-col>
</kl-row>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '家居个护', open: true, children: [
                {name: '洗护日用'},
                {name: '居家用品', open: true, children: [
                    {name: '杯子'},
                    {name: '锅具刀具'}
                ]},
                {name: '家装家纺'},
                {name: '其他个护'},
            ]},
            {name: '母婴儿童'},
            {name: '美容彩妆', open: true, children: [
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

<div class="m-example"></div>

```xml
<kl-form>
    <kl-col span=6>
        <kl-tree-view  source={source} nameKey='value' value={value} />
    </kl-col>
    <kl-col span=6>
        <kl-tree-view  source={source} nameKey='value' value={value} />
    </kl-col>
</kl-form>
<p>选择的分别是是: {value}</p>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        value: '1',
        source: [
            {id: '1', value: '母婴儿童'},
            {id: '2', value: '美容彩妆'},
            {id: '3', value: '服饰鞋包'}
        ]
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 禁用某一项

<div class="m-example"></div>

```xml
<kl-row>
    <kl-col span=6>
        <kl-tree-view source={source} value={value} />
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
### 自定义模板内容

<div class="m-example"></div>

```xml
<kl-tree-view source={source} value={value} multiple>
    <kl-icon type="edit" on-click={this.edit($event)} />
</kl-tree-view>
<p>edit的值是：{edit}</p>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        edit: false,
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
    },
    edit: function(e) {
        e.stopPropagation();
        this.data.edit = !this.data.edit;
        this.$update();
    }
});
```
<!-- demo_end -->
