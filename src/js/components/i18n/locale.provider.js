'use strict';

var Component = require('../../ui-base/component');
var ajax = require('../../ui-base/ajax');

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
        }.bind(this))
    }
});

LocaleProvider.lang = 'cn';
LocaleProvider.locale = {};

/**
 * @private
 */
LocaleProvider._interpolate = (key) => {
    var lang = LocaleProvider.lang,
        map = LocaleProvider.locale[lang] || {};

    var val = map[key];
    if (!val) { return key; }
    if (typeof val !== 'string') { return console.warn('value of key' + key + 'is not a string'); }

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
            const translatedstring = LocaleProvider._interpolate(linkPlaceholder);
            // Replace the link with the translated string
            val = val.replace(link, translatedstring)
        }
        return val;
    }
    return val;
};

LocaleProvider.translate = (key) => {
    return LocaleProvider._interpolate(key);
};

module.exports = LocaleProvider;