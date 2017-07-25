---
title: 拖入
is_new: true
---
## 示例
### 基本形式

<!-- demo_start -->
<div class="m-example"></div>
<style>
.u-color {
    background: #fff;
    color: #fff;
    height: 128px;
    width: 128px;
    vertical-align: middle;
    display: inline-block;
    text-align: center;
    line-height: 128px;
}
.u-color-primary {
    background: #3c8dbc;
}
.u-color-warning{
    background:yellow;
}
.u-color-success{
    background:green;
}
.u-color-error{
    background:#ff0000;
}
.m-gridView {list-style: none; overflow: auto; margin: 0; padding: 0; width: 400px;}
.m-gridView li {float: left;}
.u-brick {box-sizing: border-box; cursor: default; width: 80px; height: 80px; margin: 8px; border: 2px solid #ddd; border-radius: 4px; line-height: 40px; text-align: center; background: #f4f4f4;}
.m-gridView li.z-dragSource > .u-brick {border: 2px dashed #00c0ef; background: transparent; font-size: 0;}
.m-listview {padding: 0;}
.m-listview > li.z-dragProxy {opacity: 0.7;}
.m-listview > li.z-dragTarget.z-dragTarget-before:before, .m-listview > li.z-dragTarget.z-dragTarget-after:after {
    content: ''; display: block;
    position: absolute; left: 0; right: 0; z-index: 2;
    border-top: 2px solid #3c8dbc;
}
.m-listview > li.z-dragTarget.z-dragTarget-before:before {top: -1px;}
.m-listview > li.z-dragTarget.z-dragTarget-after:after {bottom: -1px;}
</style>

```xml
<jr-draggable value="success"><div class="u-color u-color-success">拖我</div></jr-draggable>
<jr-draggable value="warning"><div class="u-color u-color-warning">拖我</div></jr-draggable>
<jr-draggable value="error"><div class="u-color u-color-error">拖我</div></jr-draggable>
<p></p>
<jr-droppable value={dropData}><div class="u-color u-color-{dropData || 'primary'}">放到这里</div></jr-droppable>
```
<!-- demo_end -->
### 事件

请打开浏览器的控制台查看结果。

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-draggable value="success"
    on-dragstart={console.log('on-dragstart:', '$event:', $event)}
    on-dragend={console.log('on-dragend:', '$event:', $event)}>
    <div class="u-color u-color-success">拖我</div>
</jr-draggable>
<jr-droppable value={dropData}
    on-dragenter={console.log('on-dragenter:', '$event:', $event)}
    on-dragleave={console.log('on-dragleave:', '$event:', $event)}
    on-drop={console.log('on-drop:', '$event:', $event)}>
    <div class="u-color u-color-{dropData || 'primary'}">放到这里</div>
</jr-droppable>
```
<!-- demo_end -->

### 列表排序（占位型）

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class="g-row">
    <div class="g-col g-col-6">
        <jr-droppable on-dragover={this._onListDragOver($event, {list: listA})}>
        <ul class="m-listview m-listview-gutter">
            {#list listA as item}
                <jr-droppable
                    on-dragover={this._onDragOver($event, {list: listA})}>
                <jr-draggable value={ @({item: item, list: listA}) }
                    on-dragend={this._onDragEnd($event)}>
                    <li><div>{item.text}</div></li>
                </jr-draggable>
                </jr-droppable>
            {/list}
        </ul>
        </jr-droppable>
    </div>
    <div class="g-col g-col-6">
        <jr-droppable on-dragover={this._onListDragOver($event, {list: listB})}>
        <ul class="m-listview m-listview-gutter">
            {#list listB as item}
                <jr-droppable
                    on-dragover={this._onDragOver($event, {list: listB})}>
                <jr-draggable value={ @({item: item, list: listB}) }
                    on-dragend={this._onDragEnd($event)}>
                    <li><div>{item.text}</div></li>
                </jr-draggable>
                </jr-droppable>
            {/list}
        </ul>
        </jr-droppable>
    </div>
</div>
```

```javascript
let component = new JRUI.Component({
    template,
    data: {
        listA: [
            {text: '选项A1'},
            {text: '选项A2'},
            {text: '选项A3'},
            {text: '选项A4'},
            {text: '选项A5'},
        ],
        listB: [
            {text: '选项B1'},
            {text: '选项B2'},
            {text: '选项B3'},
            {text: '选项B4'},
            {text: '选项B5'},
        ],
    },
    _getElementIndex(element) {
        return Array.prototype.indexOf.call(element.parentElement.children, element);
    },
    _onDragOver($event, tgt) {
        let source = $event.source;
        let target = $event.target;

        // 排除source和target相同的情况
        if(source === target)
            return;

        let sourceParent = source.parentElement;
        let targetParent = target.parentElement;
        let sourceIndex = this._getElementIndex(source);
        let targetIndex = this._getElementIndex(target);

        // 删除起始元素
        sourceParent.removeChild(source);

        // 再将起始元素插入到新的位置
        if(sourceIndex >= targetIndex || sourceParent !== targetParent)
            targetParent.insertBefore(source, target);
        else
            targetParent.insertBefore(source, target.nextElementSibling);

        // 记录目标列表
        this.data.tgt = tgt;
    },
    _onListDragOver($event, tgt) {
        let source = $event.source;
        let sourceParent = source.parentElement;
        let targetParent = $event.target;

        // 删除起始元素
        sourceParent.removeChild(source);
        // 再将起始元素插入到新的位置
        targetParent.appendChild(source);

        this.data.tgt = tgt;
    },
    _onDragEnd($event) {
        let src = $event.value;
        let tgt = this.data.tgt;
        if(!tgt) return;

        // 获取起始元素的初始位置
        src.index = src.list.indexOf(src.item);
        // 获取起始元素的结束位置
        tgt.index = this._getElementIndex($event.source);

        // 从起始列表中删除对象
        src.list.splice(src.index, 1);
        // 在目标列表中插入对象
        tgt.list.splice(tgt.index, 0, src.item);
    }
});
```
<!-- demo_end -->

### 网格排序（占位型）

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-droppable on-dragover={this._onListDragOver($event)}>
<ul class="m-gridView">
    {#list list as item}
        <jr-droppable
            on-dragover={this._onDragOver($event)}>
        <jr-draggable
            value={item}
            on-dragend={this._onDragEnd($event)}>
            <li><div class="u-brick">{item.text}</div></li>
        </jr-draggable>
        </jr-droppable>
    {/list}
</ul>
</jr-droppable>
```

```javascript
let _ = JRUI.util;
let list = [];
for(let i = 0; i < 15; i++)
    list.push({text: '选项C' + i});

let component = new JRUI.Component({
    template: template,
    data: {list: list},
    _getElementIndex(element) {
        return Array.prototype.indexOf.call(element.parentElement.children, element);
    },
    _onDragOver($event, tgt) {
        let source = $event.source;
        let target = $event.target;

        // 排除source和target相同的情况
        if(source === target)
            return;

        let sourceParent = source.parentElement;
        let targetParent = target.parentElement;
        let sourceIndex = this._getElementIndex(source);
        let targetIndex = this._getElementIndex(target);

        // 删除起始元素
        sourceParent.removeChild(source);

        // 再将起始元素插入到新的位置
        if(sourceIndex >= targetIndex || sourceParent !== targetParent)
            targetParent.insertBefore(source, target);
        else
            targetParent.insertBefore(source, target.nextElementSibling);

        // 记录目标列表
        this.data.tgt = tgt;
    },
    _onListDragOver($event, tgt) {
        let source = $event.source;
        let sourceParent = source.parentElement;
        let targetParent = $event.target;

        // 删除起始元素
        sourceParent.removeChild(source);
        // 再将起始元素插入到新的位置
        targetParent.appendChild(source);

        this.data.tgt = tgt;
    },
    _onDragEnd($event) {
        let src = $event.value;
        let tgt = this.data.tgt;
        if(!tgt) return;

        // 获取起始元素的初始位置
        src.index = src.list.indexOf(src.item);
        // 获取起始元素的结束位置
        tgt.index = this._getElementIndex($event.source);

        // 从起始列表中删除对象
        src.list.splice(src.index, 1);
        // 在目标列表中插入对象
        tgt.list.splice(tgt.index, 0, src.item);
    }
});
```
<!-- demo_end -->

### 列表排序（标记型）

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class="g-row">
    <div class="g-col g-col-6">
        <ul class="m-listview">
            {#list listA as item}
                <jr-droppable
                    on-dragover={this._onDragOver($event)}
                    on-drop={this._onDrop($event, {item: item, list: listA})}>
                <jr-draggable value={ @({item: item, list: listA}) }>
                    <li>{item.text}</li>
                </jr-draggable>
                </jr-droppable>
            {/list}
        </ul>
    </div>
    <div class="g-col g-col-6">
        <ul class="m-listview">
            {#list listB as item}
                <jr-droppable
                    on-dragover={this._onDragOver($event)}
                    on-drop={this._onDrop($event, {item: item, list: listB})}>
                <jr-draggable value={ @({item: item, list: listB}) }>
                    <li>{item.text}</li>
                </jr-draggable>
                </jr-droppable>
            {/list}
        </ul>
    </div>
</div>
```


```javascript
let component = new JRUI.Component({
    template,
    data: {
        listA: [
            {text: '选项A1'},
            {text: '选项A2'},
            {text: '选项A3'},
            {text: '选项A4'},
            {text: '选项A5'},
        ],
        listB: [
            {text: '选项B1'},
            {text: '选项B2'},
            {text: '选项B3'},
            {text: '选项B4'},
            {text: '选项B5'},
        ],
    },
    _onDragOver($event) {
        let target = $event.target;
        Regular.dom.delClass(target, 'z-dragTarget-before');
        Regular.dom.delClass(target, 'z-dragTarget-after');

        Regular.dom.addClass(target, 'z-dragTarget-' + ($event.ratioY < 0.5 ? 'before' : 'after'));
    },
    _onDrop($event, tgt) {
        let target = $event.target;
        Regular.dom.delClass(target, 'z-dragTarget-before');
        Regular.dom.delClass(target, 'z-dragTarget-after');

        let src = $event.value;
        src.index = src.list.indexOf(src.item);
        tgt.index = tgt.list.indexOf(tgt.item);

        // 从起始列表中删除对象
        src.list.splice(src.index, 1);
        
        // 计算目标列表中插入位置的index
        if(src.list === tgt.list) tgt.index--;
        if($event.ratioY >= 0.5) tgt.index++;
        if(tgt.index < 0) tgt.index = 0;

        // 在目标列表中插入对象
        tgt.list.splice(tgt.index, 0, src.item);

        console.log(src.item.text, 'insert', $event.ratioY < 0.5 ? 'before' : 'after', tgt.item.text);
    }
});
```
<!-- demo_end -->

### 列表排序（标记型） - 加强版

<!-- demo_start -->
<style>
.m-listview-gutter {padding: 7px 0; min-height: 240px;}
.m-listview-gutter > li {padding: 3px 10px;}
.m-listview-gutter > li:hover {background: none;}
.m-listview-gutter > li > div {background: #eee; padding: 5px 20px; border-radius: 2px;}
.m-listview-gutter > li.z-dragSource > div {opacity: 0.6;}
.m-listview-gutter.z-dragTarget.z-dragTarget-before:before, .m-listview-gutter.z-dragTarget.z-dragTarget-after:after  {
    content: ''; display: block;
    position: relative; z-index: 2;
    border-top: 2px solid #3c8dbc;
    top: -1px; margin-bottom: -2px;
}
</style>
<div class="m-example"></div>

```xml
<div class="g-row">
    <div class="g-col g-col-6">
        <jr-droppable
            on-dragover={this._onDragOver($event)}
            on-drop={this._onListDrop($event, {list: listA})}>
        <ul class="m-listview m-listview-gutter">
            {#list listA as item}
                <jr-droppable
                    on-dragover={this._onDragOver($event)}
                    on-drop={this._onDrop($event, {item: item, list: listA})}>
                <jr-draggable value={ @({item: item, list: listA}) }>
                    <li><div>{item.text}</div></li>
                </jr-draggable>
                </jr-droppable>
            {/list}
        </ul>
        </jr-droppable>
    </div>
    <div class="g-col g-col-6">
        <jr-droppable
            on-dragover={this._onDragOver($event)}
            on-drop={this._onListDrop($event, {list: listB})}>
        <ul class="m-listview m-listview-gutter">
            {#list listB as item}
                <jr-droppable
                    on-dragover={this._onDragOver($event)}
                    on-drop={this._onDrop($event, {item: item, list: listB})}>
                <jr-draggable value={ @({item: item, list: listB}) }>
                    <li><div>{item.text}</div></li>
                </jr-draggable>
                </jr-droppable>
            {/list}
        </ul>
        </jr-droppable>
    </div>
</div>
```

```javascript
let component = new JRUI.Component({
    template,
    data: {
        listA: [
            {text: '选项A1'},
            {text: '选项A2'},
            {text: '选项A3'},
            {text: '选项A4'},
            {text: '选项A5'},
        ],
        listB: [
            {text: '选项B1'},
            {text: '选项B2'},
            {text: '选项B3'},
            {text: '选项B4'},
            {text: '选项B5'},
        ],
    },
    _onDragOver($event) {
        let target = $event.target;
        Regular.dom.delClass(target, 'z-dragTarget-before');
        Regular.dom.delClass(target, 'z-dragTarget-after');

        Regular.dom.addClass(target, 'z-dragTarget-' + ($event.ratioY < 0.5 ? 'before' : 'after'));
    },
    _onDrop($event, tgt) {
        let target = $event.target;
        Regular.dom.delClass(target, 'z-dragTarget-before');
        Regular.dom.delClass(target, 'z-dragTarget-after');

        let src = $event.value;
        src.index = src.list.indexOf(src.item);
        tgt.index = tgt.list.indexOf(tgt.item);

        // 从起始列表中删除对象
        src.list.splice(src.index, 1);
        
        // 计算目标列表中插入位置的index
        if(src.list === tgt.list) tgt.index--;
        if($event.ratioY >= 0.5) tgt.index++;
        if(tgt.index < 0) tgt.index = 0;

        // 在目标列表中插入对象
        tgt.list.splice(tgt.index, 0, src.item);

        console.log(src.item.text, 'insert', $event.ratioY < 0.5 ? 'before' : 'after', tgt.item.text);
    },
    _onListDrop($event, tgt) {
        this._onDrop($event, {
            list: tgt.list,
            item: tgt.list[$event.ratioY >= 0.5 ? tgt.list.length - 1 : 0]
        });
    }
});
```
<!-- demo_end -->
