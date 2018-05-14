---
title: 消息
---

### 基本形式
提示信息展示格式(图标+颜色)。

<!-- demo_start -->
<div class="m-example"></div>

```xml
<kl-message class="f-mb10">
    this is a message
</kl-message>
```
<!-- demo_end -->


### 基本属性type
`type`设置样式，取值`success`、`warning`、`info`、`error`。默认不设置则无色无图标。

<!-- demo_start -->
<div class="m-example"></div>

```xml
<kl-message class="f-mb10" basic>
    不设置type
</kl-message>

<kl-message type="success" class="f-mb10" basic>
    恭喜！你所提交的信息已经审核通过，如有问题请联系客服。
</kl-message>

<kl-message type="warning" class="f-mb10" basic>
    系统将于 15 : 00 - 17 : 00 进行升级，请及时保存你的资料！
</kl-message>

<kl-message type="info" class="f-mb10" basic>
    你好！欢迎使用金融云2.0专业版，你可以根据自身需求添加业务模块。
</kl-message>

<kl-message type="error" class="f-mb10" basic>
    系统错误，请稍后重试。
</kl-message>

```

<!-- demo_end -->

### 基本属性class
`class`属性设置补充样式

<!-- demo_start -->
<div class="m-example">
    <style>
        .m-bg-specical {
            background: #ccc;
            color: #FFF;
            border: none;
        }
    </style>
</div>

```xml
<kl-message class="f-mb10 m-bg-specical" type="error">type=error,设置自定义class</kl-message>
```

<!-- demo_end -->

### 直接插入模版
<!-- demo_start -->
<div class="m-example">
    <style>
        p {
            margin: 0px;
        }
        .kl-template {
            display: block;
            position: absolute;
            right: 17.5px;
            top: calc(50% - 8.5px);
            cursor: pointer;
        }
    </style>
</div>

```xml
<kl-message type="info" class="f-mb10">
    <p >
        你好！欢迎使用新版云客服，如有疑问请咨询在线客服。
        <a class="kl-template">查看详情</a>
    </p>
</kl-message>
```

<!-- demo_end -->

### 有title属性的模式
设置`title`属性后得样式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<kl-message title="默认的情况" class="f-mb10" basic > 
    不设置type
</kl-message>

<kl-message title="已成功！" type="success" class="f-mb10" basic>
    恭喜！你所提交的信息已经审核通过，如有问题请联系客服。
</kl-message>

<kl-message title="请注意!" type="warning" class="f-mb10" basic>
    系统将于 15 : 00 - 17 : 00 进行升级，请及时保存你的资料！
</kl-message>

<kl-message title="帮助信息" type="info" class="f-mb10" basic>
    你好！欢迎使用金融云2.0专业版，你可以根据自身需求添加业务模块。
</kl-message>

<kl-message title="出错了！" type="error" class="f-mb10" basic>
    系统错误，请稍后重试。
</kl-message>
```
<!-- demo_end -->
