import './page.sass'

import { h, ref, computed, watch, toRefs, onMounted, defineComponent } from 'vue'

import { getPageNumbers, getLanguages } from './helper'
import { EN } from './language'
import {
  FIRST,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_SIZE_MENU,
  DEFAULT_PAGE_NUMBER_SIZE,
  ALL_RECORD_PAGE_SIZE,
  ALIGN_RIGHT
} from './constants'

export default defineComponent({
  name: 'PaginationBar',
  props: {
    modelValue: { type: Number, default: 0 },
    totalRow: { type: Number, default: 0 },
    pageSize: { type: Number, default: DEFAULT_PAGE_SIZE },
    language: { type: String, default: EN },
    /**
     * Pagination alignment direction
     * `left`, `center` and `right`(default)
     */
    align: { type: String, default: ALIGN_RIGHT },
    /** Page size list */
    pageSizeMenu: { type: [Array], default: () => DEFAULT_PAGE_SIZE_MENU },
    /** Display page size menu panel */
    pageSizeOptions: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },
    border: { type: Boolean, default: false },
    info: { type: Boolean, default: true },
    pageNumber: { type: Boolean, default: true },
    /** first page button */
    first: { type: Boolean, default: true },
    /** last page button */
    last: { type: Boolean, default: true },
    /**
     * Display all records
     *
     * will add `all` option in page size list
     * and the page size will be 0
     */
    displayAll: { type: Boolean, default: false },
    /** Hide pagination when only have one page */
    hideOnSinglePage: { type: Boolean, default: false }
  },
  emits: ['update:modelValue', 'update:pageSize', 'change'],
  setup (props, { emit, slots, expose }) {
    const { pageSizeOptions, pageSizeMenu, totalRow } = toRefs(props)
    const current = ref(0)
    const lastPageSize = ref(-1)
    const pageNumberSize = ref(DEFAULT_PAGE_NUMBER_SIZE)
    const lang = getLanguages(props.language)

    const sizeMenu = computed(() => (
      Array.isArray(pageSizeMenu.value) && pageSizeMenu.value.length > 0
        ? pageSizeMenu.value
        : DEFAULT_PAGE_SIZE_MENU
    ))
    const pageSize = ref(props.pageSize || DEFAULT_PAGE_SIZE)
    const totalPage = computed(() => {
      // when display all records, the totalPage always be 1
      if (pageSize.value === ALL_RECORD_PAGE_SIZE) return FIRST
      return Math.ceil(totalRow.value / pageSize.value)
    })
    const pageNumbers = computed(() => getPageNumbers(
      current.value,
      totalPage.value,
      pageNumberSize.value
    ))
    const pageInfo = computed(() => lang.pageInfo
      .replace('#pageNumber#', current.value)
      .replace('#totalPage#', totalPage.value)
      .replace('#totalRow#', totalRow.value)
    )
    const classes = computed(() => ({
      'v-pagination': true,
      'v-pagination--border': props.border,
      'v-pagination--right': props.align === 'right',
      'v-pagination--center': props.align === 'center',
      'v-pagination--disabled': props.disabled
    }))
    const isFirst = computed(() => current.value === FIRST)
    const isLast = computed(() => current.value === totalPage.value)

    watch(() => props.modelValue, val => goPage(val))
    watch(() => props.pageSize, changePageSize)

    function goPage (pNumber = FIRST) {
      if (props.disabled) return
      if (typeof pNumber !== 'number') return

      let num = pNumber < FIRST ? FIRST : pNumber
      if (pNumber > totalPage.value && totalPage.value > 0) {
        num = totalPage.value
      }
      // exit when duplicate operation
      if (num === current.value && pageSize.value === lastPageSize.value) {
        return
      }
      current.value = num
      lastPageSize.value = pageSize.value
      change()
    }
    function change () {
      emit('change', {
        pageNumber: current.value,
        pageSize: Number(pageSize.value),
        totalPage: totalPage.value
      })
      emit('update:modelValue', current.value)
      emit('update:pageSize', pageSize.value)
    }
    function changePageSize (val) {
      if (val < 0) return
      if (val === pageSize.value) return
      pageSize.value = val
      goPage()
    }
    function pageNumberGenerator (classes, num, text) {
      const option = {
        href: 'javascript:void(0)',
        onClick: () => goPage(num)
      }
      return h('li', { class: classes }, [h('a', option, text)])
    }

    onMounted(() => {
      goPage(props.modelValue || FIRST)
    })

    expose({
      goPage,
      current,
      totalPage,
      pageNumbers,
      reload: change
    })

    return () => {
      if (props.hideOnSinglePage && totalPage.value <= 1) return

      const items = []
      // page size list
      if (pageSizeOptions.value) {
        const selectOption = {
          disabled: props.disabled,
          onChange: e => changePageSize(Number(e.target.value))
        }
        const options = sizeMenu.value.map(val =>
          h('option', { value: val }, val)
        )
        if (props.displayAll) {
          options.push(
            h('option', { value: ALL_RECORD_PAGE_SIZE }, lang.all)
          )
        }

        const li = h('li', { class: 'v-pagination__list' }, [
          h('a', { href: 'javascript:void(0)' }, [
            h('span', lang.pageLength),
            h('select', selectOption, options)
          ])
        ])
        items.push(li)
      }
      // page info
      if (props.info) {
        items.push(
          h('li', { class: 'v-pagination__info' }, [
            h('a', { href: 'javascript:void(0)' }, pageInfo.value)
          ])
        )
      }
      // scoped slot
      if ('default' in slots) {
        const slotData = {
          pageNumber: current.value,
          pageSize: pageSize.value,
          totalPage: totalPage.value,
          totalRow: totalRow.value,
          isFirst: isFirst.value,
          isLast: isLast.value
        }
        const li = h('li', { class: 'v-pagination__slot' }, [
          h('a', slots.default(slotData))
        ])
        // build scoped slot with named slot
        items.push(li)
      }
      // first
      if (props.first) {
        const firstClass = ['v-pagination__first', { disabled: isFirst.value }]
        items.push(pageNumberGenerator(firstClass, FIRST, lang.first))
      }
      // previous
      const prevClass = ['v-pagination__previous', { disabled: isFirst.value }]
      items.push(
        pageNumberGenerator(prevClass, current.value - 1, lang.previous)
      )
      // page numbers
      if (props.pageNumber) {
        items.push(
          ...pageNumbers.value.map(val => {
            const numberClass = { active: val === current.value }
            return pageNumberGenerator(numberClass, val, val)
          })
        )
      }
      // next
      const nextClass = ['v-pagination__next', { disabled: isLast.value }]
      items.push(
        pageNumberGenerator(nextClass, current.value + 1, lang.next)
      )
      // last
      if (props.last) {
        const lastClass = ['v-pagination__last', { disabled: isLast.value }]
        items.push(
          pageNumberGenerator(lastClass, totalPage.value, lang.last)
        )
      }
      return h('div', { class: classes.value }, [h('ul', items)])
    }
  }
})
