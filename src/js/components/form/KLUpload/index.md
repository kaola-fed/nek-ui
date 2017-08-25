---
title: 上传文件
masonry: true
---

<!-- demo_start -->
### 基本形式

1. 目前该上传组件采用FormData向后台提交文件数据。

2. 可通过file-list指定初始值，数据结构见js代码list

3. 组件上传成功依赖的返回数据结构为{name: 'xxx', url: 'xxx'}, 通常和后端接口不一致，可以通过配置beforeOnLoad做一层数据转换,见js代码beforeOnLoad

4. 组件下发数据file-list格式为[Object]，Object结构如下（与后端对接需要协商好）：

    name: 文件名称
    url: 文件的路径
    flag: 0, 新增的文件; 1, 已经上传未被删除的文件，2，已经上传被删除的文件

    示例：
        [{
            name: 'kaola-logo.jpeg',
            url: 'xxx',
            flag: 0
        }]

5. action请使用后台上传接口，示例url为私人服务器。

<div class="m-example"></div>

```xml
<kl-upload action='https://nos.kaolafed.com/upload' file-list={list} beforeOnLoad={this.beforeOnLoad}></kl-upload>
```
```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        list: [
            {
                name: 'kaola-logo.jpeg',
                url: 'http://haitao.nos.netease.com/264271ddbec447288f17aef71119b1f4.png?imageView&thumbnail=220x0&quality=85&v=1'
            },
            {
                name: '权限申请交互.rar',
                url: 'http://jira.netease.com/secure/attachment/176692/%E6%9D%83%E9%99%90%E6%89%B9%E9%87%8F%E7%94%B3%E8%AF%B7%E4%BA%A4%E4%BA%92-%E7%94%B3%E8%AF%B7%E7%AF%AE.rar'
            },
            {
                name: 'app-2dcode.jpg',
                url: 'http://pic23.nipic.com/20120903/10422454_211025593122_2.jpg'
            }
        ]
    }
    /*beforeOnLoad: function(json){
        if(json.code == 200){
            var data = json.data;
            return {name: data.name, url: data.url};
        }
        return false;
    }*/
});
```
<!-- demo_end -->

<!-- demo_start -->
### 卡片展示形式，用于表格内上传

action请使用后台接口，示例url为私人服务器。
<div class="m-example"></div>

```xml
<kl-upload action='https://nos.kaolafed.com/upload' list-type="card"></kl-upload>
```
<!-- demo_end -->

<!-- demo_start -->
### 多选上传

action请使用后台接口，示例url为私人服务器。
<div class="m-example"></div>

```xml
<kl-upload action='https://nos.kaolafed.com/upload' multiple={true}></kl-upload>
```
<!-- demo_end -->

<!-- demo_start -->
### 文件类型限制

action请使用后台接口，示例url为私人服务器。

配置accept属性为文件后缀或[MIME_TYPE](https://www.iana.org/assignments/media-types/media-types.xhtml)
<div class="m-example"></div>

```xml
<kl-upload action='https://nos.kaolafed.com/upload' accept=".jpg,.zip,video/*,audio/*"></kl-upload>
```
<!-- demo_end -->

<!-- demo_start -->
### 文件大小限制

action请使用后台接口，示例url为私人服务器。
<div class="m-example"></div>

```xml
<kl-upload action='https://nos.kaolafed.com/upload' max-size="2K"></kl-upload>
```
<!-- demo_end -->

<!-- demo_start -->
### 文件个数限制

action请使用后台接口，示例url为私人服务器。
<div class="m-example"></div>

```xml
<kl-upload action='https://nos.kaolafed.com/upload' num-max={2}></kl-upload>
```
<!-- demo_end -->

<!-- demo_start -->
### 行布局
<div class="m-example"></div>

```xml
<kl-upload action='https://nos.kaolafed.com/upload' file-list={list} num-perline={2}></kl-upload>
```
```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        list: [
            {
                name: 'kaola-logo.jpeg',
                url: 'http://haitao.nos.netease.com/264271ddbec447288f17aef71119b1f4.png?imageView&thumbnail=220x0&quality=85&v=1'
            },
            {
                name: '权限申请交互.rar',
                url: 'http://jira.netease.com/secure/attachment/176692/%E6%9D%83%E9%99%90%E6%89%B9%E9%87%8F%E7%94%B3%E8%AF%B7%E4%BA%A4%E4%BA%92-%E7%94%B3%E8%AF%B7%E7%AF%AE.rar'
            },
            {
                name: 'app-2dcode.jpg',
                url: 'http://pic23.nipic.com/20120903/10422454_211025593122_2.jpg'
            }
        ]
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 只读模式

action请使用后台接口，示例url为私人服务器。
<div class="m-example"></div>

```xml
<kl-upload action='https://nos.kaolafed.com/upload' file-list={list} readonly={true}></kl-upload>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        list: [{
            name: 'kaola-logo.jpeg',
            url: 'http://haitao.nos.netease.com/264271ddbec447288f17aef71119b1f4.png?imageView&thumbnail=220x0&quality=85&v=1'
        }]
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 指定宽高或宽高比

只作用于图片

action请使用后台接口，示例url为私人服务器。
<div class="m-example"></div>

```xml
<kl-upload action='https://nos.kaolafed.com/upload' image-width={20} ></kl-upload>
<kl-upload action='https://nos.kaolafed.com/upload' image-height={20} ></kl-upload>
<kl-upload action='https://nos.kaolafed.com/upload' image-scale='4:3' ></kl-upload>
```
<!-- demo_end -->

<!-- demo_start -->
### 拖拽上传

action请使用后台接口，示例url为私人服务器。
<div class="m-example"></div>

```xml
<kl-upload action='https://nos.kaolafed.com/upload' drag={true} ></kl-upload>
```
<!-- demo_end -->


<!-- demo_start -->
### 文件上传前的校验（文件格式限制为图片）

<div class="m-example"></div>

```xml
<kl-upload action='https://nos.kaolafed.com/upload' file-list={list} before-upload={this.beforeUpload}></kl-upload>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        list: [
            {
                name: 'kaola-logo.jpeg',
                url: 'http://haitao.nos.netease.com/264271ddbec447288f17aef71119b1f4.png?imageView&thumbnail=220x0&quality=85&v=1'
            },
            {
                name: '权限申请交互.rar',
                url: 'http://jira.netease.com/secure/attachment/176692/%E6%9D%83%E9%99%90%E6%89%B9%E9%87%8F%E7%94%B3%E8%AF%B7%E4%BA%A4%E4%BA%92-%E7%94%B3%E8%AF%B7%E7%AF%AE.rar'
            },
            {
                name: 'app-2dcode.jpg',
                url: 'http://pic23.nipic.com/20120903/10422454_211025593122_2.jpg'
            }
        ]
    },
    beforeUpload: function(file) {
        var fileTypeCheck = function(resolve) {
            var msg = '';
            if (!/image\/.*/.test(file.type)) {
                msg = '格式错误';
            }
            resolve(msg);
        };

        return new Promise(fileTypeCheck);
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 文件删除前的确认

<div class="m-example"></div>

```xml
<kl-upload action='https://nos.kaolafed.com/upload' file-list={list} before-remove={this.beforeRemove}></kl-upload>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        list: [
            {
                name: 'kaola-logo.jpeg',
                url: 'http://haitao.nos.netease.com/264271ddbec447288f17aef71119b1f4.png?imageView&thumbnail=220x0&quality=85&v=1'
            },
            {
                name: '权限申请交互.rar',
                url: 'http://jira.netease.com/secure/attachment/176692/%E6%9D%83%E9%99%90%E6%89%B9%E9%87%8F%E7%94%B3%E8%AF%B7%E4%BA%A4%E4%BA%92-%E7%94%B3%E8%AF%B7%E7%AF%AE.rar'
            },
            {
                name: 'app-2dcode.jpg',
                url: 'http://pic23.nipic.com/20120903/10422454_211025593122_2.jpg'
            }
        ]
    },
    beforeRemove: function(item) {
        var file = item.file;
        var removeConfirm = function(resolve) {
            var modal = NEKUI.KLModal.confirm('确认删除' + file.name + '?');
            modal.$on('ok', () => resolve(true));
        };

        return new Promise(removeConfirm);
    }
});
```
<!-- demo_end -->
