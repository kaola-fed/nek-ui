const prefixCls = 'ivu-picker-panel';
const datePrefixCls = 'ivu-date-picker';

export default (Component) => {
  Component.implement({
    iconBtnCls(direction, type = '') {
      return [
        `${prefixCls}-icon-btn`,
        `${datePrefixCls}-${direction}-btn`,
        `${datePrefixCls}-${direction}-btn-arrow${type}`,
      ].join(' ');
    },
    getClasses() {
      return [
        `${prefixCls}-body-wrapper`,
        `${datePrefixCls}-with-range`,
        this.data.shortcuts.length ? `${prefixCls}-with-sidebar` : '',
        this.data.showWeekNumbers ? `${datePrefixCls}-with-week-numbers` : '',
      ].join(' ');
    },
    getPanelBodyClasses() {
      return [
        `${prefixCls}-body`,
        this.data.showTime ? `${prefixCls}-body-time ${prefixCls}-body-date` : '',
      ].join(' ');
    },
  });
};
