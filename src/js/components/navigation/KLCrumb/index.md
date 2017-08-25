---
title: 面包屑
---

<!-- demo_start -->
### 基本形式
面包屑由`kl-crumb`和`kl-crumb-item`组合构成, 可以通过配置属性自定义面包屑的一些样式, 例如每个`kl-crumb-item`内部可以自己定义内容

<div class="m-example"></div>

```xml
<kl-crumb separator="/">
    <kl-crumb-item href="/"><kl-icon type="home2" color="#E31436" /></kl-crumb-item>
    <kl-crumb-item href="/components/index.html">促销中心</kl-crumb-item>
    <kl-crumb-item>优惠券管理</kl-crumb-item>
    <kl-crumb-item>优惠券配置</kl-crumb-item>
</kl-crumb>
```
<!-- demo_end -->

<!-- demo_start -->
### 基本形式（简版）
<div class="m-example"></div>

```xml
<kl-crumb separator="/">
    <kl-crumb-item href="/"><kl-icon type="home2" color="#E31436" /></kl-crumb-item>
    <kl-crumb-item  href="/components/index.html" content="促销中心" />
    <kl-crumb-item content="优惠券管理" />
    <kl-crumb-item content="优惠券配置" />
</kl-crumb>
```
<!-- demo_end -->