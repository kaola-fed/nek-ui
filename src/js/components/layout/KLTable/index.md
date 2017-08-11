---
title: 表格
---

<!-- demo_start -->
*基本*

<div class="m-example"></div>

```xml
<kl-table source={table.source}>
    <kl-table-col name="title" key="title" width=150 />
    <kl-table-col name="value" key="value" tip="I am tip"/>
</kl-table>
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
                value: 10 * i
            });
        }
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
*显示配置项*

1. 无条纹：`strip={false}`
2. 占位符：默认`placeholder="-"`
3. 对齐：默认 `align="center"`
<div class="m-example"></div>

```xml
<kl-table strip={false} source={table.source} placeholder="*" align="left">
    <kl-table-col name="title" key="title" />
    <kl-table-col name="key" key="key" />
    <kl-table-col name="value" key="value" placeholder="-" align="right"/>
</kl-table>
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
                    title: 'test' + i
                });
            }
            this.$update();
        }.bind(this), 200);
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
*过滤器*

`filter` 接收一个 `function`，依次可以取得参数 `val`，`item`，`itemIndex`。

<div class="m-example"></div>

```xml
<kl-table source={table.source} >
    <kl-table-col name="title" key="title" filter={this.titleFilter}/>
    <kl-table-col name="value" key="value" />
</kl-table>
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
                    value: 10 * i
                });
            }
            this.$update();
        }.bind(this), 200);
    },
    titleFilter: function(val, item, itemIndex) {
        return itemIndex + ': ' + val + ' *';
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
*多级表头*

<div class="m-example"></div>

```xml
<kl-table source={table.source} >
    <kl-table-col name="title" key="title" width="100" />
    <kl-table-col name="col1">
        <kl-table-col name="col1.1">
            <kl-table-col name="col1.1.2" key="value" width="160" />
            <kl-table-col name="col1.1.3" key="value2" width="160" />
        </kl-table-col>
        <kl-table-col name="col1.2" key="value" width="160" />
    </kl-table-col>
    <kl-table-col name="value" key="value" width="200" />
</kl-table>
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

<!-- demo_start -->
*悬浮表头和底部*

控制表头和底部的悬浮需要对 `scroll` 事件进行监听，在默认的情况下，监听对象是 `window`，即页面的滚动。

如果页面布局比较特殊，需要指定监听的对象，则可以通过 `scrollParent` 指定会发生滚动的容器，如 `scrollParent="#example"`。

<div class="m-example" id="example"></div>

```xml
<kl-table
    stickyHeader
    stickyFooter
    stickyHeaderOffset=64
    stickyFooterOffset=0
    source={table.source} >
    <kl-table-col name="title" key="title" width=500 />
    <kl-table-col name="value" key="value" width=500 />
</kl-table>
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
                value: 10 * i
            });
        }
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
*表头固定在表格顶部*

<div class="m-example"></div>

```xml
<kl-table fixedHeader height=200 source={table.source}>
    <kl-table-col name="title" key="title" />
    <kl-table-col name="value" key="value" />
</kl-table>
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
                value: 10 * i
            });
        }
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
*固定列*

<div class="m-example"></div>

```xml
<kl-table fixedHeader height=200 source={table.source}>
    <kl-table-col name="title" key="title" fixed/>
    <kl-table-col name="col1" key="col1" />
    <kl-table-col name="value" key="value" fixed="right"/>
</kl-table>
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

<!-- demo_start -->
*自定义模版与filter*

通过 `kl-table-template` 组件定义单元格和表头的模版，可以将模版内嵌到组件中，也可以将模版注入到组件的 `template` 属性。
自定义模版中可以通过 `emit` 的方法向上抛出事件。
如果模版直接写在`kl-table`当中，这部分模版会被作为footer模版进行渲染。这部分模版不需要进行特殊的字符串处理，并可以直接进行数据绑定。

要在模版中使用自定义的 `filter` 则需要将其先注册到 `NEKUI.KLTable` 上。

注意：
1. 内嵌形式的模版需要在每行的两端加上 `{'`、`'}` ，否则模版字符串的插值会无法传递给模版组件，
2. 原有的 `emitEvent` 方法不建议使用，但仍然保留。

`kl-table-col`上亦可以直接传入对应的模版属性， `template`，`headerTemplate`，`formatter`，`headerFormatter`，`format`，`headerFormat`。

<div class="m-example"></div>

```xml
<kl-table
    stickyFooter
    source={table.source}
    on-itemclick={this.onItemClick($event)} on-headerclick={this.onHeaderClick($event)} >
    <kl-table-col name="title" key="title">
        <kl-table-template type="header">
            {'<a href={header.name+">+~!!@#$%^&*()"} on-click={this.emit("headerclick", header)}>I am && {header.name}</a>'}
            {'<anchor/>'}
        </kl-table-template>
        <kl-table-template template={tdTpl} />
    </kl-table-col>
    <kl-table-col name="value" key="value" />

    <kl-pager
        pageSize={pageSize}
        current={current}
        sumTotal={sumTotal}
    />
</kl-table>
```

```javascript
var anchor = NEKUI.Component.extend({
    name: 'anchor',
    template: '<a>&nbsp;anchor</a>',
});

NEKUI.KLTable.filter('txtFilter', function(val) {
    return val + '*';
});

var component = new NEKUI.Component({
    template: template,
    data: {
        count: 0,
        table: {
            source: [],
        },
        pageSize:15,
        current:1,
        sumTotal:100,
        tdTpl: '<a on-click={this.emit("itemclick", item, this)}>I am {item.title | txtFilter}</a>'
    },
    init: function() {
        this.$watch('current', function(newVal) {
            console.log(newVal);
        });

        this.data.table.source = [];
        for(var i = 0; i < 3; ++i) {
            this.data.table.source.push({
                title: 'test' + i,
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

<!-- demo_start -->
*自定义行样式*

通过设置 `item.rowClass` 或 `item.rowStyle` 修改每一行的样式。

<div class="m-example"></div>

```xml
<kl-table stickyHeader source={table.source}>
    <kl-table-col name="title" key="title" />
    <kl-table-col name="value" key="value" />
</kl-table>
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
                value: 10 * i,
                rowStyle: 'background-color:' + colors[i]
            });
        }
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
*排序*

没有实际的排序效果，请查看 console 打印的事件对象。

<div class="m-example"></div>

```xml
<kl-table source={table.source} sorting={table.sorting} on-sort={this.onSort($event)}>
    <kl-table-col name="title" key="title" customKey="sort_title" sortable />
    <kl-table-col name="value" key="value" sortable/>
</kl-table>
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

<!-- demo_start -->
*分页*

分页的配置参考 [分页 Pager](/components/navigation_pager_.html) 。

<div class="m-example"></div>

```xml
<kl-table stickyFooter source={table.source} paging={table.paging} on-paging={this.onPaging($event)}>
    <kl-table-col name="title" key="title" />
    <kl-table-col name="value" key="value" />
</kl-table>
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

<!-- demo_start -->
*多选*

通过 `enableCheckAll`

<div class="m-example"></div>

```xml
<kl-table source={table.source} on-checkchange={this.onCheck($event)}>
    <kl-table-col placeholder="" type="check" enableCheckAll  />
    <kl-table-col name="title" key="title" type="check"/>
    <kl-table-col name="value" key="value" />
</kl-table>
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

<!-- demo_start -->
*数据配置*

在进行数据配置时，模版的配置方式更为灵活。

1. `template`，模版字符串；
2. `format`，纯粹的字符串格式化，不对html进行渲染，保留插值语法；
3. `formatter`，通过函数返回模版字符串，适用于当模版需要动态运算生成的情景。

加上前缀 `header` 成为 `headerTemplate`，`headerFormat`，`headerFormatter`，可作为表头的模版。

<div class="m-example"></div>

```xml
<kl-table
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
                            custom: 'sortField',
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

<!-- demo_start -->
*空数据*

<div class="m-example"></div>

```xml
<kl-table>
    <kl-table-col name="title" key="title" />
    <kl-table-col name="value" key="value" />
</kl-table>
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

<!-- demo_start -->
*加载中*

<div class="m-example"></div>

```xml
<kl-table loading={true}>
    <kl-table-col name="title" key="title" />
    <kl-table-col name="value" key="value" />
</kl-table>
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

<!-- demo_start -->
*模版中获取外部数据的方法*

由于组件的设计结构比较特殊，表格中表头和内容分别是两个独立的组件，因此　`kl-table` 上挂载的属性无法直接传递到表头和内容当中。

如有需要取得外部的数据，则需要通过 `this.$table.data` 或者 `this.$tableData` 去获取。

<div class="m-example"></div>

```xml
<kl-table source={table.source} count={count}>
    <kl-table-col name="title" key="title" template={tdTpl} headerTemplate={thTpl}/>
    <kl-table-col name="value" key="value" />
</kl-table>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        count: 0,
        thTpl: '{header.name + " :" + this.$tableData.count}',
        tdTpl: '{item.title + " :" + this.$table.data.count}',
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
        setInterval(function() {
            this.data.count++;
            this.$update();
        }.bind(this), 1000);
    },
});
```
<!-- demo_end -->

### 特殊

由于组件内部有部分模版是使用字符串形式存储，只有在使用时才是进行解析，因此当页面对 `Regular` 的插值符号进行修改时，需要进行特殊处理。

为了向组件内部传递新修改的插值，需要在 `Regular` 下挂载两个新的属性 `_BEGIN_`， `_END_`。


```javascript
Regular._BEGIN_ = '{{';
Regular._END_ = '}}';
Regular.config({
    BEGIN: Regular._BEGIN_,
    END: Regular._END_
});
```

