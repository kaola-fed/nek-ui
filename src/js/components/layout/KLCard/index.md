---
title: 卡片
---

<!-- demo_start -->
### 基本形式
用于页面的布局，页面由多个card组件组成，card里面一般配合<a target="_blank" href="/components/layout_KLRow_.html">kl-row</a>组件进行布局

<div class="m-example"></div>

```xml
<kl-card title="用户信息">
    <kl-form labelSize="80px">
        <kl-row>
            <kl-col span=4>
                <kl-form-item title="订单号">
                    <kl-input value="{billno}" placeholder="订单号" />
                </kl-form-item>
            </kl-col>
            <kl-col span=4>
                <kl-form-item title="支付方式">
                    <kl-input value="{purchaseWay}" placeholder="支付方式" />
                </kl-form-item>
            </kl-col>
            <kl-col span=4>
                <kl-form-item title="商品名称">
                    <kl-input value="{goodsName}" placeholder="商品名称" />
                </kl-form-item>
            </kl-col>
        </kl-row>
    </kl-form>
</kl-card>
```
<!-- demo_end -->

<!-- demo_start -->
### 嵌套多层
card是可以嵌套多个的，多用于一个模块里面又有小的分类。
<br>
根据视觉规范给样式，里面嵌套的kl-card不需要标题前面的数线，所以要将isShowLine设置成false

<div class="m-example"></div>

```xml
<kl-card title="一级标题">
    <p>一级标题下具体内容</p>
    <kl-card title="二级标题" isShowLine={false}>
        <p>二级标题下具体内容</p>
        <kl-card title="三级标题" isShowLine={false}>
            <p>三级标题下具体内容</p>
        </kl-card>
    </kl-card>
</kl-card>
```
<!-- demo_end -->

<!-- demo_start -->
### 不设置title
card不设置title，仅仅使用它的布局样式，常用于列表页的表格外面，具体参照场景页面（开发中）

<div class="m-example"></div>

```xml
<kl-card>
    <kl-table source={table.source}>
        <kl-table-col name="title" key="title" width=150 />
        <kl-table-col name="value" key="value" tip="I am tip"/>
    </kl-table>
</kl-card>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        table: {
            source: []
        }
    },
    init: function() {
        this.data.table.source = [];
        for(var i = 0; i < 3; ++i) {
            this.data.table.source.push({
                title: 'test' + i,
                value: 10 * i
            });
        }
    }
});
```

<!-- demo_end -->

<!-- demo_start -->
### card上有操作
需要借助于card-tool组件

<div class="m-example"></div>

```xml
<kl-card title="用户信息">
    <kl-card-tools>
        <a href="/components/layout_KLTable_.html">跳至表格组件页面</a>
    </kl-card-tools>
    <kl-form>
        <kl-form-item labelLineHeight="20px" title="姓名:">
            张三
        </kl-form-item>
        <kl-form-item labelLineHeight="20px" title="年龄:">
            19
        </kl-form-item>
    </kl-form>
</kl-card>
```
<!-- demo_end -->