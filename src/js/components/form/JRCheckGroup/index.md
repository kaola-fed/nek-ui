---
title: 复选组
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-check-group source={source} />
```

```javascript
var component = new JRUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1', id: 1},
            {name: '选项2', id: 2},
            {name: '选项3', id: 3},
            {name: '选项4', id: 4},
            {name: '选项5', id: 5},
            {name: '选项6', id: 6}
        ]
    }
});
```
<!-- demo_end -->

### 表单项

在表单中使用

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-form>
    <jr-form-item cols="12" title="用户名" hint="用户名的用途">
        <jr-check-group source={source} />
    </jr-form-item>
</jr-form>
```

```javascript
var component = new JRUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1', id: 1},
            {name: '选项2', id: 2},
            {name: '选项3', id: 3},
            {name: '选项4', id: 4},
            {name: '选项5', id: 5},
            {name: '选项6', id: 6}
        ]
    }
});
```
<!-- demo_end -->

### 禁用组件

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-check-group source={source} disabled />
```

```javascript
var component = new JRUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1', id: 1},
            {name: '选项2', id: 2},
            {name: '选项3', id: 3},
            {name: '选项4', id: 4},
            {name: '选项5', id: 5},
            {name: '选项6', id: 6}
        ]
    }
});
```
<!-- demo_end -->

### 多行

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-check-group source={source} block />
```

```javascript
var component = new JRUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1', id: 1},
            {name: '选项2', id: 2},
            {name: '选项3', id: 3},
            {name: '选项4', id: 4},
            {name: '选项5', id: 5},
            {name: '选项6', id: 6}
        ]
    }
});
```
<!-- demo_end -->

### 远程数据

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-check-group service={@(this.service)} />
```

```javascript
var component = new JRUI.Component({
    template: template,
    service: {
        getList: function(params, success) {
            JRUI.ajax.request({
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
<!-- demo_end -->

### 全选

<!-- demo_start -->
<div class="m-example"></div>

```xml
<check name="全选" checked={checkedAll} on-check={this._checkAll($event)} />
<jr-check-group source={source} />
```

```javascript
var component = new JRUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1', id: 1},
            {name: '选项2', id: 2},
            {name: '选项3', id: 3},
            {name: '选项4', id: 4},
            {name: '选项5', id: 5},
            {name: '选项6', id: 6}
        ]
    },
    computed: {
        checkedAll: function() {
            var source = this.data.source;
            return source.filter(function(item) {
                return item.checked;
            }).length === source.length;
        }
    },
    _checkAll: function(event) {
      this.data.source.forEach(function(d) {
        d.checked = !!event.checked;
      })
    },
});
```
<!-- demo_end -->
