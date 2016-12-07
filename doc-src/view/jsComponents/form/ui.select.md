### 示例

#### 基本形式

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

#### 表单项

在表单中使用

<div class="m-example"></div>

```xml
<ui.form>
    <form.item cols="12" title="用户名" hint="用户名的用途">
        <ui.select source={['简单选项1', '简单选项2', '简单选项3']} />
    </form.item>
</ui.form>
```

#### selected, value和key

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

#### 禁用某一项，禁用组件

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
            {name: '选项3（禁用）', disabled: true}
        ]
    }
});
```

#### 分隔线

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

#### 设置或取消默认项

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

#### 远程数据

<div class="m-example"></div>

```xml
<ui.select service={@(this.service)} value="2" />
```

```javascript
var component = new RGUI.Component({
    template: template,
    service: {
        getList: function(params, success) {
            RGUI.ajax.request({
                url: '../data/list.json',
                method: 'get',
                type: 'json',
                data: params,
                success: success
            });
        }
    }
});
```

#### 数据绑定

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

#### 事件

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