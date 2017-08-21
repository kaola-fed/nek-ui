---
title: 进度条
---

<!-- demo_start -->

*基本形式*

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

*进度条尺寸*

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

*进度条状态*

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

*综合处理*

<div class="m-example"></div>

```xml
<div class=g-row>
    <kl-button title={striped ? '已显示条纹' : '已隐藏条纹'}
               on-click={striped = !striped}/>
    <kl-button title={active ? '已激活' : '未激活'}
               on-click={active = !active}/>
    <kl-button title={text ? '已显示百分比' : '已隐藏百分比'}
               on-click={text = !text}/>
    <kl-button title={visible ? '已显示进度条' : '已隐藏进度条'}
               on-click={visible = !visible}/>
</div>
<div class=g-row>
    进度条文字显示
    <kl-input placeholder="输入显示文字" value={displayText} />
</div>
<div class=g-row>
    补充class
    <kl-input placeholder="输入自定义类名" value={customClass} />
</div>
<div class=g-row>
    <kl-progress percent=50 class={customClass}
                 striped={striped} active={active}
                 text={displayText || text} visible={visible}
    />
</div>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        striped: false,
        active: false,
        text: true,
        visible: true,
        displayText: '',
        customClass: ''
    }
});
```

<!-- demo_end -->
