---
title: 遮罩
masonry: true
---

<!-- demo_start -->
*基本形式*

<div class="m-example"></div>

```xml
<button class="u-btn u-btn-primary" on-click={this.show()}>Mask</button>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    show: function() {
        var modal = new NEKUI.KLMask({
            data: {
                content: '<h1>Mask 标题</h1><p>Mask 内容</p>'
            }
        });
    }
});
```
<!-- demo_end -->