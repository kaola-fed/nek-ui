---
title: 徽标
type: components
name: badge
cate: 其它
order: 500
---

## 代码演示

### 基本形式

在`<span>`或`<a>`标签上使用`.u-badge`即可。

<!-- demo_start -->
<div class="m-example"></div>

```html
<span class="u-badge">New</span>
<a class="u-badge">Free</a>
```
<!-- demo_end -->

### 颜色扩展

<!-- demo_start -->
<div class="m-example"></div>

```html
<span class="u-badge u-badge-primary">Primary</span>
<span class="u-badge u-badge-info">Info</span>
<span class="u-badge u-badge-success">Success</span>
<span class="u-badge u-badge-warning">Warning</span>
<span class="u-badge u-badge-error">Error</span>
```
<!-- demo_end -->

### 数字

<!-- demo_start -->
<div class="m-example"></div>

```html
<span class="u-badge u-badge-info u-badge-number">1</span>
<span class="u-badge u-badge-warning u-badge-number">7</span>
<span class="u-badge u-badge-error u-badge-number">256</span>
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
| [options.data.text] | <code>string</code> | <code>&quot;--&quot;</code> | <=> 内容 |
| [options.data.circle] | <code>boolean</code> | <code>false</code> | => 是否圆角 |
| [options.data.type] | <code>string</code> | <code>&quot;default&quot;</code> | => 文本样式 |


{% raw %}
<script>
var index = 0;

    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<span class="u-badge">New</span>
<a class="u-badge">Free</a>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<span class="u-badge u-badge-primary">Primary</span>
<span class="u-badge u-badge-info">Info</span>
<span class="u-badge u-badge-success">Success</span>
<span class="u-badge u-badge-warning">Warning</span>
<span class="u-badge u-badge-error">Error</span>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<span class="u-badge u-badge-info u-badge-number">1</span>
<span class="u-badge u-badge-warning u-badge-number">7</span>
<span class="u-badge u-badge-error u-badge-number">256</span>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
</script>
{% endraw %}