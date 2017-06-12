module.exports = {
  install: function(Regular) {
    Regular.animation('collapse', function(step) {
      var param = step.param,
        el = step.element,
        on = param === 'on';

      return function(done) {
        if (on) {
          // beforeEnter
          if (!el.dataset) el.dataset = {};

          el.dataset.oldPaddingTop = el.style.paddingTop;
          el.dataset.oldPaddingBottom = el.style.paddingBottom;

          el.style.height = '0';
          el.style.paddingTop = 0;
          el.style.paddingBottom = 0;
          el.classList.add('collapse-transition');

          // enter
          el.dataset.oldOverflow = el.style.overflow;
          if (el.scrollHeight !== 0) {
            el.style.height = el.scrollHeight + 'px';
            el.style.paddingTop = el.dataset.oldPaddingTop;
            el.style.paddingBottom = el.dataset.oldPaddingBottom;
          } else {
            el.style.height = '';
            el.style.paddingTop = el.dataset.oldPaddingTop;
            el.style.paddingBottom = el.dataset.oldPaddingBottom;
          }

          el.style.overflow = 'hidden';

          // afterEnter
          el.addEventListener('transitionend', function() {
            el.classList.remove('collapse-transition');
            el.style.height = '';
            el.style.overflow = el.dataset.oldOverflow;
            el.removeEventListener('transitionend', function() {});
            done();
          });
        } else {
          // beforeLeave
          if (!el.dataset) el.dataset = {};
          el.dataset.oldPaddingTop = el.style.paddingTop;
          el.dataset.oldPaddingBottom = el.style.paddingBottom;
          el.dataset.oldOverflow = el.style.overflow;

          el.style.height = el.scrollHeight + 'px';
          el.style.overflow = 'hidden';

          // leave
          if (el.scrollHeight !== 0) {
            // for safari: add class after set height, or it will jump to zero height suddenly, weired
            el.classList.add('collapse-transition')
            el.style.height = 0;
            el.style.paddingTop = 0;
            el.style.paddingBottom = 0;
          }

          // afterLeave
          el.addEventListener('transitionend', function() {
            el.classList.remove('collapse-transition');
            el.style.height = '';
            el.style.overflow = el.dataset.oldOverflow;
            el.style.paddingTop = el.dataset.oldPaddingTop;
            el.style.paddingBottom = el.dataset.oldPaddingBottom;
            el.removeEventListener('transitionend', function() {});
            done();
          });
        }
      }
    });
  }
}