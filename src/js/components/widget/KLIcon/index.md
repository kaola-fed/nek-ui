---
title: 图标
---

<!-- demo_start -->
### 基本形式
推荐使用`kl-icon`组件, 不要使用`nek-ui`内部的`icon class`

<div class="m-example"></div>

```xml
<kl-icon type="home2" />
<kl-icon type="home2" font-size="16" />
<kl-icon type="home2" color="#E31436" fontSize="20" />
```
<!-- demo_end -->

<!-- demo_start -->
### 图标列表

点击图标按钮复制图标代码，下方js代码请先忽视

<div class="m-example"></div>

```xml

<kl-icon fontSize=20 type="arrow-up" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="arrow-down" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="arrow-left" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="arrow-right" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="arrow-left-small" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="arrow-left-double" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="arrow-right-small" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="arrow-right-double" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="solid-arrow-left" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="solid-arrow-down" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="solid-arrow-right" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="solid-arrow-up" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="notice" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="error" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="question" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="success" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="warning" on-click={this.copy($event)} />

<kl-icon fontSize=20 type="tick" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="add" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="cross" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="edit" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="bin" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="more" on-click={this.copy($event)} />

<kl-icon fontSize=20 type="adjust" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="attachment" on-click={this.copy($event)} />

<kl-icon fontSize=20 type="barcharts" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="calendar" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="book" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="catagroy" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="list" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="charts" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="artical" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="doc" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="doc-blank" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="doc-verified" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="doc-error" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="window" on-click={this.copy($event)} />

<kl-icon fontSize=20 type="home" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="flag" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="bell" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="cloud" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="dashboard" on-click={this.copy($event)} />

<kl-icon fontSize=20 type="download" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="export" on-click={this.copy($event)} />

<kl-icon fontSize=20 type="full-size" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="min-size" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="zoom" on-click={this.copy($event)} />




<kl-icon fontSize=20 type="like" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="image" on-click={this.copy($event)} />


<kl-icon fontSize=20 type="lock" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="mail" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="location" on-click={this.copy($event)} />

<kl-icon fontSize=20 type="monitor" on-click={this.copy($event)} />

<kl-icon fontSize=20 type="print" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="phone" on-click={this.copy($event)} />

<kl-icon fontSize=20 type="rank" on-click={this.copy($event)} />

<kl-icon fontSize=20 type="refresh" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="shut-down" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="time" on-click={this.copy($event)} />

<kl-icon fontSize=20 type="share" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="setup" on-click={this.copy($event)} />

<kl-icon fontSize=20 type="shield" on-click={this.copy($event)} />

<kl-icon fontSize=20 type="unlock" on-click={this.copy($event)} />



<kl-icon fontSize=20 type="view" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="user" on-click={this.copy($event)} />




```

```javascript

var component = new NEKUI.Component({
    template: template,
    copy: function(e) {
        var type = e.target.className.trim();
        type = type.slice(17)
        var text = '<kl-icon type="' + type + '" />'
        var copyFrom, body;
        copyFrom = document.createElement('textarea');
        copyFrom.textContent = text;
        body = document.getElementsByTagName('body')[0];
        body.appendChild(copyFrom);
        copyFrom.select();
        document.execCommand('copy');
        body.removeChild(copyFrom);
        NEKUI.KLNotify.success('复制成功')
    }
});
```
<!-- demo_end -->
