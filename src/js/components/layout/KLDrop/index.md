---
title: 下拉组件
---

<!-- demo_start -->
### 基本形式

<div class="m-example"></div>

```xml
<kl-drop>
    <kl-drop-header>
        <a href="javascript:void(0)">下拉菜单</a>
    </kl-drop-header>
    <kl-drop-menu>
        <kl-drop-item>
            选项一
        </kl-drop-item>
        <kl-drop-item>
            选项二
        </kl-drop-item>
        <kl-drop-item>
            选项三
        </kl-drop-item>
        <kl-drop-item>
            选项四
        </kl-drop-item>
    </kl-drop-menu>

</kl-drop>
```
```javascript
var component = new NEKUI.Component({
    template: template,
});
```
<!-- demo_end -->


<!-- demo_start -->
### 嵌套用法

<div class="m-example"></div>

```xml
<kl-drop>
    <kl-drop-header>
        <a href="javascript:void(0)">下拉菜单</a>
    </kl-drop-header>
    <kl-drop-menu>
        <kl-drop-item>
            选项一
        </kl-drop-item>
        <kl-drop-item>
            选项二
        </kl-drop-item>
        <kl-drop-item>
            选项三
        </kl-drop-item>
        <kl-drop-item>
            选项四
        </kl-drop-item>
        <kl-drop-menu placement="right">
            <kl-drop-item>
                选项一
            </kl-drop-item>
            <kl-drop-item>
                选项二
            </kl-drop-item>
            <kl-drop-item>
                选项三
            </kl-drop-item>
            <kl-drop-item>
                选项四
            </kl-drop-item>
        </kl-drop-menu>
    </kl-drop-menu>
</kl-drop>
```
```javascript
var component = new NEKUI.Component({
    template: template,
});
```
<!-- demo_end -->