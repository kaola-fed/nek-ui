---
title: 复选组
masonry: true
---

<!-- demo_start -->
*基本形式*
<div class="m-example"></div>

```xml
<kl-check-group source={source} />
```

```javascript
var component = new NEKUI.Component({
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

<!-- demo_start -->
*表单项*

在表单中使用

<div class="m-example"></div>

```xml
<kl-form>
    <kl-form-item cols="12" title="用户名" hint="用户名的用途">
        <kl-check-group source={source} />
    </kl-form-item>
</kl-form>
```

```javascript
var component = new NEKUI.Component({
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

<!-- demo_start -->
*禁用组件*
<div class="m-example"></div>

```xml
<kl-check-group source={source} disabled />
```

```javascript
var component = new NEKUI.Component({
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

<!-- demo_start -->
*多行*
<div class="m-example"></div>

```xml
<kl-check-group source={source} block />
```

```javascript
var component = new NEKUI.Component({
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

<!-- demo_start -->
*远程数据*
<div class="m-example"></div>

```xml
<kl-check-group service={@(this.service)} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    service: {
        getList: function(params, success) {
            NEKUI.ajax.request({
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

<!-- demo_start -->
*全选*
<div class="m-example"></div>

```xml
<check name="全选" checked={checkedAll} on-check={this._checkAll($event)} />
<kl-check-group source={source} />
```

```javascript
var component = new NEKUI.Component({
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
