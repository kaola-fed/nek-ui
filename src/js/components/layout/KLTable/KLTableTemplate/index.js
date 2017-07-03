const Component = require('../../../../ui-base/component');

/**
 * @class KLTableTemplate
 * @extend Component
 * @param {object}      [options.data]                = 绑定属性
 * @param {string}      [options.data.type="content"] => 模版类型, header, content, expand
 */

const matchList = [
  {
    reg: /&quot;/g,
    glyph: '"',
  },
  {
    reg: /&amp;/g,
    glyph: '&',
  },
  {
    reg: /&lt;/g,
    glyph: '<',
  },
  {
    reg: /&gt;/g,
    glyph: '>',
  },
  {
    reg: /&nbsp;/g,
    glyph: ' ',
  },
];

const decodeChar = function (_str) {
  let str = _str;
  matchList.forEach((item) => {
    str = str.replace(item.reg, item.glyph);
  });
  return str;
};

const KLTableTemplate = Component.extend({
  name: 'kl-table-template',
  template:
    '<div ref="bodyContainer" style="display:none">{#include this.$body}</div>',
  config() {
    this.defaults({
      type: 'content',
      template: null,
    });
  },
  init() {
    this._register();
  },
  _register() {
    switch (this.data.type) {
      case 'header':
        this._register2Header();
        break;
      case 'expand':
        this._register2Expand();
        break;
      default:
        this._register2Content();
    }
  },
  _register2Header() {
    const outerData = this.$outer.data;
    outerData._headerTemplate = this._getInnertTemplate();
  },
  _register2Expand() {
    this.$outer.data._expandTemplate = this._getInnertTemplate();
  },
  _register2Content() {
    const outerData = this.$outer.data;
    outerData._template = this._getInnertTemplate();
  },
  _getInnertTemplate() {
    const template = this.data.template || this.$refs.bodyContainer.innerHTML;
    return this._parseTemplate(template);
  },
  _parseTemplate(template) {
    return decodeChar(template).replace(/(<!--)(.*)(-->)/g, '').trim();
  },
});

module.exports = KLTableTemplate;
