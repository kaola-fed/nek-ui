---
title: 快速上手
type: components
order: 0
---



## nek-ui

nek-ui 是一个基于 Regularjs 的组件库，主要用于中后台系统

### 引入 nek-ui

```
npm i regularjs@0.4.3 nek-ui -S
```

```javascript
import NEKUI from 'nek-ui'
import 'node_modules/nek-ui/dist/css/nek-ui.default.min.css'
```

### 使用 nek-ui

由于使用 NEKUI 的组件需要先注册，我们可以在工程里面的 BaseComponent 里面使用 NEKUI 暴露出来的一个 install 方法来将组件注册到 BaseComponent 上，这样继承自 BaseComponent 的组件就可以直接在模板里面使用组件了

```javascript
import { install } from 'nek-ui';
import Regular from 'regularjs';

const BaseComponent = Regular.extend({
    //
});
install(BaseComponent);
```

如果不想将 NEKUI 的组件全部注册到全局上，或者是自己已有的组件和 NEKUI 里面的组件命名冲突，也可以手动的注册想要使用的组件

```
var Component = BaseComponent.extend({}).component('kl-tooltip', NEKUI.KLTooltip)
```