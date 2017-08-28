---
title: 确认提示
masonry: true
---

<!-- demo_start -->
### 基本形式
气泡弹框，主要用于备注或者更多信息提示。

<div class="m-example"></div>

```xml
<kl-pop-confirm content="Are you sure delete this task?">
    <kl-button  type="tertiary" title="删除"></kl-button>
</kl-pop-confirm>
```

```javascript
var component = new NEKUI.Component({
    template: template
});
```
<!-- demo_end -->

<!-- demo_start -->
### 配置属性content
设置气泡信息提示内容，一般为简单文本提示。

<div class="m-example"></div>

```xml
<kl-pop-confirm content="我是设置的气泡信息内容">
    <kl-button  type="tertiary" title="Content"></kl-button>
</kl-pop-confirm>
```

```javascript
var component = new NEKUI.Component({
    template: template
});
```
<!-- demo_end -->

<!-- demo_start -->
### 配置属性contentTemplate
气泡信息提示内容配置，可以自定义html格式

<div class="m-example">
    <style>
        .u-red-font {
            color: #f00;
        }
    </style> 
</div>

```xml
<kl-pop-confirm contentTemplate="<div><span class='u-red-font'>红色字体</span><span>普通字体</span></div>">
    <kl-button  type="tertiary" title="contentTemplate"></kl-button>
</kl-pop-confirm>
```

```javascript
var component = new NEKUI.Component({
    template: template
});
```
<!-- demo_end -->

<!-- demo_start -->
### 配置属性placement
气泡提示信息展示位置配置(箭头的位置)，取值有`top`、`topLeft`、`topRight`、`left`、`leftTop`、
`leftBottom`、`right`、`rightTop`、`rightBottom`、`bottom`、`bottomLeft`、
`bottomRight`。默认取值为`top`

<div class="m-example"></div>

```xml
<div class="g-row">
    <kl-pop-confirm content="kl-pop-confirm箭头的位置在中间" placement="top">
        <kl-button title="top" />
    </kl-pop-confirm>
    <kl-pop-confirm content="kl-pop-confirm箭头的位置在左边" placement="topLeft">
        <kl-button title="topLeft" />
    </kl-pop-confirm>
    <kl-pop-confirm content="kl-pop-confirm箭头的位置在右边" placement="topRight">
        <kl-button title="topRight" />
    </kl-pop-confirm>
</div>
<div class="g-row">
    <kl-pop-confirm content="kl-pop-confirm箭头的位置在中间" placement="left">
        <kl-button title="left" />
    </kl-pop-confirm>
    <kl-pop-confirm content="kl-pop-confirm箭头的位置在上边" placement="leftTop">
        <kl-button title="leftTop" />
    </kl-pop-confirm>
    <kl-pop-confirm content="kl-pop-confirm箭头的位置在下边" placement="leftBottom">
        <kl-button title="leftBottom" />
    </kl-pop-confirm>
</div>
<div class="g-row">
    <kl-pop-confirm content="kl-pop-confirm箭头的位置在中间" placement="right">
        <kl-button title="right" />
    </kl-pop-confirm>
    <kl-pop-confirm content="kl-pop-confirm箭头的位置在上边" placement="rightTop">
        <kl-button title="rightTop" />
    </kl-pop-confirm>
    <kl-pop-confirm content="kl-pop-confirm箭头的位置在下边" placement="rightBottom">
        <kl-button title="rightBottom" />
    </kl-pop-confirm>
</div>
<div class="g-row">
    <kl-pop-confirm content="kl-pop-confirm箭头的位置在中间" placement="bottom">
        <kl-button title="bottom" />
    </kl-pop-confirm>
    <kl-pop-confirm content="kl-pop-confirm箭头的位置在左边" placement="bottomLeft">
        <kl-button title="bottomLeft" />
    </kl-pop-confirm>
    <kl-pop-confirm content="kl-pop-confirm箭头的位置在右边" placement="bottomRight">
        <kl-button title="bottomRight" />
    </kl-pop-confirm>
</div>
```

```javascript
var component = new NEKUI.Component({
    template: template
});
```
<!-- demo_end -->



<!-- demo_start -->
### 配置属性hideWhenScroll
通过设置`hideWhenScroll`属性，控制window滚动时,是否隐藏`popover`,默认为false，不隐藏。

<div class="m-example"></div>

```xml
    <kl-pop-confirm content="拖动页面滚动看效果【弹出框会关闭】" hideWhenScroll="{true}" >
        <kl-button  type="tertiary" title="hideWhenScroll:true"></kl-button>
    </kl-pop-confirm>
    <kl-pop-confirm content="拖动页面滚动看效果【弹出框不会关闭】">
        <kl-button type="tertiary" title="hideWhenScroll:false"></kl-button>
    </kl-pop-confirm>
```

```javascript
var component = new NEKUI.Component({
    template: template
});
```
<!-- demo_end -->


<!-- demo_start -->
### 配置属性cancelText
设置气泡提示信息，取消按钮的文本提示，默认为`取消`

<div class="m-example"></div>

```xml
<kl-pop-confirm content="Are you sure delete this task?" cancelText="{'cancelText'}">
    <kl-button  type="tertiary" title="cancelText">cancelText</kl-button>
</kl-pop-confirm>
```

```javascript
var component = new NEKUI.Component({
    template: template
});
```
<!-- demo_end -->



<!-- demo_start -->
### 配置属性okText
设置气泡提示信息，OK按钮的文本提示，默认为`确定`

<div class="m-example"></div>

```xml
<kl-pop-confirm content="Are you sure delete this task?" okText="{'okText'}">
    <kl-button  type="tertiary" title="okText"></kl-button>
</kl-pop-confirm>
```

```javascript
var component = new NEKUI.Component({
    template: template
});
```
<!-- demo_end -->



<!-- demo_start -->
### ok方法
设置点击ok按钮调用的方法，默认会关闭提示框。通过`on-ok`绑定事件，可以通过`$event`传递消息事件对象。on-ok绑定方法调用之后会派发`ok`事件以及
参数`$event`{sender, data}其中sender为派发事件本身，data是相关数据

**手动设置方法之后，提示框不会自动关闭，需手动调用关闭事件`sender.destory()`**

<div class="m-example"></div>

```xml
<kl-pop-confirm contentTemplate="{testTemplate}" on-ok="{this.submit($event)}" okText="{'提交'}">
    <kl-button  type="tertiary" title="保存提交"></kl-button>
</kl-pop-confirm>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    config: function() {
        this.data.testTemplate = '<kl-textarea required showTip=false value={remark} height=50 />';
    },
    submit: function(evt) {
        if(evt.data.remark) {
            NEKUI.KLNotify.info(evt.data.remark)
        } else {
            NEKUI.KLNotify.info('ok按钮点击事件,内容为空');
        }
        // 手动关闭
        evt.sender.destroy();
    }
});
```
<!-- demo_end -->


<!-- demo_start -->
### cancel方法
设置点击cancel按钮调用的方法，默认会关闭提示框。通过`on-cancel`绑定事件，可以通过`$event`传递消息事件对象。
on-cancel绑定方法调用之后会派发`cancel`事件以及参数`$event`{sender, data}其中sender为派发事件本身，data是相关数据。

**手动设置方法之后，提示框不会自动关闭，需手动调用关闭事件**
<div class="m-example"></div>

```xml
<kl-pop-confirm contentTemplate="{testTemplate}" on-cancel="{this.reset($event)}" cancelText="{'重置'}">
    <kl-button  type="secondary" title="重置内容"></kl-button>
</kl-pop-confirm>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    config: function() {
        this.data.testTemplate = '<kl-textarea required showTip=false value={remark} height=50 />';
    },
    reset: function(evt) {
        evt.data.remark = '';
        // 手动关闭
        evt.sender.destroy();
    }
});
```
<!-- demo_end -->


