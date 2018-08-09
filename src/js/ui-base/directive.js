const _ = require('./_');
const Regular = require('regularjs');

const rClassGenerator = function (rClass) {
  exports[rClass] = function (elem, value) {
    if (typeof value === 'object' && value.type === 'expression') {
      this.$watch(value, (newValue) => {
        _.dom[newValue ? 'addClass' : 'delClass'](elem, rClass);
      });
    } else if (!!value || value === '') _.dom.addClass(elem, rClass);
  };
};

rClassGenerator('is-crt');
rClassGenerator('is-sel');
rClassGenerator('is-chk');
rClassGenerator('is-act');
rClassGenerator('is-dis');
rClassGenerator('is-hover');
rClassGenerator('is-divider');

exports['r-show'] = function (elem, value) {
  if (typeof value === 'object' && value.type === 'expression') {
    this.$watch(value, (newValue, oldValue) => {
      if (!newValue === !oldValue) return;

      if (typeof newValue === 'string') elem.style.display = newValue;
      else elem.style.display = newValue ? 'block' : '';
    });
  } else if (!!value || value === '') {
    if (typeof value === 'string' && value !== '') elem.style.display = value;
    else elem.style.display = value ? 'block' : '';
  }
};

exports['r-autofocus'] = function (elem) {
  setTimeout(() => {
    elem.focus();
  }, 0);
};

exports['r-attr'] = function (elem, value) {
  const attrs = {
    INPUT: [
      'autocomplete',
      'autofocus',
      'checked',
      'disabled',
      'max',
      'maxlength',
      'min',
      'multiple',
      'name',
      'pattern',
      'placeholder',
      'readonly',
      'required',
      'step',
      'type',
    ],
    TEXTAREA: [
      'autofocus',
      'disabled',
      'maxlength',
      'name',
      'placeholder',
      'readonly',
      'required',
      'wrap',
    ],
    SELECT: ['autofocus', 'disabled', 'multiple', 'name', 'required'],
  };

  this.$watch(
    value,
    (newValue) => {
      attrs[elem.tagName].forEach((attr) => {
        if (newValue[attr]) _.dom.attr(elem, attr, newValue[attr]);
      });
    },
    true,
  );
};

/**
 * r-width form.item下表单元素固定宽度时使用;
 * @param elem
 * @param value
 */
exports['r-width'] = function (elem, value) {
  this.$watch(value, (newValue) => {
    if (parseInt(newValue)) {
      elem.style.width = `${parseInt(newValue)}px`;
      elem.style.display = 'inline-block';
    }
  });
};


/**
 * r-route kl-menu中使用, 支持单页跳转
 * @param elem
 */
exports['r-route'] = function (elem, value) {
  this.$watch(value, function () {
    const { data } = this;
    const { url, route, rootMenu } = data;
    const { router } = rootMenu.data;

    if (url) {
      elem.href = url;
    } else if (router && route) {
      Regular.directive('r-link').link.call(this, elem, route);
    }
  });
};
