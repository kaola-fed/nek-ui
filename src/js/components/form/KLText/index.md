---
title: 文本展示
masonry: true
---

<!-- demo_start -->
### 大小扩展
通过设置`size`值控制文本字体大小
<div class="m-example"></div>

```xml
示例：
<kl-text size="xs" text="超小号文本"></kl-text>
<kl-text size="sm" text="小号文本"></kl-text>
<kl-text  text="正常文本"></kl-text>
<kl-text size="lg" text="大号文本"></kl-text>
<kl-text size="xl" text="超大号文本"></kl-text>
```
<!-- demo_end -->

<!-- demo_start -->
### 类型扩展
通过设置`type`值控制文本显示不同类型
<div class="m-example"></div>

```xml
示例：
<kl-text type="default" text="Default"></kl-text>
<kl-text type="primary" text="Primary"></kl-text>
<kl-text type="success" text="Success"></kl-text>
<kl-text type="warning" text="Warning"></kl-text>
<kl-text type="error" text="Error"></kl-text>
<kl-text type="inverse" text="Inverse"></kl-text>
<kl-text type="muted" text="Muted"></kl-text>
```
<!-- demo_end -->

<!-- demo_start -->
### 加粗
通过设置`isBold`值控制文本字体是否加粗
* `false`: 不加粗
* `true`: 加粗

<div class="m-example"></div>

```xml
示例：
<kl-text  text="正常文本"></kl-text>
<kl-text isBold={true} text="加粗文本"></kl-text>
```
<!-- demo_end -->

<!-- demo_start -->
### 水平对齐
通过指定`align`值来控制文字垂直方向的排列规则
* `left`:左对齐
* `center`: 居中对齐
* `right`: 右对齐

<div class="m-example"></div>

```xml
示例：
<kl-text align="left" text="左对齐"></kl-text>
<kl-text align="center" text="居中对齐"></kl-text>
<kl-text align="right" text="右对齐"></kl-text>
```
<!-- demo_end -->

<!-- demo_start -->
### 垂直对齐
通过指定`vertical`值来控制文字垂直方向的排列规则
* `top`:顶部对齐
* `middle`: 垂直居中
* `bottom`: 底部对齐

<div class="m-example"></div>

```xml
示例：
<kl-text vertical="top" text="顶部对齐"></kl-text>
<kl-text vertical="middle" text="垂直居中"></kl-text>
<kl-text vertical="bottom" text="底部对齐"></kl-text>
```
<!-- demo_end -->

<!-- demo_start -->
### 链接显示
通过设置`url`把文本变成链接显示
<div class="m-example"></div>

```xml
示例：<kl-text url="http://www.kaola.com"  target="_blank" text="跳转至考拉首页"></kl-text>
```
<!-- demo_end -->

