import './page.scss';
import languages from './language';

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
		/**
		 * page size list
		 * false: close page size menu bar
		 * array: custom page sizes menu
		 */
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
		/**
		 * pagination alignment direction
		 * 'left'
		 * 'center'
		 * 'right'(default)
		 */
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
		/**
		 * first page button
		 */
		first: {
			type: Boolean,
			default: true
		},
		/**
		 * last page button
		 */
		last: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			pageSize: this.pageSizeMenu === false ? 10 : this.pageSizeMenu[0],
			lastPageSize: -1,
			currentPage: 0,
			pageNumberSize: 5,
			i18n: languages[this.language] || languages['cn']
		};
	},
	computed: {
		totalPage(){
			return Math.ceil(this.totalRow / this.pageSize);
		},
		pageNumbers() {
			let start = 1, end, half = Math.floor(this.pageNumberSize / 2);
			if (this.totalPage < this.pageNumberSize) end = this.totalPage;
			else if (this.currentPage <= half) end = this.pageNumberSize;
			else if (this.currentPage >= (this.totalPage - half)) {
				start = this.totalPage - this.pageNumberSize + 1;
				end = this.totalPage;
			} else {
				start = this.currentPage - half;
				end = start + this.pageNumberSize - 1;
			}

			return Array.apply(null, {length:end-start+1}).map((val,index)=>start+index);
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
				'v-pagination--center': this.align === 'center',
				'v-pagination--disabled': this.disabled
			};
		},
		isFirst(){
			return this.currentPage === FIRST;
		},
		isLast(){
			return this.currentPage === this.totalPage;
		}
	},
	watch: {
		value(val){
			if(typeof val === 'number' && val > 0) this.goPage(val, false);
		}
	},
	render(h){
		const items = [];
		//page length list
		if(Array.isArray(this.pageSizeMenu) && this.pageSizeMenu.length){
			items.push(h('li',{class:'v-pagination__list'},[h('a',[
				h('span',this.i18n.pageLength),
				h('select',{
					attrs:{disabled: this.disabled},
					on:{
						change: e => {
							if(e.srcElement && e.srcElement.value){
								this.pageSize = Number(e.srcElement.value);
							}
							this.goPage();
						}
					}
				},this.pageSizeMenu.map(val=>{
					return h('option',{attrs:{value:val}},val);
				}))
			])]));
		}
		//page info
		if(this.info){
			items.push(h('li',{class:'v-pagination__info'},[h('a', this.pageInfo)]));
		}
		/**
		 * page number generator
		 * @param classes
		 * @param num
		 * @param text
		 * @return VNode
		 */
		const genItem = (classes, num, text) => {
			return h('li',{class:classes},[
				h('a',{
					attrs:{href:'javascript:void(0);'},
					on:{click:()=>this.switchPage(num)}
				}, text)
			]);
		};
		//first
		if(this.first){
			items.push(genItem({disabled:this.isFirst}, 'first', this.i18n.first));
		}
		//previous
		items.push(genItem({disabled:this.isFirst}, 'previous', this.i18n.previous));
		//page numbers
		if(this.pageNumber){
			this.pageNumbers.forEach(val => {
				items.push(genItem({active:val === this.currentPage}, val, val));
			});
		}
		//next
		items.push(genItem({disabled:this.isLast}, 'next', this.i18n.next));
		//last
		if(this.last){
			items.push(genItem({disabled:this.isLast}, 'last', this.i18n.last));
		}
		return h('div',{
			class:{
				'v-pagination': true,
				...this.classes
			}
		},[h('ul', items)]);
	},
	methods: {
		goPage(pNum = FIRST, respond = true) {
			if(typeof pNum !== 'number') return;
			let num = pNum < FIRST ? FIRST : pNum;
			if(pNum > this.totalPage && this.totalPage > 0) num = this.totalPage;

			//exit when duplicate operation
			if(num === this.currentPage && this.pageSize === this.lastPageSize) return;

			this.currentPage = num;
			// update v-model value
			if(respond) this.$emit('input', this.currentPage);
			this.lastPageSize = this.pageSize;
			this.change();
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
		}
	},
	mounted() {
		this.goPage(this.value ? this.value : FIRST);
	}
}