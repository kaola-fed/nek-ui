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
<kl-locale-provider lang="CN" api="/data/language/lang.json">
    <p>{this.$t("PLEASE_INPUT")}</p>
    <p>{this.$t("PLEASE_SELECT")}</p>
    <p>{this.$t('USERNAME')}</p>
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
### 变量占位符
变量命名可以使用数字、字母或下划线；变量使用%{}包裹，其中%可以省略。
例如：%{x},也可以写成{x}
<div class="m-example"></div>

```xml
<kl-locale-provider lang="CN" api="/data/language/lang.json" ref="locale_provider">
    <kl-radio-group source={language} value={lang_value} on-select={this.onSelect($event)} />
    <!--FORMAT的中文是：每月账单日为: {x}-->
    <p>{this.$t("FORMAT", {x: 8})}</p>
    <!--GOODS_SHELF_LIFE_DESC的中文是：产品交付剩余保质期不少于商品明示保质期{x}/{y}-->
    <p>{this.$t("GOODS_SHELF_LIFE_DESC", {x: 9, y: 1})}</p>    
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
                },
                {   
                    id: "CN",
                    name: "中文",
                }
            ]
    },
    $t: translator,
    onSelect: function(item) {
        this.data.lang_value = item.selected.id;
        this.$refs.locale_provider.reload(item.selected.id);
    },
});
```
<!-- demo_end -->

<!-- demo_start -->
### 组合使用
使用@:KEY语法，可以在当前语句中引入KEY的国际化语言。
<div class="m-example"></div>

```xml
<kl-locale-provider lang="CN" api="/data/language/lang.json" ref="locale_provider">
    <kl-radio-group source={language} value={lang_value} on-select={this.onSelect($event)} />
    <!--FRAGMENT1的中文是：这是fragment1-->
    <p>{this.$t("FRAGMENT1")}</p>
    <!--FRAGMENT2的中文是：这是fragment2，@:FRAGMENT1-->
    <p>{this.$t("FRAGMENT2")}</p>    
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
                },
                {   
                    id: "CN",
                    name: "中文",
                }
            ]
    },
    $t: translator,
    onSelect: function(item) {
        this.data.lang_value = item.selected.id;
        this.$refs.locale_provider.reload(item.selected.id);
    },
});
```
<!-- demo_end -->

<!-- demo_start -->
### 表单项
<div class="m-example"></div>

```xml

<kl-locale-provider lang="CN" api="/data/language/lang.json" ref="locale_provider">
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
                },
                {   
                    id: "CN",
                    name: "中文",
                }
            ]
    },
    $t: translator,
    onSelect: function(item) {
        this.data.lang_value = item.selected.id;
        this.$refs.locale_provider.reload(item.selected.id);
    },

});
```
<!-- demo_end -->

