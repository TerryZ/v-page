import type { LanguageRecord } from './types'

export const [CN, EN, DE, JP, PT] = ['cn', 'en', 'de', 'jp', 'pt']

const languages: Record<string, LanguageRecord> = {
  [CN]: {
    pageLength: '每页记录数',
    pageInfo: '第 #pageNumber#/#totalPage# 页(共#totalRow#条记录)',
    first: '首页',
    last: '尾页',
    all: '全部'
  },
  [EN]: {
    pageLength: 'Per page',
    pageInfo: 'Page #pageNumber#/#totalPage# (total #totalRow# records)',
    first: 'First',
    last: 'Last',
    all: 'All'
  },
  [DE]: {
    pageLength: 'Seitenlänge',
    pageInfo: 'Aktuell #pageNumber#/#totalPage# (gesamt #totalRow# Aufzeichnungen)',
    first: 'Zuerst',
    last: 'Letzte',
    all: 'Alle'
  },
  [JP]: {
    pageLength: 'ページごとの記録数',
    pageInfo: '現在の第 #pageNumber#/#totalPage# ページ(全部で #totalRow# 条の記録)',
    first: 'トップページ',
    last: '尾のページ',
    all: 'すべて'
  },
  [PT]: {
    pageLength: 'Resultados por página',
    pageInfo: '#pageNumber#/#totalPage# (total de #totalRow#)',
    first: 'Início',
    last: 'Fim',
    all: 'Todos'
  }
}

export default languages
