---
title: 表格
---

## 代码演示

### 基本

<!-- demo_start -->
<div class="m-example"></div>

```xml
<ui.table
    source={table.source}
    on-check={this.onCheck($event)}
>
    <table.col name="title" key="title">
        <table.template type="header">
            {'<check name={header.name} on-change={this.emitEvent("check",  $event, header)}/> <span>{header.name}</span>'}
        </table.template>
    </table.col>
    <table.col name="value" key="value">
    </table.col>
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
    onCheck: function(e) {
        console.log(e);
    },
    init: function() {
        setTimeout(function() {
            this.data.table.source = [];
            for(var i = 0; i < 3; ++i) {
                this.data.table.source.push({
                    title: 'test' + i,
                    col1: '' + i,
                    value: 10 * i,
                    value2: 'adjasdlfj askldjf klasjdfkl jakldsfj aklsdjf klajsfdl jsdlkfj asdljakl jaklsdjf klasdjf klajsdklf jakls fjd'
                });
            }
            this.$update();
        }.bind(this), 200);
    }
});
```
<!-- demo_end -->

### 表头与底部操作栏悬浮

<!-- demo_start -->
<div class="m-example"></div>

```xml
<!-- <ui.table
    stickyHeader
    stickyFooter
    width=778
    lineClamp=3
    source={table.source}
    sorting={table.sorting}
    on-checkchange={this.onCheck($event)}
    on-sort={this.onSort($event)}
    on-clicka={this.onClickA($event)}
    on-expand={this.onExpand($event)}
>
    <table.col name="title" key="title" width="100" sortable type="check">
        <table.template>
            {'<a on-click={this.emitEvent("clicka", item)}>{item.title} > {item.value}</a>'}
            {'<div>{item.col1}</div>'}
        </table.template>
        <table.template type="sub">
            {'<div style="padding: 20px 30px;"><bi.table columns={item.columns} source={item.source}/></div>'}
            {'{item.title}'}
        </table.template>
    </table.col>
    <table.col name="col1">
        <table.col name="col1.1">
            <table.col name="col1.1.2" key="value" width="160" sortable >
                <table.template type="sub">
                    {'<bi.table columns={item.columns} source={item.source}/>'}
                    {'{item.title}'}
                </table.template>
            </table.col>
            <table.col name="col1.1.3" key="value2" width="160" />
        </table.col>
        <table.col name="col1.2" key="value" width="160" />
    </table.col>
    <table.col name="value" key="value" width="200" sortable />
</ui.table> -->
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        // loading: true,
        table: {
            sorting: {
                key: 'title',
                isAsc: 0
            },
            paging: {
                total: 10,
                current: 1
            },
            config: {
                textAlign: 'center',
            },
            source: []
        }
    },
    init: function() {
        setTimeout(function() {
            this.data.table.source = [];
            for(var i = 0; i < 20; ++i) {
                this.data.table.source.push({
                    title: 'test' + i,
                    col1: '' + i,
                    value: 10 * i,
                    value2: 'adjasdlfj askldjf klasjdfkl jakldsfj aklsdjf klajsfdl jsdlkfj asdljakl jaklsdjf klasdjf klajsdklf jakls fjd'
                });
            }
            this.$update();
        }.bind(this), 200);
    },
    onCheck: function(e) {
        console.log(e);
    },
    onExpand: function(e) {
        e.item.columns = [
            {
                name: 'test',
                key: 'value'
            }
        ];
        setTimeout(function() {
            e.item.source = [
                {
                    value: 't1'
                },
                {
                    value: 't2'
                }
            ];
            this.$update();
        }.bind(this), 1000);
    },
    onSort: function(e) {
        console.log(e);
    },
    onClickA: function(e) {
        console.log(e);
    }
});
```
<!-- demo_end -->

### 表头固定在表格顶部

<!-- demo_start -->
<div class="m-example"></div>

```xml
<!-- <ui.table
    width=700
    height=200
    fixedHeader
    columns={table.columns}
    sorting={table.sorting}
    paging={table.paging}
    source={table.source}
    loading={loading}
/> -->
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
