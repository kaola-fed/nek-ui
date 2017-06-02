---
title: UI表格
---

## 代码演示

### 基本

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.table source={table.source} >
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

### 条纹

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.table strip source={table.source} >
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
<ui.table stickyHeader stickyFooter width=700 source={table.source} >
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
<ui.table fixedHeader width=700 height=200 source={table.source}>
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
<ui.table fixedHeader width=700 height=200 source={table.source}>
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

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.table width=700 height=200 source={table.source}>
    <table.col name="title" key="title">
        <table.template type="header">
            {"<a>I\'m {header.name}</a>"}
        </table.template>
        <table.template>
            {"<a>I\'m {item.title}</a>"}
        </table.template>
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

### 排序

没有实际的排序效果，请查看 console 打印的事件对象。

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.table width=700 source={table.source} sorting={table.sorting} on-sort={this.onSort($event)}>
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

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.table width=700 height=200 source={table.source} paging={table.paging} on-paging={this.onPaging($event)}>
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

### 数据配置

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.table
    width=700
    height=200
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
        // loading: true,
        table: {
            config: {
                textAlign: 'center'
            },
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
