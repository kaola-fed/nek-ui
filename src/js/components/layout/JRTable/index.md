---
title: 表格
---

## 代码演示

<!-- demo_start -->
### 基本使用形式一：配置模板

<div class="m-example"></div>

```xml
<jr-table source={table.source}>
    <jr-table-col name="姓名" key="name" width=150 />
    <jr-table-col name="年龄" key="age" tip="I am tip"/>
</jr-table>
```

```javascript
var component = new JRUI.Component({
    template: template,
    data: {
        table: {
            source: [{
                name: '小明',
                age: 20
            }, {
                name: '小红',
                age: 18
            }]
        }
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 基本使用形式二：数据配置

在进行数据配置时，模版的配置方式更为灵活。

1. `template`，模版字符串；
2. `format`，纯粹的字符串格式化，不对html进行渲染，保留插值语法；
3. `formatter`，通过函数返回模版字符串，适用于当模版需要动态运算生成的情景。

加上前缀 `header` 成为 `headerTemplate`，`headerFormat`，`headerFormatter`，可作为表头的模版。

<div class="m-example"></div>

```xml
<jr-table
    fixedHeader
    columns={table.columns}
    sorting={table.sorting}
    paging={table.paging}
    source={table.source}
    loading={loading}
/>
```

```javascript
var source = [{
    job: '前端',
    name: '小明',
    age: 20,
}, {
    job: '前端',
    name: '小红',
    age: 22,
}, {
    job: '后端',
    name: '小王',
    age: 20,
}, {
    job: '后端',
    name: '小李',
    age: 25,
}];

var component = new JRUI.Component({
    template: template,
    data: {
        table: {
            columns: [
                {
                    name: '职位',
                    key: 'job',
                    tip: '所属部门的职位类别',
                    width: 120,
                    formatter: function(column, item) {
                        return '职位' + item.job;
                    },
                },
                {
                    name: '用户信息',
                    children: [
                        {
                            name: '姓名',
                            key: 'name',
                            format: '姓名：{item.name}',
                            custom: 'sortField',
                            sortable: true
                        },
                        {
                            name: '年龄',
                            key: 'age',
                            sortable: true
                        }
                    ]
                }
            ],
            sorting: {
                key: 'name',
                isAsc: 0
            },
            paging: {
                pageSize: 10,
                sumTotal: 100,
                current: 1
            },
            source: source
        }
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 多选

通过 `enableCheckAll` 使能全选按钮

<div class="m-example"></div>

```xml
<jr-table source={table.source} on-checkchange={this.onCheck($event)}>
    <jr-table-col width=50 placeholder="" type="check" enableCheckAll  />
    <jr-table-col name="职位" key="job" />
    <jr-table-col name="姓名" key="name" />
    <jr-table-col name="年龄" key="age" />
</jr-table>
```

```javascript
var source = [{
    job: '前端开发',
    name: '小明',
    age: 20,
}, {
    job: '前端开发',
    name: '小红',
    age: 22,
}, {
    job: '后端开发',
    name: '小王',
    age: 20,
}, {
    job: '后端开发',
    name: '小李',
    age: 25,
}];
var component = new JRUI.Component({
    template: template,
    data: {
        table: {
            source: source
        }
    },
    onCheck: function(e) {
        console.log(e);
    }
});
```
<!-- demo_end -->


<!-- demo_start -->
### 显示样式配置项

1. 无条纹：`strip={false}`
2. 占位符：默认`placeholder="-"`
3. 对齐：默认 `align="center"`

<div class="m-example"></div>

```xml
<jr-table strip={false} source={table.source} placeholder="*" align="left">
    <jr-table-col name="职位" key="job" />
    <jr-table-col name="姓名" key="" />
    <jr-table-col name="年龄" key="" placeholder="-" align="right"/>
</jr-table>
```

```javascript
var source = [{
    job: '前端',
    name: '小明',
    age: 20,
}, {
    job: '前端',
    name: '小红',
    age: 22,
}, {
    job: '后端',
    name: '小王',
    age: 20,
}, {
    job: '后端',
    name: '小李',
    age: 25,
}];
var component = new JRUI.Component({
    template: template,
    data: {
        table: {
            source: source
        }
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 过滤器

`filter` 接收一个 `function`，依次可以取得参数 `val`，`item`，`itemIndex`。

<div class="m-example"></div>

```xml
<jr-table source={table.source} >
    <jr-table-col name="姓名" key="name" filter={this.filterName} />
    <jr-table-col name="出生日期" key="birthday"  filter={this.filterTime} />
</jr-table>
```

```javascript
var source = [{
    name: '小明',
    birthday: 766108800000,
}, {
    name: '小红',
    birthday: 766108800000,
}, {
    name: '小王',
    birthday: 766108800000,
}, {
    name: '小李',
    birthday: 766108800000,
}];
var component = new JRUI.Component({
    template: template,
    data: {
        table: {
            source: source
        }
    },
    _fmtnmb: function(_number){
        _number = parseInt(_number) || 0;
        return ( _number < 10 ? '0' : '' ) + _number;
    },
    filterTime: function(val, item, itemIndex) {
        if (!val) {
                return '';
        }
        var _fmtnmb = function(_number){
            _number = parseInt(_number) || 0;
            return ( _number < 10 ? '0' : '' ) + _number;
        };
        var _time = new Date(val);
        var _year = _time.getFullYear();
        var _month = _fmtnmb( _time.getMonth() + 1 );
        var _day = _fmtnmb( _time.getDate() );
        return _year + '-' + _month + '-' + _day;
    },
    filterName: function(val, item, itemIndex) {
        return itemIndex + ': ' + val;
    },
});
```
<!-- demo_end -->


<!-- demo_start -->
### 多级表头
<div class="m-example"></div>

```xml
<jr-table source={table.source} >
    <jr-table-col name="日期" key="date" />
    <jr-table-col name="收货地址">
        <jr-table-col name="姓名" key="name" />
        <jr-table-col name="地址">
            <jr-table-col name="省" key="province" />
            <jr-table-col name="市" key="city" />
        </jr-table-col>
    </jr-table-col>
    <jr-table-col name="是否已支付" key="isPaid" />
</jr-table>
```

```javascript
var source = [{
    date: '2017-08-18',
    name: '小明',
    province: '浙江省',
    city: '杭州市',
    isPaid: '是'
}, {
    date: '2017-08-18',
    name: '小明',
    province: '浙江省',
    city: '杭州市',
    isPaid: '是'
}, {
    date: '2017-08-18',
    name: '小明',
    province: '浙江省',
    city: '杭州市',
    isPaid: '是'
}, {
    date: '2017-08-18',
    name: '小明',
    province: '浙江省',
    city: '杭州市',
    isPaid: '是'
}];
var component = new JRUI.Component({
    template: template,
    data: {
        table: {
            source: source
        }
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 悬浮表头和底部

控制表头和底部的悬浮需要对 `scroll` 事件进行监听，在默认的情况下，监听对象是 `window`，即页面的滚动。

如果页面布局比较特殊，需要指定监听的对象，则可以通过 `scrollParent` 指定会发生滚动的容器，如 `scrollParent="#example"`。

<div class="m-example" id="example"></div>

```xml
<jr-table
    stickyHeader
    stickyFooter
    stickyHeaderOffset=64
    stickyFooterOffset=0
    source={table.source} >
    <jr-table-col name="工号" key="no" width=500 />
    <jr-table-col name="职位" key="job" width=500 />
    <jr-table-col name="联系电话" key="phone" width=500 />
</jr-table>
```

```javascript
var component = new JRUI.Component({
    template: template,
    data: {
        table: {
            source: []
        }
    },
    init: function() {
        this.data.table.source = [];
        for(var i = 0; i < 60; ++i) {
            this.data.table.source.push({
                no: 'NO.' + i,
                job: '前端开发',
                phone: 16300001110 + i
            });
        }
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 表头固定在表格顶部

<div class="m-example"></div>

```xml
<jr-table fixedHeader height=200 source={table.source}>
    <jr-table-col name="工号" key="no" />
    <jr-table-col name="职位" key="job" />
    <jr-table-col name="联系电话" key="phone" />
</jr-table>
```

```javascript
var component = new JRUI.Component({
    template: template,
    data: {
        table: {
            source: []
        }
    },
    init: function() {
        this.data.table.source = [];
        for(var i = 0; i < 60; ++i) {
            this.data.table.source.push({
                no: 'NO.' + i,
                job: '前端开发',
                phone: 16300001110 + i
            });
        }
    }
});
```
<!-- demo_end -->


<!-- demo_start -->
### 固定列

<div class="m-example"></div>

```xml
<jr-table fixedHeader height=200 source={table.source}>
    <jr-table-col name="工号" key="no" fixed />
    <jr-table-col name="职位" key="job" />
    <jr-table-col name="联系电话" key="phone" fixed="right" />
</jr-table>
```

```javascript
var component = new JRUI.Component({
    template: template,
    data: {
        table: {
            source: []
        }
    },
    init: function() {
        this.data.table.source = [];
        for(var i = 0; i < 60; ++i) {
            this.data.table.source.push({
                no: 'NO.' + i,
                job: '前端开发',
                phone: 16300001110 + i
            });
        }
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 自定义模版与filter

通过 `jr-table-template` 组件定义单元格和表头的模版，可以将模版内嵌到组件中，也可以将模版注入到组件的 `template` 属性。
自定义模版中可以通过 `emit` 的方法向上抛出事件。
如果模版直接写在`jr-table`当中，这部分模版会被作为footer模版进行渲染。这部分模版不需要进行特殊的字符串处理，并可以直接进行数据绑定。

要在模版中使用自定义的 `filter` 则需要通过 `JRUI.JRTable.$filter` 方法 将其先注册到 `JRUI.JRTable` 上。


要在模版中使用自定义的组件则需要通过 `JRUI.JRTable.$component` 方法 将其先注册到 `JRUI.JRTable` 上。

注意：
1. 内嵌形式的模版需要在每行的两端加上 `{'`、`'}` ，否则模版字符串的插值会无法传递给模版组件，
2. 原有的 `emitEvent` 方法不建议使用，但仍然保留。

`jr-table-col`上亦可以直接传入对应的模版属性， `template`，`headerTemplate`，`formatter`，`headerFormatter`，`format`，`headerFormat`。

<div class="m-example"></div>

```xml
<jr-table
    stickyFooter
    source={table.source}
    on-itemclick={this.onItemClick($event)} on-headerclick={this.onHeaderClick($event)} >
    <jr-table-col name="title" key="title">
        <jr-table-template type="header">
            {'<a href={header.name+">+~!!@#$%^&*()"} on-click={this.emit("headerclick", header)}>I am && {header.name}</a>'}
            {'<anchor/>'}
        </jr-table-template>
        <jr-table-template template={tdTpl} />
    </jr-table-col>
    <jr-table-col name="value" key="value" />

    <jr-pager
        pageSize={pageSize}
        current={current}
        sumTotal={sumTotal}
    />
</jr-table>
```

```javascript
var anchor = JRUI.Component.extend({
    template: '<a>&nbsp;anchor</a>',
});
JRUI.JRTable.$component('anchor', anchor);

JRUI.JRTable.$filter('txtFilter', function(val) {
    return val + '*';
});

var component = new JRUI.Component({
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
### 自定义行样式

通过设置 `item.rowClass` 或 `item.rowStyle` 修改每一行的样式。

<div class="m-example"></div>

```xml
<jr-table source={table.source}>
    <jr-table-col name="职位" key="job" />
    <jr-table-col name="小明" key="name" />
    <jr-table-col name="年龄" key="age" />
</jr-table>
```

```javascript
var source = [{
    job: '前端开发',
    name: '小明',
    age: 20,
    rowStyle: 'background-color:#FFBC07'
}];
var component = new JRUI.Component({
    template: template,
    data: {
        table: {
            source: source
        }
    },
});
```
<!-- demo_end -->

<!-- demo_start -->
### 排序

没有实际的排序效果，请查看 console 打印的事件对象。

<div class="m-example"></div>

```xml
<jr-table source={table.source} sorting={table.sorting} on-sort={this.onSort($event)}>
    <jr-table-col name="姓名" key="name" customKey="sort_title" sortable />
    <jr-table-col name="年龄" key="age" sortable/>
</jr-table>
```

```javascript
var source = [{
    name: '小明',
    age: 20,
}, {
    name: '小红',
    age: 22,
}, {
    name: '小王',
    age: 20,
}, {
    name: '小李',
    age: 25,
}];
var component = new JRUI.Component({
    template: template,
    data: {
        table: {
            source: source,
            sorting: {
                key: 'name',
                isAsc: 0
            }
        }
    },
    onSort: function(e) {
        console.log(e);
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 分页

分页的配置参考 [分页 Pager](/components/navigation_pager_.html) 。

<div class="m-example"></div>

```xml
<jr-table stickyFooter source={table.source} paging={table.paging} on-paging={this.onPaging($event)}>
    <jr-table-col name="职位" key="job" />
    <jr-table-col name="姓名" key="name" />
    <jr-table-col name="年龄" key="age" />
</jr-table>
```

```javascript
var source = [{
    job: '前端',
    name: '小明',
    age: 20,
}, {
    job: '前端',
    name: '小红',
    age: 22,
}, {
    job: '后端',
    name: '小王',
    age: 20,
}, {
    job: '后端',
    name: '小李',
    age: 25,
}];
var component = new JRUI.Component({
    template: template,
    data: {
        table: {
            source: source,
            paging: {
                pageSize: 10,
                sumTotal: 100,
                current: 1
            }
        }
    },
    onPaging: function(e) {
        console.log(e);
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 分页

分页的配置参考 [分页 Pager](/components/navigation_pager_.html) 。

<div class="m-example"></div>

```xml
<jr-table source={table.source}>
    <jr-table-col name="职位" key="job" />
    <jr-table-col name="姓名" key="name" />
    <jr-table-col name="年龄" key="age" />
    <jr-pager current={current} sumTotal={sumTotal} pageSize={pageSize} />
</jr-table>
```

```javascript
var source = [{
    job: '前端',
    name: '小明',
    age: 20,
}, {
    job: '前端',
    name: '小红',
    age: 22,
}, {
    job: '后端',
    name: '小王',
    age: 20,
}, {
    job: '后端',
    name: '小李',
    age: 25,
}];
var component = new JRUI.Component({
    template: template,
    data: {
        table: {
            source: source,
        },
        pageSize: 10,
        sumTotal: 100,
        current: 1
    },
    onPaging: function(e) {
        console.log(e);
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 隐藏列

需要通过 `index` 指定顺序，否则会乱序。

<div class="m-example"></div>

```xml
<jr-table source={table.source} >
    {#if col[0]}
    <jr-table-col index=1 placeholder="" />
    {/if}
    {#if col[1]}
    <jr-table-col index=2 name="姓名" key="name" />
    {/if}
    {#if col[2]}
    <jr-table-col index=3 name="年龄" key="age" />
    {/if}
</jr-table>
{#list [0,1,2] as index}
<jr-button title={isHideCol[index] ? '显示col' + index : '隐藏col' + index} on-click={this.toggle(index)}/>
{/list}
```

```javascript
var source = [{
    job: '前端',
    name: '小明',
    age: 20,
}, {
    job: '前端',
    name: '小红',
    age: 22,
}, {
    job: '后端',
    name: '小王',
    age: 20,
}, {
    job: '后端',
    name: '小李',
    age: 25,
}];
var component = new JRUI.Component({
    template: template,
    data: {
        table: {
            source: source
        },
        col: [1, 1, 1],
        isHideCol: [false, false, false]
    },
    toggle: function(index) {
        this.data.col[index] = !this.data.col[index];
        this.data.isHideCol[index] = !this.data.isHideCol[index];
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 行展开

<div class="m-example"></div>

```xml
<jr-table source={table.source}>
    <jr-table-col name="" key="" placeholder="" width=50 fixed expandable>
        <jr-table-template type="expand">
            {'<div style="padding: 10px; background: #eee">{item.name}</div>'}
        </jr-table-template>
    </jr-table-col>
    <jr-table-col name="职位" key="job" fixed />
    <jr-table-col name="姓名" key="name" />
    <jr-table-col name="年龄" key="age" fixed="right" />
</jr-table>
```

```javascript
var source = [{
    job: '前端',
    name: '小明',
    age: 20,
}, {
    job: '前端',
    name: '小红',
    age: 22,
}, {
    job: '后端',
    name: '小王',
    age: 20,
}, {
    job: '后端',
    name: '小李',
    age: 25,
}];
var component = new JRUI.Component({
    template: template,
    data: {
        table: {
            source: source,
        }
    },
    onPaging: function(e) {
        console.log(e);
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 空数据

<div class="m-example"></div>

```xml
<jr-table>
    <jr-table-col name="title" key="title" />
    <jr-table-col name="value" key="value" />
</jr-table>
```

```javascript
var component = new JRUI.Component({
    template: template,
    data: {
        table: {
        }
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 加载中

<div class="m-example"></div>

```xml
<jr-table loading={true}>
    <jr-table-col name="title" key="title" />
    <jr-table-col name="value" key="value" />
</jr-table>
```

```javascript
var component = new JRUI.Component({
    template: template,
    data: {
        table: {
        }
    }
});
```
<!-- demo_end -->


<!-- demo_start -->
### 模版中获取外部数据的方法

由于组件的设计结构比较特殊，表格中表头和内容分别是两个独立的组件，因此　`jr-table` 上挂载的属性无法直接传递到表头和内容当中。

如有需要取得外部的数据，则需要通过 `$table.data` 或者 `$tableData` 去获取。

<div class="m-example"></div>

```xml
<jr-table source={table.source} count={count}>
    <jr-table-col name="title" key="title" template={tdTpl} headerTemplate={thTpl}/>
    <jr-table-col name="value" key="value" />
</jr-table>
```

```javascript
var component = new JRUI.Component({
    template: template,
    data: {
        count: 0,
        thTpl: '{header.name + " :" + $tableData.count}',
        tdTpl: '{item.title + " :" + $table.data.count}',
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

<!-- demo_start -->
### 特殊

由于组件内部有部分模版是使用字符串形式存储，只有在使用时才是进行解析，因此当页面对 `Regular` 的插值符号进行修改时，需要进行特殊处理。

为了向组件内部传递新修改的插值，需要在 `Regular` 下挂载两个新的属性 `_BEGIN_`， `_END_`。

```
Regular._BEGIN_ = '{{';
Regular._END_ = '}}';
Regular.config({
    BEGIN: Regular._BEGIN_,
    END: Regular._END_
});
```
<!-- demo_end -->
