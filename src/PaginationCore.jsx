import { ref, computed, watch, toRefs, onMounted } from 'vue'

import {
  FIRST,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_SIZE_MENU,
  DEFAULT_PAGE_NUMBER_SIZE,
  ALL_RECORD_PAGE_SIZE
} from './constants'
import { getLanguages, getPageNumbers } from './helper'

export function usePagination (props, emit, slots) {
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
  const containerClasses = computed(() => ({
    'v-pagination': true,
    'v-pagination--border': props.border,
    'v-pagination--right': props.align === 'right',
    'v-pagination--center': props.align === 'center',
    'v-pagination--disabled': props.disabled,
    'v-pagination--circle': props.circle
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
    // exit when duplicate operation
    if (num === current.value && pageSize.value === lastPageSize.value) {
      return
    }
    current.value = num
    lastPageSize.value = pageSize.value
    change()
  }
  function changePageSize (val) {
    if (val < 0) return
    if (val === pageSize.value) return
    pageSize.value = val
    changePageNumber(FIRST)
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
    const content = lang.pageInfo
      .replace('#pageNumber#', current.value)
      .replace('#totalPage#', totalPage.value)
      .replace('#totalRow#', totalRow.value)
    return (
      <li class='v-pagination__info'>
        <a href='javascript:void(0)'>{content}</a>
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
          onClick={() => changePageNumber(pageNumberValue)}
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
  function FirstPageItem () {
    return (
      <PageItem
        classes={['v-pagination__first', { disabled: isFirst.value }]}
        pageNumberValue={FIRST}
        name={lang.first}
        hasItem={props.first}
      />
    )
  }
  function PreviousPageItem () {
    return (
      <PageItem
        classes={['v-pagination__previous', { disabled: isFirst.value }]}
        pageNumberValue={current.value - 1}
        name={lang.previous}
      />
    )
  }
  function NextPageItem () {
    return (
      <PageItem
        classes={['v-pagination__next', { disabled: isLast.value }]}
        pageNumberValue={current.value + 1}
        name={lang.next}
      />
    )
  }
  function LastPageItem () {
    return (
      <PageItem
        classes={['v-pagination__last', { disabled: isLast.value }]}
        pageNumberValue={totalPage.value}
        name={lang.last}
        hasItem={props.last}
      />
    )
  }

  onMounted(() => changePageNumber(props.modelValue || FIRST))

  return {
    containerClasses,
    totalPage,
    current,
    pageNumbers,

    PageSizeOptions,
    PageInformation,
    PageSlot,
    PageNumberItems,
    FirstPageItem,
    PreviousPageItem,
    NextPageItem,
    LastPageItem
  }
}
