/* eslint-disable */
import {
    siblingMonth     // 防止月数设置错误
} from '../../../utils/index';

export default (Component) => {
    Component.implement({
        changeYear(dir) {
            if (this.data.selectionMode === 'year' || this.data.pickerTable === 'year-table') {
                this.data.panelDate = new Date(this.data.panelDate.getFullYear() + dir * 10, 0, 1);
            } else {
                this.data.panelDate = siblingMonth(this.data.panelDate, dir * 12);
            }

            // 更新 label
            this.getDatePanelLabel();
        },
        changeMonth(dir) {
            this.data.panelDate = siblingMonth(this.data.panelDate, dir);

            // 更新 label
            this.getDatePanelLabel();
        },
    });
};
