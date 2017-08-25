---
title: 国际化
masonry: true
---
<!-- demo_start -->
### 基本形式
<div class="m-example"></div>

```xml
<kl-locale-provider lang="CN" api="/data/language/zh-CN.json">
    <div>{this.$t("PLEASE_INPUT")}</div>
    <div>{this.$t("PLEASE_SELECT")}</div>
    <div>{this.$t('USERNAME')}</div>
    <div>{this.$t('NOTIFY_METHOD')}</div>
</kl-locale-provider>
```
```javascript
var translator = window.NEKUI ? NEKUI.KLLocaleProvider.translate : '';
var component = new NEKUI.Component({
    template: template,
    data: {
    },
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

