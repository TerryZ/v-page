import { h, ref, computed, watch, toRefs, onMounted, defineComponent } from 'vue'
import './page.sass'
import languages, { EN } from './language'
import {
  FIRST,
  defaultPageSize,
  defaultPageNumberSize,
  defaultPageSizeMenu,
  getPageNumbers,
  ALL_RECORD_PAGE_SIZE
} from './helper'

export default defineComponent({
  name: 'PaginationBar',
  props: {
    modelValue: { type: Number, default: 0 },
    totalRow: { type: Number, default: 0 },
    language: { type: String, default: EN },
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
    const { pageSizeMenu, totalRow } = toRefs(props)
    const current = ref(0)
    const pageSize = ref(
      pageSizeMenu.value === false ? defaultPageSize : pageSizeMenu.value[0]
    )
    const pageNumberSize = ref(defaultPageNumberSize)
    const i18n = ref(languages[props.language] || languages[EN])
    const lastPageSize = ref(-1)

    const totalPage = computed(() => {
      // when display all records, the totalPage always be 1
      if (pageSize.value === ALL_RECORD_PAGE_SIZE) {
        return FIRST
      }
      return Math.ceil(totalRow.value / pageSize.value)
    })
    const pageNumbers = computed(() => {
      return getPageNumbers(
        current.value,
        totalPage.value,
        pageNumberSize.value
      )
    })
    const pageInfo = computed(() => {
      return i18n.value.pageInfo
        .replace('#pageNumber#', current.value)
        .replace('#totalPage#', totalPage.value)
        .replace('#totalRow#', totalRow.value)
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

    watch(
      () => props.modelValue,
      val => {
        if (typeof val === 'number' && val > 0) {
          goPage(val, false)
        }
      }
    )

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
      return h('li', { class: classes }, [h('a', option, text)])
    }

    onMounted(() => {
      goPage(props.modelValue || FIRST)
    })

    expose({
      current,
      totalPage,
      pageNumbers,
      goPage,
      reload: change
    })

    return () => {
      const items = []
      // page length list
      if (Array.isArray(pageSizeMenu.value) && pageSizeMenu.value.length) {
        const selectOption = {
          disabled: props.disabled,
          onChange: e => {
            pageSize.value = Number(e.target.value)
            goPage()
          }
        }
        const options = pageSizeMenu.value.map(val =>
          h('option', { value: val }, val)
        )

        if (props.displayAll) {
          options.push(
            h('option', { value: ALL_RECORD_PAGE_SIZE }, i18n.value.all)
          )
        }

        const li = h('li', { class: 'v-pagination__list' }, [
          h('a', { href: 'javascript:void(0)' }, [
            h('span', i18n.value.pageLength),
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
        items.push(pageNumberGenerator(firstClass, FIRST, i18n.value.first))
      }
      // previous
      const prevClass = ['v-pagination__previous', { disabled: isFirst.value }]
      items.push(
        pageNumberGenerator(prevClass, current.value - 1, i18n.value.previous)
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
        pageNumberGenerator(nextClass, current.value + 1, i18n.value.next)
      )
      // last
      if (props.last) {
        const lastClass = ['v-pagination__last', { disabled: isLast.value }]
        items.push(
          pageNumberGenerator(lastClass, totalPage.value, i18n.value.last)
        )
      }
      return h('div', { class: classes.value }, [h('ul', items)])
    }
  }
})
