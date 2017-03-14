---
title: 模态框
type: components
name: modal
cate: 通知
order: 301
---

含有遮罩层的对话框，用于模拟浏览器的`alert`、`confirm`和`prompt`。

模态对话框通过遮罩层来阻止用户的其他行为。

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<button class="u-btn u-btn-primary" on-click={this.show()}>Modal</button>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    show: function() {
        var modal = new NEKUI.Modal({
            data: {
                title: 'Modal标题',
                content: 'Modal内容'
            }
        });
    }
});
```
<!-- demo_end -->

### Alert

<!-- demo_start -->
<div class="m-example"></div>

```xml
<button class="u-btn u-btn-error" on-click={this.show()}>Alert</button>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    show: function() {
        NEKUI.Modal.alert('Alert内容');
    }
});
```
<!-- demo_end -->

### Confirm

<!-- demo_start -->
<div class="m-example"></div>

```xml
<button class="u-btn u-btn-success" on-click={this.show()}>Confirm</button>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    show: function() {
        NEKUI.Modal.confirm('Confirm内容');
    }
});
```
<!-- demo_end -->

## API
## Classes

<dl>
<dt><a href="#Modal">Modal</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#config">config()</a></dt>
<dd></dd>
<dt><a href="#init">init()</a></dt>
<dd></dd>
<dt><a href="#close(result) 关闭对话框">close(result) 关闭对话框(result)</a> ⇒ <code>void</code></dt>
<dd></dd>
<dt><a href="#ok_new 确定对话框">ok() 确定对话框()</a> ⇒ <code>void</code></dt>
<dd></dd>
<dt><a href="#cancel_new 取消对话框">cancel() 取消对话框()</a> ⇒ <code>void</code></dt>
<dd></dd>
<dt><a href="#alert(content[,title]) 弹出一个alert对话框。关闭时始终触发确定事件。">title]) 弹出一个alert对话框。关闭时始终触发确定事件。([content], [title])</a> ⇒ <code><a href="#Modal">Modal</a></code></dt>
<dd></dd>
<dt><a href="#confirm(content[,title]) 弹出一个confirm对话框">title]) 弹出一个confirm对话框([content], [title])</a> ⇒ <code><a href="#Modal">Modal</a></code></dt>
<dd></dd>
</dl>

## Events

<dl>
<dt><a href="#event_close 关闭对话框时触发">"close 关闭对话框时触发"</a></dt>
<dd></dd>
<dt><a href="#event_ok 确定对话框时触发">"ok 确定对话框时触发"</a></dt>
<dd></dd>
<dt><a href="#event_cancel 取消对话框时触发">"cancel 取消对话框时触发"</a></dt>
<dd></dd>
</dl>

<a name="Modal"></a>

## Modal
**Kind**: global class  
**Extend**: Component  
<a name="new_Modal_new"></a>

### new Modal()

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options.data] | <code>object</code> |  | = 绑定属性 | Binding Properties |
| [options.data.title] | <code>string</code> | <code>&quot;提示&quot;</code> | => 对话框标题 | Title of Dialog |
| [options.data.content] | <code>string</code> |  | => 对话框内容 |
| [options.data.contentTemplate] | <code>string</code> |  | => 对话框内容模板，用于支持复杂内容的自定义。 |
| [options.data.footerTemplate] | <code>string</code> |  | => 对话框底部模板 |
| [options.data.okButton] | <code>string</code> &#124; <code>boolean</code> | <code>true</code> | => 是否显示确定按钮。值为`string`时显示该段文字。 |
| [options.data.cancelButton] | <code>string</code> &#124; <code>boolean</code> | <code>false</code> | => 是否显示取消按钮。值为`string`时显示该段文字。 |
| [options.data.class] | <code>string</code> |  | => 补充class |
| [options.data.noClose] | <code>boolean</code> |  | => ok时是否关闭弹窗 |
| [options.data.minHeight] | <code>number</code> |  | => 内容区域最小高度 |
| [options.data.maxHeight] | <code>number</code> |  | => 内容区域最大高度，超出则显示滚动条 |

<a name="config"></a>

## config()
**Kind**: global function  
**Access:** protected  
<a name="init"></a>

## init()
**Kind**: global function  
**Access:** protected  
<a name="close(result) 关闭对话框"></a>

## close(result) 关闭对话框(result) ⇒ <code>void</code>
**Kind**: global function  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| result | <code>boolean</code> | 点击确定还是取消 |

<a name="ok_new 确定对话框"></a>

## ok() 确定对话框() ⇒ <code>void</code>
**Kind**: global function  
**Access:** public  
<a name="cancel_new 取消对话框"></a>

## cancel() 取消对话框() ⇒ <code>void</code>
**Kind**: global function  
**Access:** public  
<a name="event_close 关闭对话框时触发"></a>

## "close 关闭对话框时触发"
**Kind**: event emitted  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| result | <code>boolean</code> | 点击了确定还是取消 |

<a name="event_ok 确定对话框时触发"></a>

## "ok 确定对话框时触发"
**Kind**: event emitted  
<a name="event_cancel 取消对话框时触发"></a>

## "cancel 取消对话框时触发"
**Kind**: event emitted  

{% raw %}
<script>
var index = 0;

    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<button class="u-btn u-btn-primary" on-click={this.show()}>Modal</button>

      */});
      
var component = new NEKUI.Component({
    template: template,
    show: function() {
        var modal = new NEKUI.Modal({
            data: {
                title: 'Modal标题',
                content: 'Modal内容'
            }
        });
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<button class="u-btn u-btn-error" on-click={this.show()}>Alert</button>

      */});
      
var component = new NEKUI.Component({
    template: template,
    show: function() {
        NEKUI.Modal.alert('Alert内容');
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<button class="u-btn u-btn-success" on-click={this.show()}>Confirm</button>

      */});
      
var component = new NEKUI.Component({
    template: template,
    show: function() {
        NEKUI.Modal.confirm('Confirm内容');
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
</script>
{% endraw %}