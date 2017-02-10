/**
 * 把组件 MD 文档转为 hexo 最终渲染 MD，主要功能：
 * 1、增加头部信息，用于渲染左侧多级菜单
 * 2、把组件内的 jsdoc 注释转为 MD 追加到尾部，用于生成 API 文档
 * 3、把 DEMO 代码实例化为组件
 * 
 * author: Cody Chan <int64ago@gmail.com> 2017-02-08
 */

const fs = require('fs-extra');
const path = require('path');

// 分类的顺序跟下面保持一致，每个分类下的组件顺序不作保证
const CATES = [
  { cate: 'layout', name: '布局' , startOrder: 100 },
  { cate: 'form', name: '表单', startOrder: 200 },
  { cate: 'notice', name: '通知', startOrder: 300 },
  { cate: 'navigation', name: '导航', startOrder: 400 },
  { cate: 'widget', name: '其它', startOrder: 500 },
];

const DEST = path.join(__dirname, '../../../doc/components');

const getComponents = cate => {
  const fullPath = path.join(__dirname, cate);
  return fs.readdirSync(fullPath).filter(f => {
    return fs.statSync(path.join(fullPath, f)).isDirectory()
  })
}

const getDemoCode = demo => {
  const rglMatch = /(```(xml|html))([\s\S]*?)(```)/g.exec(demo);
  const jsMatch = /(```javascript)([\s\S]*?)(```)/g.exec(demo);
  return {
    rgl: rglMatch ? rglMatch[3] : '',
    js: jsMatch ? jsMatch[2] : 'var component = new NEKUI.Component({template: template});',
  };
}

const injectComponents = md => {
  const demos = [];
  const reg = /(<!-- demo_start -->)([\s\S]*?)(<!-- demo_end -->)/g;
  let match = reg.exec(md);
  while (match) {
    demos.push(getDemoCode(match[2]))
    match = reg.exec(md);
  }
  let demosScript = '\n{% raw %}\n<script>\nvar index = 0;\n';
  demos.forEach(demo => {
    demosScript += `
    (function(index) {
      var template = NEKUI._.multiline(function(){/*
      ${demo.rgl}
      */});
      ${demo.js}
      component.$inject(document.querySelectorAll('.m-example')[index]);
    })(index++);
    `;
  });
  demosScript += '\n</script>\n{% endraw %}';
  return md + demosScript;
}

const doc = callback => {
  CATES.forEach(c => {
    const components = getComponents(c.cate).filter(comp => {
      const mdPath = path.join(__dirname, c.cate, comp, 'index.md');
      if (fs.existsSync(mdPath)) return true;
      return false;
    });
    components.forEach((comp, i) => {
      const compPath = path.join(__dirname, c.cate, comp);
      const mdPath = path.join(compPath, 'index.md');
      const jsPath = path.join(compPath, 'index.js');

      const appendContent = `type: components\nname: ${comp}\ncate: ${c.name}\norder: ${c.startOrder + i}\n`;
      let md = fs.readFileSync(mdPath, 'utf8');
      md = md.replace(/(^---)([\s\S]*?)(---)/g, `$1$2${appendContent}$3`);

      md = injectComponents(md)
      fs.writeFileSync(path.join(DEST, `${c.cate}_${comp}_.md`), md);
    })
  })
  callback && callback();
}

doc()

module.exports = doc;
