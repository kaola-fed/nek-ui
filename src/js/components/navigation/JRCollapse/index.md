---
title: 折叠面板
is_new: true
---

## 代码演示

### 基本形式.默认展开并且会折叠其他

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-collapse title='标题'>
   <div>测试内容</div>
   <div>测试内容</div>
   <div>测试内容</div>
   <div>测试内容</div>
   <div>测试内容</div>
</jr-collapse>
<jr-collapse title='标题'>
   <div>测试内容</div>
   <div>测试内容</div>
   <div>测试内容</div>
   <div>测试内容</div>
   <div>测试内容</div>
</jr-collapse>
<jr-collapse title='标题'>
   <div>测试内容</div>
   <div>测试内容</div>
   <div>测试内容</div>
   <div>测试内容</div>
   <div>测试内容</div>
</jr-collapse>
```
<!-- demo_end -->


### 可定制宽度,

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-collapse title='标题' width='200px'>
   <div>测试内容</div>
   <div>测试内容</div>
   <div>测试内容</div>
   <div>测试内容</div>
   <div>测试内容</div>
</jr-collapse>
<jr-collapse title='标题' active={false} width='400px' >
   <div>测试内容</div>
   <div>测试内容</div>
   <div>测试内容</div>
   <div>测试内容</div>
   <div>测试内容</div>
</jr-collapse>
<jr-collapse title='标题' width='600px'>
   <div>测试内容</div>
   <div>测试内容</div>
   <div>测试内容</div>
   <div>测试内容</div>
   <div>测试内容</div>
</jr-collapse>
```
<!-- demo_end -->


### 可定制折叠

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-collapse title='标题' accordion={false}>
   <div>测试内容，我不会被折叠哦</div>
   <div>测试内容，我不会被折叠哦</div>
   <div>测试内容，我不会被折叠哦</div>
   <div>测试内容，我不会被折叠哦</div>
   <div>测试内容，我不会被折叠哦</div>
</jr-collapse>
<jr-collapse title='标题'>
   <div>测试内容</div>
   <div>测试内容</div>
   <div>测试内容</div>
   <div>测试内容</div>
   <div>测试内容</div>
</jr-collapse>
<jr-collapse title='标题'>
   <div>测试内容</div>
   <div>测试内容</div>
   <div>测试内容</div>
   <div>测试内容</div>
   <div>测试内容</div>
</jr-collapse>
```
<!-- demo_end -->