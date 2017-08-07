---
title: 筛选区
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<kl-search>
    <kl-row>
        <kl-col md="4" lg="4">
            <kl-form-item labelSize="100" title="付款类型">
                <kl-input type="text"></kl-input>
            </kl-form-item>
        </kl-col>
        <kl-col md="4" lg="4">
            <kl-form-item labelSize="100" title="支付方式">
                <kl-input type="text"></kl-input>
            </kl-form-item>
        </kl-col>
        <kl-col md="4" lg="4">
            <kl-form-item labelSize="100" title="订单号">
                <kl-input type="text"></kl-input>
            </kl-form-item>
        </kl-col>
    </kl-row>
    <kl-search-more>
        <kl-row>
            <kl-col md="4" lg="4">
                <kl-form-item labelSize="100" title="合同编号">
                    <kl-input type="text"></kl-input>
                </kl-form-item>
            </kl-col>
        </kl-row>
    </kl-search-more>
    <kl-search-footer>
        <kl-button type="secondary" title="查询"></kl-button>
        <kl-button type="tertiary" title="重置"></kl-button>
    </kl-search-footer>
</kl-search>
```
<!-- demo_end -->

### 不显示“展开”切换开关

<!-- demo_start -->
<div class="m-example"></div>

```xml
<kl-search isShowToggle={false}>
    <kl-row>
        <kl-col md="4" lg="4">
            <kl-form-item labelSize="100" title="付款类型">
                <kl-input type="text"></kl-input>
            </kl-form-item>
        </kl-col>
        <kl-col md="4" lg="4">
            <kl-form-item labelSize="100" title="支付方式">
                <kl-input type="text"></kl-input>
            </kl-form-item>
        </kl-col>
        <kl-col md="4" lg="4">
            <kl-form-item labelSize="100" title="订单号">
                <kl-input type="text"></kl-input>
            </kl-form-item>
        </kl-col>
    </kl-row>
    <kl-search-footer>
        <kl-button type="secondary" title="查询"></kl-button>
        <kl-button type="tertiary" title="重置"></kl-button>
    </kl-search-footer>
</kl-search>
```
<!-- demo_end -->

### 设置切换文字

<!-- demo_start -->
<div class="m-example"></div>

```xml
<kl-search showText="更多" hideText="隐藏">
    <kl-row>
        <kl-col md="4" lg="4">
            <kl-form-item labelSize="100" title="付款类型">
                <kl-input type="text"></kl-input>
            </kl-form-item>
        </kl-col>
        <kl-col md="4" lg="4">
            <kl-form-item labelSize="100" title="支付方式">
                <kl-input type="text"></kl-input>
            </kl-form-item>
        </kl-col>
        <kl-col md="4" lg="4">
            <kl-form-item labelSize="100" title="订单号">
                <kl-input type="text"></kl-input>
            </kl-form-item>
        </kl-col>
    </kl-row>
    <kl-search-more>
        <kl-row>
            <kl-col md="4" lg="4">
                <kl-form-item labelSize="100" title="合同编号">
                    <kl-input type="text"></kl-input>
                </kl-form-item>
            </kl-col>
        </kl-row>
    </kl-search-more>
    <kl-search-footer>
        <kl-button type="secondary" title="查询"></kl-button>
        <kl-button type="tertiary" title="重置"></kl-button>
    </kl-search-footer>
</kl-search>
```
<!-- demo_end -->
