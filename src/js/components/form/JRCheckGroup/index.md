---
title: 复选组
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-check-group source={source} />
```

```javascript
var component = new JRUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1', id: 1},
            {name: '选项2', id: 2},
            {name: '选项3', id: 3},
            {name: '选项4', id: 4},
            {name: '选项5', id: 5},
            {name: '选项6', id: 6}
        ]
    }
});
```
<!-- demo_end -->