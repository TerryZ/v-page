import './page.sass'

import { ref, computed, watch, toRefs, onMounted, defineComponent } from 'vue'

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
      'v-pagination--disabled': props.disabled,
      'v-pagination--circle': props.circle
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

    function PageSizeOptions () {
      if (!pageSizeOptions.value) return null

      const SizeOptions = () => sizeMenu.value.map(val =>
        <option value={val}>{val}</option>
      )
      const DisplayAllOption = () => {
        if (!props.displayAll) return null
        return (
          <option value={ALL_RECORD_PAGE_SIZE}>{lang.all}</option>
        )
      }

      return (
        <li class='v-pagination__list'>
          <a href='javascript:void(0)'>
            <span>{lang.pageLength}</span>
            <select
              disabled={props.disabled}
              onChange={e => changePageSize(Number(e.target.value))}
            >
              <SizeOptions />
              <DisplayAllOption />
            </select>
          </a>
        </li>
      )
    }
    function PageInformation () {
      if (!props.info) return null
      return (
        <li class='v-pagination__info'>
          <a href='javascript:void(0)'>{pageInfo.value}</a>
        </li>
      )
    }
    function PageSlot () {
      if (!Object.hasOwn(slots, 'default')) return null
      const slotData = {
        pageNumber: current.value,
        pageSize: pageSize.value,
        totalPage: totalPage.value,
        totalRow: totalRow.value,
        isFirst: isFirst.value,
        isLast: isLast.value
      }
      // build scoped slot with named slot
      return (
        <li class='v-pagination__slot'>
          <a href='javascript:void(0)'>{slots.default(slotData)}</a>
        </li>
      )
    }
    function PageItem ({ classes, pageNumberValue, name, hasItem = true }) {
      if (!hasItem) return null
      return (
        <li class={['v-pagination__item', ...classes]}>
          <a
            href='javascript:void(0)'
            onClick={() => goPage(pageNumberValue)}
          >{name}</a>
        </li>
      )
    }
    function PageNumberItems () {
      if (!props.pageNumber) return null
      return pageNumbers.value.map(val => (
        <PageItem
          classes={[{ active: val === current.value }]}
          pageNumberValue={val}
          name={val}
        />
      ))
    }

    onMounted(() => goPage(props.modelValue || FIRST))

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
        <div class={classes.value}>
          <ul>
            <PageSizeOptions />
            <PageInformation />
            <PageSlot />
            <PageItem
              classes={['v-pagination__first', { disabled: isFirst.value }]}
              pageNumberValue={FIRST}
              name={lang.first}
              hasItem={props.first}
            />
            <PageItem
              classes={['v-pagination__previous', { disabled: isFirst.value }]}
              pageNumberValue={current.value - 1}
              name={lang.previous}
            />
            <PageNumberItems />
            <PageItem
              classes={['v-pagination__next', { disabled: isLast.value }]}
              pageNumberValue={current.value + 1}
              name={lang.next}
            />
            <PageItem
              classes={['v-pagination__last', { disabled: isLast.value }]}
              pageNumberValue={totalPage.value}
              name={lang.last}
              hasItem={props.last}
            />
          </ul>
        </div>
      )
    }
  }
})
