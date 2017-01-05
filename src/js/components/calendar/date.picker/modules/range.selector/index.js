/**
 * ------------------------------------------------------------
 * Range Selector 范围选择基类
 * @version  1.0
 * @author wuziran (hzwuziran@corp.netease.com)
 * 作为各类时间选择器的抽象基类, 封装了各种选择, 显示的逻辑
 * 在使用的时候, 子类基础该基类, 如果数据结果有所改变
 * 需要在子类中重写与特殊数据结构相关的判断函数如: isEqual, isLE, isL等
 * 对应区间的计算问题, 需要重写getHoverStart, isWithinPeriod这两个跟区间计算有关的函数
 * ------------------------------------------------------------
 */
'use strict';

var Component = require('../../../../../ui-base/component.js');

module.exports = Component.extend({
    config: function(){
        this.defaults({
            mode: 0,    // 0: 单选,　1:　多选, 2: 选择固定区间
            type: 0,    // 0: 左边日历, 1: 右边日历
            start: undefined,
            end: undefined,
            pick: undefined,
            hover: undefined,
            hoverStart: undefined,

            max: undefined,
            min: undefined,

            maxPeriod: 1,
            fixPeriod: 0,

            firstClick: true,
        });


        this.$watch('pick', this.onPickChange);

        this.$watch('max', this.onLimitChange);

        this.$watch('min', this.onLimitChange);

        this.supr();
    },

    init: function(){
        this.setDefult();
    },

    /**
     * 设置指定区间
     * @param {number} val1 起始数值
     * @param {number} val2 终止数值
     */
    setPeriod: function(val1, val2) {
        var data = this.data;
        var that = this;
        // 只有date改变的时候才会触发watcher处理
        if(val1 === data.pick) {
            var t = val1;
            val1 = val2;
            val2  = t;
        }

        // 因为需要同步到两个日历, 因此需要利用改变pick来改变区间
        // 当已经选择一个区间节点, 此时要去设置一个自定义区间, 则需要模拟一次pick的改变
        // 从而开启下一次区间选择模式
        if(!data.firstClick) {
            this.select(+val1 - 1, 1);
            setTimeout(function(){
                helper();
            }.bind(this), 100);
        } else {
            helper();
        }

        function helper() {
            that.select(val1, 1)
            that.$update();
            setTimeout(function(){
                that.select(val2, 1)
                that.$update();
            }.bind(this), 100);
        }
    },

    /**
     * 设置默认选择
     */
    setDefult: function(){
        var data = this.data;
        if(!!data.period && data.type === 0 && data.start && data.end) {
            var start = data.start;
            var end = data.end;
            setTimeout(function(){
                this.setPeriod(start, end);
            }.bind(this), 100)
        }
        this.$emit('init', {
            sender: this,
        });
    },

    onLimitChange: function(newVal, oldVal) {
        var data = this.data;
        var pick = data.pick;
        var isOutOfRange = this.isOutOfRange(data.pick);
        if(isOutOfRange) {
            data.pick = isOutOfRange;
        }
    },

    /**
     * 当所选数值变化时, 监听函数会处理所选的数值
     * @param  {number} newVal 新值
     * @param  {number} oldVal 旧值
     */
    onPickChange: function(newVal, oldVal){
        var data = this.data;
        if(newVal == null) {
            data.pick = null;
            return;
        }

        // 单选
        if(data.mode === 0) {
            data.start = newVal;
            data.end = newVal;
        } else {
        // 多选
            if(data.type === 0) {
                if(data.firstClick) {
                    data.start = newVal;
                    data.end = newVal;
                } else {
                    if(data.start < newVal) {
                        data.end = newVal;
                    } else {
                        data.start = newVal;
                    }
                }
            }

            data.firstClick = !data.firstClick;
        }
        this.getPeriod();
    },

    /**
     * 更新所选区域
     */
    getPeriod: function() {
        var data = this.data;
        data.period = this.__formatPeriod(data.mode, data.start, data.end);
        this.$emit('change', {
            sender: this,
            period: data.period,
            start: data.start,
            end: data.end,
            mode: data.mode,
        });
    },

    /**
     * 处理选择
     * @param  {number} val 所选数值
     * @param  {number} internal 来自内部的调用, 主要用于区别来自内部模拟select操作
     */
    select: function(val, internal){
        var data = this.data;
        var that = this;

        // 超出限制范围的点范围无效(x, min) & (max, x)
        if(this.isOutOfRange(val)){
            return;
        }

        //此时操作不是有内部发出, 模式2(固定选择区间)生效
        if(internal !== 1 && data.mode === 2){
            this.setPeriod(data.hoverStart, val);
            return;
        }

        // 非第一次点击时, 超出可选范围的点击无效
        if(internal !== 1 && !data.firstClick && !this.__isWithinPeriod(val)) {
            return;
        }

        // 如果当前选中的与上次选中的一样, 则先清楚上次选中的
        if(data.pick === val) {
            data.pick = null;
            setTimeout(function(){
                data.pick = val;
                that.$update();
            }, 50)
            return;
        } else {
            data.pick = val;
            this.$update();
        }


    },

    /**
     * 处理hover
     * @param  {number} date
     */
    onHover: function (val) {
        var data = this.data;
        data.hover = val;
        // 选择固定区间模式
        if(data.mode === 2) {
            var fixPeriod = data.fixPeriod > 0 ? data.fixPeriod : 1;
            data.hoverStart = this.__getHoverStart(data.hover, fixPeriod);
        }
    },

    /**
     * 处理blur
     * @param  {number} val
     */
    onBlur: function (val) {
        this.data.hover= null;
    },

    /**
     * 判断是否禁用
     * @param  {number} val 数值
     * @return {Boolean}      结果
     */
    isDisable: function(val){
        var data = this.data;
        var firstClick = data.firstClick;
        return !!this.isOutOfRange(val) || (!firstClick && !this.__isWithinPeriod(val));
    },

    /**
     * 判断是否hover
     * @param  {number} val 数值
     * @return {Boolean}     结果
     */
    isHover: function(val){
        var data = this.data;
        var start = data.start;
        var end = data.end;
        var hover = data.hover;
        var hoverStart = data.hoverStart;
        var firstClick = data.firstClick;
        var mode = data.mode;

        // if(!this.isWithinPeriod(val)) {
        //     return false;
        // }
        return  (this.__isEqual(val, hover))
                || (!firstClick && this.isWithinRange(val, start, hover))
                || (!firstClick && this.isWithinRange(val, hover, end))
                // || this.isWithinRange(val, start, end)
                || (mode === 2 && this.isWithinRange(val, hoverStart, hover));
    },

    /**
     * 判断是否边界
     * @param  {number} val 数值
     * @return {Boolean}      结果
     */
    isBoundary: function(val){
        var data = this.data;
        var start = data.start;
        var end = data.end;
        return this.__isEqual(val, start) || this.__isEqual(val, end);
    },


    /**
     * 判断是否选中
     * @param  {number} val 数值
     * @return {Boolean}      结果
     */
    isSelected: function(val) {
        var data = this.data;
        var start = data.start;
        var end = data.end;
        var pick = data.pick;
        return this.__isEqual(val, start)
                || this.__isEqual(val, end)
                || this.__isEqual(val, pick)
                || this.isWithinRange(val, start, end);
    },

    /**
     * 判断是否超出min和max的范围
     * @param  {number} val 数值
     * @return {Boolean}      结果
     */
    isOutOfRange: function(val){
        var min = this.data.min;
        var max = this.data.max;
        // console.log(val, max, +val > +max, this.isL(max, val));
        return (min && this.__isL(val, min) && min) || (max && this.__isL(max, val) && max);
    },

    /**
     * 判断是否超出一定范围
     * @param  {number} val 数值
     * @param  {number} start 起始值
     * @param  {number} end 终止值
     * @return {Boolean}      结果
     */
    isWithinRange: function(val, start, end) {
        return this.__isLE(start, val) && this.__isLE(val, end);
    },

    /******************* 可能需要被子类重写的方法 **********************/

    /**
     * 格式化period显示
     * @param  {number} mode 选择模式
     * @param  {number} start 起始值
     * @param  {number} end   终止值
     * @return {string}       格式化后的值
     */
    __formatPeriod: function(mode, start, end) {
        return start + '~' + end;
    },

    /**
     * 在模式2(固定区间选择)中, 用于计算起始的固定区间的起始值
     * @param  {number} hover     当前hover的值
     * @param  {number} fixPeriod 固定区间的大小
     * @return {number}           固定区间起始值
     */
    __getHoverStart: function(hover, fixPeriod) {
        return hover - fixPeriod + 1;
    },

    /**
     * 判断是否超出可选period的范围
     * @param  {number} val 数值
     * @return {Boolean}      结果
     */
    __isWithinPeriod: function(val){
        var data = this.data;
        var pick = data.pick;
        var diff = data.maxPeriod;
        return (this.isWithinRange(val , +pick - diff, +pick + diff));
    },

    /**
     * 小于
     * @param  {number} val1
     * @param  {number} val2
     * @return {Boolean}      结果
     */
    __isL: function(val1, val2) {
        return +val1 < +val2;
    },

    /**
     * 等于
     * @param  {number} val1
     * @param  {number} val2
     * @return {Boolean}      结果
     */
     __isEqual: function(val1, val2) {
        return +val1 === +val2;
    },

    /**
     * 小于等于
     * @param  {number} val1
     * @param  {number} val2
     * @return {Boolean}      结果
     */
    __isLE: function(val1, val2) {
        return this.__isL(val1, val2) || this.__isEqual(val1, val2);
    },

});
