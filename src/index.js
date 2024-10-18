import PaginationBar from './PaginationBar'

PaginationBar.install = (app, options = {}) => {
  if (Object.keys(options).length) {
    const { props } = PaginationBar
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
    if (typeof pageSizeMenu !== 'undefined') {
      props.pageSizeMenu.default = pageSizeMenu
    }
  }
  app.component(PaginationBar.name, PaginationBar)
}

export { PaginationBar }
export default PaginationBar
