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
        <div class="m-codeBlock" r-class="{ {'wrap': !showScript}}" >
          <kl-button class="m-copyCode" type="tertiary" size="sm" title="复制代码" on-click={this.copy($event)}></kl-button>
          <div r-html={htmlTpl} class="figure-outer"></div>
        </div>
    </div>`,
  name: 'demo-wrap',
  data: {
    htmlTpl: '',
    showScript: false,
    htmlcode: '',
    jsCode: '',
  },
  toggle() {
    this.data.showScript = !this.data.showScript;
  },
  copy($event) {
    const copyForm = document.createElement('textarea');
    copyForm.textContent = this.data.htmlCode + this.data.jsCode;
    body = document.getElementsByTagName('body')[0];
    body.appendChild(copyForm);
    copyForm.select();
    document.execCommand('copy');
    body.removeChild(copyForm);
    NEKUI.KLNotify.success('复制成功');
  },
});
