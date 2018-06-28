---
title: 表单
---

<!-- demo_start -->
### 基本形式
一个表单元素占一行, 并且label通过设置宽度居右对齐
<div class="m-example"></div>

```xml
<kl-form labelSize="80px">
    <kl-form-item title="订单号">
        <kl-input value="{billno}" width="300px" placeholder="订单号" />
    </kl-form-item>
</kl-form>
```
<!-- demo_end -->

<!-- demo_start -->
### 表单项的说明
两种方式,一种是配置tip, 另外一种是设置descTemplate, descTemplate可以是简单的html字符串
<div class="m-example"></div>

```xml
<kl-form labelSize="80px">
    <kl-form-item title="订单号" tip="订单号">
        <kl-input value="{billno}" width="300px" placeholder="订单号" />
    </kl-form-item>
    <kl-form-item title="支付方式" descTemplate="支付方式可填: 微信, 支付宝, 银联">
        <kl-input value="{purchaseWay}" width="300px" placeholder="支付方式" />
    </kl-form-item>
</kl-form>
```
<!-- demo_end -->

<!-- demo_start -->
### 表单项label
label部分可设置labelSize, labelLineHeight, titleTemplate三个属性
* `labelSize`可以设置在kl-form-item上, 如果kl-form下的kl-form-item的`labelSize`都一样,则可将`labelSize`设置在kl-form上
* `labelLineHeight`用法同`labelSize`
* `titleTemplate`支持简单的html字符串

<div class="m-example"></div>

```xml
<kl-form>
    <kl-form-item title="订单号" descTemplate="32位订单号" labelSize="80px">
        <kl-input value="{billno}" width="300px" placeholder="订单号" />
    </kl-form-item>
    <kl-form-item title="支付方式" descTemplate="支付方式可填: 微信, 支付宝, 银联" labelSize="80px">
        <kl-input value="{purchaseWay}" width="300px" placeholder="支付方式" />
    </kl-form-item>
    <kl-form-item title="备注" labelSize="80px" labelLineHeight="lg">
        <kl-textarea width="300px" placeholder="备注" />
    </kl-form-item>
</kl-form>
```
<!-- demo_end -->

<!-- demo_start -->
### 一行多个表单元素的布局
可以配合`kl-row`与`kl-col`栅格布局组件实现

<div class="m-example"></div>

```xml
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
```
<!-- demo_end -->

<!-- demo_start -->
 ### 下拉选项列表获取
 此项功能需要后端配合实现一个接口,该接口接收以逗号间隔的key值,并解析后返回对应key值的下拉列表; 请打开浏览器开发者工具, 在`network`中查看对应请求的数据格式
* 默认返回的数据格式是被包裹在`data`中, 如果路径不满足需求,可以通过设置sourcePath自定义访问数据的路径

<div class="m-example"></div>

```xml
<kl-form labelSize="80px" service="{api}">
 <kl-row>
     <kl-col span=4>
         <kl-form-item title="支付方式" sourceKey="purchaseWays">
             <kl-select value="{purchaseWay}" />
         </kl-form-item>
     </kl-col>
     <kl-col span=4>
         <kl-form-item title="跨境方式" sourceKey="importTypes">
             <kl-select value="{importType}" />
         </kl-form-item>
     </kl-col>
     <kl-col span=4>
         <kl-form-item title="仓库" sourceKey="warehouses">
             <kl-select value="{warehouse}" />
         </kl-form-item>
     </kl-col>
 </kl-row>
</kl-form>
```

```javascript
var component = new NEKUI.Component({
 template: template,
 config: function() {
    this.data.api = '../data/KLForm.json';
 },
});
```
<!-- demo_end -->

<!-- demo_start -->
### 表单项layout
<div class="m-example"></div>

```xml
<p>inline</p>
<kl-form>
     <kl-row>
        <kl-col span=12>
            <kl-form-item title="订单号" layout="inline">
                <kl-input value="{billno}" placeholder="订单号" />
            </kl-form-item>
            <kl-form-item title="支付方式" layout="inline">
                 <kl-input value="{purchaseWay}" placeholder="支付方式" />
             </kl-form-item>
             <kl-form-item title="商品名称" layout="inline">
                  <kl-input value="{goodsName}" placeholder="商品名称" />
              </kl-form-item>
        </kl-col>
     </kl-row>
</kl-form>
<p>全局inline</p>
<kl-form inline class="f-mt10">
     <kl-row>
        <kl-col span=12>
            <kl-form-item title="订单号">
                <kl-input value="{billno}" placeholder="订单号" />
            </kl-form-item>
            <kl-form-item title="支付方式">
                 <kl-input value="{purchaseWay}" placeholder="支付方式" />
             </kl-form-item>
             <kl-form-item title="商品名称">
                  <kl-input value="{goodsName}" placeholder="商品名称" />
              </kl-form-item>
        </kl-col>
     </kl-row>
</kl-form>
<p>vertical</p>
<kl-form>
    <kl-row>
         <kl-col span=4>
             <kl-form-item title="订单号" layout="vertical">
                 <kl-input value="{billno}" placeholder="订单号" />
             </kl-form-item>
         </kl-col>
         <kl-col span=4>
             <kl-form-item title="支付方式" layout="vertical">
                 <kl-input value="{purchaseWay}" placeholder="支付方式" />
             </kl-form-item>
         </kl-col>
         <kl-col span=4>
             <kl-form-item title="商品名称" layout="vertical">
                 <kl-input value="{goodsName}" placeholder="商品名称" />
             </kl-form-item>
         </kl-col>
     </kl-row>
</kl-form>
```
<!-- demo_end -->

<!-- demo_start -->
### 简单表单验证
如果表单项是必填,则可以在`kl-form-item`上配置required属性,并通过message配置未填写时的提示文案; 除了最基本的必填校验外,各表单元素组件可以通过配置rules属性实现各种复杂的校验; 参见复杂表单验证

<div class="m-example"></div>

```xml
<kl-form labelSize="80px" ref="form">
    <kl-form-item title="订单号" required message="请填写订单号">
        <kl-input value="{billno}" width="300px" placeholder="订单号" />
    </kl-form-item>
    <kl-form-item title="支付方式" required>
        <kl-input value="{purchaseWay}" width="300px" placeholder="支付方式" />
    </kl-form-item>
    <kl-form-item title="跨境方式" required>
       <kl-select value="{importType}" source="{importTypes}" width="300px" />
    </kl-form-item>
    <kl-form-item title="国家" required>
        <kl-check-group source="{countryList}" block />
    </kl-form-item>
    <kl-form-item title="起运时间" required>
       <kl-date-picker value="{startTime}" width="300px" />
    </kl-form-item>
     <kl-form-item title="仓库" required>
      <kl-multi-select value="{warehouse}" source="{warehouses}" width="300px"  />
    </kl-form-item>
    <kl-form-item title="备注" required>
       <kl-textarea value="{remark}" width="300px" />
    </kl-form-item>
    <div style="padding-left:88px">
        <kl-button on-click="{this.validate()}" title="提交" />
    </div>
</kl-form>
```

```javascript
var component = new NEKUI.Component({
 template: template,
 config: function() {
    this.data.importTypes = [{ id: 1, name: '海淘' }, { id: 2, name: '一般贸易' }];
    this.data.countryList = [{ id: 1, name: '中国' }, { id: 2, name: '美国' }];
    this.data.warehouses = [{ id: 1, name: '宁波仓' }, { id: 2, name: '重庆仓' }];
 },
 validate: function() {
    var $form = this.$refs.form;
    return $form.validate().success;
 }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 复杂表单验证
每个表单元素都内置一些基本的校验属性, 如input设置type="email", 触发校验时就会校验用户输入的是否是合法的email地址;

除内置的基本校验属性外, 每个表单元素组件都有一个rules属性, rules属性的基本格式是`{type: '',message: ''}`, type的可选值参见[validatorJS](https://github.com/chriso/validator.js/)

如果需要自定义验证函数, 可配置`method`属性

<div class="m-example"></div>

```xml
<kl-form labelSize="80px" ref="form">
    <kl-form-item title="用户邮箱" required>
        <kl-input type="email" value="{email}" width="300px" placeholder="用户邮箱" />
    </kl-form-item>
    <kl-form-item title="支付方式" required descTemplate="输入的值中应包含pay">
        <kl-input rules="{purchaseWayRule}" value="{purchaseWay}" width="300px" placeholder="支付方式" />
    </kl-form-item>
    <kl-form-item title="国家" required tip="最多选择2个国家">
        <kl-check-group source="{countryList}" min=1 max=2 />
    </kl-form-item>
    <kl-form-item title="备注" required descTemplate="最多输入10个字">
       <kl-textarea rules="{remarkRule}" value="{remark}" width="300px" placeholder="备注" />
    </kl-form-item>
    <div style="padding-left:88px">
        <kl-button on-click="{this.validate()}" title="提交" />
    </div>
</kl-form>
```

```javascript
var component = new NEKUI.Component({
 template: template,
 config: function() {
    this.data.importTypes = [{ id: 1, name: '海淘' }, { id: 2, name: '一般贸易' }];
    this.data.countryList = [{ id: 1, name: '中国' }, { id: 2, name: '美国' }, { id: 3, name: '英国' }];
    this.data.warehouses = [{ id: 1, name: '宁波仓' }, { id: 2, name: '重庆仓' }];

    this.data.purchaseWayRule = [{
        message: '输入的值中应包含pay', method: function(value) {
            return value.toLowerCase().indexOf('pay') != -1;
        }
    }];

    this.data.remarkRule = [{
        message: '最多输入10个字', method: function(value) {
            return value.length <= 10;
        }
    }];
 },
 validate: function() {
    var $form = this.$refs.form;
    return $form.validate().success;
 }
});
```
<!-- demo_end -->
