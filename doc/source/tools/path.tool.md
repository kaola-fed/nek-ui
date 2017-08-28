---
title: 路径工具
type: tools
order: 1
---

按快捷键 ctrl + alt + shift + C ,会自动复制当前页面对应的 js 地址到剪切板

按快捷键 ctrl + alt + shift + D ,会自动复制当前页面对应的 ftl 地址到剪切板

目前是简单的按照 url 来进行正则匹配，匹配出相当于 nek 自动生成目录结构的 js 路径和 ftl 路径，对于 nek 自动生成的目录来说相对准确。如果不是 nek 自动生成的目录不保证准确率。

使用方法:
```javascript
NEKUI.Regular.use(NEKUI.PathTool);
```