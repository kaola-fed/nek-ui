---
title: 日期选择
masonry: true
---

<!-- demo_start -->
### 日期选择
<div class="m-example"></div>

```xml
<kl-row>
    <kl-col span=12>
        <kl-date-picker lang="en-US" date={selectDate} placeholder="选择日期" />
    </kl-col>
</kl-row>
<kl-row>
    <kl-col span=12>
        <kl-text text="当前选择的日期为：{selectDate}"></kl-text>
    </kl-col>
</kl-row>
<kl-row>
    <kl-col span=12>
        <kl-text text="格式化后的日期为：{selectDate | format: 'yyyy-MM-dd HH:mm:ss'}"></kl-text>
    </kl-col>
</kl-row>
```
<!-- demo_end -->

<!-- demo_start -->
### 日期时间选择
<div class="m-example"></div>

```xml

<kl-row>
    <kl-col span=12>
        <kl-date-picker lang="en-US" date={selectDate} placeholder="选择日期" showTime />
    </kl-col>
</kl-row>
<kl-row>
    <kl-col span=12>
        <kl-text text="当前选择的日期为：{selectDate}"></kl-text>
    </kl-col>
</kl-row>
<kl-row>
    <kl-col span=12>
        <kl-text text="格式化后的日期为：{selectDate | format: 'yyyy-MM-dd HH:mm:ss'}"></kl-text>
    </kl-col>
</kl-row>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        selectDate: null
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 禁用组件
通过`disabled`属性来设置组件是否可用
<div class="m-example"></div>

```xml
<kl-date-picker disabled />
```
<!-- demo_end -->

<!-- demo_start -->
### 只可读组件
通过`readonly`属性来设置组件是否值可读
<div class="m-example"></div>

```xml
<kl-date-picker date="2017=10-10" readonly />
```
<!-- demo_end -->

<!-- demo_start -->
### 日期范围
通过指定`minDate` 和`maxDate`来控制日期选择范围
<div class="m-example"></div>

```xml
<kl-row>
    <kl-col span=12>
        控制时间选择范围：如可选择2017-03-01 - 2017-12-30段内的时间
    </kl-col>
</kl-row>
<kl-row>
    <kl-col span=6>
        <kl-date-picker minDate="2017-03-01" maxDate="2017-12-30" />
    </kl-col>
</kl-row>
<kl-row>
    <kl-col span=12>
        选择时间范围：开始时间不能大于结束时间
    </kl-col>
</kl-row>
<kl-row>
    <kl-col span=6>
        <kl-date-picker maxDate={endTime}  date={startTime} placeholder="开始时间"/>
    </kl-col>
    <kl-col span=6>
        <kl-date-picker minDate="{startTime}"  date={endTime} placeholder="结束时间" />
    </kl-col>
</kl-row>
```

<!-- demo_end -->

<!-- demo_start -->
### 数据绑定
通过`date`属性来进行数据绑定
<div class="m-example"></div>

```xml
<kl-row>
    <kl-col span=6>
        <kl-date-picker date={date} />
    </kl-col>
    <kl-col span=6>
        <kl-date-picker date={date} readonly disabled=true />
    </kl-col>
</kl-row>
<kl-row>
    <kl-col span=12>
        当前选择的日期为：{date | format: 'yyyy-MM-dd'}
    </kl-col> 
</kl-row>
```
<!-- demo_end -->

<!-- demo_start -->
### 事件
日期时间选择组件支持`toggle`、` select`和`change`事件
* `toggle`： 组件展开或收起的时候触发的事件
* `select`： 当选择日期的时候触发
* `change`： 当所学日期变换是触发的事件

请打开浏览器的控制台查看结果。
<div class="m-example"></div>

```xml
<kl-date-picker
    on-toggle={console.log('on-toggle:', '$event.open:', $event.open)}
    on-select={console.log('on-select:', '$event.date:', $event.date)}
    on-change={console.log('on-change:', '$event.date:', $event.date)} />
```
<!-- demo_end -->

<!-- demo_start -->
### 表单中使用
<div class="m-example"></div>
```xml
<kl-form ref="form">
    <kl-form-item title="开始时间" labelSize="70px" cols=10 required >
        <kl-date-picker date={date}  />
     </kl-form-item>
      <kl-button title="验证" on-click={this.validate()} />
</kl-form>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    validate: function() {
        var $form = this.$refs.form;
        return $form.validate().success;
    }
});

```
<!-- demo_end -->
