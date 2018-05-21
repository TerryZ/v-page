<template>
    <div :class="[pageClass]">
        <ul>
            <li class="disabled vPaginationList">
                <a>{{i18n.pageLength}}
                    <select @change="switchLength" v-model="pageSize">
                        <option v-for="len in lengthList">{{len}}</option>
                    </select>
                </a>
            </li>
            <li class="disabled bPageInfo">
                <a>{{
                    i18n.pageInfo
                    .replace('#pageNumber#', currentPage)
                    .replace('#totalPage#', totalPage)
                    .replace('#totalRow#', totalRow)
                    }}</a>
            </li>
            <li :class="{disabled:currentPage === 1,bPageControlButton:true} ">
                <a href="javascript:void(0);" @click="switchPage('first')">{{i18n.first}}</a>
            </li>
            <li :class="{disabled:currentPage === 1,bPageControlButton:true}">
                <a href="javascript:void(0);" @click="switchPage('previous')">{{i18n.previous}}</a>
            </li>
            <li :class="{active:(num === currentPage)}" v-for="num,index in pageNumbers">
                <a href="javascript:void(0);" @click="switchPage(num)">{{num}}</a>
            </li>
            <li :class="{bPageControlButton:true,disabled:currentPage === totalPage}">
                <a href="javascript:void(0);" @click="switchPage('next')">{{i18n.next}}</a>
            </li>
            <li :class="{bPageControlButton:true,disabled:currentPage === totalPage}">
                <a href="javascript:void(0);" @click="switchPage('last')">{{i18n.last}}</a>
            </li>
        </ul>
    </div>
</template>

<script>
    import con from './constants';
    let {languages, defaults} = con;

    export default {
        name: "v-page",
        props: ['setting'],
        data(){
            let config = Object.assign({}, defaults, this.setting);
            let i18n = languages[config.language];

            return {
                config: config,
                pageNumber: 1,
                pageSize: config.pageSizeMenu&&Array.isArray(config.pageSizeMenu)&&config.pageSizeMenu.length?config.pageSizeMenu[0]:10,
                totalRow: config.totalRow,
                totalPage: 0,
                currentPage: 1,
                lengthList: config.pageSizeMenu,
                pageNumberSize: 5,
                language: config.language,
                i18n: i18n,
                pageClass : {
                    vPagination: true,
                    vPaginationRight: false,
                    vPaginationCenter: false
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
            currentPage:function(val){
                this.goPage(val);
            },
            'setting.totalRow':function(val){
                this.totalRow = val;
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
                if(typeof(pNum) === 'string'){
                    switch (pNum){
                        case 'first':
                            if(this.currentPage!==1) this.currentPage = 1;
                            break;
                        case 'previous':
                            if(this.currentPage!==1) this.currentPage--;
                            break;
                        case 'next':
                            if(this.currentPage!==this.totalPage) this.currentPage++;
                            break;
                        case 'last':
                            if(this.currentPage!==this.totalPage) this.currentPage = this.totalPage;
                            break;
                    }
                }else if(typeof(pNum) === 'number'){
                    this.currentPage = pNum;
                }
            },
            switchLength(){
                this.goPage(1);
            }
        },
        mounted(){
            if(this.config.align === 'center')
                this.pageClass.vPaginationCenter = true;
            else if(this.config.align === 'right')
                this.pageClass.vPaginationRight = true;
            this.goPage(1);
        }
    }
</script>

<style lang="scss" scoped>
    $borderRadius: 2px;
    div.vPagination{
        margin: 0;display: block;
        &.vPaginationRight{ text-align: right; }
        &.vPaginationCenter{ text-align: center; }
        & > ul {
            display: inline-block;
            margin-bottom: 0;
            margin-left: 0;
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
                    color: black;
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
                &.vPaginationList {
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
                        &:hover{
                            box-shadow: 0 0 8px rgba(0,0,0,0.2);
                            -moz-box-shadow: 0 0 8px rgba(0,0,0,0.2);
                            -webkit-box-shadow: 0 0 8px rgba(0,0,0,0.2);
                        }
                    }
                }
            }
        }
    }
</style>