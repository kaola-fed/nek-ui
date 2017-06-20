---
title: 图标
is_beta: true
---

使用字体图标，可以很方便地在任何位置放置矢量图形。本主题的部分字体图标由[Font Awesome](http://fortawesome.github.com/Font-Awesome)提供。

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<kl-icon type="home2" />
```
<!-- demo_end -->

### 设置icon大小和颜色

<!-- demo_start -->
<div class="m-example"></div>

```xml
<kl-icon type="home2" color="#E31436" fontSize="20" />
```
<!-- demo_end -->

### 图标列表（点击图标按钮复制图标代码，下放代码请先忽视）

<!-- demo_start -->
<div class="m-example"></div>

```xml
<kl-icon fontSize=20 type="warning" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="edit" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="info" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="error" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="success" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="chevron_left" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="chevron_right" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="search" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="ok" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="check_empty" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="angle_down" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="add" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="success2" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="error2" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="warning2" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="info2" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="calendar" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="line" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="download" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="trash" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="upload" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="plus" on-click={this.copy($event)} />
<kl-icon fontSize=20 type="home2" on-click={this.copy($event)} />
```
```javascript
var component = new NEKUI.Component({
    template: template,
    copy: function(e) {
        var type = e.target.className.trim();
        type = type.slice(14)
        var text = '<kl-icon type="' + type + '" />'
        var copyFrom, body;
        copyFrom = document.createElement('textarea');
        copyFrom.textContent = text;
        body = document.getElementsByTagName('body')[0];
        body.appendChild(copyFrom);
        copyFrom.select();
        document.execCommand('copy');
        body.removeChild(copyFrom);
        NEKUI.Notify.success(text + '复制成功')
    }
});
```

<!-- demo_end -->