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
declare interface PaginationProps {
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

type ComponentProps = AllowedComponentProps & ComponentCustomProps & VNodeProps

declare interface PaginationBar {
  new (): {
    $props: ComponentProps & PaginationProps
    $emit: EmitUpdateModelValue & EmitUpdatePageSize & EmitChange
    $slots: {
      default?: (defaultSlotData: PageSlotData) => VNode[]
    }
  }
}
declare interface PaginationComponent {
  new (): {
    $props: ComponentProps
  }
}
declare interface PaginationPanel {
  new (): {
    $props: ComponentProps
    $slots: {
      default?: () => VNode[]
    }
  }
}
declare const PaginationBar: PaginationBar
declare const PaginationPageSizeOptions: PaginationComponent
declare const PaginationInfo: PaginationComponent
declare const PaginationPageNumbers: PaginationComponent
declare const PaginationFirstPage: PaginationComponent
declare const PaginationPreviousPage: PaginationComponent
declare const PaginationNextPage: PaginationComponent
declare const PaginationLastPage: PaginationComponent
declare const PaginationPanel: PaginationPanel

export {
  PaginationBar,
  PaginationPageSizeOptions,
  PaginationInfo,
  PaginationPageNumbers,
  PaginationFirstPage,
  PaginationPreviousPage,
  PaginationNextPage,
  PaginationLastPage,
  PaginationPanel
}

export default PaginationBar