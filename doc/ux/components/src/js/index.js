import Regular from 'regularjs';
import Component from './ui-base/component';

const Base = {
  Regular,
  Component,
};

const Components = {
    // Layout
    KLCard: require('./components/layout/KLCard'),
    KLCardTools: require('./components/layout/KLCard/KLCardTools'),
  UXImage: require('./components/ux.image'),
  UXModal: require('./components/ux.modal'),
};

module.exports = Object.assign(
  {
        // Register
  /* eslint no-shadow: 0 */
    install(Regular) {
      for (const m of Object.values(Components)) {
        const name = m.prototype && m.prototype.name;
        if (name) Regular.component(name, m);
      }
    },
  },
    Base,
    Components,
);
