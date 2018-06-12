module.exports = function (Component) {
  Component.implement({
    filterMenu(menu) {
      const { searchable, searchValue, titleKey, childrenKey } = this.data;
      if (!searchable || !searchValue) {
        return true;
      }

      if (menu[titleKey].indexOf(searchValue) !== -1) {
        menu.open = true;
        return true;
      }

      if (menu[childrenKey] && menu[childrenKey].length) {
        const containsPage = menu[childrenKey].some(page => this.filterMenuSub(page));
        if (containsPage) {
          menu.open = true;
        }
        return containsPage;
      }
    },
    filterMenuSub(page) {
      const { searchable, searchValue, pageKey } = this.data;
      if (!searchable || !searchValue) {
        return true;
      }

      return page[pageKey].indexOf(searchValue) !== -1;
    },
    highlight(name) {
      const { searchable, searchValue } = this.data;
      if (!searchable || !searchValue) {
        return name;
      }

      const regexp = new RegExp(`(${searchValue})`, 'gim');
      return name.replace(regexp, '<span class="kl-sidebar__highlight">$1</span>');
    },
  });
};
