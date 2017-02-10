---
title: 列表页
type: scene
order: 2
---

## 页面布局分为三个部分 

### 第一部分 表单搜索部分

** 注意事项 **
* 选项一行固定排列四个
* 超过三行使用折叠面板

<!-- demo_start -->
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
var component = new NEKUI.Component({
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
<!-- demo_end -->

### 第二部分 页面上按钮操作部分 

** 注意事项 **
* 操作按钮居右排列

<!-- demo_start -->
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
        <div class="mainOperate">
            <ui.button title="重置" on-click={this.reset()} />
            <ui.button title="搜索" on-click={this.refresh(condition)} />
            <a on-click={this.toggle()}>折叠</a>
        </div>
    </div>
</ui.form>
```

```javascript
var component = new NEKUI.Component({
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
    },
    reset: function() {
        this.data.condition = {}
    }
});
```
<!-- demo_end -->

### 第三部分 表格部分

*** 注意事项 *** 
* 全部居中，只有横线；
* 表格右上方导出按钮；
* 过长的文字左对齐；
* 数字格式化方式三个逗号分隔，右对齐

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class="g-row m-module">
    <div class="u-title">
        基础信息
        <span></span>
    </div>
    <div class="formTable">
        <table class="m-table">
            <thead>
                <tr><th>表格标题</th><th>数量</th><th>价格</th><th>表格标题</th><th>表格标题</th></tr>
            </thead>
            <tbody>
                <tr><td class="f-tal">表格内容表格内容表格内容表格</td><td class="f-tar">12,123,123</td><td class="f-tar">123.00</td><td>表格标题</td><td>表格标题</td></tr>
                <tr><td class="f-tal">表格内容</td><td class="f-tar">123,123</td><td class="f-tar">98.23</td><td>表格标题</td><td>表格标题</td></tr>
                <tr><td class="f-tal">表格内容</td><td class="f-tar">2,234</td><td class="f-tar">12.99</td><td>表格标题</td><td>表格标题</td></tr>
            </tbody>
        </table>
    </div>
    <div class="formPager">  
        <pager current=6 total=11 position="right" />
    </div>
</div>
```
<!-- demo_end -->

### 完整示例

<!-- demo_start -->
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
var component = new NEKUI.Component({
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
<!-- demo_end -->
