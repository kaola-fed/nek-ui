/**
 * ------------------------------------------------------------
 * kl-select  多选的方法
 * ------------------------------------------------------------
 */

var util = require('../common/util');
'use strict';
module.exports = function Multiple(Component) {
    Component.implement({
        selectAll: function (isSelected) {
            var data = this.data;
            if (isSelected) {
                data.selected = this.filterData(data.source);
            } else {
                data.selected = [];
            }
            this.toggle(false);
        },
        removeSelected: function(selected, index, event){
            event && event.stopPropagation();
            selected.splice(index, 1);
            this.toggle(true);
            this.searchInputFocus();
        },
        backSearchValue: function(event, selected, searchValue){
            var isBackSpaceKeyCode = 8;
            if(event.which == isBackSpaceKeyCode && !searchValue.trim()){
                this.removeSelected(selected, selected.length -1, event);
            }
        },
        searchClick: function() {
            event && event.stopPropagation();
            this.toggle(true);
            this.searchInputFocus();
        },
        searchInputFocus: function(){
            this.$refs.input && this.$refs.input.focus();
        },
        clearSearchValue: function(){
            var data = this.data;
            util.clearDataToNUll(data, 'searchValue', '');
        }
    }).directive({
        computedTextWidth: function (element, value) {
            var getStrInDOMWidth = function (str) {
                var doc = document;
                var body = doc.body;
                var span = doc.createElement('span');
                span.style.whiteSpace = 'pre';
                span.style.visibility = 'hidden';
                span.innerText = str;
                body.appendChild(span);
                var width = span.getClientRects()[0].width;
                body.removeChild(span);
                return width;
            };
            this.$watch(value, function (newValue) {
                if (newValue) {
                    element.style.width = getStrInDOMWidth(newValue) + 1 + 'px';
                } else {
                    element.style.width = '';
                }
            });
        }
    });
};