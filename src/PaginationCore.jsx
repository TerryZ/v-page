import { inject } from 'vue'

import { FIRST, ALL_RECORD_PAGE_SIZE, injectPagination } from './constants'

function Link (props, { slots }) {
  return <a href='javascript:void(0)'>{slots?.default?.()}</a>
}
function PageItem ({ classes, pageNumberValue, name }) {
  const { changePageNumber } = inject(injectPagination)
  return (
    <li class={['v-pagination__item', ...classes]}>
      <Link onClick={() => changePageNumber(pageNumberValue)} >
        {name}
      </Link>
    </li>
  )
}

export function PaginationPageSizes () {
  const {
    lang, sizeList, pageSize, disabled, displayAll, changePageSize
  } = inject(injectPagination)

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
  const { lang, current, totalPage, totalRow } = inject(injectPagination)
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
export function PaginationPanel (props, { slots }) {
  return (
    <li class='v-pagination__slot'>
      <Link>{slots?.default?.()}</Link>
    </li>
  )
}
export function PaginationPageNumbers () {
  const { pageNumbers, current } = inject(injectPagination)
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
  const { isFirst, lang } = inject(injectPagination)
  return (
    <PageItem
      classes={['v-pagination__first', { disabled: isFirst.value }]}
      pageNumberValue={FIRST}
      name={lang.first}
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
  const { isLast, totalPage, lang } = inject(injectPagination)
  return (
    <PageItem
      classes={['v-pagination__last', { disabled: isLast.value }]}
      pageNumberValue={totalPage.value}
      name={lang.last}
    />
  )
}
