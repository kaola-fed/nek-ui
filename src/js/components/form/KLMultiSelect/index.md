---
title: 多级选择
masonry: true
---

<!-- demo_start -->
### 基本形式
<div class="m-example"></div>

```xml
<kl-multi-select 
    source={source} 
    value={value} 
    on-select={this.selected($event)}
    placeholder={placeholder}
    />
<p>选择的是：{value}</p>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '母婴儿童', id: 1, children: [
                {name: '营养辅食', id: 11},
                {name: '奶粉', id: 12, children: [
                    {name: '爱他美', id: 121, children: [
                        {name: '1段', id: 1211, children: [
                            {name: '0-6个月', id: 12111},
                            {name: '6-12个月', id: 12112}
                            ]},
                        {name: '3段', id: 1212},
                        {name: '5段', id: 1213}
                        ]},
                    {name: '美赞臣', id: 122}
                ]},
                {name: '童装童鞋', id: 13},
                {name: '宝宝用品', id: 14},
            ]},
            {name: '美容彩妆', id: 2},
            {name: '服饰鞋包', id: 3, children: [
                {name: '女士箱包', id: 31},
                {name: '男士箱包', id: 32}
            ]}
        ],
        value: '',
        placeholder: '请选择'
    },
    selected: function(event) {
        console.log(event);
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 允许勾选非末级

`onlyChild`控制是否允许勾选非末级（仅支持单选场景）

选择非末级时点击文本，如果只是想展开下一级请点击右侧箭头

<div class="m-example"></div>

```xml
<kl-multi-select 
    source={source} 
    showPath={showPath} 
    value={value} 
    on-select={this.selected($event)} 
    onlyChild={onlyChild}
    />
<p>选择的是：{value}</p>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '母婴儿童', id: 1, children: [
                {name: '营养辅食', id: 11},
                {name: '奶粉', id: 12, children: [
                    {name: '爱他美', id: 121, children: [
                        {name: '1段', id: 1211, children: [
                            {name: '0-6个月', id: 12111},
                            {name: '6-12个月', id: 12112}
                            ]},
                        {name: '3段', id: 1212},
                        {name: '5段', id: 1213}
                        ]},
                    {name: '美赞臣', id: 122}
                ]},
                {name: '童装童鞋', id: 13},
                {name: '宝宝用品', id: 14},
            ]},
            {name: '美容彩妆', id: 2},
            {name: '服饰鞋包', id: 3, children: [
                {name: '女士箱包', id: 31},
                {name: '男士箱包', id: 32}
            ]}
        ],
        value: 1,
        onlyChild: false,
        showPath: true
    },
    selected: function(event) {
        console.log(event);
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### selected, value和key

`selected`表示当前选择项，`value`表示当前选择值。`key`表示数据项的键，默认为`'id'`。

它们三者的关系如下：`selected[key] == value`。其中`selected`和`value`是联动的，当一项变化时会同时改变另一项。

*注：`selected`不能用来赋初始值，`selected`属性的值可查看控制台

<div class="m-example"></div>

```xml
<kl-form>
    <kl-form-item cols=4>
        <kl-multi-select source={source} onlyChild={false} selected={selected} />
    </kl-form-item>
    <kl-form-item cols=4>
        <kl-multi-select source={source} onlyChild={false} value={value} />
    </kl-form-item>
    <kl-form-item cols=4>
        <kl-multi-select source={source} onlyChild={false} key="name" value="女士箱包" />
    </kl-form-item>
</kl-form>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '母婴儿童', id: 1, children: [
                {name: '营养辅食', id: 11},
                {name: '奶粉', id: 12, children: [
                    {name: '爱他美', id: 121, children: [
                        {name: '1段', id: 1211, children: [
                            {name: '0-6个月', id: 12111},
                            {name: '6-12个月', id: 12112}
                            ]},
                        {name: '3段', id: 1212},
                        {name: '5段', id: 1213}
                        ]},
                    {name: '美赞臣', id: 122}
                ]},
                {name: '童装童鞋', id: 13},
                {name: '宝宝用品', id: 14},
            ]},
            {name: '美容彩妆', id: 2},
            {name: '服饰鞋包', id: 3, children: [
                {name: '女士箱包', id: 31},
                {name: '男士箱包', id: 32}
            ]}
        ],
        value: 121
    },
    config: function() {
        this.data.selected = {};
    },
    selected: function(event) {
        console.log(this.data.selected);
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 展示路径（单选）

`showPath`控制选择是否显示路径，若为`true`时selected.path 保存当前路径字符串，pathArray 是路径数组，具体看控制台。

选择显示路径的情况下，路径可以提示文本的形式显示在所选项名称上，使用`placement`选择路径显示的方位，默认为`top`，此处设置为`bottom`。

<div class="m-example"></div>

```xml
<kl-multi-select 
    showPath={showPath} 
    placement={placement} 
    pathString={pathString} 
    source={source} 
    value={value}
    on-select={this.selected($event)}
    />
<p>选择的是：{value}</p>
<p>路径是: {path}</p>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '母婴儿童', id: 1, children: [
                {name: '营养辅食', id: 11},
                {name: '奶粉', id: 12, children: [
                    {name: '爱他美', id: 121, children: [
                        {name: '1段', id: 1211, children: [
                            {name: '0-6个月', id: 12111},
                            {name: '6-12个月', id: 12112}
                            ]},
                        {name: '3段', id: 1212},
                        {name: '5段', id: 1213}
                        ]},
                    {name: '美赞臣', id: 122}
                ]},
                {name: '童装童鞋', id: 13},
                {name: '宝宝用品', id: 14},
            ]},
            {name: '美容彩妆', id: 2},
            {name: '服饰鞋包', id: 3, children: [
                {name: '女士箱包', id: 31},
                {name: '男士箱包', id: 32}
            ]}
        ],
        value: '',
        showPath: true,
        placement: 'bottom',
        pathString: '>'
    },
    selected: function(event) {
        console.log(event);
        this.data.path = event.selected.path;
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 多选
<div class="m-example"></div>

```xml
<kl-multi-select 
    source={source} 
    multiple={multiple} 
    value={value}  
    on-select={this.selected($event)} 
    on-change={this.change($event)}
    />
选择的是：{value}
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '母婴儿童', id: 1, children: [
                {name: '营养辅食', id: 11},
                {name: '奶粉', id: 12, children: [
                    {name: '爱他美', id: 121, children: [
                        {name: '1段', id: 1211, children: [
                            {name: '0-6个月', id: 12111},
                            {name: '6-12个月', id: 12112}
                            ]},
                        {name: '3段', id: 1212},
                        {name: '5段', id: 1213}
                        ]},
                    {name: '美赞臣', id: 122}
                ]},
                {name: '童装童鞋', id: 13},
                {name: '宝宝用品', id: 14},
            ]},
            {name: '美容彩妆', id: 2},
            {name: '服饰鞋包', id: 3, children: [
                {name: '女士箱包', id: 31},
                {name: '男士箱包', id: 32}
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

<!-- demo_start -->
### 展示路径（多选）

`showPath`控制选择是否显示路径，若为`true`时selected.path 保存当前路径字符串。

选择显示路径的情况下，路径可以提示文本的形式显示在所选项名称上，使用`placement`选择路径显示的方位，默认为`top`，此处设置为`bottom`。

`showPathName` 控制是否直接替代 `name` 来展示

<div class="m-example"></div>

```xml
<kl-multi-select 
    showPath={showPath} 
    placement={placement} 
    pathString={pathString} 
    showPathName={showPathName} 
    multiple={multiple}
    source={source} 
    value={value}
    on-select={this.selected($event)}
    />
<p>选择的是：{value}</p>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '母婴儿童', id: 1, children: [
                {name: '营养辅食', id: 11},
                {name: '奶粉', id: 12, children: [
                    {name: '爱他美', id: 121, children: [
                        {name: '1段', id: 1211, children: [
                            {name: '0-6个月', id: 12111},
                            {name: '6-12个月', id: 12112}
                            ]},
                        {name: '3段', id: 1212},
                        {name: '5段', id: 1213}
                        ]},
                    {name: '美赞臣', id: 122}
                ]},
                {name: '童装童鞋', id: 13},
                {name: '宝宝用品', id: 14},
            ]},
            {name: '美容彩妆', id: 2},
            {name: '服饰鞋包', id: 3, children: [
                {name: '女士箱包', id: 31},
                {name: '男士箱包', id: 32}
            ]}
        ],
        value: '',
        showPath: true,
        placement: 'bottom',
        showPathName: true,
        multiple: true,
        pathString: '>'
    },
    selected: function(event) {
        console.log(event);
        this.data.path = event.selected.path;
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 多选模式2

如果某个根节点下的所有子节点全被勾选，则只展示根节点。

此时根节点的值为字段 `rootValue`，原 `value` 字段的值还是所有被选中的叶子节点的值

<div class="m-example"></div>

```xml
<kl-multi-select 
    source={source} 
    multiple={multiple} 
    showRoot={showRoot}
    value={value}  
    rootValue={rootValue}
    on-select={this.selected($event)} 
    on-change={this.change($event)}
    />
<p>选择的是：{value}</p>
<p>rootValue: {rootValue}</p>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '母婴儿童', id: 1, children: [
                {name: '营养辅食', id: 11},
                {name: '奶粉', id: 12, children: [
                    {name: '爱他美', id: 121, children: [
                        {name: '1段', id: 1211, children: [
                            {name: '0-6个月', id: 12111},
                            {name: '6-12个月', id: 12112}
                            ]},
                        {name: '3段', id: 1212},
                        {name: '5段', id: 1213}
                        ]},
                    {name: '美赞臣', id: 122}
                ]},
                {name: '童装童鞋', id: 13},
                {name: '宝宝用品', id: 14},
            ]},
            {name: '美容彩妆', id: 2},
            {name: '服饰鞋包', id: 3, children: [
                {name: '女士箱包', id: 31},
                {name: '男士箱包', id: 32}
            ]}
        ],
        value: '',
        rootValue: '1',
        multiple: true,
        showRoot: true
    },
    selected: function(event) {
        console.log('selected',event);
    },
    change: function(event) {
        console.log('change',event);
    },
    rootChange: function(event) {
        console.log('rootChange',event);
    },
});
```
<!-- demo_end -->

<!-- demo_start -->
### 远程数据

server 为 true

serverFn 是一个接受当前 item， return promise 的 方法，在 resolve 里面传入下一级的 list，并且在 list 里面的每一项都需要一个 key 来判断是否还有下一级，key 默认为 hasChild，可以用 hasChildKey 来覆盖。

<div class="m-example"></div>

```xml
<kl-multi-select 
    source={source} 
    value={value}  
    server={server}
    serverFn={serverFn}
    hasChildKey={hasChildKey}
    />
<p>选择的是：{value}</p>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '母婴儿童', id: 1, hasChild: true},
            {name: '美容彩妆', id: 2, hasChild: true},
            {name: '服饰鞋包', id: 3, hasChild: true}
        ],
        value: '',
        server: true,
        hasChildKey: 'hasChild',
        serverFn: function(item) {
            return new Promise(function(resolve, reject) {
                setTimeout(function() {
                    var list = [
                        {name: '母婴儿童', id: 1, hasChild: true},
                        {name: '美容彩妆', id: 2, hasChild: true},
                        {name: '服饰鞋包', id: 3, hasChild: true}
                    ];
                    resolve(list)
                }, 0)
                // request(url, {
                //     data: item.id,
                //     onload: function(json) {
                //         resolve(json.result.list);
                //     }
                // })
            })
        }
    }
});
```
<!-- demo_end -->