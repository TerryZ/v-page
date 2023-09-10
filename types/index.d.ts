import {
  DefineComponent,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ObjectEmitsOptions,
  SlotsType
} from 'vue'

export declare interface PageInfo {
  pageNumber: number
  pageSize: number
}

declare interface EmitEvents extends ObjectEmitsOptions {
  /** Update pageNumber value */
  'update:modelValue': (pageNumber: number) => void
  /** The event respond pageNumber or pageSize change */
  change: (data: PageInfo) => void
}

declare interface Slots extends SlotsType {
  default: {
    pageNumber: number
    pageSize: number
    totalPage: number
    totalRow: number
    isFirst: boolean
    isLast: boolean
  }
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
   * v-page language
   * @default `cn`
   */
  language?: string
  /**
   * Page size list
   * @default [10, 20, 50, 100]
   */
  pageSizeMenu?: boolean|number[]
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
}

declare interface Methods extends MethodOptions {
  /** Go to the specified page */
  goPage: (pageNumber: number) => void
  /** Re-emit `change` event and output pagination states data */
  reload: () => void
}

declare const Page: DefineComponent<
  Props,
  {},
  {},
  ComputedOptions,
  Methods,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  EmitEvents,
  '',
  {},
  {},
  {},
  Slots
>

export { Page }

export default Page