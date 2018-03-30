---
title: 下拉选择
masonry: true
---

<!-- demo_start -->
### 基本形式
<div class="m-example"></div>

```xml
<kl-select source={source} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        source: [
            {name: '母婴儿童'},
            {name: '美容彩妆'},
            {name: '服饰鞋包'}
        ]
    }
});
```
<!-- demo_end -->
