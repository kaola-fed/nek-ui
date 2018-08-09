---
title: 布局容器
new: true
---

<!-- demo_start -->
### 基本形式-1
用于页面的布局的容器，关于布局定义了以下组件：
`<kl-layout>` 布局容器,`<kl-main>` 主页面, `<kl-aside>` 侧边栏, `<kl-header>` 头部, `<kl-footer>` 尾部。

<div class="m-example m-example-1"></div>
<style>
    .m-example { overflow: hidden; }
    .m-example .kl-main { line-height: 160px; }
    .m-example-1 .kl-header, .m-example-1 .kl-footer, .m-example-2 .kl-header, .m-example-2 .kl-footer, .m-example-3 .kl-header, .m-example-3 .kl-footer { background: #ccc; color: #666; }
    .m-example .kl-header, .m-example .kl-footer, .m-example .kl-main { text-align: center; }
</style>

```xml
<kl-layout>
    <kl-header>Header</kl-header>
    <kl-main>Main</kl-main>
    <kl-footer>Footer</kl-footer>
</kl-layout>
```

<!-- demo_end -->

<!-- demo_start -->
### 基本形式-2

<div class="m-example m-example-2"></div>
<style>
    .m-example .kl-main { line-height: 160px; }
    .m-example-2 .kl-aside { line-height: 200px; }
</style>

```xml
<kl-layout>
    <kl-header>Header</kl-header>
    <kl-layout>
        <kl-aside>Aside</kl-aside>
        <kl-main isMaster={true}>Main</kl-main>
    </kl-layout>
</kl-layout>
```

<!-- demo_end -->

<!-- demo_start -->
### 基本形式-3

<div class="m-example m-example-3"></div>
<style>
    .m-example .kl-main { line-height: 160px; }
    .m-example-3 .kl-aside { line-height: 320px; }
    .m-example-2 .kl-aside, .m-example-3 .kl-aside {
        text-align: center;
    }
</style>

```xml
<kl-layout>
    <kl-aside>Aside</kl-aside>
    <kl-layout isMaster={true}>
        <kl-header>Header</kl-header>
        <kl-main>Main</kl-main>
        <kl-footer>Footer</kl-footer>
    </kl-layout>
</kl-layout>
```

<!-- demo_end -->

<!-- demo_start -->
### 项目样例

<div class="m-example m-example-4"></div>
<style>
    .m-example .kl-main { line-height: 160px; }
    .m-example-4 .kl-aside {
        position:relative;
        height: 500px;
        background: #eaedf3;
    }
    .demo-main {
        position:relative;
        height: 500px;
        background: #eaedf3;
    }
    .demo-head {
        box-sizing: border-box;
        height: 60px;
        background: #22354a;
        padding: 13px 30px;
        font-size: 18px;
        color: #fff;
    }

    .grid-item .kl-menu { padding: 0; }
</style>

```xml
<kl-layout>
    <kl-header>Header</kl-header>
    <kl-layout>
        <kl-aside>
            <kl-sidebar top="0px" menus={menus} uniqueOpened={false} width="200px" />
        </kl-aside>
        <kl-main isMaster={true}>Main</kl-main>
    </kl-layout>
</kl-layout>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
      menus: [{
       title: '首页',
       iconClass: 'icon icon-home'
      }, {
       title: '库存管理',
       open: true,
       iconClass: 'icon icon-inventory',
       children: [{
         open: true,
         title: '商品实时数据',
         url: '/'
       },{
         title: '单据审核',
         url: '/'
       }]
     }, {
       title: '财务管理',
       iconClass: 'icon icon-financial',
       children: [{
         title: '对账管理',
         url: '/'
       },{
         title: '请款管理',
         url: '/'
       }]
     }, {
        title: '统计数据',
        iconClass: 'icon icon-statistics'
     }, {
        title: '订单管理',
        iconClass: 'icon icon-order'
     }, {
        title: '消息管理',
        iconClass: 'icon icon-message'
     }]
   }
});
```

<!-- demo_end -->
