---
title: 上传文件
masonry: true
---

<!-- demo_start -->
### 基本形式

* 目前该上传组件采用FormData向后台提交文件数据
* 组件上传成功依赖的返回数据结构为`{name: 'xxx', url: 'xxx'}`, 通常和后端接口不一致，可以通过配置`onLoadInterceptor`做一层数据转换
* 可通过file-list指定初始值，格式为[Object], 其中Object结构如下
```
    {
        name: '文件名称',
        url: '文件的路径',
        flag: '0, 新增的文件; 1, 已经上传未被删除的文件，2，已经上传被删除的文件'
    }
```

** 特别注意: 例子中使用的url为私人服务器, 请勿直接使用, 请使用自己后台的上传接口 **

<div class="m-example"></div>

```xml
<kl-upload action='https://nos.kaolafed.com/upload' file-list={list} onLoadInterceptor={this.onLoadInterceptor} on-preview={this.onPreview($event)}></kl-upload>
```
```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        list: [{
            name: 'Game.jpg',
            url: 'http://kaola-haitao.oss.kaolacdn.com/906f417c7c964c0798adf9d0bf1b5c8c.jpg'
        }, {
            name: 'Kaola.jpg',
            url: 'http://kaola-haitao.oss.kaolacdn.com/9b73692b3a6b46d2be1de7d3be893834.jpg'
        }, {
            name: 'Music.jpg',
            url: 'http://kaola-haitao.oss.kaolacdn.com/7dfd9aa492694493be0fc1458d558536.jpg'
        }]
    },
    onPreview: function(e) {
        if(e.file.type === 'pdf') {
            window.open(e.file.url);
        }
    }
    //transform {code: 200, data: {...}} to {name: 'xxx', url: 'xxx'}
    /*onLoadInterceptor: function(json){
      if(json.code == 200){
        var data = json.data || {};
        if(Array.isArray(data)){
            data = data[0];
        }
        return data;
      }
      return false;
    }*/
});
```
<!-- demo_end -->

<!-- demo_start -->
### 卡片展示形式，用于表格内上传

<div class="m-example"></div>

```xml
<kl-upload action='https://nos.kaolafed.com/upload' list-type="card"></kl-upload>
```
<!-- demo_end -->

<!-- demo_start -->
### 多选上传
<div class="m-example"></div>

```xml
<kl-upload action='https://nos.kaolafed.com/upload' multiple={true}></kl-upload>
```
<!-- demo_end -->

<!-- demo_start -->
### 文件类型限制

配置accept属性为文件后缀或[MIME_TYPE](https://www.iana.org/assignments/media-types/media-types.xhtml)
<div class="m-example"></div>

```xml
<kl-upload action='https://nos.kaolafed.com/upload' accept=".jpg,.zip,video/*,audio/*"></kl-upload>
```
<!-- demo_end -->

<!-- demo_start -->
### 文件大小限制
<div class="m-example"></div>

```xml
<kl-upload action='https://nos.kaolafed.com/upload' max-size="2K"></kl-upload>
```
<!-- demo_end -->

<!-- demo_start -->
### 文件个数限制
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
        list: [{
          name: 'Game.jpg',
          url: 'http://kaola-haitao.oss.kaolacdn.com/906f417c7c964c0798adf9d0bf1b5c8c.jpg'
        }, {
          name: 'Kaola.jpg',
          url: 'http://kaola-haitao.oss.kaolacdn.com/9b73692b3a6b46d2be1de7d3be893834.jpg'
        }, {
          name: 'Music.jpg',
          url: 'http://kaola-haitao.oss.kaolacdn.com/7dfd9aa492694493be0fc1458d558536.jpg'
        }]
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 只读模式
<div class="m-example"></div>

```xml
<kl-upload action='https://nos.kaolafed.com/upload' file-list={list} readonly={true}></kl-upload>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        list: [{
          name: 'Game.JPG',
          url: 'http://kaola-haitao.oss.kaolacdn.com/906f417c7c964c0798adf9d0bf1b5c8c.jpg',
          class: 'my-img-test'
        }, {
          name: 'Kaola.jpg',
          url: 'http://kaola-haitao.oss.kaolacdn.com/9b73692b3a6b46d2be1de7d3be893834.jpg'
        }, {
          name: 'Music.jpg',
          url: 'http://kaola-haitao.oss.kaolacdn.com/7dfd9aa492694493be0fc1458d558536.jpg'
        }]
    }
});
```
<!-- demo_end -->

<!-- demo_start -->
### 指定宽高或宽高比

只作用于图片
<div class="m-example"></div>

```xml
<kl-upload action='https://nos.kaolafed.com/upload' image-width={20} ></kl-upload>
<kl-upload action='https://nos.kaolafed.com/upload' image-height={20} ></kl-upload>
<kl-upload action='https://nos.kaolafed.com/upload' image-scale='4:3' ></kl-upload>
```
<!-- demo_end -->

<!-- demo_start -->
### 拖拽上传
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
        list: [{
          name: 'Game.jpg',
          url: 'http://kaola-haitao.oss.kaolacdn.com/906f417c7c964c0798adf9d0bf1b5c8c.jpg'
        }, {
          name: 'Kaola.jpg',
          url: 'http://kaola-haitao.oss.kaolacdn.com/9b73692b3a6b46d2be1de7d3be893834.jpg'
        }, {
          name: 'Music.jpg',
          url: 'http://kaola-haitao.oss.kaolacdn.com/7dfd9aa492694493be0fc1458d558536.jpg'
        }]
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
        list: [{
          name: 'Game.jpg',
          url: 'http://kaola-haitao.oss.kaolacdn.com/906f417c7c964c0798adf9d0bf1b5c8c.jpg'
        }, {
          name: 'Kaola.jpg',
          url: 'http://kaola-haitao.oss.kaolacdn.com/9b73692b3a6b46d2be1de7d3be893834.jpg'
        }, {
          name: 'Music.jpg',
          url: 'http://kaola-haitao.oss.kaolacdn.com/7dfd9aa492694493be0fc1458d558536.jpg'
        }]
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

<!-- demo_start -->
### 选择文件后不上传

* 该模式下，必须初始化formData属性为new FormData()默认值  

<div class="m-example"></div>

```xml
<kl-upload file-list={list} autoUpload={false} formData={formData}></kl-upload>
<kl-button title="上传" on-click={this.upload()}></kl-button>
```

```javascript
var component = new NEKUI.Component({
    template: template,
    data: {
        list: [{
          name: 'Game.jpg',
          url: 'http://kaola-haitao.oss.kaolacdn.com/906f417c7c964c0798adf9d0bf1b5c8c.jpg'
        }, {
          name: 'Kaola.jpg',
          url: 'http://kaola-haitao.oss.kaolacdn.com/9b73692b3a6b46d2be1de7d3be893834.jpg'
        }, {
          name: 'Music.jpg',
          url: 'http://kaola-haitao.oss.kaolacdn.com/7dfd9aa492694493be0fc1458d558536.jpg'
        }],
        formData: new FormData()
    },
    upload: function(){
      var ajax = new XMLHttpRequest();
      ajax.open('json', '/upload');
      ajax.send(this.data.formData);  
    }
});
```
<!-- demo_end -->
