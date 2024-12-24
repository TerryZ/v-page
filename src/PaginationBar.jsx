import './page.sass'

import { ref, computed, watch, toRefs, onMounted, defineComponent, provide } from 'vue'

import {
  FIRST,
  ALIGN_RIGHT,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_SIZE_MENU,
  DEFAULT_PAGE_NUMBER_SIZE,
  ALL_RECORD_PAGE_SIZE,
  injectPagination
} from './constants'
import { EN } from './language'
import { getLanguages, getPageNumbers } from './helper'

export default defineComponent({
  name: 'PaginationBar',
  props: {
    modelValue: { type: Number, default: 0 },
    pageSize: { type: Number, default: DEFAULT_PAGE_SIZE },
    totalRow: { type: Number, default: 0 },
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
    /** Round style page number button */
    circle: { type: Boolean, default: false },
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
  setup (props, { emit, slots }) {
    // const {
    //   containerClasses,
    //   totalPage,
    //   PageSizeOptions,
    //   PageInformation,
    //   PageSlot,
    //   PageNumberItems,
    //   FirstPageItem,
    //   PreviousPageItem,
    //   NextPageItem,
    //   LastPageItem
    // } = usePagination(props, emit, slots)
    const { pageSizeOptions, pageSizeMenu, totalRow } = toRefs(props)
    const current = ref(0)
    const pageNumberSize = ref(DEFAULT_PAGE_NUMBER_SIZE)
    const pageSize = ref(props.pageSize ?? DEFAULT_PAGE_SIZE)
    // const lang = getLanguages(props.language)

    const sizeList = computed(() => {
      if (!pageSizeOptions.value) return []

      const sizes = Array.from(
        Array.isArray(pageSizeMenu.value) && pageSizeMenu.value.length > 0
          ? pageSizeMenu.value
          : DEFAULT_PAGE_SIZE_MENU
      )
      // filter duplicate items
      if (pageSize.value !== 0 && !sizes.includes(pageSize.value)) { // display all
        sizes.push(pageSize.value)
      }

      return sizes.sort((a, b) => a - b)
    })
    const totalPage = computed(() => {
      // when display all records, the `totalPage` value always be 1
      if (pageSize.value === ALL_RECORD_PAGE_SIZE) return FIRST
      return Math.ceil(totalRow.value / pageSize.value)
    })
    const pageNumbers = computed(() => getPageNumbers(
      current.value,
      totalPage.value,
      pageNumberSize.value
    ))
    const containerClasses = computed(() => ({
      'v-pagination': true,
      'v-pagination--right': props.align === 'right',
      'v-pagination--center': props.align === 'center',
      'v-pagination--disabled': props.disabled,
      'v-pagination--border': props.border,
      'v-pagination--circle': !props.border && props.circle
    }))
    const isFirst = computed(() => current.value === FIRST)
    const isLast = computed(() => current.value === totalPage.value)

    watch(() => props.modelValue, changePageNumber)
    watch(() => props.pageSize, changePageSize)

    function changePageNumber (pNumber = FIRST) {
      if (props.disabled) return
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
    function changePageSize (val) {
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
    function change () {
      emit('change', {
        pageNumber: current.value,
        pageSize: Number(pageSize.value),
        totalPage: totalPage.value
      })
    }

    onMounted(() => changePageNumber(props.modelValue || FIRST))

    provide(injectPagination, {
      lang: getLanguages(props.language),
      pageSize,
      sizeList,
      pageNumbers,
      isFirst,
      isLast,
      current,
      totalPage,
      changePageNumber,
      changePageSize,
      ...toRefs(props)
    })

    return () => {
      if (props.hideOnSinglePage && totalPage.value <= 1) return null
      const slotData = {
        pageNumber: current.value,
        pageSize: pageSize.value,
        totalPage: totalPage.value,
        totalRow: totalRow.value,
        isFirst: isFirst.value,
        isLast: isLast.value
      }

      return (
        <div class={containerClasses.value}>
          <ul>
            {/* <PageSizeOptions />
            <PageInformation />
            <PageSlot />
            <FirstPageItem />
            <PreviousPageItem />
            <PageNumberItems />
            <NextPageItem />
            <LastPageItem /> */}
            {slots?.default?.(slotData)}
          </ul>
        </div>
      )
    }
  }
})
