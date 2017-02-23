---
title: 路径工具
type: tools
order: 1
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div>按快捷键 ctrl + alt + shift + C ,会自动复制当前页面对应的 js 地址到剪切板</div>
```

```javascript
var Component = NEKUI.Regular.extend({
    template: template
}).use(NEKUI.PathTool);
var component = new Component();
```
<!-- demo_end -->
