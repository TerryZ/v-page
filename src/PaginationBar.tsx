import './page.sass'

import { ref, computed, watch, toRefs, onMounted, defineComponent, provide, inject } from 'vue'

import {
  FIRST,
  ALIGN_RIGHT,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_SIZE_MENU,
  DEFAULT_PAGE_NUMBER_SIZE,
  ALL_RECORD_PAGE_SIZE,
  keyInternal,
  keyOptions
} from './constants'
import { EN } from './language'
import { getLanguages, getPageNumbers } from './helper'
import {
  PaginationPageSizes,
  PaginationInfo,
  PaginationFirstPage,
  PaginationNextPage,
  PaginationPageNumbers,
  PaginationPreviousPage,
  PaginationLastPage
} from './PaginationCore'

import type { SlotsType, PropType, Ref } from 'vue'
import type {
  LanguageKey,
  LanguageRecord,
  PaginationProvided,
  PageInfo,
  PageSlotData
} from './types'

export default defineComponent({
  name: 'PaginationBar',
  props: {
    modelValue: { type: Number, default: 0 },
    pageSize: { type: Number, default: DEFAULT_PAGE_SIZE },
    totalRow: { type: Number, default: 0 },
    language: { type: String as PropType<LanguageKey>, default: EN },
    /**
     * Pagination alignment direction
     * `left`, `center` and `right`(default)
     */
    align: { type: String, default: ALIGN_RIGHT },
    /** Page size list */
    pageSizeMenu: { type: [Array] as PropType<number[]>, default: () => DEFAULT_PAGE_SIZE_MENU },
    disabled: { type: Boolean, default: false },
    /** Round style page number button */
    circle: { type: Boolean, default: false },
    border: { type: Boolean, default: false },
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
  emits: {
    'update:modelValue': (value: number) => typeof value === 'number',
    'update:pageSize': (value: number) => typeof value === 'number',
    change: (pageInfo: PageInfo) => typeof pageInfo !== 'undefined'
  },
  slots: Object as SlotsType<{
    default: PageSlotData
  }>,
  setup(props, { emit, slots }) {
    const { pageSizeMenu, totalRow, displayAll, disabled } = toRefs(props)
    const current = ref<number>(0)
    const pageNumberSize = ref<number>(DEFAULT_PAGE_NUMBER_SIZE)
    const pageSize = ref<number>(props.pageSize ?? DEFAULT_PAGE_SIZE)
    const globalOptions = inject<Ref<string>>(keyOptions, ref(''))
    const getLanguageKey = () => {
      if (props.language !== EN) return props.language
      // global install setting
      if (globalOptions.value) return globalOptions.value
      return EN
    }
    const lang = computed<LanguageRecord>(() => getLanguages(getLanguageKey())!)

    const sizeList = computed(() => {
      const sizes: number[] = Array.from(
        Array.isArray(pageSizeMenu.value) && pageSizeMenu.value.length > 0
          ? (pageSizeMenu.value as number[])
          : DEFAULT_PAGE_SIZE_MENU
      )
      // filter duplicate items
      if (pageSize.value !== 0 && !sizes.includes(pageSize.value)) {
        // current page size
        sizes.push(pageSize.value)
      }

      return sizes.sort((a, b) => a - b)
    })
    const totalPage = computed(() => {
      // when display all records, the `totalPage` value always be 1
      if (pageSize.value === ALL_RECORD_PAGE_SIZE) return FIRST
      return Math.ceil(totalRow.value / pageSize.value)
    })
    const pageNumbers = computed(() =>
      getPageNumbers(current.value, totalPage.value, pageNumberSize.value)
    )
    const containerClasses = computed(() => ({
      'v-pagination': true,
      'v-pagination--right': props.align === 'right',
      'v-pagination--center': props.align === 'center',
      'v-pagination--disabled': disabled.value,
      'v-pagination--border': props.border,
      'v-pagination--circle': !props.border && props.circle
    }))
    const isFirst = computed(() => current.value === FIRST)
    const isLast = computed(() => current.value === totalPage.value)

    watch(() => props.modelValue, changePageNumber)
    watch(() => props.pageSize, changePageSize)

    function changePageNumber(pNumber = FIRST) {
      if (disabled.value) return
      if (typeof pNumber !== 'number') return

      let num = pNumber < FIRST ? FIRST : pNumber
      if (pNumber > totalPage.value && totalPage.value > 0) {
        num = totalPage.value
      }
      if (num === current.value) return

      current.value = num
      emit('update:modelValue', current.value)
      change()
    }
    function changePageSize(val: number) {
      if (typeof val !== 'number') return
      if (val < 0) return
      if (val === pageSize.value) return

      pageSize.value = val
      emit('update:pageSize', pageSize.value)
      if (current.value === FIRST) {
        return change()
      }
      changePageNumber(FIRST)
    }
    function change() {
      emit('change', {
        pageNumber: current.value,
        pageSize: Number(pageSize.value),
        totalPage: totalPage.value
      })
    }
    function PaginationModules() {
      if (slots.default) {
        return (
          <ul>
            {slots.default({
              pageNumber: current.value,
              pageSize: pageSize.value,
              totalPage: totalPage.value,
              totalRow: totalRow.value,
              isFirst: isFirst.value,
              isLast: isLast.value
            })}
          </ul>
        )
      }
      return (
        <ul>
          <PaginationPageSizes />
          <PaginationInfo />
          <PaginationFirstPage />
          <PaginationPreviousPage />
          <PaginationPageNumbers />
          <PaginationNextPage />
          <PaginationLastPage />
        </ul>
      )
    }

    onMounted(() => changePageNumber(props.modelValue || FIRST))

    provide<PaginationProvided>(keyInternal, {
      lang,
      pageSize,
      sizeList,
      pageNumbers,
      isFirst,
      isLast,
      current,
      totalPage,
      changePageNumber,
      changePageSize,
      totalRow,
      displayAll,
      disabled
    })

    return () => {
      if (props.hideOnSinglePage && totalPage.value <= 1) return null

      return (
        <div class={containerClasses.value}>
          <PaginationModules />
        </div>
      )
    }
  }
})
