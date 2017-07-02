'use strict';

var Component = require('../../../ui-base/component');
var ajax = require('../../../ui-base/ajax');
var _ = require('../../../ui-base/_');

var KLLocaleProvider = Component.extend({
    name: 'kl-locale-provider',
    template: '{#if ready}{#inc this.$body}{/if}',
    config: function() {
        this.defaults({
            lang: 'cn'
        });

        this._initLang();
    },
    _initLang: function() {
        var api = this.data.api,
            lang = this.data.lang;

        KLLocaleProvider.lang = lang;
        ajax.get(`${api}?lang=${lang}`, function(json) {
            KLLocaleProvider.locale[lang] = json;
            this.$update('ready', true);
            
            this.$emit('ready');
        }.bind(this))
    }
});

KLLocaleProvider.lang = 'cn';
KLLocaleProvider.locale = {};

const RE_NARGS = /(%|)\{([0-9a-zA-Z_]+)\}/g;
KLLocaleProvider._format = (str, ...args) => {
    if (args.length === 1 && typeof args[0] === 'object') {
        args = args[0]
    } else {
        args = {}
    }

    if (!args || !args.hasOwnProperty) {
        args = {}
    }

    return str.replace(RE_NARGS, (match, prefix, i, index) => {
        let result;

        if (str[index - 1] === '{'
            && str[index + match.length] === '}') {
            return i;
        } else {
            result = _.hasOwn(args, i) ? args[i] : match;
            if (_.isNil(result)) {
                return '';
            }

            return result;
        }
    })
};

/**
 * @private
 */
KLLocaleProvider._interpolate = (key, args) => {
    var lang = KLLocaleProvider.lang,
        map = KLLocaleProvider.locale[lang] || {};

    var val = map[key] || key;

    // Check for the existance of links within the translated string
    if (val.indexOf('@:') >= 0) {
        // Match all the links within the local
        // We are going to replace each of
        // them with its translation
        const matches = val.match(/(@:[\w|.]+)/g);
        for (const idx in matches) {
            const link = matches[idx];
            // Remove the leading @:
            const linkPlaceholder = link.substr(2);
            // Translate the link
            const translatedstring = KLLocaleProvider._interpolate(linkPlaceholder, args);
            // Replace the link with the translated string
            val = val.replace(link, translatedstring)
        }
    }
    return !args ? val : KLLocaleProvider._format(val, args);
};

KLLocaleProvider.translate = (key, params) => {
    return KLLocaleProvider._interpolate(key, params);
};

module.exports = KLLocaleProvider;