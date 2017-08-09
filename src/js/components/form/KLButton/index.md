---
title: 按钮
masonry: true
---

## 代码演示

<div id="grid-itemOuter"></div>

<!-- demo_start -->

*基本形式*

<div class="m-example"></div>

```xml
<div class=g-row>
     <kl-button type="primary" title="primary" />
     <kl-button type="secondary" title="secondary" />
     <kl-button type="tertiary" title="tertiary" />
     <kl-button type="info" title="info" />
     <kl-button type="success" title="success" />
     <kl-button type="warning" title="warn" />
     <kl-button type="error" title="error" />
</div>
<div class=g-row>
     <kl-button type="primary" title="primary" size="sm" />
     <kl-button type="secondary" title="secondary" size="sm" />
     <kl-button type="tertiary" title="tertiary" size="sm" />
     <kl-button type="info" title="info" size="sm" />
     <kl-button type="success" title="success" size="sm" />
     <kl-button type="warning" title="warn" size="sm" />
     <kl-button type="error" title="error" size="sm" />
 </div>
```
```javascript
var component = new NEKUI.Component({
    template: template
});
```

<!-- demo_end -->

<!-- demo_start -->

*常用的button类型*

<div class="m-example"></div>

```xml
<div class=g-row>
    <kl-button action="view" title="查看" />
    <kl-button action="undo" title="撤销" />
    <kl-button action="cancel" title="取消" />
    <kl-button action="remove" title="删除" />
    <kl-button action="update" title="更新" />
</div>
<div class=g-row>
    <kl-button action="submit" title="提交" />
    <kl-button action="save" title="保存" />
    <kl-button action="copy" title="复制" />
    <kl-button action="pass" title="通过" />
    <kl-button action="reject" title="驳回" />
</div>
<div class=g-row>
    <kl-button action="backward" title="返回" />
    <kl-button action="download" title="下载" />
    <kl-button action="upload" title="上传" />
    <kl-button action="search" title="查询" />
    <kl-button action="edit" title="编辑" />
</div>
<div class=g-row>
    <kl-button action="add" title="添加" />
    <kl-button action="link" title="链接" link="http://www.baidu.com" />
</div>
```

<!-- demo_end -->

<!-- demo_start -->

*圆角的图标按钮*

<div class="m-example"></div>

```xml
<div class=g-row>
    <kl-button action="update" shape="circle" size="xs" />
    <kl-button action="update" shape="circle" size="sm" />
    <kl-button action="update" shape="circle" />
    <kl-button action="update" shape="circle" size="lg" />
    <kl-button action="update" shape="circle" size="xl" />
</div>
```

<!-- demo_end -->

<!-- demo_start -->

*图标按钮*

<div class="m-example"></div>

```xml
<div class=g-row>
    <kl-button action="update" type="primary" shape="icon" size="xs" />
    <kl-button action="update" type="info" shape="icon" size="sm" />
    <kl-button action="update" type="error" shape="icon" />
    <kl-button action="update" shape="icon" size="lg" />
    <kl-button action="update" shape="icon" size="xl" />
</div>
```

<!-- demo_end -->

<!-- demo_start -->

*加载中的按钮*

<div class="m-example"></div>

```xml
<div class=g-row>
    <kl-button action="update" loading />
</div>
```

<!-- demo_end -->

<!-- demo_start -->

### buttonGroup

<div class="m-example"></div>

```xml
<div class=g-row>
    <div class="u-btngroup u-btngroup-horizontal">
       <kl-button action="view" />
       <kl-button action="edit" />
    </div>
</div>
```

<!-- demo_end -->
