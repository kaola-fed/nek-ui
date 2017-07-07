---
title: 面包屑
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-crumb separator="/">
    <jr-crumb-item><jr-icon type="home2" color="#E31436" /></jr-crumb-item>
    <jr-crumb-item>第一级目录</jr-crumb-item>
    <jr-crumb-item>第二级目录</jr-crumb-item>
    <jr-crumb-item>第三级目录</jr-crumb-item>
    <jr-crumb-item href="http://www.kaola.com">第四级目录</jr-crumb-item>
    <jr-crumb-item>第五级目录</jr-crumb-item>
</jr-crumb>
```
<!-- demo_end -->

### 基本形式（简版）

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-crumb separator="/">
    <jr-crumb-item><jr-icon type="home2" color="#E31436" /></jr-crumb-item>
    <jr-crumb-item content="第一级目录" />
    <jr-crumb-item content="第二级目录" />
    <jr-crumb-item content="第三级目录" />
    <jr-crumb-item content="第四级目录" href="http://www.kaola.com" />
    <jr-crumb-item content="第五级目录" />
</jr-crumb>
```
<!-- demo_end -->