---
title: 筛选区
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<kl-search on-search={console.log("search")} on-reset={console.log("reset")}>
    <kl-row>
        <kl-col span="4">
            <kl-form-item labelSize="60" title="付款类型">
                <kl-input type="text"></kl-input>
            </kl-form-item>
        </kl-col>
        <kl-col span="4">
            <kl-form-item labelSize="60" title="支付方式">
                <kl-input type="text"></kl-input>
            </kl-form-item>
        </kl-col>
        <kl-col span="4">
            <kl-form-item labelSize="60" title="订单号">
                <kl-input type="text"></kl-input>
            </kl-form-item>
        </kl-col>
    </kl-row>
    <kl-search-more>
        <kl-row>
            <kl-col span="4">
                <kl-form-item labelSize="60" title="合同编号">
                    <kl-input type="text"></kl-input>
                </kl-form-item>
            </kl-col>
        </kl-row>
    </kl-search-more>
</kl-search>
```
<!-- demo_end -->

### 不显示“展开”切换开关

<!-- demo_start -->
<div class="m-example"></div>

```xml
<kl-search isShowToggle={false}>
    <kl-row>
        <kl-col span="4">
            <kl-form-item labelSize="60" title="付款类型">
                <kl-input type="text"></kl-input>
            </kl-form-item>
        </kl-col>
        <kl-col span="4">
            <kl-form-item labelSize="60" title="支付方式">
                <kl-input type="text"></kl-input>
            </kl-form-item>
        </kl-col>
        <kl-col span="4">
            <kl-form-item labelSize="60" title="订单号">
                <kl-input type="text"></kl-input>
            </kl-form-item>
        </kl-col>
    </kl-row>
</kl-search>
```
<!-- demo_end -->

### 不显示Footer

<!-- demo_start -->
<div class="m-example"></div>

```xml
<kl-search isShowFooter={false}>
    <kl-row>
        <kl-col span="4">
            <kl-form-item labelSize="60" title="付款类型">
                <kl-input type="text"></kl-input>
            </kl-form-item>
        </kl-col>
        <kl-col span="4">
            <kl-form-item labelSize="60" title="支付方式">
                <kl-input type="text"></kl-input>
            </kl-form-item>
        </kl-col>
        <kl-col span="4">
            <kl-form-item>
                <kl-button type="secondary" title="查询"></kl-button>
                <kl-button title="重置"></kl-button>
            </kl-form-item>
        </kl-col>
    </kl-row>
</kl-search>
```
<!-- demo_end -->

### 设置切换文字

<!-- demo_start -->
<div class="m-example"></div>

```xml
<kl-search unfoldText="更多" foldText="隐藏">
    <kl-row>
        <kl-col span="4">
            <kl-form-item labelSize="60" title="付款类型">
                <kl-input type="text"></kl-input>
            </kl-form-item>
        </kl-col>
        <kl-col span="4">
            <kl-form-item labelSize="60" title="支付方式">
                <kl-input type="text"></kl-input>
            </kl-form-item>
        </kl-col>
        <kl-col span="4">
            <kl-form-item labelSize="60" title="订单号">
                <kl-input type="text"></kl-input>
            </kl-form-item>
        </kl-col>
    </kl-row>
    <kl-search-more>
        <kl-row>
            <kl-col span="4">
                <kl-form-item labelSize="60" title="合同编号">
                    <kl-input type="text"></kl-input>
                </kl-form-item>
            </kl-col>
        </kl-row>
    </kl-search-more>
</kl-search>
```
<!-- demo_end -->
