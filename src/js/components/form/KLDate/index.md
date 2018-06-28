---
title: 新日期选择
masonry: true
---

<!-- demo_start -->
### 日期选择
<div class="m-example"></div>

```xml
<kl-date type="date" value={selectDate} placeholder="选择日期" />
<p>当前选择的日期为：{selectDate}</p>
<p>格式化后的日期为：{selectDate | format: 'yyyy-MM-dd HH:mm:ss'}</p>
```
<!-- demo_end -->


<!-- demo_start -->
### 日期范围选择
<div class="m-example"></div>

```xml
<kl-date type="daterange" value={selectDate} placeholder="选择日期" />
<p>当前选择的日期为：{selectDate}</p>
<p>格式化后的日期为：{selectDate | format: 'yyyy-MM-dd HH:mm:ss'}</p>
```
<!-- demo_end -->