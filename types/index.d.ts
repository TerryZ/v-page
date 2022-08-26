import { DefineComponent, ComputedOptions, MethodOptions, ComponentOptionsMixin } from 'vue'

type EmitEvents = 'update:modelValue' | 'change'

/**
 * Pagination plugin for Vue
 */
declare interface Props {
  /**
   * the number of current page
   */
  value: number
  /**
   * the number of total record
   */
  totalRow: number
  /**
   * v-page language (default: `cn`)
   */
  language?: string
  /**
   * page size list (default: [10, 20, 50, 100])
   */
  pageSizeMenu?: boolean|number[]
  /**
   * alignment direction (default: `right`)
   */
  align?: string
  /**
   * disabled the pagination (default: false)
   */
  disabled?: boolean
  /**
   * whether to display the border (default: true)
   */
  border?: boolean
  /**
   * whether to display page info bar (default: true)
   */
  info?: boolean
  /**
   * whether to display page number buttons (default: true)
   */
  pageNumber?: boolean
  /**
   * whether to display first page button (default: true)
   */
  first?: boolean
  /**
   * whether to display last page button (default: true)
   */
  last?: boolean
  /**
   * whether add `All` item in page length list (default: false)
   */
  displayAll?: boolean
}

declare interface Methods extends MethodOptions {
  /** go to the specified page */
  goPage: (pageNumber: number) => void
  /** re-emit `change` event and output pagination states data */
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
  EmitEvents[],
  EmitEvents,
  Props
>

export { Page }

export default Page
