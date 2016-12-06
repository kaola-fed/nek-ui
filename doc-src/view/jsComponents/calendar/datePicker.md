### 示例
#### 基本形式

<div class="m-example"></div>

```xml
<ui.form>
    <ui.field cols=6>
        <datePicker />
    </ui.field>
    <ui.field cols=6>
        <datePicker date="2008-08-08" />
    </ui.field>
</ui.form>
```

#### 禁用组件

<div class="m-example"></div>

```xml
<datePicker disabled />
```

#### 日期范围

<div class="m-example"></div>

```xml
<div class="f-cb">
    <datePicker minDate={minDate} maxDate={maxDate} class="g-col g-col-6" />
    <datePicker minDate="2008-08-08" maxDate="2008-08-16" class="g-col g-col-6" />
</div>
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        minDate: new Date(+new Date + 2*24*3600*1000),
        maxDate: new Date(+new Date + 7*24*3600*1000)
    }
});
```

#### 数据绑定

<div class="m-example"></div>

```xml
<div class="f-cb">
    <datePicker date={date} class="g-col g-col-6" />
    <datePicker date={date} class="g-col g-col-6" />
</div>
<p>当前选择的日期为：{date | format: 'yyyy-MM-dd'}</p>
```

#### 事件

请打开浏览器的控制台查看结果。

<div class="m-example"></div>

```xml
<datePicker
    on-toggle={console.log('on-toggle:', '$event.open:', $event.open)}
    on-select={console.log('on-select:', '$event.date:', $event.date)}
    on-change={console.log('on-change:', '$event.date:', $event.date)} />
```