---
title: 单选组
masonry: true
---
<!-- demo_start -->
*基本形式*
<div class="m-example"></div>

```xml
<kl-radio-group source={source} value={value} on-select={console.log($event)} />
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
        ],
        value: 2
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
*数据绑定*
<div class="m-example"></div>

```xml
<kl-radio-group source={source} value={value} selected={selected} />
<div>value: {value}</div>
<div>selected: {selected ? JSON.stringify(selected) : ''}</div>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '一般贸易', id: 11},
            {name: '海淘', id: 22},
            {name: '直邮', id: 33},
            {name: '保税', id: 44}
        ],
        value: 3
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
    <kl-form-item title="跨境方式" tip="跨境方式">
        <kl-radio-group source={source} value={value}/>
    </kl-form-item>
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
        ],
        value: 1
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
*禁用组件*
<div class="m-example"></div>

```xml
<kl-radio-group source={source} disabled />
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
<kl-radio-group service={@(this.service)} value={value}/>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    service: {
        getList: function(params, success) {
            NEKUI.ajax.request({
                url: '/data/KLRadioGroup.json',
                method: 'get',
                type: 'json',
                data: params,
                success: success
            });
        }
    },
    data: {
        value: 4
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
*多行*
<div class="m-example"></div>

```xml
<kl-radio-group source={source} value={value} block />
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
        ],
        value: 2
    }
});
```
<!-- demo_end -->
