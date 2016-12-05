### 示例
#### 基本形式

<div class="m-example"></div>

```xml
<form class="m-form">
<validation ref="validation">
    <div class="u-formitem">
        <label class="formitem_tt">用户名<span class="formitem_rqr">*</span>：</label>
        <span class="formitem_ct">
            <ui.input type="int" max=10 message="必须小于10" placeholder="4~12个字符，包括字母、数字、下划线" />
        </span>
    </div>
    <div class="u-formitem">
        <label class="formitem_tt">邮箱：</label>
        <span class="formitem_ct">
            <ui.input rules={emailRules} placeholder="可选，但需要校验格式" />
        </span>
    </div>
    <div class="u-formitem">
        <label class="formitem_tt">性别<span class="formitem_rqr">*</span>：</label>
        <span class="formitem_ct">
            <radioGroup source={source} required=true message="请选择" />
        </span>
    </div>
    <div class="u-formitem">
        <label class="formitem_tt">设置密码<span class="formitem_rqr">*</span>：</label>
        <span class="formitem_ct">
            <ui.input type="password" rules={passwordRules} value={password} maxlength=18 placeholder="6~18个字符，包括字母、数字、下划线" />
        </span>
    </div>
    <div class="u-formitem">
        <label class="formitem_tt">确认密码<span class="formitem_rqr">*</span>：</label>
        <span class="formitem_ct"><ui.input type="password" rules={confirmRules} maxlength=18 /></span>
    </div>
    <div class="u-formitem">
        <label class="formitem_tt">验证码<span class="formitem_rqr">*</span>：</label>
        <span class="formitem_ct">
            <ui.input rules={vcodeRules} maxlength=5 />
            <img src="../img/verifyCode.jpg">
            <a>换一张</a>
        </span>
    </div>
    <div class="u-formitem">
        <label class="formitem_tt">爱好<span class="formitem_rqr">*</span>：</label>
        <span class="formitem_ct">
            <checkGroup source={source} min=1 max=3 message="请选择1-3个" />
        </span>
    </div>
    <div class="u-formitem">
        <label class="formitem_tt">数据选择<span class="formitem_rqr">*</span>：</label>
        <span class="formitem_ct">
            <selectGroup source={selectGroupSource} depth=3 required=true />
        </span>
    </div>
    <div class="u-formitem">
        <label class="formitem_ct"><input type="checkbox" /> 同意“服务条款”和“隐私权保护和个人信息利用政策”</label>
    </div>
    <div class="u-formitem">
        <span class="formitem_ct"><a class="u-btn u-btn-primary" on-click={this.submit()}>立即注册</a></span>
    </div>
</validation>
</form>
```

```javascript
var validator = RGUI.Validation.validator;
var component = new RGUI.Component({
    template: template,
    data: {
        nameRules: [
            {type: 'isFilled', message: '请输入用户名！'},
            {type: 'isLength', min: 4, max: 12, message: '请输入4~12个字符！'}
        ],
        emailRules: [
            {message: '留空，或者输入正确邮箱', method: function(value) {
                return validator._isEmail(value)();
            }}
        ],
        passwordRules: [
            {type: 'isFilled', message: '请设置密码！'},
            {type: 'isLength', min: 6, max: 18, message: '请输入6~18个字符！'}
        ],
        confirmRules: [
            {type: 'isFilled', message: '请确认密码！'},
            {message: '两次密码不一致！', method: function(value) {
                return value === component.data.password;
            }}
        ],
        vcodeRules: [
            {type: 'isFilled', message: '请输入图片中的验证码！'},
            {message: '验证码不正确！', method: function(value) {
                return value.toLowerCase() === 'rnnag';
            }}
        ],
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'},
            {name: '选项4'},
            {name: '选项5'},
            {name: '选项6'}
        ],
        selectGroupSource: [
            {id:'理学', name: '理学', children: [
                {id: '物理学', name: '物理学', children: [
                    {id: '理论物理', name: '理论物理'},
                    {id: '凝聚态物理', name: '凝聚态物理'},
                    {id: '材料物理', name: '材料物理'}
                ]},
                {id:'数学', name: '数学', children: [
                    {id:'基础数学', name: '基础数学'},
                    {id:'计算数学', name: '计算数学'},
                    {id:'应用数学', name: '应用数学'}
                ]},
                {id:'化学', name: '化学'}
            ]},
            {id:'工学', name: '工学', children: [
                {id:'计算机科学与技术', name: '计算机科学与技术', children: [
                    {id:'计算机系统结构', name: '计算机系统结构'},
                    {id:'计算机软件与理论', name: '计算机软件与理论'},
                    {id:'计算机应用技术', name: '计算机应用技术'}
                ]},
                {id:'软件工程', name: '软件工程'},
                {id:'机械工程', name: '机械工程', children: [
                    {id:'机械制造及其自动化', name: '机械制造及其自动化'},
                    {id:'机械电子工程', name: '机械电子工程'},
                    {id:'机械设计及理论', name: '机械设计及理论'},
                    {id:'车辆工程', name: '车辆工程'}
                ]}
            ]}
        ],
    },
    submit: function() {
        var conclusion = this.$refs.validation.validate();
        if(!conclusion.success)
            return;
    }
});
```