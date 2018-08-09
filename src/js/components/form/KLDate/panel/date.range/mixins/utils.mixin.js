/* eslint-disable */
import {formatDateLabels} from "../../../utils";

export default (Component) => {
    Component.implement({
        /**
         * 获取 datePanelLabel
         */
        getDatePanelLabel(direction) {
            const locale = 'zh-CN';
            const datePanelLabel = '[yyyy年] [m月]';
            const handler = (type) => {
                const fn = type === 'month' ? this.showMonthPicker.bind(this) : this.showYearPicker.bind(this);
                return () => fn(direction);
            };
            const panelDate = this.data[`${direction}PanelDate`];
            const {labels, separator} = formatDateLabels(locale, datePanelLabel, panelDate);
            return {
                separator,
                labels: labels.map(obj => ((obj.handler = handler(obj.type)), obj)),
            };
        },
        showYearPicker(panel) {
            this.data[`${panel}PickerTable`] = 'year-table';
            this.initPanelPickerHandlers();
        },
        showMonthPicker(panel) {
            this.data[`${panel}PickerTable`] = 'month-table';
            this.initPanelPickerHandlers();
        },
    });
};
