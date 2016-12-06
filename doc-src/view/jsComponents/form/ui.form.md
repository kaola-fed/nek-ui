### 示例
#### 基本形式

<div class="m-example"></div>

```xml
<ui.form service="{service.selector}" ref="formgroup">
    <ui.field title="标题1" cols=12 sourceKey="warehouse">
        <ui.select />
    </ui.field>
    <ui.field title="标题2" cols=12>
        <ui.input />
    </ui.field>
</ui.form>
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        service: {
            selector: 'api'
        }
    }
});
```
