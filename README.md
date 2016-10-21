# Regular UI for NEK

[组件文档](https://kaola-fed.github.io/regular-ui/doc/)

用于扩展和自定义组件，做了精简，有需要了解背景的可以看[原项目](https://github.com/regular-ui/regular-ui)

可能常用的命令有：

 - `npm run dist`: 打包 JS 和 CSS
 - `npm run doc`: 生成文档
 - `npm start`: 启动文档静态服务 http://127.0.0.1:8000

## 非UI组件

  - RGUI.Validation.validator
  扩展了原来的 [validator.js](https://github.com/chriso/validator.js)，每个 `isXXX` 方法都加了个对应的 `_isXXX` 方法，具体见[说明](https://302.at/0wy3Z)