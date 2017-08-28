---
title: 通知
masonry: true
---


<!-- demo_start -->
### 基本形式

一般用于错误、警告等提示消息。创建显示消息的通知，并且能自动弹出。

<div class="m-example"></div>

```xml
<kl-button type="tertiary" title="Notify" on-click="{this.show()}" />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    show: function() {
        NEKUI.KLNotify.show('提示你点击了按钮');
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 配置信息position
设置提示消息相对于窗口显示的位置。取值有`topcenter`、`topleft`、`topright`、`bottomcenter`、`bottomleft`、`bottomright`、`static`

**配置信息可在config中统一设置**
<div class="m-example"></div>

```xml
<div class="g-row">
    <kl-button type="tertiary" title="topcenter" on-click="{this.show('topcenter')}" />   
    <kl-button type="tertiary" title="topleft" on-click="{this.show('topleft')}" />   
    <kl-button type="tertiary" title="topright" on-click="{this.show('topright')}" />   
    <kl-button type="tertiary" title="bottomcenter" on-click="{this.show('bottomcenter')}" />   
</div>
<div class="g-row">
    <kl-button type="tertiary" title="bottomleft" on-click="{this.show('bottomleft')}" />   
    <kl-button type="tertiary" title="bottomright" on-click="{this.show('bottomright')}" />   
    <kl-button type="tertiary" title="static" on-click="{this.show('static')}" />   
</div>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    show: function(position) {
        var Notify = new NEKUI.KLNotify({data: {position: position} });
        Notify.show('position:' + position);
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 配置信息duration
设置消息显示的时间，单位是ms，如果设置为`0`则表示提示消息一直存在，默认为`2秒`

**配置信息可在config中统一设置**

<div class="m-example"></div>

```xml
<kl-button type="tertiary" title="消息提示不自动关闭" on-click="{this.show(0)}" />  
<kl-button type="tertiary" title="5秒后自动关闭" on-click="{this.show(5000)}" />  
<kl-button type="tertiary" title="默认2秒" on-click="{this.show()}" />  
```

```javascript
var component = new NEKUI.Component({
    template: template,
    show: function(duration) { 
        var Notify =  new NEKUI.KLNotify({data: {duration: duration} });
        Notify.show('duration:' + (duration || '')); 
    }
});
```
<!-- demo_end -->

<!-- demo_start -->

### 配置信息single
是否始终显示一条，将`single`设置为`true`，可以让`notify`始终只显示一条消息。

**配置信息可在config中统一设置**

<div class="m-example"></div>

```xml
<kl-button type="tertiary" title="info" on-click="{this.show('info')}" />  
<kl-button type="tertiary" title="success" on-click="{this.show('success')}" />  
<kl-button type="tertiary" title="warning" on-click="{this.show('warning')}" />  
<kl-button type="tertiary" title="error" on-click="{this.show('error')}" />  
```

```javascript
var component = new NEKUI.Component({
    template: template,
    config: function() {
        // config中初始化notify，配置只显示一条消息
        this.notify = new NEKUI.KLNotify({data: {single: true, duration: 0} });
    },
    number: 1,
    show: function(state) {
        this.notify[state](state + this.number + '.');
        this.number++;
    }
});
```
<!-- demo_end -->


<!-- demo_start -->

### 配置信息visible

通知是否显示，将`visible`设置为`true`，通知不显示。设置为false，则可以显示

**配置信息可在config中统一设置**

<div class="m-example"></div>

```xml
<kl-button type="tertiary" title="true" on-click="{this.show(true)}" />  
<kl-button type="tertiary" title="false" on-click="{this.show(false)}" />  
```

```javascript
var component = new NEKUI.Component({
    template: template,
    show: function(visible) {
        var Notify = new NEKUI.KLNotify({data: {visible: visible} });
        Notify.show('visible: ' + visible);
    }
});
```
<!-- demo_end -->

<!-- demo_start -->

### 配置信息class
设置额外样式

<div class="m-example">
  <style>
    .m-bg-notify-demo {
        border: 1px solid red;
    }  
  </style>
</div>

```xml
<kl-button type="tertiary" title="Class" on-click="{this.show()}" />  
```

```javascript
var component = new NEKUI.Component({
    template: template,
    show: function(visible) {
       var Notify =  new NEKUI.KLNotify({data: {class: 'm-bg-notify-demo', duration: 0}});
       Notify.show('设置红色边框');
    }
});
```
<!-- demo_end -->


<!-- demo_start -->
### show方法
打开一条提示消息，传递3个参数，第一个参数`text`(必传): 消息内容；第二个参数`state`(可选): 消息状态`success`、`info`、`warning`、`error`，默认为`info`；
第三个参数`duration`消息展示时间，单位为ms，默认2秒，如果为0，则表示永不消失。*

**同时消息提示时会派发`show`事件，可以通过`NEKUI.KLNotify.notify.$on('show', callback')`
  监听，并且该事件一定要写在show方法调用之前**

<div class="m-example"></div>

```xml
<kl-button type="tertiary" title="参数一" on-click="{this.show('只传递参数一')}" />  
<kl-button type="tertiary" title="一和二" on-click="{this.show('传递参数一和二', 'error')}" />  
<kl-button type="tertiary" title="都传" on-click="{this.show('参数都传递', 'error', 1000)}" />  
```

```javascript

var component = new NEKUI.Component({
    template: template,
    show: function(content, state, duration) {
        NEKUI.KLNotify.notify.$on('show', function(evt){
            alert('show方法调用成功!'); 
        });
        NEKUI.KLNotify.show(content, state, duration);
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### close方法
关闭某条消息，同时会派发出`close`事件，可以通过`$on('close', callback)`监听

<div class="m-example"></div>

```xml
<kl-button type="tertiary" title="close" on-click="{this.show('2s后调用close方法')}" /> 
```

```javascript
var component = new NEKUI.Component({
    template: template,
    show: function(content) {
        var msg = null;
        NEKUI.KLNotify.notify.$on('show', function(evt){
           msg = evt.message;
        });
        NEKUI.KLNotify.show(content, 'success', 10000);
        setTimeout(function(){
            NEKUI.KLNotify.close(msg); 
        }, 2000);
        NEKUI.KLNotify.notify.$on('close', function(evt){
            alert('evt对象的message属性：text【' + evt.message.text + '】;duration【' + evt.message.duration + '】;state【' + evt.message.state) + '】';
        });
        
    }
});
```
<!-- demo_end -->


<!-- demo_start -->
### closeAll方法
关闭所有消息，静态方法，通过NEKUI.KLNotify调用

<div class="m-example"></div>

```xml
<kl-button type="tertiary" title="closeAll" on-click="{this.show('2s后调用close方法')}" /> 
```

```javascript
var component = new NEKUI.Component({
    template: template,
    show: function(content) {
       NEKUI.KLNotify.show(content, 'success', 0);
       setTimeout(function(){ 
            // 关闭所有
            NEKUI.KLNotify.closeAll();
       }, 2000)
    }
});
```
<!-- demo_end -->


<!-- demo_start -->
### 特殊类型方法
show方法简写，弹出特殊类型消息，方法有`success`、`error`、`warning`、`error`。可以传递两个参数，第一个为消息内容，第二位消息展示时间，同duration属性

<div class="m-example"></div>

```xml
    <kl-button type="tertiary" title="info" on-click="{this.show('info', 6000)}" /> 
    <kl-button type="tertiary" title="success" on-click="{this.show('success', 5000)}" /> 
    <kl-button type="tertiary" title="warning" on-click="{this.show('warning', 4000)}" /> 
    <kl-button type="tertiary" title="error" on-click="{this.show('error', 3000)}" /> 
```

```javascript
var component = new NEKUI.Component({
    template: template,
    show: function(state, duration) {
        NEKUI.KLNotify[state]('特殊方法：' + state, duration);
    }
});
```
<!-- demo_end -->








