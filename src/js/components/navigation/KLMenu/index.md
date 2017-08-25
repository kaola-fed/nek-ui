---
title: 导航菜单
masonry: true
---

<!-- demo_start -->
### 基本形式
一个完整的Menu由`kl-menu`, `kl-menu-sub`, `kl-menu-item`组合构成; `kl-menu`只支持两级菜单, `kl-menu-sub`是菜单的第一级, 它可以通过`kl-menu-item`实现对应的子菜单,也可以独立作为没有子菜单的一级菜单

* `KLMenuSub`: 可以根据url, iconClass, title, titleTemplate属性定制一级菜单的显示
* `KLMenuItem`: 可以直接使用url属性, 替换自己实现的a链接标签

<div class="m-example"></div>

```xml
<kl-row>
    <kl-col span=4>
        <div style="width:180px;">
          <kl-menu>
            <kl-menu-sub titleTemplate="<a href='/'>首页</a>"></kl-menu-sub>
            <kl-menu-sub title="库存管理">
              <kl-menu-item title="商品实时数据"></kl-menu-item>
              <kl-menu-item><a href="/">单据审核</a></kl-menu-item>
            </kl-menu-sub>
            <kl-menu-sub title="财务管理">
              <kl-menu-item title="对账管理"></kl-menu-item>
              <kl-menu-item url="/">请款管理</kl-menu-item>
            </kl-menu-sub>
            <kl-menu-sub titleTemplate="<a>统计数据</a>"></kl-menu-sub>
            <kl-menu-sub titleTemplate="<a>订单管理</a>"></kl-menu-sub>
            <kl-menu-sub titleTemplate="<a>消息管理</a>"></kl-menu-sub>
          </kl-menu>
        </div>
    </kl-col>

    <kl-col span=4>
        <div style="width:180px;">
          <kl-menu>
            <kl-menu-sub title="首页" url="/" iconClass="icon icon-home"></kl-menu-sub>
            <kl-menu-sub title="库存管理" iconClass="icon icon-inventory">
              <kl-menu-item title="商品实时数据"></kl-menu-item>
              <kl-menu-item><a href="/">单据审核</a></kl-menu-item>
            </kl-menu-sub>
            <kl-menu-sub title="财务管理" iconClass="icon icon-financial">
              <kl-menu-item title="对账管理"></kl-menu-item>
              <kl-menu-item url="/">请款管理</kl-menu-item>
            </kl-menu-sub>
            <kl-menu-sub iconClass="icon icon-statistics" titleTemplate="<a>统计数据</a>"></kl-menu-sub>
            <kl-menu-sub iconClass="icon icon-order" titleTemplate="<a>订单管理</a>"></kl-menu-sub>
            <kl-menu-sub iconClass="icon icon-message" titleTemplate="<a>消息管理</a>"></kl-menu-sub>
          </kl-menu>
        </div>
    </kl-col>
</kl-row>
```
<!-- demo_end -->

<!-- demo_start -->
### 通过配置数据渲染菜单
一般情况下, 菜单都是根据后端配置的数据生成, 这种情况下, 可以加入一些简单的逻辑实现这种动态数据的菜单

<div class="m-example"></div>

```xml
<kl-row>
    <kl-col span=4>
        <div style="width:180px;">
          <kl-menu uniqueOpened="{uniqueOpened}">
            {#list menus as menu}
            {#if menu.children && menu.children.length}
            <kl-menu-sub title="{menu.title}" defaultOpen="{menu.open}">
              {#list menu.children as page}
              <kl-menu-item isCurrent="{page.open}" url="{page.url}">{page.title}</kl-menu-item>
              {/list}
            </kl-menu-sub>
            {#else}
            <kl-menu-sub titleTemplate="<a href='{menu.url}'>{menu.title}</a>"></kl-menu-sub>
            {/if}
            {/list}
          </kl-menu>
        </div>
    </kl-col>

    <kl-col span=4>
        <div style="width:180px;">
          <kl-menu uniqueOpened="{uniqueOpened}">
            {#list menus as menu}
            {#if menu.children && menu.children.length}
            <kl-menu-sub title="{menu.title}" defaultOpen="{menu.open}" iconClass="icon {this.getIconClass(menu.key)}">
              {#list menu.children as page}
              <kl-menu-item isCurrent="{page.open}" url="{page.url}">{page.title}</kl-menu-item>
              {/list}
            </kl-menu-sub>
            {#else}
            <kl-menu-sub iconClass="icon {this.getIconClass(menu.key)}" titleTemplate="<a href='{menu.url}'>{menu.title}</a>"></kl-menu-sub>
            {/if}
            {/list}
          </kl-menu>
        </div>
    </kl-col>
</kl-row>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        menus: [{
         title: '首页',
         key: 'home'
        }, {
         title: '库存管理',
         open: true,
         key: 'inventory',
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
         key: 'financial',
         children: [{
           title: '对账管理',
           url: '/'
         },{
           title: '请款管理',
           url: '/'
         }]
       }, {
          title: '统计数据',
          key: 'statistics'
       }, {
          title: '订单管理',
          key: 'order'
       }, {
          title: '消息管理',
          key: 'message'
       }]
    },
    getIconClass: function(key) {
       return 'icon-' + key;
    }
});
```
<!-- demo_end -->