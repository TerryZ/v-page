import { ref, computed, watch, toRefs, onMounted, inject } from 'vue'

import {
  FIRST,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_SIZE_MENU,
  DEFAULT_PAGE_NUMBER_SIZE,
  ALL_RECORD_PAGE_SIZE,
  injectPagination
} from './constants'
import { getLanguages, getPageNumbers } from './helper'

export function usePagination (props, emit, slots) {
  const { pageSizeOptions, pageSizeMenu, totalRow } = toRefs(props)
  const current = ref(0)
  const pageNumberSize = ref(DEFAULT_PAGE_NUMBER_SIZE)
  const pageSize = ref(props.pageSize ?? DEFAULT_PAGE_SIZE)
  const lang = getLanguages(props.language)

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

  function Link (props, { slots }) {
    return <a href='javascript:void(0)'>{slots?.default?.()}</a>
  }
  function PageSizeOptions () {
    if (!pageSizeOptions.value) return null

    const SizeOptions = () => sizeList.value.map(val =>
      <option
        key={val}
        value={val}
        selected={pageSize.value === val}
      >{val}</option>
    )
    const DisplayAllOption = () => {
      if (!props.displayAll) return null
      return (
        <option
          value={ALL_RECORD_PAGE_SIZE}
          selected={pageSize.value === ALL_RECORD_PAGE_SIZE}
        >{lang.all}</option>
      )
    }

    return (
      <li class='v-pagination__list'>
        <Link>
          <span>{lang.pageLength}</span>
          <select
            disabled={props.disabled}
            onChange={e => changePageSize(Number(e.target.value))}
          >
            <SizeOptions />
            <DisplayAllOption />
          </select>
        </Link>
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
        <Link>{content}</Link>
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
        <Link>{slots.default(slotData)}</Link>
      </li>
    )
  }
  function PageItem ({ classes, pageNumberValue, name, hasItem = true }) {
    if (!hasItem) return null
    return (
      <li class={['v-pagination__item', ...classes]}>
        <Link onClick={() => changePageNumber(pageNumberValue)} >
          {name}
        </Link>
      </li>
    )
  }
  function PageNumberItems () {
    if (!props.pageNumber) return null
    return pageNumbers.value.map(val => (
      <PageItem
        key={val}
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
        name='«'
      />
    )
  }
  function NextPageItem () {
    return (
      <PageItem
        classes={['v-pagination__next', { disabled: isLast.value }]}
        pageNumberValue={current.value + 1}
        name='»'
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

function Link (props, { slots }) {
  return <a href='javascript:void(0)'>{slots?.default?.()}</a>
}

export function PaginationPageSizeOptions () {
  const {
    lang,
    sizeList,
    pageSize,
    disabled,
    displayAll,
    changePageSize,
    pageSizeOptions
  } = inject(injectPagination)
  if (!pageSizeOptions.value) return null

  const SizeOptions = () => sizeList.value.map(val =>
    <option
      key={val}
      value={val}
      selected={pageSize.value === val}
    >{val}</option>
  )
  const DisplayAllOption = () => {
    if (!displayAll.value) return null
    return (
      <option
        value={ALL_RECORD_PAGE_SIZE}
        selected={pageSize.value === ALL_RECORD_PAGE_SIZE}
      >{lang.all}</option>
    )
  }

  return (
    <li class='v-pagination__list'>
      <Link>
        <span>{lang.pageLength}</span>
        <select
          disabled={disabled.value}
          onChange={e => changePageSize(Number(e.target.value))}
        >
          <SizeOptions />
          <DisplayAllOption />
        </select>
      </Link>
    </li>
  )
}
export function PaginationInfo () {
  const {
    lang,
    info,
    current,
    totalPage,
    totalRow
  } = inject(injectPagination)
  if (!info.value) return null
  const content = lang.pageInfo
    .replace('#pageNumber#', current.value)
    .replace('#totalPage#', totalPage.value)
    .replace('#totalRow#', totalRow.value)
  return (
    <li class='v-pagination__info'>
      <Link>{content}</Link>
    </li>
  )
}
// export function PaginationSlot () {
//   if (!Object.hasOwn(slots, 'default')) return null
//   const slotData = {
//     pageNumber: current.value,
//     pageSize: pageSize.value,
//     totalPage: totalPage.value,
//     totalRow: totalRow.value,
//     isFirst: isFirst.value,
//     isLast: isLast.value
//   }
//   // build scoped slot with named slot
//   return (
//     <li class='v-pagination__slot'>
//       <Link>{slots.default(slotData)}</Link>
//     </li>
//   )
// }
function PageItem ({ classes, pageNumberValue, name, hasItem = true }) {
  if (!hasItem) return null
  const { changePageNumber } = inject(injectPagination)
  return (
    <li class={['v-pagination__item', ...classes]}>
      <Link onClick={() => changePageNumber(pageNumberValue)} >
        {name}
      </Link>
    </li>
  )
}
export function PaginationPageNumbers () {
  const {
    pageNumber,
    pageNumbers,
    current
  } = inject(injectPagination)
  if (!pageNumber.value) return null
  return pageNumbers.value.map(val => (
    <PageItem
      key={val}
      classes={[{ active: val === current.value }]}
      pageNumberValue={val}
      name={val}
    />
  ))
}
export function PaginationFirstPage () {
  const { isFirst, lang, first } = inject(injectPagination)
  return (
    <PageItem
      classes={['v-pagination__first', { disabled: isFirst.value }]}
      pageNumberValue={FIRST}
      name={lang.first}
      hasItem={first.value}
    />
  )
}
export function PaginationPreviousPage () {
  const { isFirst, current } = inject(injectPagination)
  return (
    <PageItem
      classes={['v-pagination__previous', { disabled: isFirst.value }]}
      pageNumberValue={current.value - 1}
      name='«'
    />
  )
}
export function PaginationNextPage () {
  const { isLast, current } = inject(injectPagination)
  return (
    <PageItem
      classes={['v-pagination__next', { disabled: isLast.value }]}
      pageNumberValue={current.value + 1}
      name='»'
    />
  )
}
export function PaginationLastPage () {
  const { isLast, totalPage, lang, last } = inject(injectPagination)
  return (
    <PageItem
      classes={['v-pagination__last', { disabled: isLast.value }]}
      pageNumberValue={totalPage.value}
      name={lang.last}
      hasItem={last.value}
    />
  )
}
