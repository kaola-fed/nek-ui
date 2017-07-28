/**
 * ------------------------------------------------------------
 * Component 组件基类
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

const Regular = require('regularjs');
const _ = require('./_');
const filter = require('./filter');
const directive = require('./directive');
const animation = require('./animation');

/**
 * @class Component
 * @extend Regular
 * @param {boolean}       [options.data.readonly=false]     => 是否只读
 * @param {boolean}       [options.data.disabled=false]     => 是否禁用
 * @param {boolean}       [options.data.visible=true]       => 是否显示
 * @param {string}        [options.data.class]              => 补充class
 */
const Component = Regular.extend({
  /**
     * @protected
     */
  config() {
    _.extend(this.data, {
      readonly: false,
      disabled: false,
      visible: true,
      // zh-CN, en-US
      lang: 'zh-CN',
      class: '',
      console: typeof console === 'undefined' ? undefined : console,
    });
    this.supr();
  },
  /**
     * @protected
     */
  defaults(data) {
    this.data = Object.assign(data, this.data);
  },
  init() {
    this.supr();
  },
  /**
     * @protected
     */
  rules(attris) {
    this.data = Object.assign(attris, this.data);
  },
  _validate(on, value, Validation) {
    const data = this.data;
    let rules = [];
    if (Array.isArray(data.rules)) {
      rules = [].concat.call(data.defaultRules || [], data.rules);
    } else if (typeof data.rules === 'function') {
      const _rule = [{
        type: 'method',
        method: data.rules,
      }];
      rules = [].concat.call(data.defaultRules || [], _rule);
    } else if (typeof data.rules === 'object') {
      rules = [].concat.call(data.defaultRules || [], [data.rules]);
    } else {
      rules = [].concat.call(data.defaultRules || []);
    }
    rules = rules.filter(rule => (rule.on || '').indexOf(on) >= 0);
    const result = Validation.validate(value, rules);
    data.tip = this.showTip(on, result) ? result.firstRule.message : '';

    // @TODO
    data.state = result.success ? '' : 'error';

    this.$emit('validate', {
      sender: this,
      on,
      result,
    });

    return result;
  },
  showTip(on, result) {
    if (
      result.firstRule &&
      !(
        result.firstRule.silentOn === true ||
        (typeof result.firstRule.silentOn === 'string' &&
          result.firstRule.silentOn.indexOf(on) >= 0)
      )
    ) {
      return true;
    }
    return false;
  },
  /**
     * @protected
     */
  reset() {
    this.data = {};
    this.config();
  },
  $trans(key) {
    return _.$trans(key, this);
  },
})
  .filter(filter)
  .directive(directive);
animation.install(Regular);

module.exports = Component;
