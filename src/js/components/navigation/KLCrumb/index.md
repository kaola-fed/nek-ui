---
title: 面包屑
---

<!-- demo_start -->
### 基本形式
<div class="m-example"></div>

```xml
<kl-crumb separator="/">
    <kl-crumb-item href="/"><kl-icon type="home2" color="#E31436" /></kl-crumb-item>
    <kl-crumb-item href="/components/index.html">组件</kl-crumb-item>
    <kl-crumb-item>导航</kl-crumb-item>
    <kl-crumb-item>面包屑KLCrumb</kl-crumb-item>
</kl-crumb>
```
<!-- demo_end -->

<!-- demo_start -->
### 基本形式（简版）
<div class="m-example"></div>

```xml
<kl-crumb separator="/">
    <kl-crumb-item href="/"><kl-icon type="home2" color="#E31436" /></kl-crumb-item>
    <kl-crumb-item  href="/components/index.html" content="组件" />
    <kl-crumb-item content="导航" />
    <kl-crumb-item content="面包屑KLCrumb" />
</kl-crumb>
```
<!-- demo_end -->