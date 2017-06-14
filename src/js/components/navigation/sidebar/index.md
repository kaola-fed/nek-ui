---
title: 菜单栏
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>
<style>
    .m-example {
        font-family:Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;
        overflow: hidden;
        padding: 0;
    }
    .demo-main {
        position:relative;
        height: 400px;
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
</style>
```xml

<div class="demo-main">
    <div class="demo-head">
        <img src="//haitao.nos.netease.com/2fecfadc7d48464b90c2fe9b5d92412a.svg" width="34px" height="34px" style="margin-right:9px;" />
        NEKUI系统
    </div>
    <ui.sidebar menus={menus} bodyEl="j-body" />
    <div id="j-body" class="demo-body">
        <ui.card title="标题">
            content
        </ui.card>
    </div>
</div>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        menus: [{
         title: '一级菜单A',
         children: [{
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
