### 示例

#### 基本形式

<div class="m-example"></div>

```xml
<steps current=2 steps={steps} />
```

```javascript
var component = new RGUI.Component({
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

#### 迷你版

在表单中使用

<div class="m-example"></div>

```xml
<steps size="sm" current=2 steps={steps} />
```

```javascript
var component = new RGUI.Component({
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