export default (Component) => {
  Component.implement({
        /**
         * panel 面板位置
         * @param panel
         */
    prevYear(panel) {
      const increment = this.data.currentView === 'year' ? -10 : -1;
      this.changePanelDate(panel, 'FullYear', increment);
    },
    nextYear(panel) {
      const increment = this.data.currentView === 'year' ? 10 : 1;
      this.changePanelDate(panel, 'FullYear', increment);
    },
    prevMonth(panel) {
      this.changePanelDate(panel, 'Month', -1);
    },
    nextMonth(panel) {
      this.changePanelDate(panel, 'Month', 1);
    },
  });
};
