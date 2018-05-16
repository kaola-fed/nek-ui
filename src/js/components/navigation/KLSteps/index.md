---
title: 步骤
---

<!-- demo_start -->
### 迷你版123123

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
        current: 0,
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
