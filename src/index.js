import Page from './Page'

const Plugin = {
  install (Vue, options = {}) {
    if (Object.keys(options).length) {
      const props = Page.props
      const {
        language,
        align,
        info,
        border,
        pageNumber,
        first,
        last,
        pageSizeMenu
      } = options

      if (language) props.language.default = language
      if (align) props.align.default = align
      if (typeof info === 'boolean') props.info.default = info
      if (typeof border === 'boolean') props.border.default = border
      if (typeof pageNumber === 'boolean') props.pageNumber.default = pageNumber
      if (typeof first === 'boolean') props.first.default = first
      if (typeof last === 'boolean') props.last.default = last
      if (typeof pageSizeMenu !== 'undefined') props.pageSizeMenu.default = pageSizeMenu
    }
    Vue.component(Page.name, Page)
  }
}

export { Page }
export default Plugin
