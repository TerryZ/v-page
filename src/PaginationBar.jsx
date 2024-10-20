import './page.sass'

import { defineComponent } from 'vue'

import { EN } from './language'
import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_SIZE_MENU,
  ALIGN_RIGHT
} from './constants'
import { usePagination } from './PaginationCore'

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
  setup (props, { emit, slots, expose }) {
    const {
      containerClasses,
      totalPage,
      current,
      pageNumbers,
      goPage,
      change,
      PageSizeOptions,
      PageInformation,
      PageSlot,
      PageNumberItems,
      FirstPageItem,
      PreviousPageItem,
      NextPageItem,
      LastPageItem
    } = usePagination(props, emit, slots)

    expose({
      goPage,
      current,
      totalPage,
      pageNumbers,
      reload: change
    })

    return () => {
      if (props.hideOnSinglePage && totalPage.value <= 1) return null

      return (
        <div class={containerClasses.value}>
          <ul>
            <PageSizeOptions />
            <PageInformation />
            <PageSlot />
            <FirstPageItem />
            <PreviousPageItem />
            <PageNumberItems />
            <NextPageItem />
            <LastPageItem />
          </ul>
        </div>
      )
    }
  }
})
