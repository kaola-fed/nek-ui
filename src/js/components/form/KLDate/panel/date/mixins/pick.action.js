/* eslint-disable */

export default (Component) => {
    Component.implement({
        onPickClick() {
            this.$emit('pick-click');
        },
        onPanelPickerHandlers(e) {
            if (this.data.pickerTable === `${this.data.currentView}-table`) {
                this.getValue(e);
            } else {
                this.changePanel(e);
            }
        },
        /**
         * 获取到选到的日期
         */
        getValue(e) {
            let {value, type} = e;
            const {selectionMode, panelDate} = this.data;

            if (selectionMode === 'year') value = new Date(value.getFullYear(), 0, 1);
            else if (selectionMode === 'month') value = new Date(panelDate.getFullYear(), value.getMonth(), 1);
            else value = new Date(value);

            this.data.internalValue = [value];
            this.data.panelDate = value;
            this.data.value = this.formatDate(value);
            this.getDatePanelLabel();

            this.$emit('showVisualValue', this.data.value);

            let isShow = true;
            if (selectionMode != 'datetime') {
                isShow = false;
            }
            this.$emit('pick', {
                value,
                isShow
            });
        },
        changePanel(e) {
            this.data.panelDate = e.value;
            this.getDatePanelLabel();
            if (this.data.pickerTable === 'year-table') this.data.pickerTable = 'month-table';
            else this.setPickerTableType(this.data.currentView);
        },
    });
};
