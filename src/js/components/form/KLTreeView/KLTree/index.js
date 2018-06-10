const SourceComponent = require('../../../../ui-base/sourceComponent');
const template = require('./index.html');
const _ = require('../../../../ui-base/_');

/**
 * @class KLTree
 * @extend SourceComponent
 * @private
 */
const KLTree = SourceComponent.extend({
  name: 'kl-tree',
  template,
  /**
     * @protected
     */
  config() {
    _.extend(this.data, {
      // @inherited source: [],
      itemTemplate: null,
      visible: false,
      multiple: false,
      level: 1,
    });
    this.supr();

    this.$ancestor = this.$parent.$ancestor;
    this.service = this.$ancestor.service;
    this.data.itemTemplate = this.$ancestor.data.itemTemplate;
    this.data.hierarchical = this.$ancestor.data.hierarchical;

    this.$watch('visible', function (newValue) {
      if (!this.data.hierarchical) return;

      if (!newValue || this.$parent.name !== 'kl-tree') return;

      this.$updateSource(function () {
        this.data.hierarchical = false;
      });
    });
  },
  /**
     * @override
     */
  getParams() {
    if (this.data.parent) {
      return _.extend(
        { parentId: this.data.parent.id },
        this.$ancestor.getParams(),
      );
    }
  },
  /**
     * @method $updateSource() 从service中更新数据源
     * @public
     * @deprecated
     * @return {SourceComponent} this
     */
  $updateSource() {
    const self = this;
    this.service.getList(this.getParams(), function (result) {
      // 给每个节点item添加parent
      result.forEach((item) => {
        item.parent = self.data.parent;
      });

      self.$update('source', result);

      self.$emit('updateSource', {
        sender: this,
        result,
      });
    });
    return this;
  },
  /**
     * @note 移交$ancestor处理
     */
  select(...args) {
    this.$ancestor.select(...args);
  },
  check($event) {
    $event.e.stopPropagation();
    this._setSelected({});
  },
  _setSelected(event) {
    const self = this;
    setTimeout(() => {
      self.$emit('setselected', event);
    }, 0);
  },
  /**
     * @private
     */
  _onItemCheckedChange($event, item) {
    const checked = $event.checked;
    item.checked = checked;
    if (checked !== null && item[this.data.childKey]) {
      item[this.data.childKey].forEach((child) => {
        child.checked = checked;
      });
    }

    const parent = this.data.parent;
    if (parent && parent.checked !== item.checked) {
      let checkedCount = 0;
      parent[this.data.childKey].forEach((child) => {
        if (child.checked) checkedCount += 1;
        else if (child.checked === null) checkedCount += 0.5;
      });

      if (checkedCount === 0) parent.checked = false;
      else if (checkedCount === parent[this.data.childKey].length) {
        parent.checked = true;
      } else parent.checked = null;
    }
  },
});

module.exports = KLTree;
