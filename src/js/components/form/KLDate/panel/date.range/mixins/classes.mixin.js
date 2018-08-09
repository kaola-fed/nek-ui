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
            return [
                `${prefixCls}--body-wrapper`,
                `${prefixCls}--with-range`,
                this.data.shortcuts.length ? `${prefixCls}--with-sidebar` : '',
                this.data.showWeekNumbers ? `${datePrefixCls}--with-week-numbers` : '',
            ].join(' ');
        },
        getPanelBodyClasses() {
            return [
                `${prefixCls}__body`,
                this.data.showTime ? `${prefixCls}-body-time ${prefixCls}-body-date` : '',
            ].join(' ');
        },
    });
};
