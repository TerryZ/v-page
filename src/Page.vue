<template>
    <div class="v-pagination" :class="classes">
        <ul>
            <!-- page length list -->
            <li class="v-pagination__list" v-if="pageSizeMenu">
                <a>{{i18n.pageLength}}
                    <select @change="switchLength" v-model="pageSize" :disabled="disabled">
                        <option :key="index" v-for="(len,index) in pageSizeMenu">{{len}}</option>
                    </select>
                </a>
            </li>
            <!-- page info -->
            <li class="v-pagination__info" v-if="info">
                <a v-text="pageInfo"></a>
            </li>

            <li :class="{disabled:currentPage === 1||disabled} " v-if="first">
                <a href="javascript:void(0);" @click="switchPage('first')" v-text="i18n.first"></a>
            </li>
            <li :class="{disabled:currentPage === 1||disabled}">
                <a href="javascript:void(0);" @click="switchPage('previous')" v-text="i18n.previous"></a>
            </li>

            <!-- page numbers -->
            <template v-if="pageNumber">
            <li :class="{active:(num === currentPage),disabled:disabled&&num !== currentPage}"
                v-for="(num,index) in pageNumbers" :key="index">
                <a href="javascript:void(0);" @click="switchPage(num)" v-text="num"></a>
            </li>
            </template>

            <li :class="{disabled:currentPage === totalPage||disabled}">
                <a href="javascript:void(0);" @click="switchPage('next')" v-text="i18n.next"></a>
            </li>
            <li :class="{disabled:currentPage === totalPage||disabled}" v-if="last">
                <a href="javascript:void(0);" @click="switchPage('last')" v-text="i18n.last"></a>
            </li>
        </ul>
    </div>
</template>

<script>
    import languages from './language';
    import './page.scss';

    const FIRST = 1;

    export default {
        name: "v-page",
        props: {
            value: {
                type: Number,
                default: 0
            },
            totalRow: {
                type: Number,
                default: 0
            },
            pageSizeMenu: {
                type: [Boolean, Array],
                default: function () {
                    return [10, 20, 50, 100];
                }
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
            },
            border: {
                type: Boolean,
                default: true
            },
            info: {
                type: Boolean,
                default: true
            },
            pageNumber: {
                type: Boolean,
                default: true
            },
            first: {
                type: Boolean,
                default: true
            },
            last: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                pageSize: this.pageSizeMenu === false ? 10 : this.pageSizeMenu[0],
                totalPage: 0,
                currentPage: 0,
                pageNumberSize: 5,
                i18n: languages[this.language] || languages['cn']
            };
        },
        computed: {
            pageNumbers() {
                let start = 1, end, nums = [], half = Math.floor(this.pageNumberSize / 2);
                if (this.totalPage < this.pageNumberSize) end = this.totalPage;
                else if (this.currentPage <= half) end = this.pageNumberSize;
                else if (this.currentPage >= (this.totalPage - half)) {
                    start = this.totalPage - this.pageNumberSize + 1;
                    end = this.totalPage;
                } else {
                    start = this.currentPage - half;
                    end = start + this.pageNumberSize - 1;
                }

                for (let i = start; i <= end; i++) {
                    nums.push(i);
                }
                return nums;
            },
            pageInfo() {
                return this.i18n.pageInfo.replace('#pageNumber#', this.currentPage)
                    .replace('#totalPage#', this.totalPage)
                    .replace('#totalRow#', this.totalRow);
            },
            classes(){
                return {
                    'v-pagination--no-border': !this.border,
                    'v-pagination--right': this.align === 'right',
                    'v-pagination--center': this.align === 'center'
                };
            }
        },
        watch: {
            value(val){
                this.goPage(val, false);
            },
            totalRow() {
                this.calcTotalPage();
            }
        },
        methods: {
            goPage(pNum, respond = true) {
                if(typeof pNum !== 'number') return;
                let num = FIRST;
                if(pNum > num) num = pNum;
                if(pNum > this.totalPage && this.totalPage > 0) num = this.totalPage;

                if(num === this.currentPage) return;
                this.currentPage = num;
                // update v-model value
                if(respond) this.$emit('input', this.currentPage);
                this.change();
                this.calcTotalPage();
            },
            reload(){
                this.change();
            },
            change(){
                this.$emit('page-change', {
                    pageNumber: this.currentPage,
                    pageSize: Number(this.pageSize)
                });
            },
            calcTotalPage() {
                this.totalPage = Math.ceil(this.totalRow / this.pageSize);
            },
            position(target){
                if (typeof target === 'string') {
                    switch (target) {
                        case 'first': return FIRST;
                        case 'previous': return this.currentPage - 1;
                        case 'next': return this.currentPage + 1;
                        case 'last': return this.totalPage;
                    }
                } else if (typeof target === 'number') return target;
            },
            switchPage(target) {
                if (this.disabled) return;
                this.goPage(this.position(target));
            },
            switchLength() {
                this.goPage(FIRST);
            }
        },
        mounted() {
            this.goPage(this.value ? this.value : FIRST);
        }
    }
</script>