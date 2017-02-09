---
title: 提示选择
---

## 基本形式

<div class="m-example"></div>

```xml
<suggest source={source} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: 'abandon'},
            {name: 'about'},
            {name: 'absent'},
            {name: 'bread'},
            {name: 'break'},
            {name: 'brief'},
            {name: 'calendar'},
            {name: 'cancel'},
            {name: 'column'}
        ]
    }
});
```

## 获取选项的id

<div class="m-example"></div>

```xml
<div class="f-cb">
    <suggest source={source} id={id} class="g-col g-col-4" />{id}
</div>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {id:1, name: 'abandon'},
            {id:2, name: 'about'},
            {id:3, name: 'absent'},
            {id:4, name: 'bread'},
            {id:5, name: 'brief'},
            {id:6, name: 'calendar'},
            {id:7, name: 'column'}
        ]
    }
});
```

## 禁用某一项，禁用组件

<div class="m-example"></div>

```xml
<div class="f-cb">
    <suggest source={source} class="g-col g-col-6" />
    <suggest source={source} disabled class="g-col g-col-6" />
</div>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: 'abandon'},
            {name: 'about'},
            {name: 'absent（禁用）', disabled: true},
            {name: 'bread'},
            {name: 'break（禁用）', disabled: true},
            {name: 'brief'},
            {name: 'calendar'},
            {name: 'cancel（禁用）', disabled: true},
            {name: 'column'}
        ]
    }
});
```

## Placeholder

<div class="m-example"></div>

```xml
<suggest source={source} placeholder="输入时会自动提示" />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: 'abandon'},
            {name: 'about'},
            {name: 'absent'},
            {name: 'bread'},
            {name: 'break'},
            {name: 'brief'},
            {name: 'calendar'},
            {name: 'cancel'},
            {name: 'column'}
        ]
    }
});
```

## 开始提示长度

当输入长度>=`startLength`属性后开始提示。

<div class="m-example"></div>

```xml
<suggest source={source} placeholder="输入2个字符后开始提示" startLength="2" />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: 'abandon'},
            {name: 'about'},
            {name: 'absent'},
            {name: 'bread'},
            {name: 'break'},
            {name: 'brief'},
            {name: 'calendar'},
            {name: 'cancel'},
            {name: 'column'}
        ]
    }
});
```

## 匹配方式

<div class="m-example"></div>

```xml
<ui.form>
    <form.item cols=4>
        <suggest source={source} placeholder="匹配全局" matchType="all" />
    </form.item>
    <form.item cols=4>
        <suggest source={source} placeholder="只匹配开头" matchType="start" />
    </form.item>
    <form.item cols=4>
        <suggest source={source} placeholder="只匹配结尾" matchType="end" />
    </form.item>
</ui.form>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: 'abandon'},
            {name: 'about'},
            {name: 'absent'},
            {name: 'bread'},
            {name: 'break'},
            {name: 'brief'},
            {name: 'calendar'},
            {name: 'cancel'},
            {name: 'column'}
        ]
    }
});
```

## 严格模式

当为严格模式时，`value`属性必须在source中选择，否则为空。

<div class="m-example"></div>

```xml
<p><suggest source={source} placeholder="非严格模式" value={value1} /> {value1}</p>
<p><suggest source={source} placeholder="严格模式" strict value={value2} /> {value2}</p>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: 'abandon'},
            {name: 'about'},
            {name: 'absent'},
            {name: 'bread'},
            {name: 'break'},
            {name: 'brief'},
            {name: 'calendar'},
            {name: 'cancel'},
            {name: 'column'}
        ]
    }
});
```

## 远程数据

支持远程过滤。

<div class="m-example"></div>

```xml
<suggest service={@(this.service)} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    service: {
        getList: function(params, success) {
            NEKUI.ajax.request({
                url: '../data/suggest.json',
                method: 'get',
                type: 'json',
                data: params,
                success: success
            });
        }
    }
});
```
