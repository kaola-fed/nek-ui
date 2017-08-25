---
title: 国际化
masonry: true
---
<!-- demo_start -->
### 基本形式
通过配置`lang`与`api`属性, 并且将需要国际化的部分包裹在`kl-locale-provider`组件中, 即可实现语言的切换;
例如以下文字是根据key值匹配显示出来的

<div class="m-example"></div>

```xml
<kl-locale-provider lang="CN" api="/data/language/zh-CN.json">
    <p>{this.$t("PLEASE_INPUT")}</p>
    <p>{this.$t("PLEASE_SELECT")}</p>
    <p>{this.$t('USERNAME')}</p>
    <p>{this.$t('NOTIFY_METHOD')}</p>
</kl-locale-provider>
```
```javascript
var translator = window.NEKUI ? NEKUI.KLLocaleProvider.translate : '';
var component = new NEKUI.Component({
    template: template,
    data: {},
    $t: translator
});
```
<!-- demo_end -->

<!-- demo_start -->
### 表单项
<div class="m-example"></div>

```xml

<kl-locale-provider lang="CN" api="/data/language/zh-CN.json" ref="locale_provider">
    <kl-form>
        <kl-form-item title="">
            <kl-radio-group source={language} value={lang_value} on-select={this.onSelect($event)} />
        </kl-form-item>
        <kl-form-item title="{this.$t('USERNAME')}">
            <kl-input type="text" placeholder="{this.$t('PLEASE_INPUT')}"></kl-input>
        </kl-form-item>
        <kl-form-item title="{this.$t('NOTIFY_METHOD')}">
            <kl-select source={[this.$t("EMAIL"), this.$t("TEL")]} placeholder={this.$t("PLEASE_SELECT")}></kl-select>
        </kl-form-item>
    </kl-form>
</kl-locale-provider>
```
```javascript
var translator = window.NEKUI ? NEKUI.KLLocaleProvider.translate : '';
var component = new NEKUI.Component({
    template: template,
    config: function(data) {
        data.lang_value = "CN"
        data.language = [
                {   
                    id: "EN",
                    name: "EN",
                    api: "/data/language/en-US.json"
                },
                {   
                    id: "CN",
                    name: "中文",
                    api: "/data/language/zh-CN.json"
                }
            ]
    },
    $t: translator,
    onSelect: function(item) {
        this.data.lang_value = item.selected.id;
        this.$refs.locale_provider.reload(item.selected.id, item.selected.api);
    },

});
```
<!-- demo_end -->

