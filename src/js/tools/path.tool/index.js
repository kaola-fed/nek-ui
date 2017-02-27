/**
 * ----------------------------------------------------
 * PathTool    快捷键复制当前页面的 js 路径和 ftl 路径
 * @author     hzlilang@corp.netease.com
 * ----------------------------------------------------
 */

'use stict'

var Clipboard = require('clipboard');

/**
 * 获取 js 路径快捷键 ctrl + alt + shift + c  
 * 获取 ftl 路径快捷键 ctrl + alt + shift + d
 */


var PathTool = function(Comp) {
	Comp.implement({
		events: {
			$init: function() {
				console.log('init');
				var jCopy = new Clipboard('#j-copy');
				var jsLink = location.href.replace(/([A-Z])/g, '.$1').toLowerCase();
				jsLink = jsLink.replace('/backend', '');
				jsLink = jsLink.substring(jsLink.indexOf('/')).replace('/' , 'page/') + '/index';
				var ftlLink = jsLink.replace('page/', 'pages/');
				jsLink = jsLink + '/entry';
				document.addEventListener('keydown', function(event) {
					if(event.ctrlKey && event.altKey && event.shiftKey && event.keyCode == 67) {
						var para = document.createElement('button');
						para.setAttribute('data-clipboard-text',jsLink);
						para.id = 'j-copy'
						document.body.appendChild(para);
						para.click();
					} else if(event.ctrlKey && event.altKey && event.shiftKey && event.keyCode == 68) {
						var para = document.createElement('button');
						para.setAttribute('data-clipboard-text',ftlLink);
						para.id = 'j-copy'
						document.body.appendChild(para);
						para.click();
					}
				})
				jCopy.on('success', function(e) {
					var copy = document.getElementById('j-copy');
					if(copy) {
						document.body.removeChild(copy);
					}
				})
			}
		}
	});
};

module.exports = PathTool;