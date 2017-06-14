---
title: UI表格
---

## 代码演示

### 基本

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.table source={table.source}>
    <table.col name="title" key="title" />
    <table.col name="value" key="value" tip="I am tip"/>
</ui.table>
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
                col1: '' + i,
                value: 10 * i
            });
        }
    }
});
```
<!-- demo_end -->

### 无条纹

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.table strip={false} source={table.source} >
    <table.col name="title" key="title" />
    <table.col name="value" key="value" />
</ui.table>
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
        setTimeout(function() {
            this.data.table.source = [];
            for(var i = 0; i < 3; ++i) {
                this.data.table.source.push({
                    title: 'test' + i,
                    col1: '' + i,
                    value: 10 * i
                });
            }
            this.$update();
        }.bind(this), 200);
    }
});
```
<!-- demo_end -->

### 过滤器

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.table source={table.source} >
    <table.col name="title" key="title" filter={this.titleFilter}/>
    <table.col name="value" key="value" />
</ui.table>
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
        setTimeout(function() {
            this.data.table.source = [];
            for(var i = 0; i < 3; ++i) {
                this.data.table.source.push({
                    title: 'test' + i,
                    col1: '' + i,
                    value: 10 * i
                });
            }
            this.$update();
        }.bind(this), 200);
    },
    titleFilter: function(val) {
        return '* ' + val + ' *';
    }
});
```
<!-- demo_end -->

### 多级表头

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.table source={table.source} >
    <table.col name="title" key="title" width="100" />
    <table.col name="col1">
        <table.col name="col1.1">
            <table.col name="col1.1.2" key="value" width="160" />
            <table.col name="col1.1.3" key="value2" width="160" />
        </table.col>
        <table.col name="col1.2" key="value" width="160" />
    </table.col>
    <table.col name="value" key="value" width="200" />
</ui.table>
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
                col1: '' + i,
                value: 10 * i,
                value2: 'test'
            });
        }
    }
});
```
<!-- demo_end -->


### 悬浮表头和底部

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.table
    stickyHeader
    stickyFooter
    stickyHeaderOffset=64
    stickyFooterOffset=0
    source={table.source} >
    <table.col name="title" key="title" width=500 />
    <table.col name="value" key="value" width=500 />
</ui.table>
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
        for(var i = 0; i < 20; ++i) {
            this.data.table.source.push({
                title: 'test' + i,
                col1: '' + i,
                value: 10 * i
            });
        }
    }
});
```
<!-- demo_end -->

### 悬浮表头和底部(指定监听滚动的容器)

<!-- demo_start -->
<div class="m-example" id="m-ext" style="height: 400px; overflow-y: scroll;"></div>

```xml
<ui.table
    stickyHeader
    stickyFooter
    stickyHeaderOffset=64
    stickyFooterOffset=0
    source={table.source}
    scrollParent="#m-ext" >
    <table.col name="title" key="title" width=500 />
    <table.col name="value" key="value" width=500 />
</ui.table>
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
        for(var i = 0; i < 20; ++i) {
            this.data.table.source.push({
                title: 'test' + i,
                col1: '' + i,
                value: 10 * i
            });
        }
    }
});
```
<!-- demo_end -->

### 表头固定在表格顶部

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.table fixedHeader height=200 source={table.source}>
    <table.col name="title" key="title" />
    <table.col name="value" key="value" />
</ui.table>
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
        for(var i = 0; i < 20; ++i) {
            this.data.table.source.push({
                title: 'test' + i,
                col1: '' + i,
                value: 10 * i
            });
        }
    }
});
```
<!-- demo_end -->

### 固定列

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.table fixedHeader height=200 source={table.source}>
    <table.col name="title" key="title" fixed/>
    <table.col name="col1" key="col1" />
    <table.col name="value" key="value" fixed="right"/>
</ui.table>
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
        for(var i = 0; i < 20; ++i) {
            this.data.table.source.push({
                title: 'test' + i,
                col1: '' + i,
                value: 10 * i
            });
        }
    }
});
```
<!-- demo_end -->

### 自定义模版

通过 `table.template` 组件定义单元格和表头的模版，可以将模版内嵌到组件中，也可以将模版注入到组件的 `template` 属性。
自定义模版中可以通过 `emitEvent` 的方法向上抛出事件。
注意：内嵌形式的模版需要在每行的两端加上 `{'`、`'}` ，否则模版字符串的插值会无法传递给模版组件。

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.table source={table.source} on-itemclick={this.onItemClick($event)} on-headerclick={this.onHeaderClick($event)}>
    <table.col name="title" key="title">
        <table.template type="header">
            {'<a on-click={this.emitEvent("headerclick", header)}>I am {header.name}</a>'}
        </table.template>
        <table.template template={tdTpl} />
    </table.col>
    <table.col name="value" key="value" />
</ui.table>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        table: {
            source: []
        },
        tdTpl: '<a on-click={this.emitEvent("itemclick", item)}>I am {item.title}</a>'
    },
    init: function() {
        this.data.table.source = [];
        for(var i = 0; i < 3; ++i) {
            this.data.table.source.push({
                title: 'test' + i,
                col1: '' + i,
                value: 10 * i
            });
        }
    },
    onItemClick: function(e) {
        console.log(e);
    },
    onHeaderClick: function(e) {
        console.log(e);
    }
});
```
<!-- demo_end -->

### 自定义行样式

通过设置 `item.trClass` 或 `item.trStyle` 修改每一行的样式。

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.table stickyHeader source={table.source}>
    <table.col name="title" key="title" />
    <table.col name="value" key="value" />
</ui.table>
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
        var colors = ['#FFBC07', '#E89406', '#FF8306', '#E85706', '#FF3B07'];
        this.data.table.source = [];
        for(var i = 0; i < 5; ++i) {
            this.data.table.source.push({
                title: 'test' + i,
                col1: '' + i,
                value: 10 * i,
                trStyle: 'background-color:' + colors[i]
            });
        }
    }
});
```
<!-- demo_end -->

### 排序

没有实际的排序效果，请查看 console 打印的事件对象。

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.table source={table.source} sorting={table.sorting} on-sort={this.onSort($event)}>
    <table.col name="title" key="title" sortable/>
    <table.col name="value" key="value" sortable/>
</ui.table>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        table: {
            source: [],
            sorting: {
                key: 'title',
                isAsc: 0
            }
        }
    },
    init: function() {
        this.data.table.source = [];
        for(var i = 0; i < 3; ++i) {
            this.data.table.source.push({
                title: 'test' + i,
                col1: '' + i,
                value: 10 * i
            });
        }
    },
    onSort: function(e) {
        console.log(e);
    }
});
```
<!-- demo_end -->

### 分页

分页的配置参考 [分页 Pager](/components/navigation_pager_.html) 。
<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.table stickyFooter source={table.source} paging={table.paging} on-paging={this.onPaging($event)}>
    <table.col name="title" key="title" />
    <table.col name="value" key="value" />
</ui.table>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        table: {
            source: [],
            paging: {
                pageSize: 10,
                sumTotal: 100,
                current: 1
            }
        }
    },
    init: function() {
        this.data.table.source = [];
        for(var i = 0; i < 20; ++i) {
            this.data.table.source.push({
                title: 'test' + i,
                col1: '' + i,
                value: 10 * i
            });
        }
    },
    onPaging: function(e) {
        console.log(e);
    }
});
```
<!-- demo_end -->

### 多选

<!-- demo_start -->
<div class="m-example"></div>

```xml
<check
    name="全选"
    checked={checkAllStatus}
/>

<ui.table source={table.source} on-checkchange={this.onCheck($event)}>
    <table.col name="title" key="title" type="check" />
    <table.col name="value" key="value" />
</ui.table>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    computed: {
        checkAllStatus: {
            get: function() {
                var checkedList = this.data.table.source.filter(function(item) {
                    return item._checked;
                });

                return checkedList.length === this.data.table.source.length ? true :
                                                    checkedList.length > 0 ? null :
                                                                            false;

            },
            set: function(val) {
                if(val !== null) {
                    this.data.table.source.forEach(function(item) {
                        item._checked = !!val;
                    });
                }
            }
        }
    },
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
                col1: '' + i,
                value: 10 * i
            });
        }
    },
    onCheck: function(e) {
        console.log(e);
    }
});
```
<!-- demo_end -->

### 数据配置

在进行数据配置时，模版的配置方式更为灵活。

1. `template`，模版字符串；
2. `format`，纯粹的字符串格式化，不对html进行渲染，保留插值语法；
3. `formatter`，通过函数返回模版字符串，适用于当模版需要动态运算生成的情景。

加上前缀 `header` 成为 `headerTemplate`，`headerFormat`，`headerFormatter`，可作为表头的模版。

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.table
    fixedHeader
    columns={table.columns}
    sorting={table.sorting}
    paging={table.paging}
    source={table.source}
    loading={loading}
/>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        table: {
            columns: [
                {
                    name: 'title',
                    key: 'title',
                    tip: 'tippppppp',
                    width: 120,
                    formatter: function(column, item) {
                        return '<a>I\'m ' + item.title + '</a>';
                    },
                },
                {
                    name: 'col1',
                    key: 'col1',
                    children: [
                        {
                            name: 'col1.2',
                            key: 'value',
                            format: '{item.value} %',
                            sortable: true
                        },
                        {
                            name: 'col1.3',
                            key: 'col1',
                            sortable: true
                        }
                    ]
                }
            ],
            sorting: {
                key: 'col1',
                isAsc: 0
            },
            paging: {
                pageSize: 10,
                sumTotal: 100,
                current: 1
            },
            source: []
        }
    },
    init: function() {
        this.data.table.source = [];
        for(var i = 0; i < 5; ++i) {
            this.data.table.source.push({
                title: 'test' + i,
                col1: '' + i,
                value: 10 * i
            });
        }
    }
});
```
<!-- demo_end -->


### 空数据

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.table width=700>
    <table.col name="title" key="title" />
    <table.col name="value" key="value" />
</ui.table>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        table: {
        }
    }
});
```
<!-- demo_end -->

### 加载中

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.table width=700 loading={true}>
    <table.col name="title" key="title" />
    <table.col name="value" key="value" />
</ui.table>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        table: {
        }
    }
});
```
<!-- demo_end -->
