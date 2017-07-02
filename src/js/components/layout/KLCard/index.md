---
title: 卡片
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<kl-card title="报价信息">
    <kl-card-tools><a on-click="{this.test()}" href='javascript:;' style='font-size: 12px'>点击跳转</a></kl-card-tools>
    <kl-card title="基本信息" isShowBtLine="{true}"><kl-card-tools><a on-click="{this.test()}" href='javascript:;' style='font-size: 12px'>点击跳转</a></kl-card-tools>xxxxx</kl-card>
    <kl-card title="基本费用" isShowBtLine="{true}">xxxxx</kl-card>
</kl-card>
```
<!-- demo_end -->

### 子card前面不缩进

<!-- demo_start -->
<div class="m-example"></div>

```xml
<kl-card title="报价信息" isShowLine={false}>
    <kl-card title="基本信息" isIndent={false} isShowBtLine="{true}">xxxxx</kl-card>
    <kl-card title="基本费用" isIndent={false} isShowBtLine="{true}">xxxxx</kl-card>
</kl-card>
```
<!-- demo_end -->

### 嵌套多层

<!-- demo_start -->
<div class="m-example"></div>

```xml
<kl-card title="公司认证" isShowLine="{false}" >
    <kl-card title="公司认证信息" isShowBtLine="{false}">
        <kl-card title="公司基础信息" isShowLine="{true}" isShowBtLine="{false}">xxxxx</kl-card>
    </kl-card>
</kl-card>
```
<!-- demo_end -->
