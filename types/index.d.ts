import {
  AllowedComponentProps,
  ComponentCustomProps,
  VNodeProps,
  VNode
} from 'vue'

export declare interface PageInfo {
  pageNumber: number
  pageSize: number
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
  language?: string
  /**
   * Page size list
   * @default [10, 20, 50, 100]
   */
  pageSizeMenu?: boolean|number[]
  /**
   * Whether to display page size list panel
   * @default true
   */
  pageSizeOptions?: boolean
  /**
   * Alignment direction
   * @default `right`
   */
  align?: string
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
   * Whether to display page info bar
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

// declare interface Emits {
//   /** Update pageNumber value */
//   'onUpdate:modelValue'?: (pageNumber: number) => void
//   /** The event respond pageNumber or pageSize change */
//   onChange?: (data: PageInfo) => void
// }

// declare interface Methods extends MethodOptions {
//   /** Go to the specified page */
//   goPage: (pageNumber: number) => void
//   /** Re-emit `change` event and output pagination states data */
//   reload: () => void
// }
// $emit: ((event: "update:modelValue", value: boolean) => void) & ((event: "click:close", e: MouseEvent) => void)

/** Update pageNumber value */
type EmitUpdateModelValue = (event: "update:modelValue", value: number) => void
/** The event respond pageNumber or pageSize change */
type EmitChange = (event: "change", value: PageInfo) => void

declare interface PaginationBar {
  new (): {
    $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & Props
    $emit: EmitUpdateModelValue & EmitChange
    $slots: {
      default?: (defaultSlotData: PageSlotData) => VNode[]
    }
  }
}
declare const PaginationBar: PaginationBar

export { PaginationBar }

export default PaginationBar