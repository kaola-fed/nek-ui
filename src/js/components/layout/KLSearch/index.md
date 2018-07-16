---
title: 筛选区
---

<!-- demo_start -->
### 基本形式

<div class="m-example"></div>

```xml
<kl-search on-search={console.log("search")} on-reset={console.log("reset")} tips="通过订单号搜索有一定延时请不要重复操作">
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

<!-- demo_start -->
### 不显示“展开”切换开关

<div class="m-example"></div>

```xml
<kl-search>
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

<!-- demo_start -->
### 不显示Footer（根据交互规范，一行没有填满的按钮要跟在后面）
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
                <kl-button title="查询"></kl-button>
                <kl-button title="重置"></kl-button>
            </kl-form-item>
        </kl-col>
    </kl-row>
</kl-search>
```
<!-- demo_end -->

<!-- demo_start -->
### 设置切换文字

<div class="m-example"></div>

```xml
<kl-search unfoldText="更多" foldText="隐藏">
    <kl-row>
        <kl-col span="4">
            <kl-form-item labelSize="60" title="付款类型">
                <kl-input placeholder="付款类型" />
            </kl-form-item>
        </kl-col>
        <kl-col span="4">
            <kl-form-item labelSize="60" title="支付方式">
                <kl-input placeholder="支付方式" />
            </kl-form-item>
        </kl-col>
        <kl-col span="4">
            <kl-form-item labelSize="60" title="订单号">
                <kl-input placeholder="订单号" />
            </kl-form-item>
        </kl-col>
    </kl-row>
    <kl-search-more>
        <kl-row>
            <kl-col span="4">
                <kl-form-item labelSize="60" title="合同编号">
                    <kl-input placeholder="合同编号" />
                </kl-form-item>
            </kl-col>
        </kl-row>
    </kl-search-more>
</kl-search>
```
<!-- demo_end -->
