---
title: 日期选择
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.form>
    <form.item cols=6>
        <date.picker lang="en-US" />
    </form.item>
    <form.item cols=6>
        <date.picker date="2008-08-08" />
    </form.item>
</ui.form>
```
<!-- demo_end -->

### 日期时间选择

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class="f-cb">
<ui.form>
    <form.item cols=4>
        <date.picker showTime date={date1} />
    </form.item>
    <form.item cols=4>
        <date.picker showTime date={date2} />
    </form.item>
</ui.form>
</div>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        date1: 1481287269287,
        date2: '2016-12-09 09:03'
    }
});
```
<!-- demo_end -->

### 禁用组件

<!-- demo_start -->
<div class="m-example"></div>

```xml
<date.picker disabled />
```
<!-- demo_end -->

### 日期范围

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class="f-cb">
    <date.picker minDate={minDate} maxDate={maxDate} class="g-col g-col-6" />
    <date.picker minDate="2008-08-08" maxDate="2008-08-16" class="g-col g-col-6" />
</div>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        minDate: new Date(+new Date + 2*24*3600*1000),
        maxDate: new Date(+new Date + 7*24*3600*1000)
    }
});
```
<!-- demo_end -->

### 数据绑定

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class="f-cb">
    <date.picker date={date} class="g-col g-col-6" />
    <date.picker date={date} class="g-col g-col-6" />
</div>
<p>当前选择的日期为：{date | format: 'yyyy-MM-dd'}</p>
```
<!-- demo_end -->

### 事件

请打开浏览器的控制台查看结果。

<!-- demo_start -->
<div class="m-example"></div>

```xml
<date.picker
    on-toggle={console.log('on-toggle:', '$event.open:', $event.open)}
    on-select={console.log('on-select:', '$event.date:', $event.date)}
    on-change={console.log('on-change:', '$event.date:', $event.date)} />
```
<!-- demo_end -->
