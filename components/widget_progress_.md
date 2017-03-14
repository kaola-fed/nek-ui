---
title: 进度条
type: components
name: progress
cate: 其它
order: 505
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<progress percent="36" />
```
<!-- demo_end -->

### 颜色扩展

<!-- demo_start -->
<div class="m-example"></div>

```xml
<progress percent="25" state="info" />
<progress percent="50" state="success" />
<progress percent="75" state="warning" />
<progress percent="100" state="error" />
```
<!-- demo_end -->

### 尺寸扩展

<!-- demo_start -->
<div class="m-example"></div>

```xml
<progress percent="20" size="xs" />
<progress percent="40" size="sm" />
<progress percent="60" />
<progress percent="80" size="lg" />
<progress percent="100" size="xl" />
```
<!-- demo_end -->

### 条纹

<!-- demo_start -->
<div class="m-example"></div>

```xml
<progress percent="36" striped />
```
<!-- demo_end -->

### 条纹动画

<!-- demo_start -->
<div class="m-example"></div>

```xml
<progress percent="72" state="error" striped active />
```
<!-- demo_end -->

## API
## Classes

<dl>
<dt><a href="#Progress">Progress</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#config">config()</a></dt>
<dd></dd>
</dl>

<a name="Progress"></a>

## Progress
**Kind**: global class  
**Extend**: Component  
<a name="new_Progress_new"></a>

### new Progress()

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options.data] | <code>object</code> |  | = 绑定属性 |
| [options.data.percent] | <code>number</code> | <code>36</code> | => 百分比 |
| [options.data.text] | <code>string</code> &#124; <code>boolean</code> | <code>true</code> | => 在进度条中是否显示百分比。值为`string`时显示该段文字。 |
| [options.data.size] | <code>string</code> | <code>null</code> | => 进度条的尺寸 |
| [options.data.state] | <code>string</code> | <code>null</code> | => 进度条的状态 |
| [options.data.striped] | <code>boolean</code> | <code>false</code> | => 是否显示条纹 |
| [options.data.active] | <code>boolean</code> | <code>false</code> | => 进度条是否为激活状态，当`striped`为`true`时，进度条显示动画 |
| [options.data.visible] | <code>boolean</code> | <code>true</code> | => 是否显示 |
| [options.data.class] | <code>string</code> |  | => 补充class |

<a name="config"></a>

## config()
**Kind**: global function  
**Access:** protected  

{% raw %}
<script>
var index = 0;

    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<progress percent="36" />

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<progress percent="25" state="info" />
<progress percent="50" state="success" />
<progress percent="75" state="warning" />
<progress percent="100" state="error" />

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<progress percent="20" size="xs" />
<progress percent="40" size="sm" />
<progress percent="60" />
<progress percent="80" size="lg" />
<progress percent="100" size="xl" />

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<progress percent="36" striped />

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<progress percent="72" state="error" striped active />

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
</script>
{% endraw %}