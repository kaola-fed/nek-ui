---
title: 标签
masonry: false
---

<!-- demo_start -->
### 基本形式
<div class="m-example"></div>

```xml
<kl-tag>默认标签</kl-tag>&emsp;
<kl-tag type="primary">主标签</kl-tag>&emsp;
<kl-tag type="warning">警告标签</kl-tag>
```
<!-- demo_end -->

<!-- demo_start -->
### 可移除标签
<div class="m-example"></div>

```xml
<kl-tag closable on-close={this.close($event)}>默认标签</kl-tag>&emsp;
<kl-tag type="primary" closable on-close={this.close($event)}>主标签</kl-tag>&emsp;
<kl-tag type="warning" closable on-close={this.close($event)}>警告标签</kl-tag>
```

```javascript
var component = new NEKUI.Component({
 template: template,
 close: function(item) {
    console.log(item);
 }
});
```
<!-- demo_end -->