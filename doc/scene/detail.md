---
title: 详情页
type: scene
order: 1
---

详情页一般由多个模块组成

每个模块最外层包上`<div class="g-row m-module"></div>`

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class="g-row m-module">
	<h2 class="u-title">基础信息</h2>
	<ui.form>
	    <div class="g-row">
	        <form.item title="创建人" cols=4>
	            <ui.select source={source} value={creatorNoStr}/>
	        </form.item>
	        <form.item title="创建人" cols=4>
	            <ui.select source={source} value={creatorNoStr}/>
	        </form.item>
	        <form.item title="创建人" cols=4>
	            <ui.select source={source} value={creatorNoStr}/>
	        </form.item>
	    </div>
	    <div class="g-row">
	        <form.item title="创建人" cols=4>
	            <ui.select source={source} value={creatorNoStr}/>
	        </form.item>
	        <form.item title="创建人" cols=4>
	            <ui.select source={source} value={creatorNoStr}/>
	        </form.item>
	        <form.item title="创建人" cols=4>
	            <ui.select source={source} value={creatorNoStr}/>
	        </form.item>
	    </div>
	</ui.form>
</div>
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
