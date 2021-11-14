import './page.sass'
import languages from './language'
import {
  FIRST, defaultPageSize, defaultPageNumberSize,
  defaultPageSizeMenu, getPageNumberStart
} from './helper'

export default {
  name: 'v-page',
  props: {
    value: { type: Number, default: 0 },
    totalRow: { type: Number, default: 0 },
    language: { type: String, default: 'cn' },
    /**
     * Page size list
     * false: close page size menu bar
     * array: custom page sizes menu
     */
    pageSizeMenu: {
      type: [Boolean, Array],
      default: () => defaultPageSizeMenu
    },
    /**
     * Pagination alignment direction
     * `left`, `center` and `right`(default)
     */
    align: { type: String, default: 'right' },
    disabled: { type: Boolean, default: false },
    border: { type: Boolean, default: true },
    info: { type: Boolean, default: true },
    pageNumber: { type: Boolean, default: true },
    /** first page button */
    first: { type: Boolean, default: true },
    /** last page button */
    last: { type: Boolean, default: true }
  },
  data () {
    return {
      current: 0,
      pageSize: this.pageSizeMenu === false ? defaultPageSize : this.pageSizeMenu[0],
      pageNumberSize: defaultPageNumberSize,
      i18n: languages[this.language] || languages.cn,
      lastPageSize: -1
    }
  },
  computed: {
    totalPage () {
      return Math.ceil(this.totalRow / this.pageSize)
    },
    pageNumbers () {
      const { current, pageNumberSize, totalPage } = this
      const start = getPageNumberStart(current, totalPage, pageNumberSize)

      return Array.apply(null, { length: pageNumberSize })
        .map((val, index) => start + index)
        .filter(val => val >= FIRST && val <= totalPage)
    },
    pageInfo () {
      return this.i18n.pageInfo
        .replace('#pageNumber#', this.current)
        .replace('#totalPage#', this.totalPage)
        .replace('#totalRow#', this.totalRow)
    },
    classes () {
      return {
        'v-pagination': true,
        'v-pagination--no-border': !this.border,
        'v-pagination--right': this.align === 'right',
        'v-pagination--center': this.align === 'center',
        'v-pagination--disabled': this.disabled
      }
    },
    isFirst () {
      return this.current === FIRST
    },
    isLast () {
      return this.current === this.totalPage
    }
  },
  watch: {
    value (val) {
      if (typeof val === 'number' && val > 0) this.goPage(val, false)
    }
  },
  render (h) {
    const { pageNumberGenerator, current, i18n, isFirst, isLast } = this
    const items = []
    // page length list
    if (Array.isArray(this.pageSizeMenu) && this.pageSizeMenu.length) {
      items.push(h('li', { class: 'v-pagination__list' }, [h('a', [
        h('span', i18n.pageLength),
        h('select', {
          attrs: { disabled: this.disabled },
          on: {
            change: e => {
              this.pageSize = Number(e.srcElement.value)
              this.goPage()
            }
          }
        }, this.pageSizeMenu.map(val => {
          return h('option', { attrs: { value: val } }, val)
        }))
      ])]))
    }
    // page info
    if (this.info) {
      items.push(h('li', { class: 'v-pagination__info' }, [h('a', this.pageInfo)]))
    }
    // first
    if (this.first) {
      const firstClass = { 'v-pagination__first': true, disabled: isFirst }
      items.push(pageNumberGenerator(firstClass, FIRST, i18n.first))
    }
    // previous
    const prevClass = { 'v-pagination__previous': true, disabled: isFirst }
    items.push(pageNumberGenerator(prevClass, current - 1, i18n.previous))
    // page numbers
    if (this.pageNumber) {
      items.push(...this.pageNumbers.map(val => {
        const numberClass = { active: val === current }
        return pageNumberGenerator(numberClass, val, val)
      }))
    }
    // next
    const nextClass = { 'v-pagination__next': true, disabled: isLast }
    items.push(pageNumberGenerator(nextClass, current + 1, i18n.next))
    // last
    if (this.last) {
      const lastClass = { 'v-pagination__last': true, disabled: isLast }
      items.push(pageNumberGenerator(lastClass, this.totalPage, i18n.last))
    }
    return h('div', { class: this.classes }, [h('ul', items)])
  },
  methods: {
    goPage (pNum = FIRST, respond = true) {
      if (this.disabled) return
      if (typeof pNum !== 'number') return
      let num = pNum < FIRST ? FIRST : pNum
      if (pNum > this.totalPage && this.totalPage > 0) num = this.totalPage

      // exit when duplicate operation
      if (num === this.current && this.pageSize === this.lastPageSize) return

      this.current = num
      // update v-model value
      if (respond) this.$emit('input', this.current)
      this.lastPageSize = this.pageSize
      this.change()
    },
    reload () {
      this.change()
    },
    change () {
      this.$emit('page-change', {
        pageNumber: this.current,
        pageSize: Number(this.pageSize)
      })
    },
    pageNumberGenerator (classes, num, text) {
      const option = {
        attrs: { href: 'javascript:void(0)' },
        on: { click: () => this.goPage(num) }
      }
      return this.$createElement('li', { class: classes }, [
        this.$createElement('a', option, text)
      ])
    }
  },
  mounted () {
    this.goPage(this.value || FIRST)
  }
}
