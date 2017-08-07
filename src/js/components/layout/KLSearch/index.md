---
title: 筛选区
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<kl-search>
    xxxxxxxxxx
    <kl-search-more>
        更多
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
    xxxxxxxxxx
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
    xxxxxxxxxx
    <kl-search-more>
        更多
    </kl-search-more>
    <kl-search-footer>
        <kl-button type="secondary" title="查询"></kl-button>
        <kl-button type="tertiary" title="重置"></kl-button>
    </kl-search-footer>
</kl-search>
```
<!-- demo_end -->
