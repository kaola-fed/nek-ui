---
title: 消息
is_beta: true
type: components
name: message
cate: 通知
order: 300
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```html
<div class="u-message">This is a message.</div>
```
<!-- demo_end -->

### 颜色扩展

<!-- demo_start -->
<div class="m-example"></div>

```html
<div class="u-message u-message-info"><i class="message_icon u-icon u-icon-info-circle"></i> Info</div>
<div class="u-message u-message-success"><i class="message_icon u-icon u-icon-success-circle"></i> Success</div>
<div class="u-message u-message-warning"><i class="message_icon u-icon u-icon-warning-circle"></i> Warning</div>
<div class="u-message u-message-error"><i class="message_icon u-icon u-icon-error-circle"></i> Error</div>
```
<!-- demo_end -->
{% raw %}
<script>
var index = 0;

    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<div class="u-message">This is a message.</div>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<div class="u-message u-message-info"><i class="message_icon u-icon u-icon-info-circle"></i> Info</div>
<div class="u-message u-message-success"><i class="message_icon u-icon u-icon-success-circle"></i> Success</div>
<div class="u-message u-message-warning"><i class="message_icon u-icon u-icon-warning-circle"></i> Warning</div>
<div class="u-message u-message-error"><i class="message_icon u-icon u-icon-error-circle"></i> Error</div>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
</script>
{% endraw %}