import { h, ref, computed, watch, defineComponent, onMounted } from 'vue'
import './page.sass'
import languages, { CN } from './language'
import {
  FIRST,
  defaultPageSize,
  defaultPageNumberSize,
  defaultPageSizeMenu,
  getPageNumberStart,
  ALL_RECORD_PAGE_SIZE
} from './helper'

export default defineComponent({
  name: 'v-page',
  props: {
    modelValue: { type: Number, default: 0 },
    totalRow: { type: Number, default: 0 },
    language: { type: String, default: CN },
    /**
     * Page size list
     * false: close page size list
     * array: custom page sizes list
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
    border: { type: Boolean, default: false },
    info: { type: Boolean, default: true },
    pageNumber: { type: Boolean, default: true },
    /** first page button */
    first: { type: Boolean, default: true },
    /** last page button */
    last: { type: Boolean, default: true },
    /** display all records */
    displayAll: { type: Boolean, default: false }
  },
  emits: ['update:modelValue', 'change'],
  setup (props, { emit, slots, expose }) {
    const { pageSizeMenu } = props
    const current = ref(0)
    const pageSize = ref(pageSizeMenu === false ? defaultPageSize : pageSizeMenu[0])
    const pageNumberSize = ref(defaultPageNumberSize)
    const i18n = ref(languages[props.language] || languages[CN])
    const lastPageSize = ref(-1)


    const totalPage = computed(() => {
      // when display all records, the totalPage always be 1
      if (pageSize.value === ALL_RECORD_PAGE_SIZE) {
        return FIRST
      }
      return Math.ceil(props.totalRow / pageSize.value)
    })
    const pageNumbers = computed(() => {
      const start = getPageNumberStart(
        current.value,
        totalPage.value,
        pageNumberSize.value
      )
      return Array.apply(null, { length: pageNumberSize.value })
        .map((val, index) => start + index)
        .filter(val => val >= FIRST && val <= totalPage.value)
    })
    const pageInfo = computed(() => {
      return i18n.value.pageInfo
        .replace('#pageNumber#', current.value)
        .replace('#totalPage#', totalPage.value)
        .replace('#totalRow#', props.totalRow)
    })
    const classes = computed(() => {
      return {
        'v-pagination': true,
        'v-pagination--border': props.border,
        'v-pagination--right': props.align === 'right',
        'v-pagination--center': props.align === 'center',
        'v-pagination--disabled': props.disabled
      }
    })
    const isFirst = computed(() => current.value === FIRST)
    const isLast = computed(() => current.value === totalPage.value)

    watch(() => props.modelValue, (val) => {
      if (typeof val === 'number' && val > 0) {
        goPage(val, false)
      }
    })

    function goPage (pNum = FIRST, respond = true) {
      if (props.disabled) return
      if (typeof pNum !== 'number') return
      let num = pNum < FIRST ? FIRST : pNum
      if (pNum > totalPage.value && totalPage.value > 0) {
        num = totalPage.value
      }

      // exit when duplicate operation
      if (num === current.value && pageSize.value === lastPageSize.value) {
        return
      }

      current.value = num
      // update v-model value
      if (respond) {
        emit('update:modelValue', current.value)
      }
      lastPageSize.value = pageSize.value
      change()
    }
    function reload () {
      change()
    }
    function change () {
      emit('change', {
        pageNumber: current.value,
        pageSize: Number(pageSize.value)
      })
    }
    function pageNumberGenerator (classes, num, text) {
      const option = {
        href: 'javascript:void(0)',
        onClick: () => goPage(num)
      }
      return h('li', { class: classes }, [
        h('a', option, text)
      ])
    }

    const items = []
    // page length list
    if (Array.isArray(pageSizeMenu) && pageSizeMenu.length) {
      const selectOption = {
        disabled: props.disabled,
        onChange: e => {
          pageSize.value = Number(e.srcElement.value)
          goPage()
        }
      }
      const options = pageSizeMenu.map(val => h('option', { value: val }, val))

      if (props.displayAll) {
        options.push(h('option', { value: ALL_RECORD_PAGE_SIZE }, i18n.value.all))
      }

      const li = h(
        'li',
        { class: 'v-pagination__list' },
        [
          h('a', [
            h('span', i18n.value.pageLength),
            h('select', selectOption, options)
          ])
        ]
      )
      items.push(li)
    }
    // page info
    if (props.info) {
      items.push(h('li', { class: 'v-pagination__info' }, [h('a', pageInfo.value)]))
    }
    // scoped slot
    if ('default' in slots) {
      const li = h('li', { class: 'v-pagination__slot' }, [
        h('a', slots.default({
          pageNumber: current.value,
          pageSize: pageSize.value,
          totalPage: totalPage.value,
          totalRow: props.totalRow,
          isFirst: isFirst.value,
          isLast: isLast.value
        }))
      ])
      // build scoped slot with named slot
      items.push(li)
    }
    // first
    if (props.first) {
      const firstClass = { 'v-pagination__first': true, disabled: isFirst.value }
      items.push(pageNumberGenerator(firstClass, FIRST, i18n.value.first))
    }
    // previous
    const prevClass = { 'v-pagination__previous': true, disabled: isFirst.value }
    items.push(pageNumberGenerator(prevClass, current.value - 1, i18n.value.previous))
    // page numbers
    if (props.pageNumber) {
      items.push(...pageNumbers.value.map(val => {
        console.log(val === current.value)
        const numberClass = { active: val === current.value }
        return pageNumberGenerator(numberClass, val, val)
      }))
    }
    // next
    const nextClass = { 'v-pagination__next': true, disabled: isLast.value }
    items.push(pageNumberGenerator(nextClass, current.value + 1, i18n.value.next))
    // last
    if (props.last) {
      const lastClass = { 'v-pagination__last': true, disabled: isLast.value }
      items.push(pageNumberGenerator(lastClass, totalPage.value, i18n.value.last))
    }

    onMounted(() => {
      goPage(props.value || FIRST)
    })

    expose({
      current
    })

    return () => h('div', { class: classes.value }, [h('ul', items)])
  }
})
