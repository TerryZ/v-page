export const FIRST = 1

export const defaultPageNumberSize = 5

export const defaultPageSize = 10

export const defaultPageSizeMenu = [defaultPageSize, 20, 50, 100]

export const ALL_RECORD_PAGE_SIZE = 0

export function getPageNumberStart (current, totalPage, pageNumberSize) {
  if (totalPage <= pageNumberSize) return FIRST

  const half = Math.floor(pageNumberSize / 2)
  const lastRangeStart = totalPage - pageNumberSize + 1
  const start = current - half

  if (start < FIRST) return FIRST
  if (start > lastRangeStart) return lastRangeStart

  return start
}
