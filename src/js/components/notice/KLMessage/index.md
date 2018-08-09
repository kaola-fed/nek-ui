---
title: 消息
new: true
---

<!-- demo_start -->
### 基本形式
提示信息展示格式(图标+颜色)。

<div class="m-example"></div>

```xml
<kl-message class="f-mb10">
    this is a message
</kl-message>
```
<!-- demo_end -->


<!-- demo_start -->
### 基本属性type
`type`设置样式，取值`success`、`warning`、`notice`、`error`。默认不设置则无色无图标。

<div class="m-example"></div>

```xml
<kl-message class="f-mb10" addClose>
    不设置type
</kl-message>

<kl-message type="success" class="f-mb10" addClose>
    恭喜！你所提交的信息已经审核通过。
</kl-message>

<kl-message type="warning" class="f-mb10" addClose>
    系统将于 15 : 00 - 17 : 00 进行升级，请及时保存你的资料！
</kl-message>

<kl-message type="notice" class="f-mb10" addClose>
    你好！欢迎使用。
</kl-message>

<kl-message type="error" class="f-mb10" addClose>
    系统错误，请稍后重试。
</kl-message>

```

<!-- demo_end -->

<!-- demo_start -->
### 基本属性class
`class`属性设置补充样式

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

<!-- demo_start -->
### 直接插入模版
<div class="m-example">
    <style>
        p {
            margin: 0px;
        }
        .m-template {
            display: block;
            position: absolute;
            right: 17.5px;
            top: calc(50% - 8.5px);
            cursor: pointer;
        }
    </style>
</div>

```xml
<kl-message type="notice" class="f-mb10">
    <p >
        你好！欢迎使用。
        <a class="m-template">查看详情</a>
    </p>
</kl-message>
```

<!-- demo_end -->

<!-- demo_start -->
### 有title属性的模式
设置`title`属性后得样式

<div class="m-example"></div>

```xml
<kl-message title="默认的情况" class="f-mb10" addClose > 
    不设置type
</kl-message>

<kl-message title="已成功！" type="success" class="f-mb10" addClose>
    恭喜！你所提交的信息已经审核通过，如有问题请联系客服。
</kl-message>

<kl-message title="请注意!" type="warning" class="f-mb10" addClose>
    系统将于 15 : 00 - 17 : 00 进行升级，请及时保存你的资料！
</kl-message>

<kl-message title="帮助信息" type="notice" class="f-mb10" addClose>
    你好！欢迎使用。
</kl-message>

<kl-message title="出错了！" type="error" class="f-mb10" addClose>
    系统错误，请稍后重试。
</kl-message>
```
<!-- demo_end -->
