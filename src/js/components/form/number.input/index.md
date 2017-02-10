---
title: 数字输入
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<numberInput value=6 />
```
<!-- demo_end -->

### 禁用组件

<!-- demo_start -->
<div class="m-example"></div>

```xml
<numberInput disabled />
```
<!-- demo_end -->

### 最大值和最小值

<!-- demo_start -->
<div class="m-example"></div>

```xml
<numberInput min=5 max=8 />
```
<!-- demo_end -->

### 数据绑定

<!-- demo_start -->
<div class="m-example"></div>

```xml
<numberInput value={number} />
<numberInput value={number} min=5 max=12 />
```
<!-- demo_end -->

### 事件

请打开浏览器的控制台查看结果。

<!-- demo_start -->
<div class="m-example"></div>

```xml
<numberInput on-change={console.log('on-change:', '$event.value:', $event.value)} />
```
<!-- demo_end -->
