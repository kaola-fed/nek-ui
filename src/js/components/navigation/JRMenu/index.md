---
title: 两级菜单
is_beta: true
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div style="width:180px;">
  <jr-menu>
    <jr-menu-sub title="第一级菜单">
      <jr-menu-item title="二级菜单A"></jr-menu-item>
      <jr-menu-item><a href="/">二级菜单B</a></jr-menu-item>
    </jr-menu-sub>
    <jr-menu-sub title="第一级菜单" icon={true}>
      <jr-menu-item title="二级菜单A"></jr-menu-item>
      <jr-menu-item>二级菜单B</jr-menu-item>
    </jr-menu-sub>
    <jr-menu-sub titleTemplate="<a>第三级菜单</a>"></jr-menu-sub>
  </jr-menu>
</div>
```
<!-- demo_end -->

### 通过配置数据渲染菜单

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div style="width:180px;">
  <jr-menu uniqueOpened="{uniqueOpened}">
    {#list menus as menu}
    {#if menu.children && menu.children.length}
    <jr-menu-sub title="{menu.title}" defaultOpen="{menu.open}">
      {#list menu.children as page}
      <jr-menu-item isCurrent="{page.open}" url="{page.url}">{page.title}</jr-menu-item>
      {/list}
    </jr-menu-sub>
    {#else}
    <jr-menu-sub titleTemplate="<a href='{menu.url}'>{menu.title}</a>"></jr-menu-sub>
    {/if}
    {/list}
  </jr-menu>
</div>
```

```javascript
var component = new JRUI.Component({
    template: template,
    data: {
        menus: [{
         title: '一级菜单A',
         open: true,
         children: [{
           open: true,
           title: '二级菜单A',
           url: '/'
         },{
           title: '二级菜单B',
           url: '/'
         }]
       }, {
         title: '一级菜单B',
         children: [{
           title: '二级菜单A',
           url: '/'
         },{
           title: '二级菜单B',
           url: '/'
         }]
       }]
    }
});
```
<!-- demo_end -->