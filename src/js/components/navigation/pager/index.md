---
title: 分页
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<pager current=3 sumTotal=200 pageSize=5 />
```
<!-- demo_end -->

### 总条数展示设置一

<!-- demo_start -->
<div class="m-example"></div>

```xml
<pager current=3 sumTotal=200 pageSize=5 isEllipsis={true} />
```
<!-- demo_end -->

### 总条数展示设置二

<!-- demo_start -->
<div class="m-example"></div>

```xml
<pager current=3 sumTotal=200 pageSize=5 maxTotal=100 />
```
<!-- demo_end -->

### 位置

<!-- demo_start -->
<div class="m-example"></div>

```xml
<pager pageSize=20 current=6 total=11 position="left" lang="en-US" />
<pager pageSize=20 current=6 total=11 position="center" />
<pager current=6 total=11 position="right" />
```
<!-- demo_end -->

### 显示数目

<!-- demo_start -->
<div class="m-example"></div>

```xml
<pager current=6 total=11 middle=3 side=1 />
```
<!-- demo_end -->

### 禁用组件

<!-- demo_start -->
<div class="m-example"></div>

```xml
<pager current=6 total=11 disabled />
```
<!-- demo_end -->
