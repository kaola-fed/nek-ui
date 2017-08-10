---
title: 卡片
masonry: true
---

## 代码演示

<div id="grid-itemOuter"></div>

<!-- demo_start -->
*基本形式*

<div class="m-example"></div>

```xml
<kl-card title="报价信息">
    <kl-card-tools><a on-click="{this.test()}" href='javascript:;' style='font-size: 12px'>点击跳转</a></kl-card-tools>
    <kl-card title="基本信息" isShowBtLine="{true}"><kl-card-tools><a on-click="{this.test()}" href='javascript:;' style='font-size: 12px'>点击跳转</a></kl-card-tools>xxxxx</kl-card>
    <kl-card title="基本费用" isShowBtLine="{true}">xxxxx</kl-card>
</kl-card>
```
<!-- demo_end -->

<!-- demo_start -->
*子card前面不缩进*

<div class="m-example"></div>

```xml
<kl-card title="报价信息" isShowLine={false}>
    <kl-card title="基本信息" isIndent={false} isShowBtLine="{true}">xxxxx</kl-card>
    <kl-card title="基本费用" isIndent={false} isShowBtLine="{true}">xxxxx</kl-card>
</kl-card>
```
<!-- demo_end -->

<!-- demo_start -->
*嵌套多层*

<div class="m-example"></div>

```xml
<kl-card title="公司认证" isShowLine="{false}" >
    <kl-card title="公司认证信息" isShowBtLine="{false}">
        <kl-card title="公司基础信息" isShowLine="{true}" isShowBtLine="{false}">xxxxx</kl-card>
    </kl-card>
</kl-card>
```
<!-- demo_end -->
