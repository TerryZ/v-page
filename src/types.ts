import type { Ref, ComputedRef } from 'vue'

export type LanguageKey = 'cn' | 'en' | 'de' | 'jp' | 'pt'
export type AlignDirection = 'left' | 'center' | 'right'
export interface LanguageRecord {
  pageLength: string
  pageInfo: string
  first: string
  last: string
  all: string
}
export interface PaginationGlobalOptions {
  /**
   * Component language
   */
  language?: LanguageKey
  /**
   * Register component globally
   * @default false
   */
  register?: boolean
}
export interface LinkProps {
  classes?: (string | Record<string, boolean>)[]
  pageNumberValue?: number
  name: string | number
}
export interface PaginationProvided {
  lang: ComputedRef<LanguageRecord>
  pageSize: Ref<number>
  totalRow: Ref<number>
  displayAll: Ref<boolean>
  disabled: Ref<boolean>
  sizeList: ComputedRef<number[]>
  pageNumbers: ComputedRef<number[]>
  isFirst: ComputedRef<boolean>
  isLast: ComputedRef<boolean>
  current: Ref<number>
  totalPage: ComputedRef<number>
  changePageNumber: (pNumber: number) => void
  changePageSize: (val: number) => void
}
export declare interface PageInfo {
  pageNumber: number
  pageSize: number
  totalPage: number
}
export declare interface PageSlotData extends PageInfo {
  totalRow: number
  isFirst: boolean
  isLast: boolean
}
