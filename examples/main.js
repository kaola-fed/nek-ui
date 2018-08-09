import Regular from 'regularjs';
import restate from 'regular-state';
import { install } from '../src/js/index';

import BaseComponent from './common/BaseComponent';
import appTemplate from './index.html';

install(BaseComponent);

const routes = {
  app: {
    view: Regular.extend({
      template: appTemplate,
    }),
  },
  'app.button': {
    url: 'button',
    view: (option, resolve) => {
      require.ensure([], () => {
        resolve(require('./routers/form/index').default);
      });
    },
  },
};

restate()
    .state(routes)
    .start({
      html5: true,
    });
