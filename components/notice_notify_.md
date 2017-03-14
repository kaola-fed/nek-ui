---
title: 通知
type: components
name: notify
cate: 通知
order: 302
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
var component = new NEKUI.Component({
    template: template,
    show: function() {
        NEKUI.Notify.show('This is a message.');
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
var component = new NEKUI.Component({
    template: template,
    show: function(state) {
        NEKUI.Notify[state](state + ' message.', state);
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
var component = new NEKUI.Component({
    template: template,
    config: function() {
        this.notifies = [
            new NEKUI.Notify({data: {position: 'topcenter'} }),
            new NEKUI.Notify({data: {position: 'topleft'} }),
            new NEKUI.Notify({data: {position: 'topright'} }),
            new NEKUI.Notify({data: {position: 'bottomcenter'} }),
            new NEKUI.Notify({data: {position: 'bottomleft'} }),
            new NEKUI.Notify({data: {position: 'bottomright'} })
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
var component = new NEKUI.Component({
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
var component = new NEKUI.Component({
    template: template,
    show: function(duration) {
        NEKUI.Notify.show('Duration: ' + duration + ' ms.', null, duration);
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
var component = new NEKUI.Component({
    template: template,
    config: function() {
        this.notify = new NEKUI.Notify({data: {single: true} });
    },
    number: 1,
    show: function(state) {
        this.notify[state]('Message ' + this.number + '.');
        this.number++;
    }
});
```
<!-- demo_end -->

## API
## Classes

<dl>
<dt><a href="#Notify">Notify</a></dt>
<dd></dd>
</dl>

## Members

<dl>
<dt><a href="#notify">notify</a></dt>
<dd><p>直接初始化一个实例</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#config">config()</a></dt>
<dd></dd>
<dt><a href="#init">init()</a></dt>
<dd></dd>
<dt><a href="#show(text[,state][,duration]) 弹出一个消息">duration]) 弹出一个消息([text], [state], [duration])</a> ⇒ <code>void</code></dt>
<dd></dd>
<dt><a href="#close(message) 关闭某条消息">close(message) 关闭某条消息(message)</a> ⇒ <code>void</code></dt>
<dd></dd>
<dt><a href="#closeAll_new 关闭所有消息">closeAll() 关闭所有消息()</a> ⇒ <code>void</code></dt>
<dd></dd>
<dt><a href="#[info|success|warning|error](text[,duration]) 弹出特殊类型的消息。为show方法的简写方式。">duration]) 弹出特殊类型的消息。为show方法的简写方式。([text], [duration])</a> ⇒ <code>void</code></dt>
<dd></dd>
<dt><a href="#show(text[,state][,duration]) 弹出一个消息">duration]) 弹出一个消息([text], [state], [duration])</a> ⇒ <code>void</code></dt>
<dd></dd>
<dt><a href="#[info|success|warning|error](text[,duration]) 弹出特殊类型的消息。为show方法的简写方式。">duration]) 弹出特殊类型的消息。为show方法的简写方式。([text], [duration])</a> ⇒ <code>void</code></dt>
<dd></dd>
</dl>

## Events

<dl>
<dt><a href="#event_show 弹出一个消息时触发">"show 弹出一个消息时触发"</a></dt>
<dd></dd>
<dt><a href="#event_close 关闭某条消息时触发">"close 关闭某条消息时触发"</a></dt>
<dd></dd>
</dl>

<a name="Notify"></a>

## Notify
**Kind**: global class  
**Extend**: Component  
<a name="new_Notify_new"></a>

### new Notify()

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options.data] | <code>object</code> |  | = 绑定属性 |
| [options.data.position] | <code>string</code> | <code>&quot;topcenter&quot;</code> | => 通知的位置，可选参数：`topcenter`、`topleft`、`topright`、`bottomcenter`、`bottomleft`、`bottomright`、`static` |
| [options.data.duration] | <code>number</code> | <code>2000</code> | => 每条消息默认的停留毫秒数，如果为0，则表示消息常驻不消失。 |
| [options.data.single] | <code>boolean</code> | <code>false</code> | => 是否始终显示一条 |
| [options.data.visible] | <code>boolean</code> | <code>true</code> | => 是否显示 |
| [options.data.class] | <code>string</code> |  | => 补充class |

<a name="notify"></a>

## notify
直接初始化一个实例

**Kind**: global variable  
**State**: <code>[Notify](#Notify)</code>  
<a name="config"></a>

## config()
**Kind**: global function  
**Access:** protected  
<a name="init"></a>

## init()
**Kind**: global function  
**Access:** protected  
<a name="close(message) 关闭某条消息"></a>

## close(message) 关闭某条消息(message) ⇒ <code>void</code>
**Kind**: global function  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>object</code> | 需要关闭的消息对象 |

<a name="closeAll_new 关闭所有消息"></a>

## closeAll() 关闭所有消息() ⇒ <code>void</code>
**Kind**: global function  
**Access:** public  
<a name="event_show 弹出一个消息时触发"></a>

## "show 弹出一个消息时触发"
**Kind**: event emitted  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| sender | <code>object</code> | 事件发送对象 |
| message | <code>object</code> | 弹出的消息对象 |

<a name="event_close 关闭某条消息时触发"></a>

## "close 关闭某条消息时触发"
**Kind**: event emitted  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| sender | <code>object</code> | 事件发送对象 |
| message | <code>object</code> | 关闭了的消息对象 |

<a name="close(message) 关闭某条消息"></a>

## .close(message) 关闭某条消息(message) ⇒ <code>void</code>
**Kind**: static function  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>object</code> | 需要关闭的消息对象 |

<a name="closeAll_new 关闭所有消息"></a>

## .closeAll() 关闭所有消息() ⇒ <code>void</code>
**Kind**: static function  
**Access:** public  

{% raw %}
<script>
var index = 0;

    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<button class="u-btn u-btn-primary" on-click={this.show()}>Notify</button>

      */});
      
var component = new NEKUI.Component({
    template: template,
    show: function() {
        NEKUI.Notify.show('This is a message.');
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<button class="u-btn u-btn-info" on-click={this.show('info')}>Info</button>
<button class="u-btn u-btn-success" on-click={this.show('success')}>Success</button>
<button class="u-btn u-btn-warning" on-click={this.show('warning')}>Warning</button>
<button class="u-btn u-btn-error" on-click={this.show('error')}>Error</button>

      */});
      
var component = new NEKUI.Component({
    template: template,
    show: function(state) {
        NEKUI.Notify[state](state + ' message.', state);
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<button class="u-btn" on-click={this.show(0)}>Top Center</button>
<button class="u-btn" on-click={this.show(1)}>Top Left</button>
<button class="u-btn" on-click={this.show(2)}>Top Right</button>
<button class="u-btn" on-click={this.show(3)}>Bottom Center</button>
<button class="u-btn" on-click={this.show(4)}>Bottom Left</button>
<button class="u-btn" on-click={this.show(5)}>Bottom Right</button>

      */});
      
var component = new NEKUI.Component({
    template: template,
    config: function() {
        this.notifies = [
            new NEKUI.Notify({data: {position: 'topcenter'} }),
            new NEKUI.Notify({data: {position: 'topleft'} }),
            new NEKUI.Notify({data: {position: 'topright'} }),
            new NEKUI.Notify({data: {position: 'bottomcenter'} }),
            new NEKUI.Notify({data: {position: 'bottomleft'} }),
            new NEKUI.Notify({data: {position: 'bottomright'} })
        ];
    },
    show: function(index) {
        var notify = this.notifies[index];
        notify.show('Position: ' + notify.data.position + '.');
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<button class="u-btn u-btn-primary" on-click={this.show()}>Static</button>
<notify ref="notify" position="static" duration="0" />

      */});
      
var component = new NEKUI.Component({
    template: template,
    show: function() {
        this.$refs.notify.show('Static notify.');
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<button class="u-btn" on-click={this.show(500)}>0.5s</button>
<button class="u-btn" on-click={this.show(1000)}>1s</button>
<button class="u-btn" on-click={this.show(2000)}>2s</button>
<button class="u-btn" on-click={this.show(0)}>常驻</button>

      */});
      
var component = new NEKUI.Component({
    template: template,
    show: function(duration) {
        NEKUI.Notify.show('Duration: ' + duration + ' ms.', null, duration);
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<button class="u-btn u-btn-info" on-click={this.show('info')}>Info</button>
<button class="u-btn u-btn-success" on-click={this.show('success')}>Success</button>
<button class="u-btn u-btn-warning" on-click={this.show('warning')}>Warning</button>
<button class="u-btn u-btn-error" on-click={this.show('error')}>Error</button>

      */});
      
var component = new NEKUI.Component({
    template: template,
    config: function() {
        this.notify = new NEKUI.Notify({data: {single: true} });
    },
    number: 1,
    show: function(state) {
        this.notify[state]('Message ' + this.number + '.');
        this.number++;
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
</script>
{% endraw %}