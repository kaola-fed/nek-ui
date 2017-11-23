/**
 * 把组件 MD 文档转为 hexo 最终渲染 MD，主要功能：
 * 1、增加头部信息，用于渲染左侧多级菜单
 * 2、把组件内的 jsdoc 注释转为 MD 追加到尾部，用于生成 API 文档
 * 3、把 DEMO 代码实例化为组件
 *
 * author: Cody Chan <int64ago@gmail.com> 2017-02-08
 */
/* eslint no-param-reassign: 0 */
const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const jsdoc2md = require('jsdoc-to-markdown');

// 分类的顺序跟下面保持一致，每个分类下的组件顺序不作保证
const CATES = [
  { cate: 'layout', name: '布局', startOrder: 100 },
  { cate: 'form', name: '表单', startOrder: 200 },
  { cate: 'notice', name: '通知', startOrder: 300 },
  { cate: 'navigation', name: '导航', startOrder: 400 },
  { cate: 'widget', name: '其它', startOrder: 500 },
];

const DOC_PATH = __dirname;
const COMPONENTS_PATH = path.join(__dirname, '../../src/js/components');
const COMPONENTS_DEST = path.join(DOC_PATH, 'components');

const getComponents = (cate) => {
  const fullPath = path.join(COMPONENTS_PATH, cate);
  return fs.readdirSync(fullPath).filter(f => fs.statSync(path.join(fullPath, f)).isDirectory());
};

const getDemoCode = (demo) => {
  const rglMatch = /(```(xml|html))([\s\S]*?)(```)/g.exec(demo);
  const jsMatch = /(```javascript)([\s\S]*?)(```)/g.exec(demo);
  return {
    rgl: rglMatch ? rglMatch[3] : '',
    js: jsMatch ? jsMatch[2] : 'var component = new NEKUI.Component({template: template});',
  };
};

const injectComponents = (md) => {
  const demos = [];
  const reg = /(<div class="grid-item" markdown="1">)([\s\S]*?)(</div>)/g;
  let match = reg.exec(md);
  while (match) {
    demos.push(getDemoCode(match[2]));
    match = reg.exec(md);
  }
  if (demos.length === 0) return md;
  let demosScript = '\n\n<script>\nvar index = 0;\n';
  demos.forEach((demo) => {
    const tempJs = demo.js.replace(/`/gim, '\\`');
    demosScript += `
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      ${demo.rgl}
      */});
      ${demo.js}
      component.$inject(document.querySelectorAll('.m-example')[index]);
      var gridItem = document.querySelectorAll('.grid-item')[index];
      var codeDemo = document.createElement('div');
      codeDemo.className = 'm-code';
      var child = gridItem.childNodes;
      child.forEach(function(item,index){
        if(item.tagName == 'FIGURE'){
          codeDemo.appendChild(item);
        }
      });
      gridItem.appendChild(codeDemo);
      var codeComponent = new DemoWrap({
          data: {
              htmlTpl: codeDemo.innerHTML,
              htmlCode: \`${demo.rgl}\`,
              jsCode: \`${tempJs}\`
          }
      });
      codeDemo.innerHTML = '';
      codeComponent.$inject(codeDemo);
    })(index++);
    `;
  });
  demosScript += '\n</script>\n';
  return md + demosScript;
};


const partial = glob.sync(path.join(DOC_PATH, 'partials/**/*.hbs'));

const injectAPI = (md, source) => {
  const docs = jsdoc2md.renderSync({
    source,
    'no-cache': true,
    partial,
    configure: path.join(__dirname, 'jsdoc.json'),
  });
  return `${md}\n# API\n${docs}`;
};

const doc = (isDev, callback) => {
  // 其它文档
  if (!isDev) {
    const mds = glob.sync(path.join(DOC_PATH, '**/*.md'));
    mds.forEach((md) => {
      fs.writeFileSync(md, injectComponents(fs.readFileSync(md, 'utf8')));
    });
  }
  // 组件文档
  CATES.forEach((c) => {
    const components = getComponents(c.cate).filter((comp) => {

      if (isDev && !/^KL(Sidebar|Menu|Button|Upload)$/.test(comp)) {
        return false;
      }

      const mdPath = path.join(COMPONENTS_PATH, c.cate, comp, 'index.md');
      if (fs.existsSync(mdPath)) return true;
      return false;
    });
    components.forEach((comp, i) => {
      const compPath = path.join(COMPONENTS_PATH, c.cate, comp);
      const mdPath = path.join(compPath, 'index.md');
      const jsPath = path.join(compPath, 'index.js');

      const appendContent = `type: components\nname: ${comp}\ncate: ${c.name}\norder: ${c.startOrder + i}\n`;
      let md = fs.readFileSync(mdPath, 'utf8');
      // 插入文档头部信息
      md = md.replace(/(^---)([\s\S]*?)(---)/g, `$1$2${appendContent}$3`);
      // 插入 API 文档
      if (fs.existsSync(jsPath)) {
        md = injectAPI(md, fs.readFileSync(jsPath, 'utf8'));
      }
      // 插入实例化组件的脚本
      md = injectComponents(md);
      fs.writeFileSync(path.join(COMPONENTS_DEST, `${c.cate}_${comp}_.md`), md);
    });
  });
  callback && callback();
};

module.exports = doc;
</int64ago@gmail.com>