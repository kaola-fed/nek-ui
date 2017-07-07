---
title: 按钮
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class=g-row>
     <jr-button type="primary" title="primary" />
     <jr-button type="secondary" title="secondary" />
     <jr-button type="tertiary" title="tertiary" />
     <jr-button type="info" title="info" />
     <jr-button type="success" title="success" />
     <jr-button type="warning" title="warn" />
     <jr-button type="error" title="error" />
</div>
<div class=g-row>
     <jr-button type="primary" title="primary" size="sm" />
     <jr-button type="secondary" title="secondary" size="sm" />
     <jr-button type="tertiary" title="tertiary" size="sm" />
     <jr-button type="info" title="info" size="sm" />
     <jr-button type="success" title="success" size="sm" />
     <jr-button type="warning" title="warn" size="sm" />
     <jr-button type="error" title="error" size="sm" />
 </div>
```
```javascript
var component = new JRUI.Component({
    template: template
});
```
<!-- demo_end -->

### 常用的button类型

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class=g-row>
    <jr-button action="view" title="查看" />
    <jr-button action="undo" title="撤销" />
    <jr-button action="cancel" title="取消" />
    <jr-button action="remove" title="删除" />
    <jr-button action="update" title="更新" />
</div>
<div class=g-row>
    <jr-button action="submit" title="提交" />
    <jr-button action="save" title="保存" />
    <jr-button action="copy" title="复制" />
    <jr-button action="pass" title="通过" />
    <jr-button action="reject" title="驳回" />
</div>
<div class=g-row>
    <jr-button action="backward" title="返回" />
    <jr-button action="download" title="下载" />
    <jr-button action="upload" title="上传" />
    <jr-button action="search" title="查询" />
    <jr-button action="edit" title="编辑" />
</div>
<div class=g-row>
    <jr-button action="add" title="添加" />
    <jr-button action="link" title="链接" link="http://www.baidu.com" />
</div>
```
<!-- demo_end -->

### 圆角的图标按钮

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class=g-row>
    <jr-button action="update" shape="circle" size="xs" />
    <jr-button action="update" shape="circle" size="sm" />
    <jr-button action="update" shape="circle" />
    <jr-button action="update" shape="circle" size="lg" />
    <jr-button action="update" shape="circle" size="xl" />
</div>
```
<!-- demo_end -->

### 图标按钮

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class=g-row>
    <jr-button action="update" type="primary" shape="icon" size="xs" />
    <jr-button action="update" type="info" shape="icon" size="sm" />
    <jr-button action="update" type="error" shape="icon" />
    <jr-button action="update" shape="icon" size="lg" />
    <jr-button action="update" shape="icon" size="xl" />
</div>
```
<!-- demo_end -->

### 加载中的按钮

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class=g-row>
    <jr-button action="update" loading />
</div>
```
<!-- demo_end -->

### buttonGroup

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class=g-row>
    <div class="u-btngroup u-btngroup-horizontal">
       <jr-button action="view" />
       <jr-button action="edit" />
    </div>
</div>
```
<!-- demo_end -->
