---
title: card
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.card title="报价信息">
    <card.tools><a on-click="{this.test()}" href='javascript:;' style='font-size: 12px'>点击跳转</a></card.tools>
    <ui.card title="基本信息" isShowBtLine="{true}"><card.tools><a on-click="{this.test()}" href='javascript:;' style='font-size: 12px'>点击跳转</a></card.tools>xxxxx</ui.card>
    <ui.card title="基本费用" isShowBtLine="{true}">xxxxx</ui.card>
</ui.card>
```
<!-- demo_end -->

### 子card前面不缩进

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.card title="报价信息" isShowLine={false}>
    <ui.card title="基本信息" isIndent={false} isShowBtLine="{true}">xxxxx</ui.card>
    <ui.card title="基本费用" isIndent={false} isShowBtLine="{true}">xxxxx</ui.card>
</ui.card>
```
<!-- demo_end -->

###嵌套多层

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.card title="公司认证" isShowLine="{false}" >
    <ui.card title="公司认证信息" isShowBtLine="{false}">
        <ui.card title="公司基础信息" isShowLine="{true}" isShowBtLine="{false}">xxxxx</ui.card>
    </ui.card>
</ui.card>
```
<!-- demo_end -->
