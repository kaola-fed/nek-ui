---
title: 加载
---

<!-- demo_start -->
### 基本形式

<div class="m-example"></div>

```xml
<jr-button on-click="{this.showLoading()}" title="显示加载, 2秒后隐藏" />
<jr-loading visible={visible} />
```

```javascript
var component = new JRUI.Component({
    template: template,
    config: function(data) {
        data.visible = false;
    },
    showLoading: function() {
        this.data.visible = true;
        setTimeout(function() {
          this.$update('visible', false);
        }.bind(this), 2000);
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 嵌入文档流

<div class="m-example"></div>

```xml
<jr-button on-click="{visible = !visible}" title="{visible ? '隐藏加载' : '显示加载'}" />
<p>
    <jr-loading visible={visible} static />
</p>
```

```javascript
var component = new JRUI.Component({
    template: template,
    config: function(data) {
        data.visible = false;
    }
});
```
<!-- demo_end -->
