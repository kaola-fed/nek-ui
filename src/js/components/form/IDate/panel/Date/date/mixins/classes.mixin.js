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
      const hasSidebarCls = this.data.shortcuts.length ? `${prefixCls}-with-sidebar` : '';
      return [
        `${prefixCls}-body-wrapper`,
        hasSidebarCls,
      ].join(' ');
    },
  });
};
