---
title: 进度条
is_beta: true
---

## 代码演示

### 基本形式
<!-- demo_start -->
<div class="m-example"></div>
<style>
.u-progress {
    margin-bottom: 10px;
    width: 500px;
}
</style>

```xml
<jr-progress  percent="10" width=200 height=20 state="info" />
<jr-progress  percent="30" width=300 height=30 state="success" />
<jr-progress  percent="75" width=500 height=40 state="warning" />
<jr-progress  percent="100" width=400 height=20 state="error" />
```

```javascript
var component = new JRUI.Component({
    template: template
});
```
<!-- demo_end -->


### 带有条纹以及条纹动画
<!-- demo_start -->
<div class="m-example"></div>

<style>
.u-progress {
    margin-bottom: 10px;
    width: 500px;
}
</style>

```xml
<jr-progress  percent="10" state="info" striped />
<jr-progress  percent="30" state="success" striped/>
<jr-progress  percent="75" state="warning" striped active/>
<jr-progress  percent="100" state="error" striped active/>
```

```javascript
var component = new JRUI.Component({
    template: template
});
```
<!-- demo_end -->