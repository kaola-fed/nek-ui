---
title: 菜单栏
is_beta: true
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
        left: 200px;
        top: 60px;
        bottom: 0;
        right: 0;
        padding: 10px 13px;
    }
</style>
```xml

<div class="demo-main">
    <div class="demo-head">
        JRUI系统
    </div>
    <jr-sidebar uniqueOpened={uniqueOpened} menus={menus} bodyEl="j-body" ref='slider'/>
    <div id="j-body" class="demo-body">
        <jr-card title="标题">
            content
        </jr-card>
    </div>
</div>
 <div>
     <jr-button class='primary' on-click={this.toggle()} title='{title}'/>
     <jr-button class='primary' on-click={this.selecteItem('#A')} title='菜单A'/>
     <jr-button class='primary' on-click={this.selecteItem('#B')} title='菜单B'/>
     <jr-button class='primary' on-click={this.selecteItem('#C')} title='菜单C'/>
     <jr-button class='primary' on-click={this.selecteItem('#D')} title='菜单D'/>
 </div>
```

```javascript
var component = new JRUI.Component({
    template: template,
    data: {
        uniqueOpened:true,
        title:'不收起其他菜单',
        menus: [{
         title: '一级菜单A',
         open: true,
         children: [{
           title: '二级菜单A',
           url: '#A'
         },{
           title: '二级菜单B',
           open:true,
           url: '#B'
         }]
       }, {
         title: '一级菜单B',
         children: [{
           title: '二级菜单C',
           url: '#C'
         },{
           title: '二级菜单D',
           url: '#D'
         }]
       }]
    },
    selecteItem(item){
       this.$refs.slider.selecteItem(item)
    },
    toggle(){
        this.data.uniqueOpened=!this.data.uniqueOpened;
        this.data.title=this.data.uniqueOpened ? '不收起其他菜单':'收起其他菜单';
    }
});
```
<!-- demo_end -->
