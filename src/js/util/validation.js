/**
 * ------------------------------------------------------------
 * Validation  表单验证
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

const Component = require('../ui-base/component');
const _ = require('../ui-base/_');
const validator = require('validator');

/**
 * @class Validation
 * @extend Component
 * @param {object}            [options.data]                      = 绑定属性
 * @param {boolean}           [options.data.disabled=false]       => 是否禁用。当禁用时验证始终通过。
 */
const Validation = Component.extend({
  name: 'validation',
  template: '{#inc this.$body}',
  /**
     * @protected
     */
  config() {
    this.controls = [];

    _.extend(this.data, {});
    this.supr();
  },
  /**
     * @method validate() 验证所有表单组件
     * @public
     * @return {object} conclusion 结论
     */
  validate() {
    if (this.data.disabled) {
      return {
        success: true,
        message: 'Validation is disabled.',
      };
    }

    const conclusion = {
      results: [],
      success: true,
      message: '',
    };

    this.controls.forEach((control) => {
      if (!control) {
        return;
      }

      const result = control.validate();
      conclusion.results.push(result);
      if (!result.success) {
        conclusion.success = false;
        conclusion.message = conclusion.message || result.message;
      }
    });

    return conclusion;
  },
});

Validation.validate = function (value, rules) {
  const result = {
    success: true,
    message: '',
  };

  rules.forEach((rule) => {
    rule.success = true;

    // 为了兼容
    if (rule.type === 'is') {
      rule.success = (rule.options || rule.reg).test(value);
    } else if (rule.type === 'isNot') {
      rule.success = !(rule.options || rule.reg).test(value);
    } else if (rule.type === 'isRequired' || rule.type === 'isFilled') {
      rule.success = !!validator.toString(value).trim();
    } else if (rule.type === 'method' || rule.method) {
      rule.success = (rule.options || rule.method)(value, rule);
    } else rule.success = !value || validator[rule.type](value, rule.options);

    rule.callback && rule.callback(value, rule);

    // rule为函数时，可以直接返回字符串作为message
    if (!(typeof rule.success === 'boolean' && rule.success === true) && result.success) {
      result.success = false;
      result.firstRule = rule;
      rule.message = rule.message || rule.success;
      // @deprecated
      result.message = rule.message;
    }
  });

  return result;
};

// Patch for validator, ref: https://302.at/0wy3Z
Object.keys(validator).forEach((d) => {
  if (/^is/.test(d)) {
    validator[`_${d}`] = function (str, isRequired) {
      if (!isRequired && !str) {
        return function () {
          return true;
        };
      }
      return validator[d].bind(null, str);
    };
  }
});
Validation.validator = validator;

module.exports = Validation;
