---
title: 分页
---

<!-- demo_start -->
### 基本形式
跳至多少页，支持输入后，按回车键触发哦！
<div class="m-example"></div>

```xml
<kl-pager current={current} sumTotal={sumTotal} pageSize={pageSize} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    config: function(data) {
        data.current = 3;
        data.pageSize = 10;
        data.sumTotal = 200;
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 不展示pageSize下拉或者总条数
只要不设置pageSize或sumTotal即可，但是需要单独传入每页的条数`total`, `total`的值是`Math.ceil(sumTotal/pageSize)`

<div class="m-example"></div>

```xml
 <pager total={Math.ceil(sumTotal/pageSize)} current={current}></pager>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    config: function(data) {
        data.current = 3;
        data.pageSize = 10;
        data.sumTotal = 100;
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 总条数展示场景一
如果总条数有200多条，后端只返回200，通过设置`isEllipsis`使总条数展示位200+

<div class="m-example"></div>

```xml
<kl-pager current={3} sumTotal={200} pageSize={5} isEllipsis={true} />
```
<!-- demo_end -->

<!-- demo_start -->
### 总条数展示场景二
总条数特别多的时候，可以设置一个最大值x，超过这个值的时候页面展示位x+

<div class="m-example"></div>

```xml
<kl-pager current={3} sumTotal={2000000} pageSize={20} maxTotal={2000} />
```
<!-- demo_end -->

<!-- demo_start -->
### 翻页器展示形式(一般不需要设置)
可以设置翻页器展示的形式，设置两端显示的按钮数以及中间展示的按钮数量

<div class="m-example"></div>

```xml
<kl-pager pageSize={5} current={6} sumTotal={100} middle={3} side={1} />
```
<!-- demo_end -->

<!-- demo_start -->
### 实际业务中推荐做法
通过watch `pageSize` 和 `current`的值来请求列表数据，不推荐使用pager的select事件来处理；

<div class="m-example"></div>

```xml
<kl-pager current={current} sumTotal={sumTotal} pageSize={pageSize} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    watchedAttr: ['current', 'pageSize'],
    config: function(data) {
        data.current = 3;
        data.pageSize = 10;
        data.sumTotal = 200;

        this.$watch(this.watchedAttr, function() {
            this.__getList();
        });
    },
    __getList: function() {
        console.log('更新列表数据');
    }
});
```

<!-- demo_end -->

