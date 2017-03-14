---
title: 加载中
type: components
name: loading
cate: 其它
order: 504
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<button class="u-btn u-btn-primary" on-click={this.load()}>Loading</button>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    load: function() {
        NEKUI.Loading.show();
        setTimeout(function() {
            NEKUI.Loading.hide();
        }, 2000);
    }
});
```
<!-- demo_end -->

### 嵌入文档流

<!-- demo_start -->
<div class="m-example"></div>

```xml
<button class="u-btn u-btn-success" on-click={this.load()}>
    Loading <loading ref="loading" static />
</button>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    load: function() {
        this.$refs.loading.show();
        setTimeout(function() {
            this.$refs.loading.hide();
        }.bind(this), 3000);
    }
});
```
<!-- demo_end -->

### 自定义

<!-- demo_start -->
<div class="m-example"></div>

```xml
<button class="u-btn u-btn-error" on-click={this.load()}>Loading</button>
<loading ref="loading" static>
    <img src="../img/loading.gif">
</loading>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    load: function() {
        this.$refs.loading.show();
        setTimeout(function() {
            this.$refs.loading.hide();
        }.bind(this), 6000);
    }
});
```
<!-- demo_end -->

## API
## Classes

<dl>
<dt><a href="#Loading">Loading</a></dt>
<dd></dd>
</dl>

## Members

<dl>
<dt><a href="#loading">loading</a> : <code><a href="#Loading">Loading</a></code></dt>
<dd><p>直接初始化一个实例</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#config">config()</a></dt>
<dd></dd>
<dt><a href="#init">init()</a></dt>
<dd></dd>
<dt><a href="#show_new 显示组件">show() 显示组件()</a> ⇒ <code>void</code></dt>
<dd></dd>
<dt><a href="#show_new 隐藏组件">show() 隐藏组件()</a> ⇒ <code>void</code></dt>
<dd></dd>
</dl>

<a name="Loading"></a>

## Loading
**Kind**: global class  
<a name="new_Loading_new"></a>

### new Loading()

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options.data] | <code>object</code> |  | = 绑定属性 |
| [options.data.static] | <code>boolean</code> | <code>false</code> | => 是否嵌入文档流 |
| [options.data.disabled] | <code>boolean</code> | <code>false</code> | => 是否禁用 |
| [options.data.visible] | <code>boolean</code> | <code>true</code> | => 是否显示 |
| [options.data.class] | <code>string</code> |  | => 补充class |

<a name="loading"></a>

## loading : <code>[Loading](#Loading)</code>
直接初始化一个实例

**Kind**: global variable  
<a name="config"></a>

## config()
**Kind**: global function  
**Access:** protected  
<a name="init"></a>

## init()
**Kind**: global function  
**Access:** protected  
<a name="show_new 显示组件"></a>

## show() 显示组件() ⇒ <code>void</code>
**Kind**: global function  
**Access:** public  
<a name="show_new 隐藏组件"></a>

## show() 隐藏组件() ⇒ <code>void</code>
**Kind**: global function  
**Access:** public  
<a name="show_new 显示加载中"></a>

## .show() 显示加载中() ⇒ <code>void</code>
**Kind**: static function  
**Access:** public  
<a name="hide_new 隐藏加载中"></a>

## .hide() 隐藏加载中() ⇒ <code>void</code>
**Kind**: static function  
**Access:** public  

{% raw %}
<script>
var index = 0;

    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<button class="u-btn u-btn-primary" on-click={this.load()}>Loading</button>

      */});
      
var component = new NEKUI.Component({
    template: template,
    load: function() {
        NEKUI.Loading.show();
        setTimeout(function() {
            NEKUI.Loading.hide();
        }, 2000);
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<button class="u-btn u-btn-success" on-click={this.load()}>
    Loading <loading ref="loading" static />
</button>

      */});
      
var component = new NEKUI.Component({
    template: template,
    load: function() {
        this.$refs.loading.show();
        setTimeout(function() {
            this.$refs.loading.hide();
        }.bind(this), 3000);
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<button class="u-btn u-btn-error" on-click={this.load()}>Loading</button>
<loading ref="loading" static>
    <img src="../img/loading.gif">
</loading>

      */});
      
var component = new NEKUI.Component({
    template: template,
    load: function() {
        this.$refs.loading.show();
        setTimeout(function() {
            this.$refs.loading.hide();
        }.bind(this), 6000);
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
</script>
{% endraw %}