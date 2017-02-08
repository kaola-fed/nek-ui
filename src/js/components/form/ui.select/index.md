---
title: 下拉选择
---

## 基本形式

<div class="m-example"></div>

```xml
<ui.select source={source} />
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'}
        ]
    }
});
```

## 表单项

在表单中使用

<div class="m-example"></div>

```xml
<ui.form>
    <form.item cols="12" title="用户名" hint="用户名的用途">
        <ui.select source={['简单选项1', '简单选项2', '简单选项3']} />
    </form.item>
</ui.form>
```

## selected, value和key

`selected`表示当前选择项，`value`表示当前选择值。`key`表示数据项的键，默认为`'id'`。

它们三者的关系如下：`selected[key] == value`。其中`selected`和`value`是联动的，当一项变化时会同时改变另一项。

<div class="m-example"></div>

```xml
<ui.form>
    <form.item cols=4>
        <ui.select source={source} selected={selected} />
    </form.item>
    <form.item cols=4>
        <ui.select source={source} value=2 />
    </form.item>
    <form.item cols=4>
        <ui.select source={source} key="name" value="选项3" />
    </form.item>
</ui.form>
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {id: 1, name: '选项1'},
            {id: 2, name: '选项2'},
            {id: 3, name: '选项3'}
        ]
    },
    config: function() {
        this.data.selected = this.data.source[0];
    }
});
```

## 禁用某一项，禁用组件
`tip`表示禁用某一项时给出的提示，不给则无提示，`placement`表示给出提示的方向，具体参考文字提示组件Tooltip

<div class="m-example"></div>

```xml
<ui.form>
    <form.item cols=6>
        <ui.select source={source} />
    </form.item>
    <form.item cols=6>
        <ui.select source={source} disabled />
    </form.item>
</ui.form>
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3（禁用）', disabled: true},
            {name: '选项4（禁用）', disabled: true, tip: 'tip'},
            {name: '选项5（禁用）', disabled: true, tip: 'tip', placement: 'bottom'}
        ]
    }
});
```

## 分隔线

<div class="m-example"></div>

```xml
<ui.form>
    <form.item cols=12>
        <ui.select source={source} />
    </form.item>
</ui.form>
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {divider: true},
            {name: '选项3（禁用）', disabled: true}
        ]
    }
});
```

## 设置或取消默认项

如果`placeholder`为空，刚开始将会自动选中第一项。

<div class="m-example"></div>

```xml
<ui.form>
    <form.item cols=6>
        <ui.select source={source} placeholder="全部" />
    </form.item>
    <form.item cols=6>
        <ui.select source={source} placeholder="" />
    </form.item>
</ui.form>
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'}
        ]
    }
});
```

## 远程数据

<div class="m-example"></div>

```xml
<ui.select service={@(this.service)} value="2" />
```

```javascript
var component = new RGUI.Component({
    template: template,
    service: {
        getList: function(params, success) {
            this.request({
                url: '../../data/list.json',
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

## 数据绑定

<div class="m-example"></div>

```xml
<ui.select source={source} selected={selected} value={value} /> 当前选择项：{selected ? selected.name : 'undefined'}，当前选择值：{value || 'undefined'}
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {id: 1, name: '选项1'},
            {id: 2, name: '选项2'},
            {id: 3, name: '选项3'}
        ]
    }
});
```

## 事件

请打开浏览器的控制台查看结果。

<div class="m-example"></div>

```xml
<ui.select source={source}
    on-toggle={console.log('on-toggle:', '$event.open:', $event.open)}
    on-select={console.log('on-select:', '$event.selected:', $event.selected)}
    on-change={console.log('on-change:', '$event:', $event)} />
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'}
        ]
    }
});
```

## 综合示例

<div class="m-example"></div>

```xml
<div class=g-row>
    <ui.button title="是否多选" on-click={this.toggleMultiple(multiple)}/>
    {multiple?'true:可多选':'false:不可多选'}
</div>
<div class=g-row>
    <ui.button title="是否有全选" on-click={this.toggleCanSelectAll(canSelectAll)}/>
    {canSelectAll?'true:有':'false:无'}
</div>
<div class=g-row>
    <ui.button title="是否选中关闭" on-click={this.toggleSelectedClose(selectedClose)}/>
    {canSelectAll?'true:有':'false:无'}
</div>
<div class=g-row>
    展示字段分隔符：
    <ui.input value={showSeparator}/>
    value分隔符：
    <ui.input value={separator}/>
</div>
<div class=g-row>
    <ui.button title="是否可搜索" on-click={this.toggleCanSearch(canSearch)}/>
    {canSearch?'true:可搜索':'false:不可搜索'}
</div>
<div class=g-row>
    <ui.button title="区分大小写" on-click={this.toggleSensitive(isCaseSensitive)}/>
    {isCaseSensitive?'true:区分大小写':'false:不区分大小写'}
</div>
<ui.select source={source} multiple={multiple} canSearch={canSearch}
            showSeparator={showSeparator} separator={separator}
            selectedClose={selectedClose} canSelectAll={canSelectAll}
            isCaseSensitive={isCaseSensitive} searchInputPlaceholder="请输入"
            value={value}/>
<div class=g-row>
    选中值：{value}
</div>
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        multiple: true,
        separator: ',',
        showSeparator: '、',
        selectedClose: false,
        canSelectAll: true,
        canSearch: true,
        isCaseSensitive: false,
        value: '',
        source: [
            {name: '选项A'},
            {name: '选项a'},
            {name: '选项B'},
            {name: '选项b'},
            {name: '选项C'},
            {name: '选项c'}
        ]
    },
    toggleSelectedClose: function(selectedClose){
        this.data.selectedClose = !selectedClose;
    },
    toggleCanSelectAll: function(canSelectAll){
        this.data.canSelectAll = !canSelectAll;
    },
    toggleMultiple: function(multiple){
        this.data.multiple = !multiple;
    },
    toggleCanSearch: function(CanSearch){
        this.data.canSearch = !CanSearch;
    },
    toggleSensitive: function(isCaseSensitive){
        this.data.isCaseSensitive = !isCaseSensitive;
    }
});
```
