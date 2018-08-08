---
title: 时间选择
masonry: true
---

<!-- demo_start -->
### 基本形式
<div class="m-example"></div>

```xml
<kl-time-picker value="{value}" />
<p>选择的是：{value}</p>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        value: '',
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 时间范围选择
<div class="m-example"></div>

```xml
<kl-time-picker value="{value}" type="timerange" />
<p>选择的是：{value}</p>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        value: '',
    }
});
```
<!-- demo_end -->


<!-- demo_start -->
### 选择时分
<div class="m-example"></div>

```xml
<kl-time-picker format="HH:mm" value="{value}" />
<p>选择的是：{value}</p>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        value: '',
    }
});
```
<!-- demo_end -->


<!-- demo_start -->
### 设置时间间隔
<div class="m-example"></div>

```xml
<kl-time-picker steps={[1, 15, 15]} value="{value}" />
<p>选择的是：{value}</p>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        value: '',
    }
});
```
<!-- demo_end -->


<!-- demo_start -->
### 带有确认操作
<div class="m-example"></div>

```xml
<kl-time-picker confirm value="{value}" />
<p>选择的是：{value}</p>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        value: '',
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 不可选时间
<div class="m-example"></div>

```xml
<kl-time-picker
    disabled-hours="[1,5,10]"
    disabled-minutes="[0,10,20]" value={value}></kl-time-picker>
<p>选择的是：{value}</p>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        value: '',
    }
});
```
<!-- demo_end -->
