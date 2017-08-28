---
title: 图片预览
---

<!-- demo_start -->
### 基本形式

<div class="m-example"></div>

```xml
<kl-button title="打开图片预览" on-click={this.onPreviewClick()} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    onPreviewClick: function() {
        const imageList = [{
            name: 'Kaola.jpeg',
            src: 'http://haitao.nos.netease.com/9b73692b3a6b46d2be1de7d3be893834.jpg'
        }, {
            name: 'Music.jpg',
            src: 'http://haitao.nos.netease.com/7dfd9aa492694493be0fc1458d558536.jpg'
        }];

        new NEKUI.KLImagePreview({
            data: {
                imageList: imageList,
                curIndex: 0
            }
        });
    }
});
```
<!-- demo_end -->
