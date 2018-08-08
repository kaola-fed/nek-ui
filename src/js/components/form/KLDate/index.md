---
title: 新时间选择
masonry: true
---

<!-- demo_start -->
### 时间选择
<div class="m-example"></div>

```xml
<kl-date value="{value}"></kl-date>
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
### 日期时间选择
<div class="m-example"></div>

```xml
<kl-date type="datetime" value="{value}"></kl-date>
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
### 日期范围选择
<div class="m-example"></div>

```xml
<kl-date value="{value}" type="daterange"></kl-date>
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
### 日期时间范围选择
<div class="m-example"></div>

```xml
<kl-date value="{value}" type="datetimerange"></kl-date>
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
### 年月选择
<div class="m-example"></div>

```xml
<kl-row>
    <kl-col span="6">
        <kl-date type="year" value="{value1}"></kl-date>
    </kl-col>
    <kl-col span="6">
        <kl-date type="month" value="{value2}"></kl-date>
    </kl-col>
</kl-row>
<p>选择的年是：{value1}，选择的月份是：{value2}</p>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        value1: '',
        value2: '',
    }
});
```
<!-- demo_end -->


<!-- demo_start -->
### 快捷方式
<div class="m-example"></div>

```xml
<kl-row>
    <kl-col span="6">
        <kl-date type="date" value="{value1}" shortcuts={shortcuts1}></kl-date>
    </kl-col>
    <kl-col span="6">
        <kl-date type="daterange" value="{value2}" shortcuts={shortcuts2}></kl-date>
    </kl-col>
</kl-row>
<p>选择的年是：{value1}，选择的月份是：{value2}</p>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        value1: '',
        shortcuts1: [
            {
                text: 'Today',
                value () {
                    return new Date();
                },
                onClick: (picker) => {
                    this.$Message.info('Click today');
                }
            },
            {
                text: 'Yesterday',
                value () {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    return date;
                },
                onClick: (picker) => {
                    this.$Message.info('Click yesterday');
                }
            },
            {
                text: 'One week',
                value () {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    return date;
                },
                onClick: (picker) => {
                    this.$Message.info('Click a week ago');
                }
            }
        ],
        value2: '',
        shortcuts2: [
            {
                text: '1 week',
                value () {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    return [start, end];
                }
            },
            {
                text: '1 month',
                value () {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    return [start, end];
                }
            },
            {
                text: '3 months',
                value () {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    return [start, end];
                }
            }
        ]
    }
});
```
<!-- demo_end -->


<!-- demo_start -->
### 带有确认操作
<div class="m-example"></div>

```xml
<kl-row>
    <kl-col span="6">
        <kl-date type="date" value="{value1}" confirm></kl-date>
    </kl-col>
    <kl-col span="6">
        <kl-date type="daterange" value="{value2}" confirm></kl-date>
    </kl-col>
</kl-row>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        value1: '',
        value2: '',
    }
});
```
<!-- demo_end -->


<!-- demo_start -->
### 设置不可选择时间
<div class="m-example"></div>

```xml
<kl-row>
    <kl-col span="6">
        <kl-date type="date" value="{value1}" disabledDate="{disabledDate1}"></kl-date>
    </kl-col>
    <kl-col span="6">
        <kl-date type="daterange" value="{value2}" disabledDate="{disabledDate2}"></kl-date>
    </kl-col>
</kl-row>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        value1: '',
        value2: '',
        disabledDate1 (date) {
            return date && date.valueOf() < Date.now() - 86400000;
        },
        disabledDate2 (date) {
            const disabledDay = date.getDate();
            return disabledDay === 15;
        }
    }
});
```
<!-- demo_end -->


<!-- demo_start -->
### 日期范围选择的时候，面板不联动
<div class="m-example"></div>

```xml
<kl-date value="{value}" type="daterange" splitPanels></kl-date>
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
