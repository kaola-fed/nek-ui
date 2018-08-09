---
title: 进度条
masonry: true
---

<!-- demo_start -->

### 基本形式

<div class="m-example"></div>

```xml
<kl-progress percent=25 class="f-mb10" />
<kl-progress percent=25>
    25%
</kl-progress>
```

<!-- demo_end -->

<!-- demo_start -->

### 进度条尺寸

<div class="m-example"></div>

```xml
<kl-progress class="f-mb10" size="lg" percent=40 />
<kl-progress class="f-mb10" percent=40 />
<kl-progress class="f-mb10" size="sm" percent=40 />
```

<!-- demo_end -->

<!-- demo_start -->

### 进度条颜色

<div class="m-example"></div>

```xml
<kl-progress class="f-mb10" color="#F86B6B" percent=25 />
```

<!-- demo_end -->

<!-- demo_start -->

### 在进度条上显示进度
size必须是lg时才生效
<div class="m-example"></div>

```xml
<kl-progress class="f-mb10" size="lg" percent=2 insideText />
<kl-progress class="f-mb10" size="lg" percent=25 insideText />
<kl-progress class="f-mb10" size="lg" percent=100 insideText />
```

<!-- demo_end -->


<!-- demo_start -->

### 显示与隐藏

可以通过visible属性来控制进度条的显示与隐藏

<div class="m-example"></div>

```xml
<kl-button
    class="f-mb10"
    title={visible ? '已显示进度条' : '已隐藏进度条'}
    on-click={visible = !visible}
/>

<kl-progress percent=50 visible={visible} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        visible: true
    }
});
```

<!-- demo_end -->
