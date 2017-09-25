/*
    demowrap组件，用来包裹组件demo的显示，实现组件代码展开和收缩
    by：wangtan@corp.netease.com
*/
/* eslint no-unused-vars: 0 */
/* eslint no-undef: 0 */
const DemoWrap = Regular.extend({
  template: `
    <div class="m-demowrap">
        <div class="m-iconLine"> <div class="m-iconOuter" r-class="{ {'revert':showScript}}" on-click="{this.toggle()}"> <kl-icon type="angle-down"> </kl-icon></div> </div>
        <div class="m-codeBlock" r-class="{ {'wrap': !showScript}}">
          <div class="m-operate-ctn">
            <kl-button type="tertiary" size="sm" title="复制代码" on-click="{this.copy($event)}"></kl-button>
            <kl-button type="tertiary" size="sm" title="在线运行" on-click="{this.online()}"></kl-button>
            <form action="https://codepen.io/pen/define" method="POST" target="_blank" style="display:none;">
              <input type="hidden" name="data" value="{codepenJson}">
              <input ref="onlineBtn" type="submit">
            </form>
          </div>
          <div r-html="{htmlTpl}" class="figure-outer"></div>
        </div>
    </div>`,
  name: 'demo-wrap',
  data: {
    htmlTpl: '',
    showScript: false,
    htmlCode: '',
    jsCode: '',
    codepenJson: ''
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
  online: function(){
    var btn = this.$refs.onlineBtn;
    console.log(111,this.data)
    var html = `
<script id="template" type="template/rgl">
  {! template here !}
  ${this.data.htmlCode.trim()}
</script>
`.trim();

    var css = `
body{
  padding: 20px;
}
`.trim();
    var js = `
${this.data.jsCode.trim()}

component.$inject(document.body);
`.trim();
    var data = {
      title: 'nekui demo',
      description: 'this is nekui online demo',
      html: html,
      css: css,
      js: js,
      js_external: 'https://unpkg.com/nek-ui/dist/vendor/regular.min.js;https://unpkg.com/nek-ui/dist/js/nek-ui.min.js',
      css_external: 'https://unpkg.com/nek-ui/dist/css/nek-ui.red.min.css'
    };
    this.data.codepenJson = JSON.stringify(data);
    this.$update();
    setTimeout(function(){
      btn.click();
    });
  }
});
