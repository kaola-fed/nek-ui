---
title: 复选组
---

## 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<time.picker />
<time.picker time="15:45" />
```
<!-- demo_end -->

## 禁用组件

<!-- demo_start -->
<div class="m-example"></div>

```xml
<time.picker disabled />
```
<!-- demo_end -->

## 日期范围

<!-- demo_start -->
<div class="m-example"></div>

```xml
<time.picker minTime="12:00" maxTime="14:45" />
```
<!-- demo_end -->

## 数据绑定

<!-- demo_start -->
<div class="m-example"></div>

```xml
<time.picker time={time} />
<time.picker time={time} minTime="18:00" maxTime="19:30" />
<p>当前选择的时间为：{time}</p>
```
<!-- demo_end -->

## 事件

请打开浏览器的控制台查看结果。

<!-- demo_start -->
<div class="m-example"></div>

```xml
<time.picker on-change={console.log('on-change:', '$event.time:', $event.time)} />
```
<!-- demo_end -->
