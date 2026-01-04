import { ref, type App } from 'vue'

import PaginationBar from './PaginationBar'
export type { PageInfo, PageSlotData } from './PaginationBar'
export * from './PaginationCore'

interface PaginationGlobalOptions {
  language?: string
}

const lang = ref('en')

PaginationBar.install = (app: App, options: PaginationGlobalOptions = {}) => {
  // TODO: 语言依赖注入
  app.provide('pagination-language', lang)
  app.component(PaginationBar.name!, PaginationBar)
}

export { PaginationBar }
export default PaginationBar
