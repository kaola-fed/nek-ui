---
title: 栅格布局
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example">
    <style>
        .u-gridContent {
            min-height: 36px;
        }
        .u-gridContent-1 {
            background: #99a9bf;
        }
        .u-gridContent-2 {
            background: #e5e9f2;
        }
        .u-gridContent-3 {
            background: #d3dce6;
        }
        .f-mb10 {
            margin-bottom: 10px;
        }
    </style>
</div>

```xml
<kl-row>
    <kl-col span=12>
        <div class="u-gridContent u-gridContent-1"></div>
    </kl-col>
</kl-row>
<kl-row>
    <kl-col span=6>
        <div class="u-gridContent u-gridContent-2"></div>
    </kl-col>
    <kl-col span=6>
        <div class="u-gridContent u-gridContent-3"></div>
    </kl-col>
</kl-row>
<kl-row>
    <kl-col span=4>
        <div class="u-gridContent u-gridContent-2"></div>
    </kl-col>
    <kl-col span=4>
        <div class="u-gridContent u-gridContent-3"></div>
    </kl-col>
    <kl-col span=4>
        <div class="u-gridContent u-gridContent-2"></div>
    </kl-col>
</kl-row>
<kl-row>
    <kl-col span=2>
        <div class="u-gridContent u-gridContent-2"></div>
    </kl-col>
    <kl-col span=2>
        <div class="u-gridContent u-gridContent-3"></div>
    </kl-col>
    <kl-col span=2>
        <div class="u-gridContent u-gridContent-2"></div>
    </kl-col>
    <kl-col span=2>
        <div class="u-gridContent u-gridContent-3"></div>
    </kl-col>
    <kl-col span=2>
        <div class="u-gridContent u-gridContent-2"></div>
    </kl-col>
    <kl-col span=2>
        <div class="u-gridContent u-gridContent-3"></div>
    </kl-col>
</kl-row>
```
<!-- demo_end -->

### 布局模式Flex

<!-- demo_start -->
<div class="m-example"></div>

```xml
<kl-row type="flex">
    <kl-col span=6>
        <div class="f-mb10 u-gridContent u-gridContent-2"></div>
    </kl-col>
    <kl-col span=6>
        <div class="f-mb10 u-gridContent u-gridContent-3"></div>
    </kl-col>
    <kl-col span=6>
        <div class="f-mb10 u-gridContent u-gridContent-3"></div>
    </kl-col>
    <kl-col span=6>
        <div class="f-mb10 u-gridContent u-gridContent-2"></div>
    </kl-col>
    <kl-col span=6>
        <div class="f-mb10 u-gridContent u-gridContent-2"></div>
    </kl-col>
    <kl-col span=6>
        <div class="f-mb10 u-gridContent u-gridContent-3"></div>
    </kl-col>
</kl-row>
```
<!-- demo_end -->

### 列间距Gutter

<!-- demo_start -->
<div class="m-example"></div>

```xml
<kl-row gutter=10>
    <kl-col span=6>
        <div class="u-gridContent u-gridContent-2"></div>
    </kl-col>
    <kl-col span=6>
        <div class="u-gridContent u-gridContent-3"></div>
    </kl-col>
</kl-row>
```
<!-- demo_end -->

### 列偏移Offset

<!-- demo_start -->
<div class="m-example"></div>

```xml
<kl-row gutter=10>
    <kl-col span=6>
        <div class="u-gridContent u-gridContent-2"></div>
    </kl-col>
    <kl-col span=2 offset=3>
        <div class="u-gridContent u-gridContent-3"></div>
    </kl-col>
</kl-row>
```
<!-- demo_end -->