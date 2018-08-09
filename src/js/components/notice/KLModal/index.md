---
title: 模态框
masonry: true
---

<!-- demo_start -->
### 基本形式
含有遮罩层的对话框，用于模拟浏览器的`alert`、`confirm`和`prompt`。

模态对话框通过遮罩层来阻止用户的其他行为。

<div class="m-example"></div>

```xml
<kl-button on-click="{this.show()}"  title="Modal"/>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    show: function() {
        // 打开一个Modal
        var modal = new NEKUI.KLModal({
            data: {
                content: 'Modal内容'
            }
        });
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 配置要嵌入的父级元素

设置modal嵌入的父级元素，默认为document.body

<div class="m-example"></div>

```xml
<kl-button on-click="{this.show()}"  title="el: main"/>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    show: function() {
        // 打开一个Modal，inject到#main元素里
        var modal = new NEKUI.KLModal({
            data: {
                content: 'Modal内容',
                el: '#main'
            }
        });
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 配置信息title

设置打开modal的标题，默认显示`notice`

<div class="m-example"></div>

```xml
<kl-button on-click="{this.show()}"  title="Title"/>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    show: function() {
        var modal = new NEKUI.KLModal({
            data: {
                title: '我是自定义title',
            }
        });
    }
});
```
<!-- demo_end -->


<!-- demo_start -->
### 配置信息content
设置modal的内容显示区域(纯文本)。默认为空。
<div class="m-example"></div>

```xml
<kl-button on-click="{this.show()}"  title="content"/>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    show: function() {
        var modal = new NEKUI.KLModal({
            data: {
                content: 'Modal的自定义文本内容'
            }
        });
    }
});
```
<!-- demo_end -->


<!-- demo_start -->
### 配置信息contentTemplate
设置modal的内容显示区域(html代码片段)。默认为空
<div class="m-example">
    <style>
        .template_label {
            line-height: 32px;
            display: inline-block;
        }
    </style>
</div>

```xml
<kl-button on-click="{this.show()}"  title="contentTemplate"/>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    show: function() {
        var modal = new NEKUI.KLModal({
            data: {

                name: 'Rabbit',
                contentTemplate: '<kl-row>\
                                    <kl-col span=2><span class="template_label">标题</span></kl-col>\
                                    <kl-col span=10><kl-input placeholder="请输入"/></kl-col>\
                                  </kl-row>\
                                  <kl-row>\
                                    <kl-col span=2><span class="template_label">描述</span></kl-col>\
                                    <kl-col span=10><kl-textarea placeholder="请至少输入五个字符" /></kl-col>\
                                  </kl-row>',
                cancelButton: true
            }
        });
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 配置信息footerTemplate
设置modal的footer显示区域(html代码片段)。默认`onfirm`和`Cancel`按钮
<div class="m-example"></div>


```xml
<kl-button on-click="{this.show()}"  title="footerTemplate"/>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    show: function() {
        var modal = new NEKUI.KLModal({
            data: {

                name: 'Rabbit',
                content: '自定义footer',
                footerTemplate: '<kl-row><kl-col span=6><kl-button title="提交" type="primary" /></kl-col><kl-col span=6><kl-button title="撤销" /></kl-col></kl-row>'
            }
        });
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 配置信息okDisabled
是否禁用footer中原生Confirm按钮，true表示是，false表示否。默认为false
<div class="m-example"></div>

```xml
<kl-button on-click="{this.show(true)}"  title="okDisabled: true"/>
<kl-button on-click="{this.show(false)}"  title="okDisabled: false"/>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    show: function(okDisabled) {
        var modal = new NEKUI.KLModal({
            data: {

                okDisabled: okDisabled,
                content: 'okDisabled设置为' + okDisabled,
            }
        });
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 配置信息cancelDisabled
是否禁用footer中原生Cancel按钮，true表示是，false表示否，该属性需要与cancelButton属性配合使用。默认为false。
<div class="m-example"></div>

```xml
<kl-button on-click="{this.show(true)}"  title="cancelDisabled: true"/>
<kl-button on-click="{this.show(false)}"  title="cancelDisabled: false"/>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    show: function(cancelDisabled) {
        var modal = new NEKUI.KLModal({
            data: {

                cancelDisabled: cancelDisabled,
                cancelButton: true,
                content: 'cancelDisabled设置为' + cancelDisabled,
            }
        });
    }
});
```
<!-- demo_end -->


<!-- demo_start -->
### 配置信息hasFooter

是否显示Modal的footer部分，true表示显示，false表示不显示，默认为true。
<div class="m-example"></div>

```xml
<kl-button on-click="{this.show(true)}"  title="hasFooter: true"/>
<kl-button on-click="{this.show(false)}"  title="hasFooter: false"/>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    show: function(hasFooter) {
        var modal = new NEKUI.KLModal({
            data: {

                hasFooter: hasFooter,
                content: 'hasFooter设置为' + hasFooter,
            }
        });
    }
});
```
<!-- demo_end -->



<!-- demo_start -->
### 配置信息isCanClose

设置是否可关闭Modal(显示关闭图标),默认为true，可关闭。

<div class="m-example"></div>

```xml
<kl-button on-click="{this.show(true)}"  title="isCanClose: true"/>
<kl-button on-click="{this.show(false)}"  title="isCanClose: false"/>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    show: function(isCanClose) {
        var modal = new NEKUI.KLModal({
            data: {

                isCanClose: isCanClose,
                content: 'isCanClose设置为' + isCanClose,
            }
        });
        modal.$on('ok', function(res){
           console.log(res);
        });
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 配置信息okButton
设置`okButton`按钮是否显示`true`(显示)/`false`(不显示)，也可以设置显示文本(设置字符串)，设置默认为`Confirm`
<div class="m-example"></div>

```xml
<kl-button on-click="{this.show('确认')}"  title="okButton: '确认'" />
<kl-button on-click="{this.show(true)}"  title="okButton: true" />
<kl-button on-click="{this.show(false)}"  title="okButton: false" />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    show: function(okButton) {
        var modal = new NEKUI.KLModal({
            data: {

                okButton: okButton,
                content: '设置okButton的值',
            }
        });
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 配置信息cancelButton
设置`cancelButton`按钮是否显示`true`(显示)/`false`(不显示)，也可以设置显示文本(设置字符串)，默认文本`Cancel`且不显示
<div class="m-example"></div>

```xml
<kl-button on-click="{this.show('取消')}"  title="cancelButton: '取消'" />
<kl-button on-click="{this.show(true)}"  title="cancelButton: true" />
<kl-button on-click="{this.show(false)}"  title="cancelButton: false" />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    show: function(cancelButton) {
        var modal = new NEKUI.KLModal({
            data: {

                cancelButton: cancelButton,
                content: '设置cancelButton'
            }
        });
    }
});
```
<!-- demo_end -->


<!-- demo_start -->
### 配置信息class

设置自定义Modal样式。

<div class="m-example">
    <style>
        .u-modal-red {
            color: #F00;
        }
    </style>
</div>

```xml
<kl-button on-click="{this.show()}"  title="cancelButton" />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    show: function() {
        var modal = new NEKUI.KLModal({
            data: {

                cancelButton: true,
                content: '设置自定义样式',
                class: 'u-modal-red',
            }
        });
    }
});
```
<!-- demo_end -->


<!-- demo_start -->
### 配置信息noClose
点击ok按钮的时候是否自动关闭Modal，默认为true。
<div class="m-example"></div>

```xml
<kl-button on-click="{this.show(true)}"  title="noClose: true" />
<kl-button on-click="{this.show(false)}"  title="noClose: false" />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    show: function(noClose) {
        var modal = new NEKUI.KLModal({
            data: {

                noClose: noClose,
                content: '设置noClose:' + noClose,
            }
        });
    }
});
```
<!-- demo_end -->


<!-- demo_start -->

### 配置信息minHeight
设置Modal的最小显示高度，默认随内容变化。

**备注：只有同时配置maxHeight该属性才会生效**
<div class="m-example"></div>

```xml
<kl-button on-click="{this.show()}"  title="minHeight: 不设置" />
<kl-button on-click="{this.show(300)}"  title="minHeight: 300" />
<kl-button on-click="{this.show(600)}"  title="minHeight: 600" />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    show: function(minHeight) {
        var data = {
            cancelButton: true,
            contentTemplate: '<div style="height: 400px;border: 2px dotted #ddd;"></div>',
        };
        if(minHeight) {
            data.minHeight = minHeight;
            data.maxHeight = 350;
        }
        var modal = new NEKUI.KLModal({
            data: data
        });
    }
});
```
<!-- demo_end -->

<!-- demo_start -->

### 配置信息maxHeight
设置Modal的最大显示高度，默认随内容变化。

**备注：若同时配置minHeight，且其值大于maxHeight，则以minHeight的值生效**
<div class="m-example"></div>

```xml
<kl-button on-click="{this.show()}"  title="maxHeight: 不设置" />
<kl-button on-click="{this.show(200)}"  title="maxHeight: 200" />
<kl-button on-click="{this.show(400)}"  title="maxHeight: 400" />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    show: function(maxHeight) {
        var data = {
            cancelButton: true,
            contentTemplate: '<div style="height: 300px;border: 2px dotted #ddd;"></div>',
        };
        if(maxHeight) {
            data.maxHeight = maxHeight;
        }
        var modal = new NEKUI.KLModal({
            data: data
        });
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 配置信息draggable
设置Modal可拖拽，默认不可拖拽。

<div class="m-example"></div>

```xml
<kl-button on-click="{this.show()}"  title="draggable：true"/>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    show: function() {
        var modal = new NEKUI.KLModal({
            data: {
                content: 'Modal可拖拽',
                draggable: true
            }
        });
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 实例方法cancel
通过实例调用，执行该实例对象的`cancel`事件

**该方法执行时会派发`cancel`事件，通过`modal.$on('cancel', callback)`监听,打开控制台可查看**

<div class="m-example"></div>

```xml
<kl-button on-click="{this.show()}"  title="cancel" />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    show: function() {
        var data = {
            cancelButton: true,
            contentTemplate: '<div style="height: 300px;border: 2px dotted #ddd;">3秒后调用cancel</div>',
        };
        var modal = new NEKUI.KLModal({
            data: data
        });

        modal.$on('cancel', function(){
            console.log('监听cancel事件');
        });

        setTimeout(function(){
             modal.cancel();
        }, 3000);
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 实例方法close
通过实例调用，执行该实例对象的`close`事件，可接收一个标志调用`close`(true)或者`cancel`(false)方法的参数。默认调用`cancel`事件
**该方法执行时会派发`close`事件，通过`modal.$on('close', callback)`监听,打开控制台可查看**

<div class="m-example"></div>

```xml
<kl-button on-click="{this.show(true)}"  title="close:true" />
<kl-button on-click="{this.show(false)}"  title="close:false" />
<kl-button on-click="{this.show()}"  title="close:不传" />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    show: function(close) {
        var data = {
            cancelButton: true,
            contentTemplate: '<div style="height: 300px;border: 2px dotted #ddd;">3秒后调用close</div>',
        };
        var modal = new NEKUI.KLModal({
            data: data
        });
        modal.$on('close', function(evt){
            console.log('监听close事件');
            // evt:true调用ok，false调用cancel
            console.log(evt);
        });
        modal.$on('cancel', function(){
            console.log('监听cancel事件');
        });
        modal.$on('ok', function(){
            console.log('监听ok事件');
        });
        setTimeout(function(){
            modal.close(close);
        }, 3000);
    }
});
```
<!-- demo_end -->


<!-- demo_start -->
### 实例方法ok
通过实例调用，执行该实例对象的`ok`事件,若属性noClose设置为true，则只会调用ok方法，不会关闭Modal

**该方法执行时会派发`ok`事件，通过`modal.$on('ok', callback)`监听,打开控制台可查看**

<div class="m-example"></div>

```xml
<kl-button on-click="{this.show(true)}"  title="【noClose:true】" />
<kl-button on-click="{this.show(false)}"  title="【noClose:false】" />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    show: function(noClose) {
        var data = {
            cancelButton: true,
            noClose: noClose,
            contentTemplate: '<div style="height: 300px;border: 2px dotted #ddd;">3秒后调用ok</div>',
        };
        var modal = new NEKUI.KLModal({
            data: data
        });

        modal.$on('ok', function(){
            console.log('监听ok事件');
        });

        setTimeout(function(){
             modal.ok();
        }, 3000);
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 静态方法confirm
通过`NEKUI.KLModal.confirm`调用，返回实例本身，弹出一个confirm对话框。ok按钮触发ok事件，cancel按钮触发cancel事件。有四个参数，
参数一`content`【必填】为对话框内容；参数二`title`为对话框title信息，默认为`提示`；
参数三`okButton`为对话框确定按钮，`true`显示，`false`不显示，`string`按钮文本，默认为`确定`；
参数四`cancelButton`为对话框取消按钮，`boolean`显示，`string`按钮文本，默认为`取消`

**该点击ok按钮会调用`ok`事件**

<div class="m-example"></div>
<style>
    .g-row .kl-btn {
        margin-bottom: 5px;
    }
</style>

```xml
<div class="g-row">
    <kl-button on-click="{this.show('设置参数一:content')}"  title="alert(content)" />
    <kl-button on-click="{this.show('设置参数一:content', '设置参数二title')}"  title="alert(content, title)" />
    <kl-button on-click="{this.show('设置参数一:content', '设置参数二title', true)}"  title="alert(content, title, okButton)" />
</div>
<div class="g-row">
    <kl-button on-click="{this.show('设置参数一:content', '设置参数二title', false)}"  title="alert(content, title, okButton)" />
    <kl-button on-click="{this.show('设置参数一:content', '设置参数二title', '确定')}"  title="alert(content, title, okButton)" />
</div>
<div class="g-row">
    <kl-button on-click="{this.show('设置参数一:content', '设置参数二title', '确定','撤销')}"  title="alert(content, title, okButton, cancelButton)" />
    <kl-button on-click="{this.show('设置参数一:content', '设置参数二title', '确定', true)}"  title="alert(content, title, okButton, cancelButton)" />
</div>
<div class="g-row">
    <kl-button on-click="{this.show('设置参数一:content', '设置参数二title', '确定', false)}"  title="alert(content, title, okButton, cancelButton)" />
</div>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    show: function(content, title, okButton, cancelButton) {
        var modal = NEKUI.KLModal.confirm(content, title, okButton, cancelButton);

        modal.$on('ok', function(){
            console.log('监听ok事件');
        });

        modal.$on('cancel', function(){
            console.log('监听cancel事件');
        });
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 静态方法alert
通过`NEKUI.KLModal.alert`调用，返回实例本身，弹出一个alert对话框。关闭时始终触发ok事件。有三个参数，
参数一`content`【必填】为对话框内容；参数二`title`为对话框title信息，默认为`提示`；参数三`okButton`为对话框确定按钮，`true`显示，`false`不显示，`string`按钮文本，默认为`确定`

**该点击ok按钮会调用`ok`事件**

<div class="m-example"></div>

```xml
<div class="g-row">
    <kl-button on-click="{this.show('设置参数一:content')}"  title="alert(content)" />
    <kl-button on-click="{this.show('设置参数一:content', '设置参数二title')}"  title="alert(content, title)" />
    <kl-button on-click="{this.show('设置参数一:content', '设置参数二title', true)}"  title="alert(content, title, okButton)" />
</div>
<div class="g-row">
    <kl-button on-click="{this.show('设置参数一:content', '设置参数二title', false)}"  title="alert(content, title, okButton)" />
    <kl-button on-click="{this.show('设置参数一:content', '设置参数二title', '确定')}"  title="alert(content, title, okButton)" />
</div>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    show: function(content, title, okButton) {

        var modal = NEKUI.KLModal.alert(content, title, okButton);

        modal.$on('ok', function(){
            console.log('监听ok事件');
        });
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### modal类型
不同类型的modal, 可选参数：`default`, `notice`, `warning`, `error`, `success`

<div class="m-example"></div>

```xml
<kl-button on-click="{this.show('default')}"  title="default"/>
<kl-button on-click="{this.show('notice')}"  title="notice"/>
<kl-button on-click="{this.show('warning')}"  title="warning"/>
<kl-button on-click="{this.show('error')}"  title="error"/>
<kl-button on-click="{this.show('success')}"  title="success"/>

```

```javascript
var component = new NEKUI.Component({
    template: template,
    show: function(modalType) {
        // 打开一个Modal
        var modal = new NEKUI.KLModal({
            data: {
                content: 'Modal内容',
                modalType: modalType,
                title: '确认要删除这条信息吗？',
                cancelButton: true
            }
        });
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 全屏模式
设置`fullscreen` 为true, 弹窗占全屏 

<div class="m-example"></div>

```xml
<kl-button on-click="{this.show()}"  title="Modal"/>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    show: function() {
        // 打开一个Modal
        var modal = new NEKUI.KLModal({
            data: {
                content: 'Modal内容',
                fullscreen: true
            }
        });
    }
});
```
<!-- demo_end -->