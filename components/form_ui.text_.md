---
title: 展示文本
type: components
name: ui.text
cate: 表单
order: 214
---

### 大小扩展

<!-- demo_start -->
<div class="m-example"></div>

```html
<span class="u-text u-text-xs">超小号文本</span>
<span class="u-text u-text-sm">小号文本</span>
<span>正常文本</span>
<span class="u-text u-text-lg">大号文本</span>
<span class="u-text u-text-xl">超大号文本</span>
```
<!-- demo_end -->

### 颜色扩展

<!-- demo_start -->
<div class="m-example"></div>

```html
<span>Default</span>
<span class="u-text u-text-primary">Primary</span>
<span class="u-text u-text-success">Success</span>
<span class="u-text u-text-warning">Warning</span>
<span class="u-text u-text-error">Error</span>
<span class="u-text u-text-inverse">Inverse</span>
<span class="u-text u-text-muted">Muted</span>
```
<!-- demo_end -->

### 加粗

<!-- demo_start -->
<div class="m-example"></div>

```html
<div class="f-fwb">加粗文本</div>
```
<!-- demo_start -->

### 文本对齐

<!-- demo_start -->
<div class="m-example"></div>

```html
<div class="f-tal">左对齐</div>
<div class="f-tac">居中对齐</div>
<div class="f-tar">右对齐</div>
<div class="f-taj">两端对齐</div>
```
<!-- demo_end -->

### 垂直对齐

<!-- demo_start -->
<div class="m-example"></div>

```html
<div class="f-vat">顶部对齐</div>
<div class="f-vam">垂直居中</div>
<div class="f-vab">底部对齐</div>
```
<!-- demo_end -->

*待完成……*

### 文本省略和换行

<!-- demo_start -->
<div class="m-example"></div>

```html
<div class="f-toe" style="width:100px;">这是一段很长很长的文字</div>
```
<!-- demo_end -->

*待完成……*
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
| [options.data.text] | <code>string</code> | <code>&quot;文本&quot;</code> | <=> 内容 |
| [options.data.size] | <code>string</code> |  | => 大小 |
| [options.data.isBold] | <code>boolean</code> | <code>false</code> | => 是否加粗 |
| [options.data.align] | <code>string</code> |  | => 左右对齐方式 |
| [options.data.vertical] | <code>string</code> |  | => 上下对齐方式 |
| [options.data.type] | <code>string</code> | <code>&quot;default&quot;</code> | => 文本样式 |


{% raw %}
<script>
var index = 0;

    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<span class="u-text u-text-xs">超小号文本</span>
<span class="u-text u-text-sm">小号文本</span>
<span>正常文本</span>
<span class="u-text u-text-lg">大号文本</span>
<span class="u-text u-text-xl">超大号文本</span>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<span>Default</span>
<span class="u-text u-text-primary">Primary</span>
<span class="u-text u-text-success">Success</span>
<span class="u-text u-text-warning">Warning</span>
<span class="u-text u-text-error">Error</span>
<span class="u-text u-text-inverse">Inverse</span>
<span class="u-text u-text-muted">Muted</span>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<div class="f-fwb">加粗文本</div>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<div class="f-vat">顶部对齐</div>
<div class="f-vam">垂直居中</div>
<div class="f-vab">底部对齐</div>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<div class="f-toe" style="width:100px;">这是一段很长很长的文字</div>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
</script>
{% endraw %}