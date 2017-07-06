---
title: 按钮
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class=g-row>
     <xx-button type="primary" title="primary" />
     <xx-button type="secondary" title="secondary" />
     <xx-button type="tertiary" title="tertiary" />
     <xx-button type="info" title="info" />
     <xx-button type="success" title="success" />
     <xx-button type="warning" title="warn" />
     <xx-button type="error" title="error" />
</div>
<div class=g-row>
     <xx-button type="primary" title="primary" size="sm" />
     <xx-button type="secondary" title="secondary" size="sm" />
     <xx-button type="tertiary" title="tertiary" size="sm" />
     <xx-button type="info" title="info" size="sm" />
     <xx-button type="success" title="success" size="sm" />
     <xx-button type="warning" title="warn" size="sm" />
     <xx-button type="error" title="error" size="sm" />
 </div>
```
```javascript
var component = new REGUI.Component({
    template: template
});
```
<!-- demo_end -->

### 常用的button类型

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class=g-row>
    <xx-button action="view" title="查看" />
    <xx-button action="undo" title="撤销" />
    <xx-button action="cancel" title="取消" />
    <xx-button action="remove" title="删除" />
    <xx-button action="update" title="更新" />
</div>
<div class=g-row>
    <xx-button action="submit" title="提交" />
    <xx-button action="save" title="保存" />
    <xx-button action="copy" title="复制" />
    <xx-button action="pass" title="通过" />
    <xx-button action="reject" title="驳回" />
</div>
<div class=g-row>
    <xx-button action="backward" title="返回" />
    <xx-button action="download" title="下载" />
    <xx-button action="upload" title="上传" />
    <xx-button action="search" title="查询" />
    <xx-button action="edit" title="编辑" />
</div>
<div class=g-row>
    <xx-button action="add" title="添加" />
    <xx-button action="link" title="链接" link="http://www.baidu.com" />
</div>
```
<!-- demo_end -->

### 圆角的图标按钮

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class=g-row>
    <xx-button action="update" shape="circle" size="xs" />
    <xx-button action="update" shape="circle" size="sm" />
    <xx-button action="update" shape="circle" />
    <xx-button action="update" shape="circle" size="lg" />
    <xx-button action="update" shape="circle" size="xl" />
</div>
```
<!-- demo_end -->

### 图标按钮

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class=g-row>
    <xx-button action="update" type="primary" shape="icon" size="xs" />
    <xx-button action="update" type="info" shape="icon" size="sm" />
    <xx-button action="update" type="error" shape="icon" />
    <xx-button action="update" shape="icon" size="lg" />
    <xx-button action="update" shape="icon" size="xl" />
</div>
```
<!-- demo_end -->

### 加载中的按钮

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class=g-row>
    <xx-button action="update" loading />
</div>
```
<!-- demo_end -->

### buttonGroup

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class=g-row>
    <div class="u-btngroup u-btngroup-horizontal">
       <xx-button action="view" />
       <xx-button action="edit" />
    </div>
</div>
```
<!-- demo_end -->
