import type { SetupContext } from 'vue'
import {
  PaginationBar,
  PaginationPageSizes,
  PaginationInfo,
  PaginationPanel,
  PaginationPageNumbers,
  PaginationFirstPage,
  PaginationPreviousPage,
  PaginationNextPage,
  PaginationLastPage,
  type PageSlotData
} from '../'

export function PaginationComplete(props: unknown, { attrs }: SetupContext) {
  return (
    <PaginationBar {...attrs}>
      <PaginationPageSizes />
      <PaginationInfo />
      <PaginationFirstPage />
      <PaginationPreviousPage />
      <PaginationPageNumbers />
      <PaginationNextPage />
      <PaginationLastPage />
    </PaginationBar>
  )
}
export function PaginationSlot(props: unknown, { attrs }: SetupContext) {
  return (
    <PaginationBar {...attrs}>
      {{
        default: (data: PageSlotData) => (
          <>
            <PaginationPageSizes />
            <PaginationInfo />
            <PaginationPanel>
              <div class="slot-page-number">{data.pageNumber}</div>
              <div class="slot-page-size">{data.pageSize}</div>
              <div class="slot-total-page">{data.totalPage}</div>
              <div class="slot-total-row">{data.totalRow}</div>
              <div class="slot-is-first">{data.isFirst.toString()}</div>
              <div class="slot-is-last">{data.isLast.toString()}</div>
            </PaginationPanel>
            <PaginationFirstPage />
            <PaginationPreviousPage />
            <PaginationPageNumbers />
            <PaginationNextPage />
            <PaginationLastPage />
          </>
        )
      }}
    </PaginationBar>
  )
}
