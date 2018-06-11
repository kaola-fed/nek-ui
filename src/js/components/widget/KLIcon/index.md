---
title: 图标
---

<!-- demo_start -->
### 基本形式
推荐使用`kl-icon`组件, 不要使用`nek-ui`内部的`icon class`

<div class="m-example"></div>

```xml
<kl-icon type="home2" />
<kl-icon type="home2" font-size="16" />
<kl-icon type="home2" color="#E31436" fontSize="20" />
```
<!-- demo_end -->

<!-- demo_start -->
### 图标列表

点击图标按钮复制图标代码，下方js代码请先忽视

<div class="m-example"></div>

```xml

```

```javascript
var component = new NEKUI.Component({
    template: template,
    copy: function(e) {
        var type = e.target.className.trim();
        type = type.slice(14)
        var text = '<kl-icon type="' + type + '" />'
        var copyFrom, body;
        copyFrom = document.createElement('textarea');
        copyFrom.textContent = text;
        body = document.getElementsByTagName('body')[0];
        body.appendChild(copyFrom);
        copyFrom.select();
        document.execCommand('copy');
        body.removeChild(copyFrom);
        NEKUI.KLNotify.success('复制成功')
    }
});
```
<!-- demo_end -->
