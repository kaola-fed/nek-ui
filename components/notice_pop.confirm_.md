---
title: 确认提示
type: components
name: pop.confirm
cate: 通知
order: 303
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<pop.confirm content="Are you sure delete this task?"><span>删除</span></pop.confirm>
```

```javascript
var component = new NEKUI.Component({
    template: template
});
```
<!-- demo_end -->

### 事件(打开console, 查看输出)

<!-- demo_start -->
<div class="m-example"></div>

```xml
<pop.confirm content="Are you sure delete this task?" on-ok={this.onok()}>
    <button class="u-btn">保存提交</button>
</pop.confirm>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    onok: function() {
        console.log(123);
    }
});
```
<!-- demo_end -->

### 自定义模板(打开console, 查看输出)

<!-- demo_start -->
<div class="m-example"></div>

```xml
<pop.confirm contentTemplate={testTemplate} on-ok={this.onok($event)}>
    <button class="u-btn">保存提交</button>
</pop.confirm>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    config: function() {
        this.data.testTemplate = '<form.item ref="validation" title="备注" required row><ui.textarea required showTip=false value={remark} height=50 /></form.item>';
    },
    onok: function(json) {
        console.log(json.data.remark);
        console.log(json.sender);
    }
});
```
<!-- demo_end -->

### 位置

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class="g-row">
    <pop.confirm content="pop.confirm箭头的位置在中间" placement="top"><ui.button title="top" /></pop.confirm>
    <pop.confirm content="pop.confirm箭头的位置在左边" placement="topLeft"><ui.button title="topLeft" /></pop.confirm>
    <pop.confirm content="pop.confirm箭头的位置在右边" placement="topRight"><ui.button title="topRight" /></pop.confirm>
</div>
<div class="g-row">
    <pop.confirm content="pop.confirm箭头的位置在中间" placement="left"><ui.button title="left" /></pop.confirm>
    <pop.confirm content="pop.confirm箭头的位置在上边" placement="leftTop"><ui.button title="leftTop" /></pop.confirm>
    <pop.confirm content="pop.confirm箭头的位置在下边" placement="leftBottom"><ui.button title="leftBottom" /></pop.confirm>
</div>
<div class="g-row">
    <pop.confirm content="pop.confirm箭头的位置在中间" placement="right"><ui.button title="right" /></pop.confirm>
    <pop.confirm content="pop.confirm箭头的位置在上边" placement="rightTop"><ui.button title="rightTop" /></pop.confirm>
    <pop.confirm content="pop.confirm箭头的位置在下边" placement="rightBottom"><ui.button title="rightBottom" /></pop.confirm>
</div>
<div class="g-row">
    <pop.confirm content="pop.confirm箭头的位置在中间" placement="bottom"><ui.button title="bottom" /></pop.confirm>
    <pop.confirm content="pop.confirm箭头的位置在左边" placement="bottomLeft"><ui.button title="bottomLeft" /></pop.confirm>
    <pop.confirm content="pop.confirm箭头的位置在右边" placement="bottomRight"><ui.button title="bottomRight" /></pop.confirm>
</div>
```

```javascript
var component = new NEKUI.Component({
    template: template
});
```
<!-- demo_end -->

## API
## Classes

<dl>
<dt><a href="#PopConfirm">PopConfirm</a></dt>
<dd></dd>
</dl>

## Events

<dl>
<dt><a href="#event_ok 确定时触发">"ok 确定时触发"</a></dt>
<dd></dd>
<dt><a href="#event_cancel 取消时触发">"cancel 取消时触发"</a></dt>
<dd></dd>
</dl>

<a name="PopConfirm"></a>

## PopConfirm
**Kind**: global class  
**Extend**: Component  
<a name="new_PopConfirm_new"></a>

### new PopConfirm()

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options.data] | <code>object</code> |  | = 绑定属性 |
| [options.data.content] | <code>string</code> |  | => 弹窗中的文本内容 |
| [options.data.contentTemplate] | <code>string</code> |  | => 弹窗中的模板内容,回调中会将PopConfirm的data返回; |
| [options.data.placement] | <code>string</code> | <code>&quot;top&quot;</code> | => tips展示出的位置：top left right bottom topLeft topRight bottomLeft bottomRight leftTop leftBottom rightTop rightBottom |
| [options.data.okText] | <code>string</code> | <code>&quot;确定&quot;</code> | => ok按钮文案 |
| [options.data.cancelText] | <code>string</code> | <code>&quot;取消&quot;</code> | => 取消按钮文案 |
| [options.data.hideWhenScroll] | <code>boolean</code> | <code>false</code> | => window滚动时,是否影藏popover |

<a name="event_ok 确定时触发"></a>

## "ok 确定时触发"
**Kind**: event emitted  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| sender | <code>object</code> | 事件发送对象 |
| data | <code>object</code> | popConfirm组件的数据 |

<a name="event_cancel 取消时触发"></a>

## "cancel 取消时触发"
**Kind**: event emitted  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| sender | <code>object</code> | 事件发送对象 |
| data | <code>object</code> | popConfirm组件的数据 |


{% raw %}
<script>
var index = 0;

    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<pop.confirm content="Are you sure delete this task?"><span>删除</span></pop.confirm>

      */});
      
var component = new NEKUI.Component({
    template: template
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<pop.confirm content="Are you sure delete this task?" on-ok={this.onok()}>
    <button class="u-btn">保存提交</button>
</pop.confirm>

      */});
      
var component = new NEKUI.Component({
    template: template,
    onok: function() {
        console.log(123);
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<pop.confirm contentTemplate={testTemplate} on-ok={this.onok($event)}>
    <button class="u-btn">保存提交</button>
</pop.confirm>

      */});
      
var component = new NEKUI.Component({
    template: template,
    config: function() {
        this.data.testTemplate = '<form.item ref="validation" title="备注" required row><ui.textarea required showTip=false value={remark} height=50 /></form.item>';
    },
    onok: function(json) {
        console.log(json.data.remark);
        console.log(json.sender);
    }
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      
<div class="g-row">
    <pop.confirm content="pop.confirm箭头的位置在中间" placement="top"><ui.button title="top" /></pop.confirm>
    <pop.confirm content="pop.confirm箭头的位置在左边" placement="topLeft"><ui.button title="topLeft" /></pop.confirm>
    <pop.confirm content="pop.confirm箭头的位置在右边" placement="topRight"><ui.button title="topRight" /></pop.confirm>
</div>
<div class="g-row">
    <pop.confirm content="pop.confirm箭头的位置在中间" placement="left"><ui.button title="left" /></pop.confirm>
    <pop.confirm content="pop.confirm箭头的位置在上边" placement="leftTop"><ui.button title="leftTop" /></pop.confirm>
    <pop.confirm content="pop.confirm箭头的位置在下边" placement="leftBottom"><ui.button title="leftBottom" /></pop.confirm>
</div>
<div class="g-row">
    <pop.confirm content="pop.confirm箭头的位置在中间" placement="right"><ui.button title="right" /></pop.confirm>
    <pop.confirm content="pop.confirm箭头的位置在上边" placement="rightTop"><ui.button title="rightTop" /></pop.confirm>
    <pop.confirm content="pop.confirm箭头的位置在下边" placement="rightBottom"><ui.button title="rightBottom" /></pop.confirm>
</div>
<div class="g-row">
    <pop.confirm content="pop.confirm箭头的位置在中间" placement="bottom"><ui.button title="bottom" /></pop.confirm>
    <pop.confirm content="pop.confirm箭头的位置在左边" placement="bottomLeft"><ui.button title="bottomLeft" /></pop.confirm>
    <pop.confirm content="pop.confirm箭头的位置在右边" placement="bottomRight"><ui.button title="bottomRight" /></pop.confirm>
</div>

      */});
      
var component = new NEKUI.Component({
    template: template
});

      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    
</script>
{% endraw %}