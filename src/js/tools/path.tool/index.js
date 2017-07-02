/* eslint-disable */
/**
 * ----------------------------------------------------
 * PathTool    快捷键复制当前页面的 js 路径和 ftl 路径
 * ----------------------------------------------------
 */

'use stict';

const Clipboard = require('clipboard');

/**
 * 获取 js 路径快捷键 ctrl + alt + shift + c
 * 获取 ftl 路径快捷键 ctrl + alt + shift + d
 */

const PathTool = function (Comp) {
  Comp.implement({
    events: {
      $init() {
        console.log('init');
        const jCopy = new Clipboard('#j-copy');
        let jsLink = location.href.replace(/([A-Z])/g, '.$1').toLowerCase();
        jsLink = jsLink.replace('/backend', '');
        jsLink = `${jsLink
          .substring(jsLink.indexOf('/'))
          .replace('/', 'page/')}/index`;
        const ftlLink = jsLink.replace('page/', 'pages/');
        jsLink += '/entry';
        document.addEventListener('keydown', (event) => {
          if (
            event.ctrlKey &&
            event.altKey &&
            event.shiftKey &&
            event.keyCode == 67
          ) {
            var para = document.createElement('button');
            para.setAttribute('data-clipboard-text', jsLink);
            para.id = 'j-copy';
            document.body.appendChild(para);
            para.click();
          } else if (
            event.ctrlKey &&
            event.altKey &&
            event.shiftKey &&
            event.keyCode == 68
          ) {
            var para = document.createElement('button');
            para.setAttribute('data-clipboard-text', ftlLink);
            para.id = 'j-copy';
            document.body.appendChild(para);
            para.click();
          }
        });
        jCopy.on('success', (e) => {
          const copy = document.getElementById('j-copy');
          if (copy) {
            document.body.removeChild(copy);
          }
        });
      },
    },
  });
};

module.exports = PathTool;
