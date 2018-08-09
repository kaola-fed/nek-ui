---
title: 面包屑
---

<!-- demo_start -->
### 基本形式
面包屑由`kl-crumb`和`kl-crumb-item`组合构成, 可以通过配置属性自定义面包屑的一些样式, 例如每个`kl-crumb-item`内部可以自己定义内容

<div class="m-example"></div>

```xml
<kl-crumb separator="/">
    <kl-crumb-item href="/"><kl-icon type="home" color="#00C4C0" /></kl-crumb-item>
    <kl-crumb-item href="/components/index.html" content="促销中心" />
    <kl-crumb-item href="/components/index.html" content="优惠券管理" />
    <kl-crumb-item content="优惠券配置" />
</kl-crumb>
```
<!-- demo_end -->

<!-- demo_start -->
### 自定义模板
<div class="m-example"></div>

```xml
<kl-crumb separator="/">
    <kl-crumb-item><a href="/"><kl-icon type="home" color="#00C4C0" /></a></kl-crumb-item>
    <kl-crumb-item><a href="/components/index.html">促销中心</a></kl-crumb-item>
    <kl-crumb-item><a href="/components/index.html">优惠券管理</a></kl-crumb-item>
    <kl-crumb-item>优惠券配置</kl-crumb-item>
</kl-crumb>
```
<!-- demo_end -->