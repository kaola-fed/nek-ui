---
title: 按钮
type: components
name: ui.button
cate: 表单
order: 210
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
 <ui.button on-click={this.click1()} type="primary" title="primary" disabled />
 <ui.button on-click={this.click2()} type="default" title="default" />
 <ui.button type="info" title="info" />
 <ui.button type="success" title="success" />
 <ui.button type="warning" title="warn" />
 <ui.button type="error" title="error" />
```
```javascript
var component = new NEKUI.Component({
    template: template,
    click1: function() {
      console.log('click1');
    },
    click2: function() {
      console.log('click2');
    }
});
```
<!-- demo_end -->

### 常用的button类型

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class=g-row>
    <ui.button action="view" title="查看" />
    <ui.button action="undo" title="撤销" />
    <ui.button action="cancel" title="取消" />
    <ui.button action="remove" title="删除" />
    <ui.button action="update" title="更新" />
</div>
<div class=g-row>
    <ui.button action="submit" title="提交" />
    <ui.button action="save" title="保存" />
    <ui.button action="copy" title="复制" />
    <ui.button action="pass" title="通过" />
    <ui.button action="reject" title="驳回" />
</div>
<div class=g-row>
    <ui.button action="backward" title="返回" />
    <ui.button action="download" title="下载" />
    <ui.button action="upload" title="上传" />
    <ui.button action="search" title="查询" />
    <ui.button action="edit" title="编辑" />
</div>
<div class=g-row>
    <ui.button action="add" title="添加" />
    <ui.button action="link" title="链接" link="http://www.baidu.com" />
</div>
```
<!-- demo_end -->

### 圆角的图标按钮

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class=g-row>
    <ui.button action="update" shape="circle" size="xs" />
    <ui.button action="update" shape="circle" size="sm" />
    <ui.button action="update" shape="circle" />
    <ui.button action="update" shape="circle" size="lg" />
    <ui.button action="update" shape="circle" size="xl" />
</div>
```
<!-- demo_end -->

### 图标按钮

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class=g-row>
    <ui.button action="update" type="primary" shape="icon" size="xs" />
    <ui.button action="update" type="info" shape="icon" size="sm" />
    <ui.button action="update" type="error" shape="icon" />
    <ui.button action="update" shape="icon" size="lg" />
    <ui.button action="update" shape="icon" size="xl" />
</div>
```
<!-- demo_end -->

### 加载中的按钮

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class=g-row>
    <ui.button action="update" loading />
</div>
```
<!-- demo_end -->

### buttonGroup

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class=g-row>
    <div class="u-btngroup u-btngroup-horizontal">
       <ui.button action="view" />
       <ui.button action="edit" />
    </div>
</div>
```
<!-- demo_end -->

## API
<a name="Input"></a>

## Input
**Kind**: global class  
**Extend**: Component  
<a name="new_Input_new"></a>

### new Input()

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options.data] | <code>object</code> |  | = 绑定属性 |
| [options.data.title] | <code>string</code> | <code>&quot;点我&quot;</code> | => 按钮标题 |
| [options.data.type] | <code>string</code> | <code>&quot;default&quot;</code> | => 按钮样式, primary, default, info, success, warn, error |
| [options.data.size] | <code>string</code> | <code>&quot;normal&quot;</code> | => 按钮大小, xs, sm, lg, xl |
| [options.data.icon] | <code>string</code> |  | => 按钮图标,action不能满足需求时使用; |
| [options.data.action] | <code>string</code> |  | => 按钮操作类型, 每种类型有对应的icon; |
| [options.data.link] | <code>string</code> |  | => 按钮的链接 |
| [options.data.target] | <code>string</code> | <code>&quot;_self&quot;</code> | => 按钮链接的打开方式 |
| [options.data.shape] | <code>string</code> |  | => circle, icon或者默认 |
| [options.data.loading] | <code>boolean</code> | <code>false</code> | => 是否正在加载 |
| [options.data.disabled] | <code>boolean</code> | <code>false</code> | => 禁止按钮 |
| [options.data.class] | <code>boolean</code> | <code>false</code> | => 样式扩展 |


{% raw %}
<script>
var index = 0;

    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
 <ui.button on-click={this.click1()} type="primary" title="primary" disabled />
 <ui.button on-click={this.click2()} type="default" title="default" />
 <ui.button type="info" title="info" />
 <ui.button type="success" title="success" />
 <ui.button type="warning" title="warn" />
 <ui.button type="error" title="error" />

      */});
      
var component = new NEKUI.Component({
    template: template,
    click1: function() {
      console.log('click1');
    },
    click2: function() {
      console.log('click2');
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<div class=g-row>
    <ui.button action="view" title="查看" />
    <ui.button action="undo" title="撤销" />
    <ui.button action="cancel" title="取消" />
    <ui.button action="remove" title="删除" />
    <ui.button action="update" title="更新" />
</div>
<div class=g-row>
    <ui.button action="submit" title="提交" />
    <ui.button action="save" title="保存" />
    <ui.button action="copy" title="复制" />
    <ui.button action="pass" title="通过" />
    <ui.button action="reject" title="驳回" />
</div>
<div class=g-row>
    <ui.button action="backward" title="返回" />
    <ui.button action="download" title="下载" />
    <ui.button action="upload" title="上传" />
    <ui.button action="search" title="查询" />
    <ui.button action="edit" title="编辑" />
</div>
<div class=g-row>
    <ui.button action="add" title="添加" />
    <ui.button action="link" title="链接" link="http://www.baidu.com" />
</div>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<div class=g-row>
    <ui.button action="update" shape="circle" size="xs" />
    <ui.button action="update" shape="circle" size="sm" />
    <ui.button action="update" shape="circle" />
    <ui.button action="update" shape="circle" size="lg" />
    <ui.button action="update" shape="circle" size="xl" />
</div>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<div class=g-row>
    <ui.button action="update" type="primary" shape="icon" size="xs" />
    <ui.button action="update" type="info" shape="icon" size="sm" />
    <ui.button action="update" type="error" shape="icon" />
    <ui.button action="update" shape="icon" size="lg" />
    <ui.button action="update" shape="icon" size="xl" />
</div>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<div class=g-row>
    <ui.button action="update" loading />
</div>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<div class=g-row>
    <div class="u-btngroup u-btngroup-horizontal">
       <ui.button action="view" />
       <ui.button action="edit" />
    </div>
</div>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
</script>
{% endraw %}