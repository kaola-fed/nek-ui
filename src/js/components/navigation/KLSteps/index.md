---
title: 步骤
---

<!-- demo_start -->
### 基本形式
<div class="m-example"></div>

```xml
<kl-steps current={current}>
    <kl-step key="0" title="步骤 1" description="这是一段很长很长很长的描述性文字1这是一段很长很长很长的描述性文字1这是一段很长很长很长的描述性文字1这是一段很长很长很长的描述性文字1" currentStatus="success" />
    <kl-step key="1" title="步骤 2" description="这是一段很长很长很长的描述性文这是一段很长很长很长的描述性文字1这是一段很长很长很长的描述性文字1这是一段很长很长很长的描述性文字1字2" />
    <kl-step key="2" title="步骤 3" description="这是一段很长很长很长的描述性文字1这是一段很长很长很长的描述性文字1" />
    <kl-step key="3" title="步骤 4" description="这是一段很长很长很长的描述性文字1这是一段很长很长很长的描述性文字1这是一段很长很长很长的描述性文字1" />
</kl-steps>
<kl-button title="下一步" on-click={current = (current + 1) % steps.length}></kl-button>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        current: 1,
    },
   init() {
    //    setTimeout(() => {
    //         this.data.current = 1234;
    //         console.log('changed');
    //         this.$update();
    //     }, 1000);
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 竖值步骤条
<div class="m-example"></div>

```xml
<kl-steps current={current} direction="vertical" height="800">
    <kl-step key="0" title="步骤 1" description="123adsfasdfasd" currentStatus="success" />
    <kl-step key="1" title="步骤 2" description="sdfgdfsgdsfgdfsgdsfg" />
    <kl-step key="2" title="步骤 3" description="dfsgdsfgdfgsgdfgsdfgsdfgs" />
    <kl-step key="3" title="步骤 4" description="dfsdfgssjkluh了；爱看电视了开放后离开静安寺东方" />
</kl-steps>
<kl-button title="下一步" on-click={current = (current + 1) % steps.length}></kl-button>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        current: 1,
    },
});
```
<!-- demo_end -->


<!-- demo_start -->
### 基本形式mini
<div class="m-example"></div>

```xml
<kl-steps current={current} size="small">
    <kl-step key="0" title="步骤 1" description="这是一段很长很长很长的描述性文字1这是一段很长很长很长的描述性文字1这是一段很长很长很长的描述性文字1这是一段很长很长很长的描述性文字1" currentStatus="success" />
    <kl-step key="1" title="步骤 2" description="这是一段很长很长很长的描述性文这是一段很长很长很长的描述性文字1这是一段很长很长很长的描述性文字1这是一段很长很长很长的描述性文字1字2" />
    <kl-step key="2" title="步骤 3" description="这是一段很长很长很长的描述性文字1这是一段很长很长很长的描述性文字1" />
    <kl-step key="3" title="步骤 4" description="这是一段很长很长很长的描述性文字1这是一段很长很长很长的描述性文字1这是一段很长很长很长的描述性文字1" />
</kl-steps>
<kl-button title="下一步" on-click={current = (current + 1) % steps.length}></kl-button>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        current: 1,
    },
   init() {
    //    setTimeout(() => {
    //         this.data.current = 1234;
    //         console.log('changed');
    //         this.$update();
    //     }, 1000);
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 竖值步骤条
<div class="m-example"></div>

```xml
<kl-steps current={current} direction="vertical" height="500"  size="small">
    <kl-step key="0" title="步骤 1" description="123adsfasdfasd" currentStatus="success" />
    <kl-step key="1" title="步骤 2" description="sdfgdfsgdsfgdfsgdsfg" />
    <kl-step key="2" title="步骤 3" description="dfsgdsfgdfgsgdfgsdfgsdfgs" />
    <kl-step key="3" title="步骤 4" description="dfsdfgssjkluh了；爱看电视了开放后离开静安寺东方" />
</kl-steps>
<kl-button title="下一步" on-click={current = (current + 1) % steps.length}></kl-button>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        current: 1,
    },
});
```
<!-- demo_end -->

<!-- demo_start -->
### 迷你版

在表单中使用
<div class="m-example"></div>

```xml
<kl-steps size="sm" current={current} steps={steps} />
<kl-button title="下一步" on-click={current = (current + 1) % steps.length}></kl-button>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        current: 2,
        steps: [{
            status: 0,
            title: '提交订单',
            description: '2017-08-18 提交提交成功',
        }, {
            status: 1,
            title: '付款成功',
            description: '订单付款完成，商品将会送出',
        }, {
            status: 2,
            title: '等待收货',
            description: '订单正在配送中，请准备签收',
        }, {
            status: 3,
            title: '完成',
            description: '订单完成，感谢使用考拉海购',
        }]
    }
});
```
<!-- demo_end -->
