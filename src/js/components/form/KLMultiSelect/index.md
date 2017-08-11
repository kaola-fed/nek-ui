---
title: 多级选择
masonry: true
---

<!-- demo_start -->
*基本形式*
<div class="m-example"></div>

```xml
<kl-multi-select source={source} value={value} on-select={this.selected($event)} />
选择的是：{value}
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '节点1', id: 1, children: [
                {name: '节点1.1', id: 11},
                {name: '节点1.2', id: 12, children: [
                    {name: '节点1.2.1', id: 121, children: [
                        {name: '节点1.2.1.1', id: 1211, children: [
                            {name: '节点1.2.1.1.1', id: 12111},
                            {name: '节点1.2.1.1.2', id: 12112}
                            ]},
                        {name: '节点1.2.1.3', id: 1212},
                        {name: '节点1.2.1.3', id: 1213}
                        ]},
                    {name: '节点1.2.2', id: 122}
                ]},
                {name: '节点1.3', id: 13},
                {name: '节点1.4', id: 14},
            ]},
            {name: '节点2', id: 2},
            {name: '节点3', id: 3, children: [
                {name: '节点3.1', id: 31},
                {name: '节点3.2', id: 32}
            ]}
        ],
        value: '11'
    },
    selected: function(event) {
        console.log(event);
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
*允许勾选非末级（仅支持单选场景）*

选择非末级时点击文本，如果只是想展开下一级请点击右侧箭头

<div class="m-example"></div>

```xml
<kl-multi-select source={source} value={value} on-select={this.selected($event)} onlyChild={onlyChild} />
选择的是：{value}
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '节点1', id: 1, children: [
                {name: '节点1.1', id: 11},
                {name: '节点1.2', id: 12, children: [
                    {name: '节点1.2.1', id: 121, children: [
                        {name: '节点1.2.1.1', id: 1211, children: [
                            {name: '节点1.2.1.1.1', id: 12111},
                            {name: '节点1.2.1.1.2', id: 12112}
                            ]},
                        {name: '节点1.2.1.3', id: 1212},
                        {name: '节点1.2.1.3', id: 1213}
                        ]},
                    {name: '节点1.2.2', id: 122}
                ]},
                {name: '节点1.3', id: 13},
                {name: '节点1.4', id: 14},
            ]},
            {name: '节点2', id: 2},
            {name: '节点3', id: 3, children: [
                {name: '节点3.1', id: 31},
                {name: '节点3.2', id: 32}
            ]}
        ],
        value: '',
        onlyChild: false
    },
    selected: function(event) {
        console.log(event);
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
*多选*
<div class="m-example"></div>

```xml
<kl-multi-select source={source} multiple={multiple} value={value}  on-select={this.selected($event)} on-change={this.change($event)}/>
选择的是：{value}
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '节点1', id: 1, children: [
                {name: '节点1.1', id: 11},
                {name: '节点1.2', id: 12, children: [
                    {name: '节点1.2.1', id: 121, children: [
                        {name: '节点1.2.1.1', id: 1211, children: [
                            {name: '节点1.2.1.1.1', id: 12111},
                            {name: '节点1.2.1.1.2', id: 12112}
                            ]},
                        {name: '节点1.2.1.3', id: 1212},
                        {name: '节点1.2.1.3', id: 1213}
                        ]},
                    {name: '节点1.2.2', id: 122}
                ]},
                {name: '节点1.3', id: 13},
                {name: '节点1.4', id: 14},
            ]},
            {name: '节点2', id: 2},
            {name: '节点3', id: 3, children: [
                {name: '节点3.1', id: 31},
                {name: '节点3.2', id: 32}
            ]}
        ],
        value: '',
        multiple: true
    },
    selected: function(event) {
        console.log('selected',event);
    },
    change: function(event) {
        console.log('change',event);
    }
});
```
<!-- demo_end -->