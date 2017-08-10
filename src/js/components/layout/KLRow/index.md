---
title: 栅格布局
---

## 代码演示

<!-- demo_start -->
*基本形式*

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

<!-- demo_start -->
*布局模式Flex*

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

<!-- demo_start -->
*列间距Gutter*

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

<!-- demo_start -->
*列偏移Offset*

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

<!-- demo_start -->
*响应式布局*

<div class="m-example"></div>

```xml
<kl-row>
    <kl-col xs="{{span:1,offset:0}}" sm="{{span:3,offset:0}}" md="{{span:4,offset:0}}" lg="{{span:5,offset:0}}"><div class="u-gridContent u-gridContent-3"></div></kl-col>
    <kl-col xs="1" sm="3" md="3" lg="2"><div class="u-gridContent u-gridContent-2"></div></kl-col>
    <kl-col xs="4" sm="3" md="3" lg="2"><div class="u-gridContent u-gridContent-3"></div></kl-col>
    <kl-col xs="6" sm="3" md="2" lg="3"><div class="u-gridContent u-gridContent-2"></div></kl-col>
</kl-row>
```
<!-- demo_end -->