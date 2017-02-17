'use strict';

var Component = require('../../ui-base/component');
var ajax = require('../../ui-base/ajax');
var _ = require('../../ui-base/_');

var LocaleProvider = Component.extend({
    name: 'locale.provider',
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

        LocaleProvider.lang = lang;
        ajax.get(`${api}?lang=${lang}`, function(json) {
            LocaleProvider.locale[lang] = json;
            this.$update('ready', true);
            
            this.$emit('ready');
        }.bind(this))
    }
});

LocaleProvider.lang = 'cn';
LocaleProvider.locale = {};

const RE_NARGS = /(%|)\{([0-9a-zA-Z_]+)\}/g;
LocaleProvider._format = (str, ...args) => {
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
LocaleProvider._interpolate = (key, args) => {
    var lang = LocaleProvider.lang,
        map = LocaleProvider.locale[lang] || {};

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
            const translatedstring = LocaleProvider._interpolate(linkPlaceholder, args);
            // Replace the link with the translated string
            val = val.replace(link, translatedstring)
        }
    }
    return !args ? val : LocaleProvider._format(val, args);
};

LocaleProvider.translate = (key, params) => {
    return LocaleProvider._interpolate(key, params);
};

module.exports = LocaleProvider;