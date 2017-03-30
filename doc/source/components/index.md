---
title: 快速上手
type: components
order: 0
---



### nek-ui
nek-ui 是一个基于 Regularjs 的组件库  
#### 引入 nek-ui
```
npm i nek-ui -S
```
```
import NEKUI from 'nek-ui'
import 'node_modules/nek-ui/dist/css/nek-ui.min.css'
```
或者直接在需要引入的页面上 
```
<link rel="stylesheet" href="//unpkg-kl.com/nek-ui/dist/css/nek-ui.default.min.css">
<script type="text/javascript" src="//unpkg-kl.com/nek-ui/dist/vendor/regular.min.js"></script>
<script type="text/javascript" src="//unpkg-kl.com/nek-ui/dist/js/nek-ui.min.js"></script>
```

以这种内嵌 script 方式引入的时候 NEKUI 会自动挂在 window 上
#### 使用 nek-ui
由于使用 NEIUI 的组件需要先注册，我们可以在工程里面的 BaseComponent 里面使用 NKEIUI 暴露出来的一个 install 方法来将组件注册到 BaseComponent 上，这样继承自 BaseComponent 的组件就可以直接在模板里面使用组件了。    
```
import { install } from 'nek-ui';
import Regular from 'regularjs';

const BaseComponent = Regular.extend({
    install(Regular);
});
```
如果不想将 NEKUI 的组件全部注册到全局上，或者是自己已有的组件和 NEKUI 里面的组件命名冲突，也可以手动的注册想要使用的组件到 regular 实例上  
` var Component = BaseComponent.extend({}).component('tooltip', NEKUI.Tooltip) `  
#### 如何使用 nek-ui
表单部分用 `<ui.form>  <ui.form/>` 将表单控件包裹起来  
组件的默认宽度一般都是100%，所以可以用`<form.item cols=x></form.item>`将表单项（文字加组件）包裹起来，`cols`的值是类似`bootstrap`的栅格，一共分成了12格  
<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.form>
    <form.item cols="6" title="用户名" tip="优先输入国内邮箱" required>
        <ui.input type="email" placeholder="请输入用户名" />
    </form.item>
    <form.item cols="6" title="密码">
        <ui.input type="password" placeholder="请输入密码" />
    </form.item>
</ui.form>
```
<!-- demo_end -->  

详情见[表单项](/components/form_form.item_.html)  


### NEK Server
[github](https://github.com/kaola-fed/NEK/blob/master/README.md)  


{% raw %}
<script>
var index = 0;

    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<ui.form>
    <form.item cols="6" title="用户名" tip="优先输入国内邮箱" required>
        <ui.input type="email" placeholder="请输入用户名" />
    </form.item>
    <form.item cols="6" title="密码">
        <ui.input type="password" placeholder="请输入密码" />
    </form.item>
</ui.form>

      */});
      var component = new NEKUI.Component({template: template});
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
</script>
{% endraw %}