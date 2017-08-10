---
title: 图片预览
masonry: true
---

## 代码演示

<div id="grid-itemOuter"></div>

<!-- demo_start -->
*基本形式*

<div class="m-example"></div>

```xml
<kl-image-preview image-list={list} cur-index={1}></kl-image-preview>
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
                src: 'http://pic23.nipic.com/20120903/10422454_211025593122_2.jpg'
            }
        ],
        curIndex: 1
    }
});
```
<!-- demo_end -->
