---
title: 加载中
---

## 基本形式

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

## 嵌入文档流

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

## 自定义

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
