---
title: 卡片
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-card title="报价信息">
    <jr-card-tools><a on-click="{this.test()}" href='javascript:;' style='font-size: 12px'>点击跳转</a></jr-card-tools>
    <jr-card title="基本信息" isShowBtLine="{true}"><jr-card-tools><a on-click="{this.test()}" href='javascript:;' style='font-size: 12px'>点击跳转</a></jr-card-tools>xxxxx</jr-card>
    <jr-card title="基本费用" isShowBtLine="{true}">xxxxx</jr-card>
</jr-card>
```
<!-- demo_end -->

### 子card前面不缩进

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-card title="报价信息" isShowLine={false}>
    <jr-card title="基本信息" isIndent={false} isShowBtLine="{true}">xxxxx</jr-card>
    <jr-card title="基本费用" isIndent={false} isShowBtLine="{true}">xxxxx</jr-card>
</jr-card>
```
<!-- demo_end -->

### 嵌套多层

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-card title="公司认证" isShowLine="{false}" >
    <jr-card title="公司认证信息" isShowBtLine="{false}">
        <jr-card title="公司基础信息" isShowLine="{true}" isShowBtLine="{false}">xxxxx</jr-card>
    </jr-card>
</jr-card>
```
<!-- demo_end -->
