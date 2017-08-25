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
    data: {
        imageList: [
            {
                name: 'kaola-logo.jpeg',
                src: 'http://haitao.nos.netease.com/264271ddbec447288f17aef71119b1f4.png?imageView&thumbnail=220x0&quality=85&v=1'
            },
            {
                name: 'app-2dcode.jpg',
                src: '/images/logo.svg'
            }
        ],  
    },
    onPreviewClick: function() {
        const imgFileList = this.data.imageList.map(function (el) { return el; });
        const imagePreview = new NEKUI.KLImagePreview({
            data: {
                imageList: imgFileList,
                curIndex: 1
            }
        });
        imagePreview.$on('remove', function(imgInfo) {
            const index = imgInfo.index;
            imgFileList.splice(index, 1);
        });
        imagePreview.$on('$destroy', function() {
            imgFileList.splice(0);
        });
        
        imagePreview.$inject(document.body);
    }
});
```
<!-- demo_end -->
