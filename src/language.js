export const [
  CN,
  EN,
  DE,
  JP,
  PT
] = ['cn', 'en', 'de', 'jp', 'pt']

export default {
  [CN]: {
    pageLength: '每页记录数',
    pageInfo: '显示 #pageNumber#/#totalPage# 页(共#totalRow#条记录)',
    first: '首页',
    previous: '«',
    next: '»',
    last: '尾页',
    all: '全部'
  },
  [EN]: {
    pageLength: 'Page length',
    pageInfo: 'Current #pageNumber#/#totalPage# (total #totalRow# records)',
    first: 'First',
    previous: '«',
    next: '»',
    last: 'Last',
    all: 'All'
  },
  [DE]: {
    pageLength: 'Seitenlänge',
    pageInfo: 'Aktuell #pageNumber#/#totalPage# (gesamt #totalRow# Aufzeichnungen)',
    first: 'Zuerst',
    previous: '«',
    next: '»',
    last: 'Letzte',
    all: 'Alle'
  },
  [JP]: {
    pageLength: 'ページごとの記録数',
    pageInfo: '現在の第 #pageNumber#/#totalPage# ページ(全部で #totalRow# 条の記録)',
    first: 'トップページ',
    previous: '«',
    next: '»',
    last: '尾のページ',
    all: 'すべて'
  },
  [PT]: {
    pageLength: 'Resultados por página',
    pageInfo: '#pageNumber#/#totalPage# (total de #totalRow#)',
    first: 'Início',
    previous: '<',
    next: '>',
    last: 'Fim',
    all: 'Todos'
  }
}
