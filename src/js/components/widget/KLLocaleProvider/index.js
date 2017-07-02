const Component = require('../../../ui-base/component');
const ajax = require('../../../ui-base/ajax');
const _ = require('../../../ui-base/_');

const KLLocaleProvider = Component.extend({
  name: 'kl-locale-provider',
  template: '{#if ready}{#inc this.$body}{/if}',
  config() {
    this.defaults({
      lang: 'cn',
    });

    this._initLang();
  },
  _initLang() {
    const self = this;
    const { api, lang } = this.data;

    KLLocaleProvider.lang = lang;
    ajax.get(`${api}?lang=${lang}`, (json) => {
      KLLocaleProvider.locale[lang] = json;
      self.$update('ready', true);

      self.$emit('ready');
    });
  },
});

KLLocaleProvider.lang = 'cn';
KLLocaleProvider.locale = {};

const RE_NARGS = /(%|)\{([0-9a-zA-Z_]+)\}/g;
KLLocaleProvider._format = (str, ..._args) => {
  let args = {};
  if (_args.length === 1 && typeof _args[0] === 'object') {
    args = _args[0];
  } else {
    args = {};
  }

  if (!args || !args.hasOwnProperty) {
    args = {};
  }

  return str.replace(RE_NARGS, (match, prefix, i, index) => {
    if (str[index - 1] === '{' && str[index + match.length] === '}') {
      return i;
    }
    const result = _.hasOwn(args, i) ? args[i] : match;
    if (_.isNil(result)) {
      return '';
    }

    return result;
  });
};

/**
 * @private
 */
KLLocaleProvider._interpolate = (key, args) => {
  const lang = KLLocaleProvider.lang;
  const map = KLLocaleProvider.locale[lang] || {};

  let val = map[key] || key;

  // Check for the existance of links within the translated string
  if (val.indexOf('@:') >= 0) {
    // Match all the links within the local
    // We are going to replace each of
    // them with its translation
    const matches = val.match(/(@:[\w|.]+)/g);
    for (let i = 0; i < matches.length; i += 1) {
      const link = matches[i];
      // Remove the leading @:
      const linkPlaceholder = link.substr(2);
      // Translate the link
      const translatedstring = KLLocaleProvider._interpolate(
        linkPlaceholder,
        args,
      );
      // Replace the link with the translated string
      val = val.replace(link, translatedstring);
    }
  }
  return !args ? val : KLLocaleProvider._format(val, args);
};

KLLocaleProvider.translate = (key, params) =>
  KLLocaleProvider._interpolate(key, params);

module.exports = KLLocaleProvider;
