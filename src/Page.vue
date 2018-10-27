<template>
    <div :class="[pageClass]">
        <ul>
            <li class="disabled v-pagination__list" v-if="pageSizeMenu">
                <a>{{i18n.pageLength}}
                    <select @change="switchLength" v-model="pageSize" :disabled="disabled">
                        <option v-for="len in pageSizeMenu">{{len}}</option>
                    </select>
                </a>
            </li>
            <li class="disabled" v-if="info">
                <a>{{
                    i18n.pageInfo
                    .replace('#pageNumber#', currentPage)
                    .replace('#totalPage#', totalPage)
                    .replace('#totalRow#', totalRow)
                    }}</a>
            </li>
            <li :class="{disabled:currentPage === 1||disabled} ">
                <a href="javascript:void(0);" @click="switchPage('first')" v-text="i18n.first"></a>
            </li>
            <li :class="{disabled:currentPage === 1||disabled}">
                <a href="javascript:void(0);" @click="switchPage('previous')" v-text="i18n.previous"></a>
            </li>
            <li :class="{active:(num === currentPage),disabled:disabled&&num !== currentPage}"
                v-for="num,index in pageNumbers">
                <a href="javascript:void(0);" @click="switchPage(num)" v-text="num"></a>
            </li>
            <li :class="{disabled:currentPage === totalPage||disabled}">
                <a href="javascript:void(0);" @click="switchPage('next')" v-text="i18n.next"></a>
            </li>
            <li :class="{disabled:currentPage === totalPage||disabled}">
                <a href="javascript:void(0);" @click="switchPage('last')" v-text="i18n.last"></a>
            </li>
        </ul>
    </div>
</template>

<script>
    import languages from './language';

    export default {
        name: "v-page",
        props: {
            totalRow: {
                type: Number,
                default: 0
            },
            info: {
                type: Boolean,
                default: true
            },
            pageSizeMenu: {
                type: [Array, Boolean],
                default: () => [10,20,50,100]
            },
            language: {
                type: String,
                default: 'cn'
            },
            align: {
                type: String,
                default: 'right'
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return {
                pageNumber: 1,
                pageSize: typeof(this.pageSizeMenu)==='boolean'?10:this.pageSizeMenu[0],
                totalPage: 0,
                currentPage: 0,
                pageNumberSize: 5,
                i18n: languages[this.language],
                pageClass : {
                    'v-pagination': true,
                    'v-pagination--right': this.align === 'right',
                    'v-pagination--center': this.align === 'center'
                }
            };
        },
        computed:{
            pageNumbers: function(){
                let start, end, nums = [], pNum = this.currentPage, half = Math.floor(this.pageNumberSize / 2);
                if(this.totalPage < this.pageNumberSize) {
                    start = 1;
                    end = this.totalPage;
                } else if ( pNum <= half ) {
                    start = 1;
                    end = this.pageNumberSize;
                } else if ( pNum >= (this.totalPage - half) ) {
                    start = this.totalPage - this.pageNumberSize + 1;
                    end = this.totalPage;
                } else {
                    start = pNum - half;
                    end = start + this.pageNumberSize - 1;
                }

                for(let i = start;i <= end; i++){
                    nums.push(i);
                }
                return nums;
            }
        },
        watch:{
            totalRow:function(val){
                this.calcTotalPage();
            }
        },
        methods:{
            goPage(pNum){
                this.currentPage = pNum;
                this.$emit('page-change',{
                    pageNumber: pNum,
                    pageSize: Number(this.pageSize)
                });
                this.calcTotalPage();
            },
            calcTotalPage(){
                this.totalPage = Math.ceil(this.totalRow / this.pageSize);
            },
            switchPage(pNum){
                if(this.disabled) return;
                let num = 1;
                if(typeof(pNum) === 'string'){
                    switch (pNum){
                        case 'first':
                            if(this.currentPage!==1) num = 1;
                            break;
                        case 'previous':
                            if(this.currentPage!==1) num = this.currentPage - 1;
                            break;
                        case 'next':
                            if(this.currentPage!==this.totalPage) num = this.currentPage + 1;
                            break;
                        case 'last':
                            if(this.currentPage!==this.totalPage) num = this.totalPage;
                            break;
                    }
                }else if(typeof(pNum) === 'number') num = pNum;
                this.goPage(num);
            },
            switchLength(){
                this.goPage(1);
            }
        },
        mounted(){
            this.goPage(1);
        }
    }
</script>

<style lang="scss">
    $borderRadius: 2px;
    div.v-pagination{
        margin: 0;display: block;
        &.v-pagination--right{ text-align: right; }
        &.v-pagination--center{ text-align: center; }
        & > ul {
            display: inline-block;
            margin: 0;
            -webkit-border-radius: 0;
            -moz-border-radius: 0;
            border-radius: 0;
            -webkit-box-shadow: 0 1px 2px rgba(0,0,0,0.05);
            -moz-box-shadow: 0 1px 2px rgba(0,0,0,0.05);
            box-shadow: 0 1px 2px rgba(0,0,0,0.05);
            padding: 0;
            & > li {
                text-align: center;display: inline;box-sizing: border-box;margin: 0;
                & > a {
                    margin: 0;
                    border: 1px solid #dddddd;
                    border-radius: 0;
                    padding: 6px 12px;
                    line-height: 20px;
                    box-shadow: none;
                    -moz-box-shadow: none;
                    -webkit-box-shadow: none;
                    background-color: white;

                    float: left;
                    text-decoration: none;

                    border-left-width: 0;
                    box-sizing: content-box;
                    color: #333;
                    -webkit-transition: all .5s cubic-bezier(.175,.885,.32,1);
                    transition: all .5s cubic-bezier(.175,.885,.32,1);
                    &:hover {
                        box-shadow: 0 0 12px rgba(0,0,0,0.2);
                        -moz-box-shadow: 0 0 12px rgba(0,0,0,0.2);
                        -webkit-box-shadow: 0 0 12px rgba(0,0,0,0.2);
                    }
                }
                &.disabled > a {
                    color: #999999;cursor: default;
                    &:hover {
                        color: #999999;background-color: white;box-shadow: none;
                    }
                }
                &.active > a,
                &.active > span {
                    cursor: default;color: #999999;background-color: #EEEEEE;
                    &:hover { box-shadow: none; }
                }
                &:first-child > a,
                &:first-child > span {
                    border-left-width: 1px;
                    -webkit-border-bottom-left-radius: $borderRadius;
                    border-bottom-left-radius: $borderRadius;
                    -webkit-border-top-left-radius: $borderRadius;
                    border-top-left-radius: $borderRadius;
                    -moz-border-radius-bottomleft: $borderRadius;
                    -moz-border-radius-topleft: $borderRadius;
                }
                &:last-child > a,
                &:last-child > span {
                    -webkit-border-bottom-right-radius: $borderRadius;
                    border-bottom-right-radius: $borderRadius;
                    -webkit-border-top-right-radius: $borderRadius;
                    border-top-right-radius: $borderRadius;
                    -moz-border-radius-bottomright: $borderRadius;
                    -moz-border-radius-topright: $borderRadius;
                }
                &.v-pagination__list {
                    a { line-height: 20px;height: 20px; }
                    select{
                        margin: -2px 0 0 5px;
                        width: auto !important;
                        vertical-align: middle;
                        height: 22px;
                        line-height: 22px;
                        font-size: 12px;
                        padding: 0;
                        display: inline-block;
                        border: 1px solid #CCCCCC;
                        color: #333;
                        &:hover{
                            box-shadow: 0 0 8px rgba(0,0,0,0.2);
                            -moz-box-shadow: 0 0 8px rgba(0,0,0,0.2);
                            -webkit-box-shadow: 0 0 8px rgba(0,0,0,0.2);
                        }
                        &[disabled]{ color: #999; }
                    }
                }
            }
        }
    }
</style>