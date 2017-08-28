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
<kl-row type="flex">
    <kl-col span="4">
        <kl-message class="f-mb10">
        不设置type
        </kl-message>
    </kl-col>
    <kl-col span="4">
        <kl-message type="success" class="f-mb10">
            type为success
        </kl-message>
    </kl-col>
    <kl-col span="4">
        <kl-message type="warning" class="f-mb10">
            type为warning
        </kl-message>
    </kl-col>
    <kl-col span="4">
        <kl-message type="info" class="f-mb10">
            type为info
        </kl-message>
    </kl-col>
    <kl-col span="4">
        <kl-message type="error" class="f-mb10">
            type为error
        </kl-message>
    </kl-col>
</kl-row>
```

<!-- demo_end -->

### 基本属性class
`class`属性设置补充样式

<!-- demo_start -->
<div class="m-example">
    <style>
        .m-bg-specical {
            background: #000;
            color: #FFF;
        }
    </style>
</div>

```xml
<kl-message class="f-mb10 m-bg-specical" type="error">type=error,设置自定义class</kl-message>
```

<!-- demo_end -->

