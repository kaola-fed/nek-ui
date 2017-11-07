---
title: 通知
---

创建显示消息的通知，并且能自动淡出。类似Android中的Toast。

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<button class="u-btn u-btn-primary" on-click={this.show()}>Notify</button>
```

```javascript
var component = new JRUI.Component({
    template: template,
    show: function() {
        JRUI.JRNotify.show('This is a message.');
    }
});
```
<!-- demo_end -->

### 状态扩展

<!-- demo_start -->
<div class="m-example"></div>

```xml
<button class="u-btn u-btn-info" on-click={this.show('info')}>Info</button>
<button class="u-btn u-btn-success" on-click={this.show('success')}>Success</button>
<button class="u-btn u-btn-warning" on-click={this.show('warning')}>Warning</button>
<button class="u-btn u-btn-error" on-click={this.show('error')}>Error</button>
```

```javascript
var component = new JRUI.Component({
    template: template,
    show: function(state) {
        JRUI.JRNotify[state](state + ' message.', state);
    }
});
```
<!-- demo_end -->

### 位置扩展

<!-- demo_start -->
<div class="m-example"></div>

```xml
<button class="u-btn" on-click={this.show(0)}>Top Center</button>
<button class="u-btn" on-click={this.show(1)}>Top Left</button>
<button class="u-btn" on-click={this.show(2)}>Top Right</button>
<button class="u-btn" on-click={this.show(3)}>Bottom Center</button>
<button class="u-btn" on-click={this.show(4)}>Bottom Left</button>
<button class="u-btn" on-click={this.show(5)}>Bottom Right</button>
```

```javascript
var component = new JRUI.Component({
    template: template,
    config: function() {
        this.notifies = [
            new JRUI.JRNotify({data: {position: 'topcenter'} }),
            new JRUI.JRNotify({data: {position: 'topleft'} }),
            new JRUI.JRNotify({data: {position: 'topright'} }),
            new JRUI.JRNotify({data: {position: 'bottomcenter'} }),
            new JRUI.JRNotify({data: {position: 'bottomleft'} }),
            new JRUI.JRNotify({data: {position: 'bottomright'} })
        ];
    },
    show: function(index) {
        var notify = this.notifies[index];
        notify.show('Position: ' + notify.data.position + '.');
    }
});
```
<!-- demo_end -->

### 嵌入文档流

上面的模式通知都是以`fixed`的形式固定在浏览器中，如果要将通知嵌入到文档流，先将`notify`注入到需要的位置，同时设置`notify`的`position="static"`。

<!-- demo_start -->
<div class="m-example"></div>

```xml
<button class="u-btn u-btn-primary" on-click={this.show()}>Static</button>
<notify ref="notify" position="static" duration="0" />
```

```javascript
var component = new JRUI.Component({
    template: template,
    show: function() {
        this.$refs.notify.show('Static notify.');
    }
});
```
<!-- demo_end -->

### 消息停留时间

可以通过设置`notify`的`duration`参数设置所有消息的停留时间，也可以在`show`的时候单独设置该条消息的停留时间，单位为毫秒。

<!-- demo_start -->
<div class="m-example"></div>

```xml
<button class="u-btn" on-click={this.show(500)}>0.5s</button>
<button class="u-btn" on-click={this.show(1000)}>1s</button>
<button class="u-btn" on-click={this.show(2000)}>2s</button>
<button class="u-btn" on-click={this.show(0)}>常驻</button>
```

```javascript
var component = new JRUI.Component({
    template: template,
    show: function(duration) {
        JRUI.JRNotify.show('Duration: ' + duration + ' ms.', null, duration);
    }
});
```
<!-- demo_end -->

### 始终显示一条

将`single`设置为`true`，可以让`notify`始终只显示一条消息。

<!-- demo_start -->
<div class="m-example"></div>

```xml
<button class="u-btn u-btn-info" on-click={this.show('info')}>Info</button>
<button class="u-btn u-btn-success" on-click={this.show('success')}>Success</button>
<button class="u-btn u-btn-warning" on-click={this.show('warning')}>Warning</button>
<button class="u-btn u-btn-error" on-click={this.show('error')}>Error</button>
```

```javascript
var component = new JRUI.Component({
    template: template,
    config: function() {
        this.notify = new JRUI.JRNotify({data: {single: true} });
    },
    number: 1,
    show: function(state) {
        this.notify[state]('Message ' + this.number + '.');
        this.number++;
    }
});
```
<!-- demo_end -->
