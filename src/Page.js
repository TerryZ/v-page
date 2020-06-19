import './page.sass'
import languages from './language'

const FIRST = 1

export default {
  name: 'v-page',
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
        return [10, 20, 50, 100]
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
  data () {
    return {
      pageSize: this.pageSizeMenu === false ? 10 : this.pageSizeMenu[0],
      lastPageSize: -1,
      current: 0,
      pageNumberSize: 5,
      i18n: languages[this.language] || languages.cn
    }
  },
  computed: {
    totalPage () {
      return Math.ceil(this.totalRow / this.pageSize)
    },
    pageNumbers () {
      const { current, pageNumberSize, totalPage } = this
      const half = Math.floor(pageNumberSize / 2)
      const start = current - half
      return Array.apply(null, { length: pageNumberSize })
        .map((val, index) => start + index)
        .filter(val => val > 0 && val <= totalPage)
    },
    pageInfo () {
      return this.i18n.pageInfo
        .replace('#pageNumber#', this.current)
        .replace('#totalPage#', this.totalPage)
        .replace('#totalRow#', this.totalRow)
    },
    classes () {
      return {
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
    const items = []
    // page length list
    if (Array.isArray(this.pageSizeMenu) && this.pageSizeMenu.length) {
      items.push(h('li', { class: 'v-pagination__list' }, [h('a', [
        h('span', this.i18n.pageLength),
        h('select', {
          attrs: { disabled: this.disabled },
          on: {
            change: e => {
              if (e.srcElement && e.srcElement.value) {
                this.pageSize = Number(e.srcElement.value)
              }
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
    /**
     * page number generator
     * @param classes
     * @param num
     * @param text
     * @return VNode
     */
    const genItem = (classes, num, text) => {
      return h('li', { class: classes }, [
        h('a', {
          attrs: { href: 'javascript:void(0)' },
          on: { click: () => this.goPage(num) }
        }, text)
      ])
    }
    // first
    if (this.first) {
      items.push(genItem({ disabled: this.isFirst }, FIRST, this.i18n.first))
    }
    // previous
    items.push(genItem({ disabled: this.isFirst }, this.current - 1, this.i18n.previous))
    // page numbers
    if (this.pageNumber) {
      items.push(...this.pageNumbers.map(val => genItem({
        active: val === this.current
      }, val, val)))
    }
    // next
    items.push(genItem({ disabled: this.isLast }, this.current + 1, this.i18n.next))
    // last
    if (this.last) {
      items.push(genItem({ disabled: this.isLast }, this.totalPage, this.i18n.last))
    }
    return h('div', {
      class: {
        'v-pagination': true,
        ...this.classes
      }
    }, [h('ul', items)])
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
    }
  },
  mounted () {
    this.goPage(this.value ? this.value : FIRST)
  }
}
