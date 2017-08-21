---
title: 复选组
masonry: true
---
<!-- demo_start -->
*基本形式*
<div class="m-example"></div>

```xml
<kl-check-group source={source} value={checkedValue} />
<div>已选择的： {checkedValue}</div>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '一般贸易', id: 1},
            {name: '海淘', id: 2},
            {name: '直邮', id: 3},
            {name: '保税', id: 4}
        ]
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
*表单项*

<div class="m-example"></div>

```xml
<kl-form>
    <kl-row>
        <kl-col span=12>
            <kl-form-item title="跨境方式" hint="跨境方式">
                <kl-check-group source={source} />
            </kl-form-item>
        </kl-col>
    </kl-row>
    
</kl-form>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '一般贸易', id: 1},
            {name: '海淘', id: 2},
            {name: '直邮', id: 3},
            {name: '保税', id: 4}
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
            {name: '一般贸易', id: 1},
            {name: '海淘', id: 2},
            {name: '直邮', id: 3},
            {name: '保税', id: 4}
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
            {name: '一般贸易', id: 1},
            {name: '海淘', id: 2},
            {name: '直邮', id: 3},
            {name: '保税', id: 4}
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
                url: '/data/KLCheckGroup.json',
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
            {name: '一般贸易', id: 1},
            {name: '海淘', id: 2},
            {name: '直邮', id: 3},
            {name: '保税', id: 4}
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
