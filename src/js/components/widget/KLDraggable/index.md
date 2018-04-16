---
title: 拖拽
---

<!-- demo_start -->
### 基本形式

<div class="m-example"></div>

```xml
<kl-draggable><kl-button type="primary" title="拖我"></kl-button></kl-draggable>
```
<!-- demo_end -->

<!-- demo_start -->
### 移动自身

<div class="m-example"></div>

```xml
<kl-draggable proxy="self"><kl-button type="primary" title="自由"></kl-button></kl-draggable>
<kl-draggable proxy="self" direction="horizontal"><kl-button type="secondary" title="水平"></kl-button></kl-draggable>
<kl-draggable proxy="self" direction="vertical"><kl-button title="垂直"></kl-button></kl-draggable>
```
<!-- demo_end -->

<!-- demo_start -->
### 修改代理

<div class="m-example"></div>

```xml
<kl-draggable>
    <kl-button type="primary" title="拖我"></kl-button>
    <kl-draggable-proxy>
        <kl-button type="secondary" title="拖我"></kl-button>
    </kl-draggable-proxy>
</kl-draggable>
```
<!-- demo_end -->