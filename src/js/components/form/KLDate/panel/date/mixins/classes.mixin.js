/* eslint-disable */
const prefixCls = 'kl-picker-panel';
const datePrefixCls = 'kl-picker-panel-body-header';

export default (Component) => {
    Component.implement({
        iconBtnCls(direction, type = '') {
            return [
                `${datePrefixCls}__icon-btn`,
                `${datePrefixCls}__icon-btn--${direction}`,
                `${datePrefixCls}__icon-btn--${direction}-btn-arrow${type}`,
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
