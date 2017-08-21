---
title: 图片预览
masonry: true
---

<!-- demo_start -->
*基本形式*

<div class="m-example"></div>

```xml
<kl-button title="打开图片预览" on-click={visible = true} />
{#if visible}
<kl-image-preview image-list={list} cur-index={1}></kl-image-preview>
{/if}
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        list: [
            {
                name: 'kaola-logo.jpeg',
                src: 'http://haitao.nos.netease.com/264271ddbec447288f17aef71119b1f4.png?imageView&thumbnail=220x0&quality=85&v=1'
            },
            {
                name: 'app-2dcode.jpg',
                src: '/images/logo.svg'
            }
        ],
        curIndex: 1,
        visible: false
    }
});
```
<!-- demo_end -->
