---
title: 分页
---

<!-- demo_start -->
*基本形式*

<div class="m-example"></div>

```xml
<kl-pager current=3 sumTotal=200 pageSize=5 />
```
<!-- demo_end -->

<!-- demo_start -->
*总条数展示设置一*

<div class="m-example"></div>

```xml
<kl-pager current=3 sumTotal=200 pageSize=5 isEllipsis={true} />
```
<!-- demo_end -->

<!-- demo_start -->
*总条数展示设置二*

<div class="m-example"></div>

```xml
<kl-pager current=3 sumTotal=200 pageSize=5 maxTotal=100 />
```
<!-- demo_end -->

<!-- demo_start -->
*位置*

<div class="m-example"></div>

```xml
<kl-pager pageSize=20 current=6 total=11 position="left" lang="en-US" />
<kl-pager pageSize=20 current=6 total=11 position="center" />
<kl-pager current=6 total=11 position="right" />
```
<!-- demo_end -->

<!-- demo_start -->
*显示数目*

<div class="m-example"></div>

```xml
<kl-pager current=6 total=11 middle=3 side=1 />
```
<!-- demo_end -->

<!-- demo_start -->
*禁用组件*

<div class="m-example"></div>

```xml
<kl-pager current=6 total=11 disabled />
```
<!-- demo_end -->
