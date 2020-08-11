/**
 * @class KLDate
 * @extend Component
 * @param {object}      value                   = 绑定属性
 * @param {string}      type=date               => 日期类型：date /datetime /daterange /datetimerange /year /month
 * @param {boolean}     showWeekNumbers=false   => 开启后，可以显示星期数。
 * @param {boolean}     splitPanels=false       => 多选的时候日历面板是否联动，开启属性 split-panels 后，左右两面板在切换年、月时不联动。详见示例
 * @param {boolean}     confirm=false           => 是否点击确认后才关闭下拉，设置属性 confirm，选择日期后，选择器不会主动关闭，需用户确认后才可关闭。
 * @param {function}    disabledDate            => 设置不可选择的日期，参数为当前的日期，需要返回 Boolean 是否禁用这天。详见示例
 * @param {array}       shortcuts               => 设置快捷选项，每项内容：<br> text（String）：显示的文案；<br> value（Function）：返回指定的日期，如需自己控制逻辑，可不设置，并使用 onClick 回调；<br> onClick（Function）：点击时的回调，参数为当前日期选择器的 Vue 实例，当需要自定义复杂操作时，可以使用 。详见示例
 * @param {string}      format                  => 展示的日期格式 <br> date / daterange：yyyy-MM-dd <br> datetime / datetimerange：yyyy-MM-dd HH:mm:ss <br> year：yyyy <br> month：yyyy-MM
 */

/**
 * @event KLDate#pick 选中事件
 * @property {object} event 事件发送对象
 */

