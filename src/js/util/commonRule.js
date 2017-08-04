const _ = require('../ui-base/_');

module.exports = {
  noEmpty: {
    id: 'no-empty',
    type: 'method',
    method(value) {
      return !_.isEmpty(value);
    },
    message: _.$trans('PLEASE_SELECT'),
  },
  checkRequired: {
    id: 'check-required',
    type: 'method',
    method(value) {
      return value;
    },
    message: _.$trans('PLEASE_SELECT'),
  },
  isRequired: {
    id: 'is-required',
    type: 'isRequired',
    message: _.$trans('PLEASE_INPUT'),
  },
};
