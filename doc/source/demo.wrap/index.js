/*
    demowrap组件，用来包裹组件demo的显示，实现组件代码展开和收缩
    by：wangtan@corp.netease.com
*/
/* eslint no-unused-vars: 0 */
/* eslint no-undef: 0 */
const DemoWrap = Regular.extend({
  template: `
    <div class="m-demowrap">
        <div class="m-iconLine"> <div class="m-iconOuter" r-class="{ {'revert':showScript}}" on-click={this.toggle()}> <kl-icon type="angle-down" /> </div> </div>
        <div r-html={htmlTpl} class="m-codeBlock" r-class="{ {'wrap': !showScript}}" ></div>
    </div>`,
  name: 'demo-wrap',
  data: {
    htmlTpl: '',
    showScript: false,
  },
  toggle() {
    this.data.showScript = !this.data.showScript;
  },
});
