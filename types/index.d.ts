export module 'v-page' {
  import Vue from 'vue'

  /**
   * Pagination plugin for Vue
   */
  declare class Page extends Vue {
    /**
     * the number of current page
     */
    value: number
    /**
     * the number of total record
     */
    totalRow: number
    /**
     * v-page language
     * `cn` by default
     */
    language?: string = 'cn'
    /**
     * page size list
     */
    pageSizeMenu?: boolean|number[] = [10, 20, 50, 100]
    /**
     * alignment direction
     */
    align?: string = 'right'
    /**
     * disabled the pagination
     */
    disabled?: boolean = false
    /**
     * whether to display the border
     */
    border?: boolean = true
    /**
     * whether to display page info bar
     */
    info?: boolean = true
    /**
     * whether to display page number buttons
     */
    pageNumber?: boolean = true
    /**
     * whether to display first page button
     */
    first?: boolean = true
    /**
     * whether to display last page button
     */
    last?: boolean = true
    $emit(eventName: 'input'): this
    /**
     * page change event
     * @param eventName
     */
    $emit(eventName: 'page-change'): this
  }

  export default Page
}
