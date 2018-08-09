---
title: 下拉选择
masonry: true
---

<!-- demo_start -->
### 基本形式
<div class="m-example"></div>

```xml
<kl-select source={source} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '母婴儿童'},
            {name: '美容彩妆'},
            {name: '服饰鞋包'}
        ]
    }
});
```
<!-- demo_end -->

<!-- demo_start -->

### 表单项

在表单中使用
<div class="m-example"></div>

```xml
<kl-form>
    <kl-form-item cols="12" title="所有分类" hint="所有BU的分类">
        <kl-select source={['母婴儿童', '美容彩妆', '服饰鞋包']} />
    </kl-form-item>
</kl-form>
```
<!-- demo_end -->

<!-- demo_start -->
### selected, value和key

`selected`表示当前选择项，`value`表示当前选择值。`key`表示数据项的键，默认为`'id'`。

它们三者的关系如下：`selected[key] == value`。其中`selected`和`value`是联动的，当一项变化时会同时改变另一项。

<div class="m-example"></div>

```xml
<kl-form>
    <kl-form-item cols=4>
        <kl-select source={source} selected={selected} />
    </kl-form-item>
    <kl-form-item cols=4>
        <kl-select source={source} value={2} />
    </kl-form-item>
    <kl-form-item cols=4>
        <kl-select source={source} key="name" value="服饰鞋包" />
    </kl-form-item>
</kl-form>
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

`tip`表示禁用某一项时给出的提示，不给则无提示，`placement`表示给出提示的方向，具体参考文字提示组件Tooltip

<div class="m-example"></div>

```xml
<kl-form>
    <kl-form-item cols=6>
        <kl-select source={source} />
    </kl-form-item>
    <kl-form-item cols=6>
        <kl-select source={source} disabled />
    </kl-form-item>
</kl-form>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '母婴儿童'},
            {name: '美容彩妆'},
            {name: '服饰鞋包（禁用）', disabled: true},
            {name: '家居个护（禁用）', disabled: true, tip: 'tip'},
            {name: '营养保健（禁用）', disabled: true, tip: 'tip', placement: 'bottom'}
        ]
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 分隔线

<div class="m-example"></div>

```xml
<kl-form>
    <kl-form-item cols=12>
        <kl-select source={source} />
    </kl-form-item>
</kl-form>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '母婴儿童'},
            {name: '美容彩妆'},
            {divider: true},
            {name: '服饰鞋包（禁用）', disabled: true}
        ]
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 设置或取消默认项

如果`placeholder`为空，刚开始将会自动选中第一项。

<div class="m-example"></div>

```xml
<kl-form>
    <kl-form-item cols=6>
        <kl-select source={source} placeholder="全部" />
    </kl-form-item>
    <kl-form-item cols=6>
        <kl-select source={source} placeholder="" />
    </kl-form-item>
</kl-form>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '母婴儿童'},
            {name: '美容彩妆'},
            {name: '服饰鞋包'}
        ]
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 远程数据
<div class="m-example"></div>

```xml
<kl-select service={@(this.service)} value="2" />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    service: {
        getList: function(params, success) {
            this.request({
                url: '../data/KLSelectList.json',
                method: 'get',
                type: 'json',
                data: params,
                success: function(json) {
                    this.$update('source', json.result);
                }.bind(this)
            });
        }
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 数据绑定

如果同时设置`selected`和`value`的初始化值，`selected`的值会将`value`覆盖。

<div class="m-example"></div>

```xml
<kl-select source={source} selected={selected} value={value} />
<p>当前选择项：{selected ? selected.name : 'undefined'}</p>
<p>当前选择值：{value || 'undefined'}</p>
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
    config: function(){
        this.data.selected = this.data.source[1];
        this.data.value = 1;
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 事件

请打开浏览器的控制台查看结果。

<div class="m-example"></div>

```xml
<kl-select source={source}
    on-toggle={console.log('on-toggle:', '$event.open:', $event.open)}
    on-select={console.log('on-select:', '$event.selected:', $event.selected)}
    on-change={console.log('on-change:', '$event:', $event)} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '母婴儿童'},
            {name: '美容彩妆'},
            {name: '服饰鞋包'}
        ]
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 带清空按钮

<div class="m-example"></div>

```xml
<kl-select source={source} clearable={clearable} canSearch={canSearch} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '母婴儿童'},
            {name: '美容彩妆'},
            {name: '服饰鞋包'}
        ],
        clearable: true,
        canSearch: true
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 综合示例

<div class="m-example"></div>

```xml
<kl-form-item title="是否多选: ">
    <kl-check checked={multiple} />
</kl-form-item>
<kl-form-item title="是否有全选: ">
    <kl-check checked={canSelectAll} />
</kl-form-item>
<kl-form-item title="是否标签显示多选: ">
    <kl-check checked={tags} />
</kl-form-item>
<kl-form-item title="是否选中关闭: ">
    <kl-check checked={selectedClose} />
</kl-form-item>
<kl-form-item title="value分隔符: " col=11>
    <kl-input value={separator}/>
</kl-form-item>
<kl-form-item title="最多展示多少个选项: " col=11>
    <kl-input value={limit}/>
</kl-form-item>
<kl-form-item title="是否可搜索: " >
    <kl-check checked={canSearch} />
</kl-form-item>
<kl-form-item title="区分大小写">
    <kl-check checked={isCaseSensitive} />
</kl-form-item>
<kl-form-item>
    <kl-select source={source} 
            on-search={this.search($event)}
            tags={tags}
            multiple={multiple}
            canSearch={canSearch}
            separator={separator}
            selectedClose={selectedClose}
            canSelectAll={canSelectAll}
            isCaseSensitive={isCaseSensitive}
            searchInputPlaceholder="请输入"
            value={value} limit={limit}
            />
</kl-form-item>
<kl-form-item>
    选中值：{value}
</kl-form-item>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        multiple: true,
        tags: false,
        separator: ',',
        showSeparator: '、',
        selectedClose: false,
        canSelectAll: true,
        canSearch: true,
        isCaseSensitive: false,
        value: '',
        limit: null,
        source: [
            {name: '母婴儿童Dr.CI'},{name: '母婴儿童Filorga'},
            {name: '母婴儿童age20'},{name: '母婴儿童'},
            {name: '营养保健'},{name: '海外直邮'},
            {name: '数码家电'},{name: '环球美食'},
            {name: '运动户外'},{name: '水果生鲜'},
            {name: '女士箱包'},{name: '男士箱包'},
            {name: '运动服饰'},{name: '休闲零食'},
            {name: '水产海鲜'},{name: '健康养护'},
            {name: '速冻特产'},{name: '新鲜水果'}
        ]
    },
    search: function(event) {
        console.log(event.sender);
        console.log(event.value);
    }
});
```
<!-- demo_end -->
