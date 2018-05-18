---
title: 选项卡
---


<!-- demo_start -->
### 禁用某一项，禁用组件

`kl-tabs`标签和`kl-tab`标签均可设置disabled属性，控制整个tabs禁用或某个tab禁用

`kl-tabs`标签还可以设置visible属性，控制整个tabs显示或隐藏

<div class="m-example"></div>

```xml
<kl-row>
    <kl-col span=6>
        <kl-tabs>
            <kl-tab title="Tab1">Content1</kl-tab>
            <kl-tab title="Tab2">Content2</kl-tab>
            <kl-tab title="Tab3" disabled>Content3</kl-tab>
            <kl-tab title="Tab4">Content4</kl-tab>
        </kl-tabs>
    </kl-col>
    <kl-col span=6>
        <kl-tabs disabled>
            <kl-tab title="Tab1">Content1</kl-tab>
            <kl-tab title="Tab2">Content2</kl-tab>
            <kl-tab title="Tab3">Content3</kl-tab>
            <kl-tab title="Tab4">Content4</kl-tab>
        </kl-tabs>
    </kl-col>
</kl-row>
```
<!-- demo_end -->
