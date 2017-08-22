---
title: 国际化
---

<!-- demo_start -->
*基本形式*
<div class="m-example"></div>

```xml
<kl-locale-provider lang="cn" api="/data/language/zh-CN.json">
    <div>{this.$t("PLEASE_INPUT")}</div>
    <div>{this.$t("PLEASE_SELECT")}</div>
</kl-locale-provider>
```
```javascript
var translator = window.NEKUI ? NEKUI.KLLocaleProvider.translate : '';
var component = new NEKUI.Component({
    template: template,
    data: {
    },
    $t: translator,
});
```
<!-- demo_end -->

