---
title: 步骤
---

<!-- demo_start -->
*基本形式*
<div class="m-example"></div>

```xml
<kl-button title="步骤+1" on-click={current = (current + 1) % steps.length}></kl-button>
<kl-steps current={current} steps={steps} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        current: 0,
        steps: [{
            status: 0,
            title: '编辑',
            description: '这里是多信息的描述啊描述啊描述啊描述啊哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶',
        }, {
            status: 1,
            title: '保存',
            description: '这里是多信息的描述啊描述啊描述啊描述啊哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶',
        }, {
            status: 2,
            title: '提交',
            description: '这里是多信息的描述啊描述啊描述啊描述啊哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶',
        }, {
            status: 3,
            title: '审核',
            description: '这里是多信息的描述啊描述啊描述啊描述啊哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶',
        }]
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
*迷你版*

在表单中使用
<div class="m-example"></div>

```xml
<kl-steps size="sm" current=2 steps={steps} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        steps: [{
            status: 0,
            title: '编辑',
            description: '这里是多信息的描述啊描述啊描述啊描述啊哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶',
        }, {
            status: 1,
            title: '保存',
            description: '这里是多信息的描述啊描述啊描述啊描述啊哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶',
        }, {
            status: 2,
            title: '提交',
            description: '这里是多信息的描述啊描述啊描述啊描述啊哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶',
        }, {
            status: 3,
            title: '审核',
            description: '这里是多信息的描述啊描述啊描述啊描述啊哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶',
        }]
    }
});
```
<!-- demo_end -->
