const Component = require('../../ui-base/component');
const template = require('./index.html');
const _ = require('../../ui-base/_');

const UXModal = Component.extend({
  name: 'ux-modal',
  template,
  config() {
    _.extend(this.data, {
      title: null,
      content: '',
      okButton: true,
      with: 400,
      cancelButton: false,
      noClose: false,
      okDisabled: false,
      cancelDisabled: false,
      hasFooter: true,
      isCanClose: true,
    });
    this.supr();
  },

  init() {
    this.supr();

        // 如果不是内嵌组件，则嵌入到document.body中
    if (this.$root === this) this.$inject(document.body);
  },

  close(result, event) {
    this.$emit('close', {
      result,
    });
    result ? this.ok(event) : this.cancel();
  },
  ok(event) {
    this.$emit('ok', event);
    !this.data.noClose && this.destroy();
  },
  cancel() {
    this.$emit('cancel');
    this.destroy();
  },
});


module.exports = UXModal;
