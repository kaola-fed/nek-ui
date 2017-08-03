---
title: 滑块
is_new: true
---

## 示例
### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div><jr-slider min={0} max={100}/></div>
<div><jr-slider min={0} max={100} showTips={false}/></div>
```

```javascript
let component = new JRUI.Component({
    template: template
});
```
<!-- demo_end -->


### 自定义宽度和长度

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div><jr-slider min={0} max={200} width={300} height={10}/></div>
<div><jr-slider min={0} max={200} width={400} height={15}/></div>
<div><jr-slider min={0} max={200} width={350} height={20}/></div>
```

```javascript
let component = new JRUI.Component({
    template: template
});
```
<!-- demo_end -->

### 是否显示输入框

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-slider min={0} max={200} showInput={true}/>
```

```javascript
let component = new JRUI.Component({
    template: template
});
```
<!-- demo_end -->

### 滑块是否有跳跃

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div><jr-slider min={0} max={200} step={25} showInput={true}/></div>
<div><jr-slider min={0} max={200} step={25} showStep={true} showInput={true}/></div>
```

```javascript
let component = new JRUI.Component({
    template: template
});
```
<!-- demo_end -->

### 禁用，只读

<!-- demo_start -->
<div class="m-example"></div>

```xml

<div><jr-slider min={0} max={200} step={25} disabled={true} showStep={true} showInput={true}/></div>
<div><jr-slider min={0} max={200} step={25} readonly={true} showStep={true} showInput={true}/></div>
```

```javascript
let component = new JRUI.Component({
    template: template
});
```
<!-- demo_end -->

