/* eslint-disable */

import { formatDateLabels } from '../../../../util';

export default (Component) => {
  Component.implement({
    leftDatePanelLabel() {
      this.data.leftDatePanelLabel = this.panelLabelConfig('left');
      return this.panelLabelConfig('left');
    },
    rightDatePanelLabel() {
      this.data.rightDatePanelLabel = this.panelLabelConfig('right');
      return this.panelLabelConfig('right');
    },
    panelLabelConfig(direction) {
      const locale = 'zh-CN';
      const datePanelLabel = '[yyyy年] [m月]';
      const handler = (type) => {
        const fn = type === 'month' ? this.showMonthPicker : this.showYearPicker;
        return () => fn(direction);
      };

      const date = this.data[`${direction}PanelDate`];
      const { labels, separator } = formatDateLabels(locale, datePanelLabel, date);

      return {
        separator,
        labels: labels.map(obj => ((obj.handler = handler(obj.type)), obj)),
      };
    },
    showYearPicker(panel) {
      this.data[`${panel}PickerTable`] = 'year-table';
    },
    showMonthPicker(panel) {
      this.data[`${panel}PickerTable`] = 'month-table';
    },
  });
};
