---
title: 表格
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
    <table.col name="title" key="title" width="500" />
    <table.col name="value" key="value" width="500" />
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

### 自定义模版

### 排序

### 分页

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
                    // fixed: true,
                    template: ['<span>{item.title} - {item.col1}</span>', '<span>asd</span>'],
                    width: 120,
                    // formatter:[
                    //     function() {
                    //         return '<p><a>1</a></p>';
                    //     },
                    //     function() {
                    //         return '<a>2</a>';
                    //     },
                    // ]
                    // format: [
                    //     'as', '<p>{item.title}</p>'
                    // ]
                },
                {
                    name: 'col1',
                    key: 'col1',
                    sortable: true,
                    children: [
                        {
                            name: 'col1.2',
                            key: 'col1',
                            sortable: true
                        },
                        {
                            name: 'col1.3',
                            key: 'col1',
                            sortable: true
                        }
                    ]
                },
                {
                    name: 'col2',
                    key: 'col2',
                    sortable: true
                },
                {
                    name: 'col3',
                    key: 'col3',
                    sortable: true
                },
                {
                    name: 'value',
                    key: 'value',
                    type: 'progress'
                }
            ],
            sorting: {
                key: 'col1',
                isAsc: 0
            },
            paging: {
                total: 10,
                current: 1
            },
            source: [
                {
                    title: 'test0',
                    col1: '0000',
                    value: [10, 20]
                },
                {
                    title: 'test1',
                    col1: '1111',
                    value: '80%'
                },
                {
                    title: 'test1',
                    col1: '1111',
                    value: '80%'
                },
                {
                    title: 'test1',
                    col1: '1111',
                    value: '80%'
                },
                {
                    title: 'test1',
                    col1: '1111',
                    value: '80%'
                },
                {
                    title: 'test1',
                    col1: '1111',
                    value: '80%'
                },
                {
                    title: 'test1',
                    col1: '1111',
                    value: '80%'
                }
            ]
        }
    }
});
```
<!-- demo_end -->
