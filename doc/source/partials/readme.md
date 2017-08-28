覆盖partial步骤:
1. 在doc.js中的jsdoc2md render的时候配置patial参数, 参数为对应的hbs文件路径数组;
2. 在https://github.com/jsdoc2md/dmd/tree/47459a97944227b381271556f4538835a1bf9575/partials这里找到要修改的对应的部分的partial文件名
3. 在本地partial目录中新建要需改的partial.hbs, 名称必须与dmd中的相同; 大部分修改可能都在docs/body里面
4. 修改内容后,运行即可看到效果
5. 组件的静态属性和静态方法使用@static注释，静态方法不用public或method注释（具体可参考KLLocaleProvider里的注释）