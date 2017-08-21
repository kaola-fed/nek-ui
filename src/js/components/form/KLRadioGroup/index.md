---
title: 单选组
masonry: true
---

<!-- demo_start -->
*基本形式*
<div class="m-example"></div>

```xml
<kl-radio-group source={source} on-select={console.log($event)} />
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
    <kl-row>
        <kl-col span=12>
            <kl-form-item title="跨境方式" hint="跨境方式">
                <kl-radio-group source={source} />
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
<kl-radio-group service={@(this.service)} />
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
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
*多行*
<div class="m-example"></div>

```xml
<kl-radio-group source={source} block />
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
