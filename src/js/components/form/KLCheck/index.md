---
title: 复选框
masonry: true
---

<!-- demo_start -->
### 基本形式
<div class="m-example"></div>

```xml
<kl-check name="多选按钮" checked={isChecked} on-check={console.log($event)} on-change={console.log($event)}/>
<div>checked: {isChecked}</div>
```
<!-- demo_end -->

<!-- demo_start -->
### 在表单中使用
<div class="m-example"></div>

```xml
<kl-form>
    <kl-form-item title="通知方式" tip="通知方式">
            <kl-check name="邮件" checked={isEmail}/>
            <kl-check name="短信" checked={isMsg}/>
    </kl-form-item>
</kl-form>
<div>通知方式：{#if isEmail} 邮件 {/if} {#if isMsg} 短信 {/if} </div>
```
<!-- demo_end -->

<!-- demo_start -->
### 半选状态
<div class="m-example"></div>

```xml
<kl-check name="半选状态" checked={isChecked} />
<div>checked： {isChecked}</div>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        isChecked: null
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 多行
<div class="m-example"></div>

```xml
<kl-check name="邮件" block />
<kl-check name="短信" block />
```
<!-- demo_end -->

<!-- demo_start -->
### 禁用组件
<div class="m-example"></div>

```xml
<kl-check name="禁用多选按钮" disabled />
```
<!-- demo_end -->

<!-- demo_start -->
### 插入模版
<div class="m-example"></div>

```xml
<kl-check name="多选按钮" checked={isChecked} on-check={console.log($event)} on-change={console.log($event)} />
<kl-button title="测试"></kl-button>

<div>checked: {isChecked}</div>
```
<!-- demo_end -->
