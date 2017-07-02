---
title: 遮罩
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```html
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