export default (Component) => {
  Component.implement({
        /**
         * panel 面板位置 left/right
         * @param panel
         */
    changePanelDate(panel, type, increment, updateOtherPanel = true) {
      const current = new Date(this.data[`${panel}PanelDate`]);
      current[`set${type}`](current[`get${type}`]() + increment);
      this.data[`${panel}PanelDate`] = current;

      if (!updateOtherPanel) return;

      if (this.data.splitPanels) {
        // change other panel if dates overlap
        const otherPanel = panel === 'left' ? 'right' : 'left';
        if (panel === 'left' && this.data.leftPanelDate >= this.data.rightPanelDate) {
          this.changePanelDate(otherPanel, type, 1);
        }
        if (panel === 'right' && this.data.rightPanelDate <= this.data.leftPanelDate) {
          this.changePanelDate(otherPanel, type, -1);
        }
      } else {
        // keep the panels together
        const otherPanel = panel === 'left' ? 'right' : 'left';
        const otherCurrent = new Date(this.data[`${otherPanel}PanelDate`]);
        otherCurrent[`set${type}`](otherCurrent[`get${type}`]() + increment);
        this.data[`${otherPanel}PanelDate`] = otherCurrent;
      }

      this.data.leftDatePanelLabel = this.panelLabelConfig('left');
      this.data.rightDatePanelLabel = this.panelLabelConfig('right');
    },
  });
};
