import {
  AllowedComponentProps,
  ComponentCustomProps,
  VNodeProps,
  VNode
} from 'vue'

export declare interface PageInfo {
  pageNumber: number
  pageSize: number
  totalPage: number
}

export declare interface PageSlotData {
  pageNumber: number
  pageSize: number
  totalPage: number
  totalRow: number
  isFirst: boolean
  isLast: boolean
}

/**
 * Pagination plugin for Vue
 */
declare interface Props {
  /**
   * The number of current page
   */
  modelValue?: number
  /**
   * The number of total record
   */
  totalRow: number
  /**
   * The number of page size
   * @default 10
   */
  pageSize?: number
  /**
   * v-page language
   * @default `en`
   */
  language?: 'cn' | 'en' | 'de' | 'jp' | 'pt'
  /**
   * Page size list
   * @default [10, 20, 50, 100]
   */
  pageSizeMenu?: number[]
  /**
   * Whether to display page size list panel
   * @default true
   */
  pageSizeOptions?: boolean
  /**
   * Alignment direction
   * @default `right`
   */
  align?: 'left' | 'right' | 'center'
  /**
   * Disabled the pagination
   * @default false
   */
  disabled?: boolean
  /**
   * Whether to display the border
   * @default true
   */
  border?: boolean
  /**
   * Round style page number button
   * @default false
   */
  circle?: boolean
  /**
   * Whether to display page information panel
   * @default true
   */
  info?: boolean
  /**
   * Whether to display page number buttons
   * @default true
   */
  pageNumber?: boolean
  /**
   * Whether to display first page button
   * @default true
   */
  first?: boolean
  /**
   * Whether to display last page button
   * @default true
   */
  last?: boolean
  /**
   * Whether add `All` item in page length list
   * @default false
   */
  displayAll?: boolean
  /**
   * Hide pagination when only have one page
   * @default false
   */
  hideOnSinglePage?: boolean
}

/** Update pageNumber value */
type EmitUpdateModelValue = (event: "update:modelValue", value: number) => void
/** Update pageSize value */
type EmitUpdatePageSize = (event: "update:pageSize", value: number) => void
/** The event respond pageNumber or pageSize change */
type EmitChange = (event: "change", value: PageInfo) => void

declare interface PaginationBar {
  new (): {
    $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & Props
    $emit: EmitUpdateModelValue & EmitUpdatePageSize & EmitChange
    $slots: {
      default?: (defaultSlotData: PageSlotData) => VNode[]
    }
  }
}
declare const PaginationBar: PaginationBar

export { PaginationBar }

export default PaginationBar