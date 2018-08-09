---
title: 菜单栏
---

<!-- demo_start -->
### 基本形式
`KLSidebar`只是对`KLMenu`的进一步封装,如果无法满足需求,可直接使用`KLMenu`组件; 除了`KLMenu`的功能外, 需要注意的是，原来的菜单展开/收起的功能, 移至KLAside组件; 注意:如果是单页,需要额外配置router属性,并将页面链接的`url属性`改为`route属性`;

<div class="m-example"></div>
<style>
    .m-example {
        font-family:Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;
        overflow: hidden;
        padding: 0;
    }
    .demo-main {
        position:relative;
        height: 500px;
        background: #F0F2F5;
    }
    .demo-head {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        height: 48px;
        background: #222;
        padding: 13px 24px;
        font-size: 16px;
        color: #fff;
    }
    .demo-body {
        position: absolute;
        left: 216px;
        top: 64px;
        bottom: 0;
        right: 16px;
        background: #fff;
    }
    .grid-item .kl-menu { padding: 0; }
</style>
```xml

<div class="demo-main">
    <div class="demo-head">
        <img src="//haitao.nos.netease.com/3d439da1-354c-4cec-98ee-259cac496b59.svg" width="28px" height="28px" style="margin-right:9px;" />
        考拉UI系统
    </div>
    <kl-sidebar top="48px" menus={menus} bodyEl="j-body" width="200px" />
    <div id="j-body" class="demo-body"></div>
</div>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
       menus: [{
        title: '首页',
        iconClass: 'icon icon-home',
        children: [{
           title: '商品实时数据',
           url: '/',
           target: '_blank'
        },{
           title: '单据审核',
           url: '/'
        }]
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
         iconClass: 'icon icon-statistics',
         children: [{
           title: '商品实时数据',
           url: '/'
         },{
           title: '单据审核',
           url: '/'
         }]
      }, {
         title: '订单管理',
         iconClass: 'icon icon-order',
         children: [{
           title: '商品实时数据',
           url: '/'
         },{
           title: '单据审核',
           url: '/'
         }]
      }]
   }
});
```
<!-- demo_end -->

<!-- demo_start -->

### 可搜索

<div class="m-example"></div>

```xml

<div class="demo-main">
    <div class="demo-head">
        <img src="//haitao.nos.netease.com/3d439da1-354c-4cec-98ee-259cac496b59.svg" width="28px" height="28px" style="margin-right:9px;" />
        考拉UI系统
    </div>
    <kl-sidebar top="48px" menus={menus} uniqueOpened={true} bodyEl="j-body" width="200px" searchable />
    <div id="j-body" class="demo-body"></div>
</div>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        menus: [{
         title: '首页',
         iconClass: 'icon icon-home',
         children: [{
            title: '商品实时数据',
            url: '/'
         },{
            title: '单据审核',
            url: '/'
         }]
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
          iconClass: 'icon icon-statistics',
          children: [{
            title: '商品实时数据',
            url: '/'
          },{
            title: '单据审核',
            url: '/'
          }]
       }, {
          title: '订单管理',
          iconClass: 'icon icon-order',
          children: [{
            title: '商品实时数据',
            url: '/'
          },{
            title: '单据审核',
            url: '/'
          }]
       }]
   }
});
```
<!-- demo_end -->

<!-- demo_start -->

### 显示待办数量

<div class="m-example"></div>

```xml

<div class="demo-main">
    <div class="demo-head">
        <img src="//haitao.nos.netease.com/3d439da1-354c-4cec-98ee-259cac496b59.svg" width="28px" height="28px" style="margin-right:9px;" />
        考拉UI系统
    </div>
    <kl-sidebar top="48px" menus={menus} uniqueOpened={true} bodyEl="j-body" width="200px" searchable />
    <div id="j-body" class="demo-body"></div>
</div>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        menus: [{
         title: '首页',
         iconClass: 'icon icon-home',
         children: [{
            title: '商品实时数据',
            url: '/'
         },{
            title: '单据审核',
            url: '/'
         }]
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
          iconClass: 'icon icon-statistics',
          children: [{
            title: '商品实时数据',
            url: '/'
          },{
            title: '单据审核',
            url: '/'
          }]
       }, {
          title: '订单管理',
          iconClass: 'icon icon-order',
          children: [{
            title: '商品实时数据',
            url: '/'
          },{
            title: '单据审核',
            url: '/'
          }]
       }]
   }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 主题配置
`KLSidebar`目前支持light和dark两种主题的配置。

<div class="m-example"></div>

```xml

<div class="demo-main">
    <div class="demo-head">
        <img src="//haitao.nos.netease.com/3d439da1-354c-4cec-98ee-259cac496b59.svg" width="28px" height="28px" style="margin-right:9px;" />
        考拉UI系统
    </div>
    <kl-sidebar top="48px" theme="dark" menus={menus} uniqueOpened={false} bodyEl="j-body" width="200px" />
    <div id="j-body" class="demo-body"></div>
</div>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        menus: [{
         title: '首页',
         iconClass: 'icon icon-home',
         children: [{
            title: '商品实时数据',
            url: '/'
         },{
            title: '单据审核',
            url: '/'
         }]
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
          iconClass: 'icon icon-statistics',
          children: [{
            title: '商品实时数据',
            url: '/'
          },{
            title: '单据审核',
            url: '/'
          }]
       }, {
          title: '订单管理',
          iconClass: 'icon icon-order',
          children: [{
            title: '商品实时数据',
            url: '/'
          },{
            title: '单据审核',
            url: '/'
          }]
       }]
   }
});
```
<!-- demo_end -->