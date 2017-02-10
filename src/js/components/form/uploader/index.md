---
title: 上传
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
