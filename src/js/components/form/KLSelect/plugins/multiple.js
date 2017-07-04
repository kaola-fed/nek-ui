/**
 * ------------------------------------------------------------
 * kl-select  多选的方法
 * ------------------------------------------------------------
 */

const util = require('../common/util');

module.exports = function Multiple(Component) {
  Component.implement({
    selectAll(isSelected) {
      const data = this.data;
      if (isSelected) {
        data.selected = this.filterData(data.source);
      } else {
        data.selected = [];
      }
      this.toggle(false);
    },
    removeSelected(selected, index, event) {
      event && event.stopPropagation();
      selected.splice(index, 1);
      this.toggle(true);
      this.searchInputFocus();
    },
    backSearchValue(event, selected, searchValue) {
      const isBackSpaceKeyCode = 8;
      if (event.which === isBackSpaceKeyCode && !searchValue.trim()) {
        this.removeSelected(selected, selected.length - 1, event);
      }
    },
    searchClick(event) {
      event && event.stopPropagation();
      this.toggle(true);
      this.searchInputFocus();
    },
    searchInputFocus() {
      this.$refs.input && this.$refs.input.focus();
    },
    clearSearchValue() {
      const data = this.data;
      util.clearDataToNUll(data, 'searchValue', '');
    },
  }).directive({
    computedTextWidth(element, value) {
      const getStrInDOMWidth = function (str) {
        const doc = document;
        const body = doc.body;
        const span = doc.createElement('span');
        span.style.whiteSpace = 'pre';
        span.style.visibility = 'hidden';
        span.innerText = str;
        body.appendChild(span);
        const width = span.getClientRects()[0].width;
        body.removeChild(span);
        return width;
      };
      this.$watch(value, (newValue) => {
        if (newValue) {
          element.style.width = `${getStrInDOMWidth(newValue) + 1}px`;
        } else {
          element.style.width = '';
        }
      });
    },
  });
};
