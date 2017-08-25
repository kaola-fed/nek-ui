---
title: 进度条
masonry: true
---

<!-- demo_start -->

### 基本形式

<div class="m-example"></div>

```xml
<kl-progress class="f-mb10" percent=25 />
<kl-progress class="f-mb10" percent=50 />
<kl-progress class="f-mb10" percent=75 />
<kl-progress class="f-mb10" percent=100 />
```

```javascript
var component = new NEKUI.Component({
    template: template
});
```

<!-- demo_end -->

<!-- demo_start -->

### 进度条尺寸

<div class="m-example"></div>

```xml
<kl-progress class="f-mb10" size="xs" percent=20 />
<kl-progress class="f-mb10" size="sm" percent=40 />
<kl-progress class="f-mb10" percent=60 />
<kl-progress class="f-mb10" size="lg" percent=80 />
<kl-progress class="f-mb10" size="xl" percent=100 />
```

```javascript
var component = new NEKUI.Component({
    template: template
});
```

<!-- demo_end -->

<!-- demo_start -->

### 进度条状态

<div class="m-example"></div>

```xml
<kl-progress class="f-mb10" state="info" percent=25 />
<kl-progress class="f-mb10" state="success" percent=50 />
<kl-progress class="f-mb10" state="warning" percent=75 />
<kl-progress class="f-mb10" state="error" percent=100 />
```

```javascript
var component = new NEKUI.Component({
    template: template
});
```

<!-- demo_end -->

<!-- demo_start -->

### 条纹与激活

striped属性控制了进度条是否显示条纹；active属性控制了进度条的动画效果显示。

仅当striped属性为true，并且active属性也为true时候，进度条才会显示动画。

<div class="m-example"></div>

```xml
<kl-progress percent=50 striped active />
```

```javascript
var component = new NEKUI.Component({
    template: template
});
```

<!-- demo_end -->

<!-- demo_start -->

### 百分比文字显示

text属性可以为Boolean或String类型。

当类型为Boolean时，text属性控制了进度条上是否显示百分比；当类型为String时，进度条上将显示text的值。

<div class="m-example"></div>

```xml
<div class="g-row">
    <kl-input placeholder="输入显示在进度条上的文字" value={displayText} />
</div>
<kl-progress percent=50 text={displayText || true} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        displayText: ''
    }
});
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
