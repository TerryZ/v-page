export const FIRST = 1

export const defaultPageNumberSize = 5

export const defaultPageSize = 10

export const defaultPageSizeMenu = [defaultPageSize, 20, 50, 100]

export const ALL_RECORD_PAGE_SIZE = 0

function getPageNumberStart (current, totalPage, pageNumberSize) {
  if (totalPage <= pageNumberSize) return FIRST

  const half = Math.floor(pageNumberSize / 2)
  const lastRangeStart = totalPage - pageNumberSize + 1
  const start = current - half

  if (start < FIRST) return FIRST
  if (start > lastRangeStart) return lastRangeStart

  return start
}

export function getPageNumbers (current, totalPage, pageNumberSize) {
  const start = getPageNumberStart(current, totalPage, pageNumberSize)
  return Array.from({ length: pageNumberSize })
        .map((val, index) => start + index)
        .filter(val => val >= FIRST && val <= totalPage)
}