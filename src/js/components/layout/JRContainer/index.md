---
title: 容器布局
is_new: true
---

## 代码演示

### 上中下

<!-- demo_start -->
<div class="m-example"></div>

<style>
.header,.footer {
   background:#3cd088;
   color:#fff;
}
.aside{
    background:#8fd088;
    color:#fff;
}
</style>


```xml
     <jr-container>
         <jr-header class='header' height='30'>上</jr-header>
         <jr-main >中</jr-main>
         <jr-footer height='30' class='header'>下</jr-footer>
     </jr-container>

```

```javascript
var component = new JRUI.Component({
    template: template
});
```
<!-- demo_end -->


### 左中右

<!-- demo_start -->
<div class="m-example"></div>

```xml
     <jr-container  direction="row">
         <jr-aside class='aside' width='40'>左</jr-aside>
         <jr-main >中</jr-main>
         <jr-aside class='aside' width='40'>右</jr-aside>
     </jr-container>

```

```javascript
var component = new JRUI.Component({
    template: template
});
```
<!-- demo_end -->

### 混搭

<!-- demo_start -->
<div class="m-example"></div>

```xml
    <jr-container >
         <jr-header height='30' class='header'>上</jr-header>
         <jr-container direction="row">
            <jr-aside class='aside' width='40'>左</jr-aside>
            <jr-main >中</jr-main>
            <jr-aside class='aside'  width='40'>右</jr-aside>
         </jr-container>
         <jr-footer height='30' class='header'>下</jr-footer>
     </jr-container>
```

```javascript
var component = new JRUI.Component({
    template: template
});
```
<!-- demo_end -->
