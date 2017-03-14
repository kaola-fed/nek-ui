---
title: 上传
type: components
name: uploader
cate: 表单
order: 216
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<uploader url="/upload"
    on-success={this._onSuccess($event)}
    on-error={this._onError($event)} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    _onSuccess: function($event) {
        NEKUI.Notify.success($event.data);
    },
    _onError: function($event) {
        NEKUI.Notify.error($event.message);
    }
});
```
<!-- demo_end -->

<div class="u-message u-message-warning">
    <i class="message_icon u-icon u-icon-warning-circle"></i> 注意：在IE中实现上传功能时，需要将响应头的`Content-Type`设置为`text/plain`或`text/html`，而不能是`application/json`，否则IE会提示用户下载返回的数据。
</div>

### 修改标题

<!-- demo_start -->
<div class="m-example"></div>

```xml
<uploader title="上传文件" url="/upload"
    on-success={this._onSuccess($event)}
    on-error={this._onError($event)} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    _onSuccess: function($event) {
        NEKUI.Notify.success($event.data);
    },
    _onError: function($event) {
        NEKUI.Notify.error($event.message);
    }
});
```
<!-- demo_end -->

### 按钮自定义

<!-- demo_start -->
<div class="m-example"></div>

```xml
<uploader url="/upload" on-success={this._onSuccess($event)} on-error={this._onError($event)}>
    <a class="u-btn u-btn-primary">上传 <i class="u-icon u-icon-upload"></i></a>
</uploader>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    _onSuccess: function($event) {
        NEKUI.Notify.success($event.data);
    },
    _onError: function($event) {
        NEKUI.Notify.error($event.message);
    }
});
```
<!-- demo_end -->

### 禁用组件

<!-- demo_start -->
<div class="m-example"></div>

```xml
<uploader url="/upload" disabled />
```
<!-- demo_end -->

### 文件类型限制

<!-- demo_start -->
<div class="m-example"></div>

```xml
<uploader url="/upload" extensions="jpg,gif,png"
    on-success={this._onSuccess($event)}
    on-error={this._onError($event)} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    _onSuccess: function($event) {
        NEKUI.Notify.success($event.data);
    },
    _onError: function($event) {
        NEKUI.Notify.error($event.message);
    }
});
```
<!-- demo_end -->

### 文件大小限制

<!-- demo_start -->
<div class="m-example"></div>

```xml
<uploader url="/upload" maxSize="10kB"
    on-success={this._onSuccess($event)}
    on-error={this._onError($event)} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    _onSuccess: function($event) {
        NEKUI.Notify.success($event.data);
    },
    _onError: function($event) {
        NEKUI.Notify.error($event.message);
    }
});
```
<!-- demo_end -->

## API
## Classes

<dl>
<dt><a href="#Uploader">Uploader</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#config">config()</a></dt>
<dd></dd>
<dt><a href="#upload_new 弹出文件对话框并且上传文件">upload() 弹出文件对话框并且上传文件()</a> ⇒ <code>void</code></dt>
<dd></dd>
</dl>

## Events

<dl>
<dt><a href="#event_error 上传错误时触发">"error 上传错误时触发"</a></dt>
<dd></dd>
<dt><a href="#event_error 上传错误时触发">"error 上传错误时触发"</a></dt>
<dd></dd>
<dt><a href="#event_sending 发送前触发">"sending 发送前触发"</a></dt>
<dd></dd>
<dt><a href="#event_error 上传错误时触发">"error 上传错误时触发"</a></dt>
<dd></dd>
<dt><a href="#event_complete 上传完成时触发">"complete 上传完成时触发"</a></dt>
<dd></dd>
<dt><a href="#event_success 上传成功时触发">"success 上传成功时触发"</a></dt>
<dd></dd>
</dl>

<a name="Uploader"></a>

## Uploader
**Kind**: global class  
**Extend**: Component  
<a name="new_Uploader_new"></a>

### new Uploader()

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options.data] | <code>object</code> |  | = 绑定属性 |
| [options.data.title] | <code>string</code> |  | => 按钮文字 |
| [options.data.url] | <code>string</code> |  | => 上传路径 |
| [options.data.dataType] | <code>string</code> | <code>&quot;json&quot;</code> | => 数据类型。可以是：`text`、`xml`、`json`、`script`。 |
| [options.data.data] | <code>object</code> |  | => 附加数据 |
| [options.data.name] | <code>string</code> | <code>&quot;file&quot;</code> | => 上传文件的name |
| [options.data.extensions] | <code>string</code> &#124; <code>Array.&lt;string&gt;</code> |  | => 可上传的扩展名。默认为空，表示可上传任意文件类型的文件；可以为字符串，多个扩展名用`,`隔开，如：'png,jpg,gif'；也可以为数组，如：['png', 'jpg', 'gif']。 |
| [options.data.maxSize] | <code>string</code> &#124; <code>number</code> |  | => 可上传的最大文件大小。默认为空，表示可上传任意大小的文件；如果为数字，则表示单位为字节；如果为字符串，可以添加以下单位：`kB`、`MB`、`GB`。 |
| [options.data.disabled] | <code>boolean</code> | <code>false</code> | => 是否禁用 |
| [options.data.visible] | <code>boolean</code> | <code>true</code> | => 是否显示 |
| [options.data.class] | <code>string</code> |  | => 补充class |

<a name="config"></a>

## config()
**Kind**: global function  
**Access:** protected  
<a name="upload_new 弹出文件对话框并且上传文件"></a>

## upload() 弹出文件对话框并且上传文件() ⇒ <code>void</code>
**Kind**: global function  
**Access:** public  
<a name="event_error 上传错误时触发"></a>

## "error 上传错误时触发"
**Kind**: event emitted  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| sender | <code>object</code> | 事件发送对象 |
| name | <code>object</code> | ExtensionError |
| message | <code>object</code> | 错误信息 |
| extensions | <code>object</code> | 可上传的扩展名 |

<a name="event_error 上传错误时触发"></a>

## "error 上传错误时触发"
**Kind**: event emitted  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| sender | <code>object</code> | 事件发送对象 |
| name | <code>object</code> | SizeError |
| message | <code>object</code> | 错误信息 |
| maxSize | <code>object</code> | 可上传的最大文件大小 |
| size | <code>object</code> | 当前文件大小 |

<a name="event_sending 发送前触发"></a>

## "sending 发送前触发"
**Kind**: event emitted  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| sender | <code>object</code> | 事件发送对象 |
| data | <code>object</code> | 待发送的数据 |

<a name="event_error 上传错误时触发"></a>

## "error 上传错误时触发"
**Kind**: event emitted  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| sender | <code>object</code> | 事件发送对象 |
| name | <code>object</code> | ResponseError |
| message | <code>object</code> | 错误信息 |

<a name="event_complete 上传完成时触发"></a>

## "complete 上传完成时触发"
**Kind**: event emitted  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| sender | <code>object</code> | 事件发送对象 |
| xml | <code>object</code> | 返回的xml |

<a name="event_success 上传成功时触发"></a>

## "success 上传成功时触发"
**Kind**: event emitted  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| sender | <code>object</code> | 事件发送对象 |
| data | <code>object</code> | 返回的数据 |


{% raw %}
<script>
var index = 0;

    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<uploader url="/upload"
    on-success={this._onSuccess($event)}
    on-error={this._onError($event)} />

      */});
      
var component = new NEKUI.Component({
    template: template,
    _onSuccess: function($event) {
        NEKUI.Notify.success($event.data);
    },
    _onError: function($event) {
        NEKUI.Notify.error($event.message);
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<uploader title="上传文件" url="/upload"
    on-success={this._onSuccess($event)}
    on-error={this._onError($event)} />

      */});
      
var component = new NEKUI.Component({
    template: template,
    _onSuccess: function($event) {
        NEKUI.Notify.success($event.data);
    },
    _onError: function($event) {
        NEKUI.Notify.error($event.message);
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<uploader url="/upload" on-success={this._onSuccess($event)} on-error={this._onError($event)}>
    <a class="u-btn u-btn-primary">上传 <i class="u-icon u-icon-upload"></i></a>
</uploader>

      */});
      
var component = new NEKUI.Component({
    template: template,
    _onSuccess: function($event) {
        NEKUI.Notify.success($event.data);
    },
    _onError: function($event) {
        NEKUI.Notify.error($event.message);
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<uploader url="/upload" disabled />

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<uploader url="/upload" extensions="jpg,gif,png"
    on-success={this._onSuccess($event)}
    on-error={this._onError($event)} />

      */});
      
var component = new NEKUI.Component({
    template: template,
    _onSuccess: function($event) {
        NEKUI.Notify.success($event.data);
    },
    _onError: function($event) {
        NEKUI.Notify.error($event.message);
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<uploader url="/upload" maxSize="10kB"
    on-success={this._onSuccess($event)}
    on-error={this._onError($event)} />

      */});
      
var component = new NEKUI.Component({
    template: template,
    _onSuccess: function($event) {
        NEKUI.Notify.success($event.data);
    },
    _onError: function($event) {
        NEKUI.Notify.error($event.message);
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
</script>
{% endraw %}