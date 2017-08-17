---
title: 加载中
masonry: true
---

<!-- demo_start -->

*基本形式*

<div class="m-example"></div>

```xml
<kl-button title={loading ? '加载中' : '开始加载'}
           on-click={this.onLoadingClick()} />
<kl-loading visible={loading} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        loading: false
    },
    onLoadingClick: function() {
        this.data.loading = true;
        setTimeout((function() {
            this.data.loading = false;
            this.$update();
        }).bind(this), 1500);
    }
});
```

<!-- demo_end -->

<!-- demo_start -->

*通过函数控制*

<div class="m-example"></div>

```xml
<kl-button title={loading ? '加载中' : '开始加载'}
           on-click={this.onLoadingClick()} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        loading: false
    },
    onLoadingClick: function() {
        this.data.loading = true;
        var loadingComponent = new NEKUI.KLLoading();
        loadingComponent.show();
        setTimeout((function() {
            this.data.loading = false;
            loadingComponent.hide();
        }).bind(this), 1500);
    }
});
```

<!-- demo_end -->