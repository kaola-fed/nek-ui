---
title: 123
type: ux
cate: test
---

<!-- demo_start -->

### 按钮类型
主按钮、次按钮、弱按钮及不可点4种状态，主按钮在同一操作区只能出现一个

<div class="m-example"></div>

```xml
<kl-button type="primary" title="主按钮" />
<kl-button type="secondary" title="次按钮" />
<kl-button title="弱按钮" />
<kl-button disabled={true} title="不可点" />
```

<!-- demo_end -->

<!-- demo_start -->
### 按钮尺寸
小按钮多用于表格中，kl-card中操作按钮也推荐使用小尺寸

<div class="m-example"></div>

```xml
<kl-button type="primary" title="主按钮" size="sm" />
<kl-button type="secondary" title="次按钮" size="sm" />
<kl-button title="弱按钮" size="sm" />
<kl-button disabled={true} title="不可点" size="sm" />
```

<!-- demo_end -->

<!-- demo_start -->

### 图标按钮
按钮内含icon，主要用在表单外的操作按钮里

<div class="m-example"></div>
<style>
    .doc-iconBtn {
        margin: 0 5px 5px 0;
    }
</style>

```xml
<kl-button action="add" title="添加" class="doc-iconBtn" />
<kl-button action="reject" title="驳回" class="doc-iconBtn" />
<kl-button action="pass" title="通过" class="doc-iconBtn" />
<kl-button action="copy" title="复制" class="doc-iconBtn" />
<kl-button action="download" title="下载" class="doc-iconBtn" />
<kl-button action="upload" title="上传" class="doc-iconBtn" />
<kl-button action="remove" title="删除" class="doc-iconBtn" />
<kl-button action="search" title="查询" class="doc-iconBtn" />
```

<!-- demo_end -->


<!-- demo_start -->

### 加载中的按钮

<div class="m-example"></div>

```xml
<kl-button action="update" loading />
```

<!-- demo_end -->


<!-- demo_start -->

### 按钮下载文件
列表中经常遇到导出的需求，通过一个异步请求返回一个下载链接，然后直接触发下载；可以通过设置按钮的download属性来实现

<div class="m-example"></div>

```xml
<kl-button action="download" download={download} title="导出文件" on-click={this.download()} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    download: function() {
        this.data.download = 'https://haitao.nos.netease.com/644804ef-91de-46cb-a663-cb90d9015122.jpg'
    }
});
```

<!-- demo_end -->


<!-- demo_start -->
### 按钮与异步请求结合
实际业务中推荐在全局改动一下异步请求的方法，传入一个btn参数，请求开始的时候设置btn为loading的状态，结束的时候还原回来。点击一下查看效果

<div class="m-example"></div>

```xml
<kl-button title="保存" on-click={this.save($event)} />
```

```javascript
var component = new NEKUI.Component({
    template: template,
    save: function(e) {
        var url = '/example/api';
        var opts = {
            //传入btn
            btn: e.sender
        }
        this.request(url, opts);
    },
    //模拟一个请求
    request: function(url, opts) {
        var btn = opts.btn;
        var self = this;

        //发送请求开始的时候设置按钮为loading状态
        btn && btn.$update('loading', true);
        self.$update('loading', true);

        //2s后成功返回
        setTimeout(function() {
            self.$update('loading', false);
            btn && btn.$update('loading', false);
            self.data.loading = false;
            self.$update();
        }, 2000)
    }
});
```

<!-- demo_end -->
