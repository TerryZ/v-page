import { FIRST } from './constants'
import languages, { EN } from './language'

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

export function getLanguages (lang = EN) {
  const key = String(lang).toLowerCase()
  return languages[Object.hasOwn(languages, key) ? key : EN]
}
