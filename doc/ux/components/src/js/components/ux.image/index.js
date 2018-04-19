import Component from '../../ui-base/component';
import template from './index.html';
import _ from '../../ui-base/_';

import UXModal from '../ux.modal';

const UXImage = Component.extend({
  name: 'ux-image',
  template,
  config() {
    _.extend(this.data, {
      src: '',
      class: '',
      title: '事例',
      description: '',
    });
    this.supr();
  },
  viewImg() {
    /* eslint no-new: 0 */
    new UXModal({
      data: {
        okButton: false,
        hasFooter: false,
        contentTemplate: `<img class="ux-image-modal_image" src="${this.data.src}" alt="${this.data.title}">`,
        class: 'ux-image-modal',
        title: this.data.title,
        width: 800,
      },
    });
  },
});

module.exports = UXImage;
