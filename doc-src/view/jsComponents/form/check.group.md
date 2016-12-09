### 示例
#### 基本形式

<div class="m-example"></div>

```xml
<check.group source={source} />
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'},
            {name: '选项4'},
            {name: '选项5'},
            {name: '选项6'}
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
        <check.group source={source} />
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
            {name: '选项3'},
            {name: '选项4'},
            {name: '选项5'},
            {name: '选项6'}
        ]
    }
});
```

#### 禁用组件

<div class="m-example"></div>

```xml
<check.group source={source} disabled />
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'},
            {name: '选项4'},
            {name: '选项5'},
            {name: '选项6'}
        ]
    }
});
```

#### 多行

<div class="m-example"></div>

```xml
<check.group source={source} block />
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'},
            {name: '选项4'},
            {name: '选项5'},
            {name: '选项6'}
        ]
    }
});
```

#### 远程数据

<div class="m-example"></div>

```xml
<check.group service={@(this.service)} />
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

#### 全选

<div class="m-example"></div>

```xml
<label><input type="checkbox" class="u-check" r-model={checkedAll}> 全选</label>
<check.group source={source} />
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'},
            {name: '选项4'},
            {name: '选项5'},
            {name: '选项6'}
        ]
    },
    computed: {
        checkedAll: {
            get: function() {
                var source = this.data.source;
                return source.filter(function(item) {
                    return item.checked;
                }).length === source.length;
            },
            set: function(value) {
                this.data.source.forEach(function(item) {
                    item.checked = !!value;
                })
            }
        }
    }
});
```
