### 页面布局分为三个部分 

#### 第一部分 表单搜索部分

** 注意事项 **
* 选项一行固定排列四个
* 超过三行使用折叠面板

<div class="m-example"></div>

```xml
<ui.form>
    <div class="g-row">
        <form.item title="创建人" cols=3>
            <ui.select source={source} value={creatorNoStr}/>
        </form.item>
        <form.item title="创建人" cols=3>
            <ui.select source={source} value={creatorNoStr}/>
        </form.item>
        <form.item title="创建人" cols=3>
            <ui.select source={source} value={creatorNoStr}/>
        </form.item>
        <form.item title="创建人" cols=3>
            <ui.select source={source} value={creatorNoStr}/>
        </form.item>
    </div>
    <div class="g-row">
        <form.item title="创建人" cols=3>
            <ui.select source={source} value={creatorNoStr}/>
        </form.item>
        <form.item title="创建人" cols=3>
            <ui.select source={source} value={creatorNoStr}/>
        </form.item>
        <form.item title="创建人" cols=3>
            <ui.select source={source} value={creatorNoStr}/>
        </form.item>
        <form.item title="创建人" cols=3>
            <ui.select source={source} value={creatorNoStr}/>
        </form.item>
    </div>
</ui.form>
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'}
        ]
    }
});
```

#### 第二部分 页面上按钮操作部分 

** 注意事项 **
* 操作按钮居右排列

<div class="m-example"></div>

```xml
<ui.form>
    <div class="g-row">
        <form.item title="创建人" cols=3>
            <ui.select source={source} value={creatorNoStr}/>
        </form.item>
        <form.item title="创建人" cols=3>
            <ui.select source={source} value={creatorNoStr}/>
        </form.item>
        <form.item title="创建人" cols=3>
            <ui.select source={source} value={creatorNoStr}/>
        </form.item>
        <form.item title="创建人" cols=3>
            <ui.select source={source} value={creatorNoStr}/>
        </form.item>
    </div>
    <div class="g-row">
        <form.item title="创建人" cols=3>
            <ui.select source={source} value={creatorNoStr}/>
        </form.item>
        <form.item title="创建人" cols=3>
            <ui.select source={source} value={creatorNoStr}/>
        </form.item>
        <form.item title="创建人" cols=3>
            <ui.select source={source} value={creatorNoStr}/>
        </form.item>
        <form.item title="创建人" cols=3>
            <ui.select source={source} value={creatorNoStr}/>
        </form.item>
    </div>
    {#if isToggle}
    <div class="g-row">
        <form.item title="创建人" cols=3>
            <ui.select source={source} value={creatorNoStr}/>
        </form.item>
        <form.item title="创建人" cols=3>
            <ui.select source={source} value={creatorNoStr}/>
        </form.item>
        <form.item title="创建人" cols=3>
            <ui.select source={source} value={creatorNoStr}/>
        </form.item>
        <form.item title="创建人" cols=3>
            <ui.select source={source} value={creatorNoStr}/>
        </form.item>
    </div>
    <div class="g-row">
        <form.item title="创建人" cols=3>
            <ui.select source={source} value={creatorNoStr}/>
        </form.item>
        <form.item title="创建人" cols=3>
            <ui.select source={source} value={creatorNoStr}/>
        </form.item>
        <form.item title="创建人" cols=3>
            <ui.select source={source} value={creatorNoStr}/>
        </form.item>
        <form.item title="创建人" cols=3>
            <ui.select source={source} value={creatorNoStr}/>
        </form.item>
    </div>
    {/if}
    <div class="m-operate f-cb">
        <div class="otherOperate">
            <ui.button title="导出" on-click={this.export(condition)} />
        </div>
        <div class="mainOperate">
            <ui.button title="搜索" on-click={this.refresh(condition)} />
            <a on-click={this.toggle()}>折叠</a>
        </div>
    </div>
</ui.form>
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'}
        ],
        isToggle: false
    },
    toggle: function(){
        this.data.isToggle = !this.data.isToggle
    }
});
```

#### 第三部分 表格部分

** 注意事项 **
* 待定

<div class="m-example"></div>

```xml
<table class="m-table">
    <thead>
        <tr><th>表格标题</th><th>表格标题</th><th>表格标题</th><th>表格标题</th><th>表格标题</th></tr>
    </thead>
    <tbody>
        <tr><td>表格内容</td><td>表格内容</td><td>表格内容</td><th>表格标题</th><th>表格标题</th></tr>
        <tr><td>表格内容</td><td>表格内容</td><td>表格内容</td><th>表格标题</th><th>表格标题</th></tr>
        <tr><td>表格内容</td><td>表格内容</td><td>表格内容</td><th>表格标题</th><th>表格标题</th></tr>
    </tbody>
</table>
<pager current=6 total=11 position="right" />
```

#### 完整示例


<div class="m-example"></div>

```xml
<ui.form>
    <div class="g-row">
        <form.item title="创建人" cols=3>
            <ui.select source={source} value={creatorNoStr}/>
        </form.item>
        <form.item title="创建人" cols=3>
            <ui.select source={source} value={creatorNoStr}/>
        </form.item>
        <form.item title="创建人" cols=3>
            <ui.select source={source} value={creatorNoStr}/>
        </form.item>
        <form.item title="创建人" cols=3>
            <ui.select source={source} value={creatorNoStr}/>
        </form.item>
    </div>
    <div class="g-row">
        <form.item title="创建人" cols=3>
            <ui.select source={source} value={creatorNoStr}/>
        </form.item>
        <form.item title="创建人" cols=3>
            <ui.select source={source} value={creatorNoStr}/>
        </form.item>
        <form.item title="创建人" cols=3>
            <ui.select source={source} value={creatorNoStr}/>
        </form.item>
        <form.item title="创建人" cols=3>
            <ui.select source={source} value={creatorNoStr}/>
        </form.item>
    </div>
</ui.form>
<ui.form>
    <div class="m-operate f-cb">
        <ui.button title="搜索" on-click={this.refresh(condition)} />
        <ui.button title="导出" on-click={this.export(condition)} />
    </div>
</ui.form>
<ui.form>
    <table class="m-table">
        <thead>
            <tr><th>表格标题</th><th>表格标题</th><th>表格标题</th><th>表格标题</th><th>表格标题</th></tr>
        </thead>
        <tbody>
            <tr><td>表格内容</td><td>表格内容</td><td>表格内容</td><th>表格标题</th><th>表格标题</th></tr>
            <tr><td>表格内容</td><td>表格内容</td><td>表格内容</td><th>表格标题</th><th>表格标题</th></tr>
            <tr><td>表格内容</td><td>表格内容</td><td>表格内容</td><th>表格标题</th><th>表格标题</th></tr>
        </tbody>
    </table>
</ui.form>
<pager current=6 total=11 position="right" />
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'}
        ]
    }
});
```