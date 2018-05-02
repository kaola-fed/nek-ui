---
title: 菜单栏
---

<!-- demo_start -->
### 基本形式
`KLSidebar`只是对`KLMenu`的进一步封装,如果无法满足需求,可直接使用`KLMenu`组件; 除了`KLMenu`的功能外, 还增加菜单展开/收起的功能, 注意需要配置`bodyEl`属性; 注意:如果是单页,需要额外配置router属性,并将页面链接的`url属性`改为`route属性`;
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
    .demo-body {
        position: absolute;
        left: 180px;
        top: 60px;
        bottom: 0;
        right: 0;
        padding: 10px 13px;
    }
    .grid-item .kl-menu { padding: 0; }
</style>
```xml

<div class="demo-main">
    <div class="demo-head">
        <img src="//haitao.nos.netease.com/2fecfadc7d48464b90c2fe9b5d92412a.svg" width="34px" height="34px" style="margin-right:9px;" />
        考拉UI系统
    </div>
    <kl-sidebar menus={menus} bodyEl="j-body" width="200px" />
    <div id="j-body" class="demo-body"></div>
</div>
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
