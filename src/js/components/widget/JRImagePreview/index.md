---
title: 图片预览
is_beta: true
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<img title='点击查看预览' on-click={this.show()} width=100 src = 'http://gacha.nosdn.127.net/639562a1f83047ffa4ae411c6aa49fa0.jpeg?imageView&type=jpg&enlarge=1&quality=100&axis=0'>
```

```javascript
var component = new JRUI.Component({
    template: template,
    show(){
     (new JRUI.JRImagePreview({
            data:{
                "imageList":[
                    {
                        name: 'test.jpeg',
                        src: 'http://gacha.nosdn.127.net/639562a1f83047ffa4ae411c6aa49fa0.jpeg?imageView&type=jpg&enlarge=1&quality=100&axis=0'
                    },
                    {
                        name: 'test2.jpg',
                        src: 'http://gacha.nosdn.127.net/bd8705b5782841dc9e36b8af2cc77aba.jpeg?imageView&type=jpg&enlarge=1&quality=100&axis=0'
                    }, {
                        name: 'test3.jpeg',
                        src: 'http://gacha.nosdn.127.net/b288f65765cd4f0da3775c2228d1f182.jpg?imageView&type=jpg&enlarge=1&quality=100&axis=0'
                    },
                    {
                        name: 'test4.jpg',
                        src: 'http://gacha.nosdn.127.net/ec3004a7ea034ffda67126f933edaed1.jpeg?imageView&type=jpg&enlarge=1&quality=100&axis=0'
                    }
                ],
                curIndex:1,
        }
    })).$inject(document.body)
    },
});
```
<!-- demo_end -->
