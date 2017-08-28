---
title: 遮罩弹框
masonry: true
---

<!-- demo_start -->
### 基本形式
弹出一个遮罩，覆盖页面，禁止执行其他操作。通过`content`属性设置内容，内容可以是HTML片段，也可以是普通文本
<div class="m-example"></div>

```xml
 <kl-button type="tertiary" on-click="{this.show()}" title="打开遮罩框" />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    show: function() {
        var modal = new NEKUI.KLMask({
            data: {
                content: '<h1>我是HTML内容区域</h1>我是普通文本内容'
            }
        });
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 配置属性之closable
通过配置`closable`属性控制点击非内容区域是否可关闭遮罩框，值为`true`(可关闭)/`false`(不可)
<div class="m-example"></div>

```xml
<kl-button type="tertiary" on-click="{this.show(true)}" title="点击非HTML内容关闭" />
<kl-button type="tertiary" on-click="{this.show(false)}" title="点击非HTML内容不会自动关闭" />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    show: function(val) {
        var closable = val;
        var modal = new NEKUI.KLMask({
            data: {
                content: '<div>点我哦，我是HTML内容区域</div>点我吧！我是普通文本内容',
                closable: closable
            }
        });
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 配置属性之class
通过配置`class`属性给遮罩框添加样式
<div class="m-example">
   <style>
        .u-bg-red {
            background: rgba(225, 230, 236, 0.4);
        }
        .u-bg-red > div {
            color: #e96900;
        }
    </style>
</div>

```xml
<kl-button type="tertiary" on-click="{this.show()}" title="设置class" />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    show: function() {
        var modal = new NEKUI.KLMask({
            data: {
                content: '<div>我的字体是橘色的</div>',
                class: 'u-bg-red'
            }
        });
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### close方法
关闭遮罩框，同时在关闭后派发`close`事件，通过`$on('close', callback)`的方式监听
<div class="m-example"></div>

```xml
<kl-button type="tertiary" on-click="{this.show()}" title="close事件" />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    show: function() {
        var modal = new NEKUI.KLMask({
            data: {
                content: '<div>我的背景是黑色的，字体是白色的</div>'
            }
        });
        setTimeout(function(){
            // 调用close方法
            modal.close({msg: '经过3秒关闭遮罩框!'});
        }, 3000)
        // 监听close事件
        modal.$on('close', function(data){
            NEKUI.KLNotify.success(data.data && data.data.msg || 'close事件');
        });
    }
});
```
<!-- demo_end -->