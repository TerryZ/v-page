# [v-page](https://terryz.github.io/vue/#/page) &middot; [![circle ci](https://circleci.com/gh/TerryZ/v-page.svg?style=svg)](https://circleci.com/gh/TerryZ/v-page) [![code coverage](https://codecov.io/gh/TerryZ/v-page/branch/master/graph/badge.svg)](https://codecov.io/gh/TerryZ/v-page) [![npm version](https://img.shields.io/npm/v/v-page.svg)](https://www.npmjs.com/package/v-page) [![license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://mit-license.org/) [![npm download](https://img.shields.io/npm/dy/v-page.svg)](https://www.npmjs.com/package/v-page) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A simple pagination bar, including length Menu, i18n support, based on <strong>Vue2</strong>

<img src="https://terryz.github.io/image/v-page/v-page.png" alt="v-page" height="54px">

## Examples and Documentation

Live Examples on [CodePen](https://codepen.io/terry05/pen/yjZYLR), more exmaples and documentation please visit below sites

- [English site](https://terryz.github.io/vue/#/page)
- [国内站点](https://terryz.gitee.io/vue/#/page)

The jQuery version: [bPage](https://github.com/TerryZ/bPage)

## Installation

<a href="https://nodei.co/npm/v-page/"><img src="https://nodei.co/npm/v-page.png"></a>

```
npm i -S v-page
```

Include and install plugin in your `main.js` file.

```js
// add component in global scope as plugin
import Vue from 'vue'
import Page from 'v-page'
Vue.use(Page, {
  global config options
})
```

You also can use `v-page` in local component

```vue
<template>
  <v-page></v-page>
</template>

<script>
import { Page } from 'v-page'
export default {
  components: {
    'v-page': Page
  }
}
</script>
```

## Usage

```vue
<template>
  <v-page
    :total-row="totalRow"
    @page-change="pageChange"
  ></v-page>
</template>

<script>
export default {
  data () {
    return {
      totalRow: 100 // required option
    }
  },
  methods: {
    // receive page info change callback
    pageChange (pInfo) {
      console.log(pInfo) // { pageNumber: 1, pageSize: 10 }
    }
  }
}
</script>
```

## Vue plugin series

| Plugin | Status | Description |
| :---------------- | :-- | :-- |
| [v-page](https://github.com/TerryZ/v-page) | [![npm version](https://img.shields.io/npm/v/v-page.svg)](https://www.npmjs.com/package/v-page) | A simple pagination bar, including length Menu, i18n support |
| [v-dialogs](https://github.com/TerryZ/v-dialogs) | [![npm version](https://img.shields.io/npm/v/v-dialogs.svg)](https://www.npmjs.com/package/v-dialogs) | A simple and powerful dialog, including Modal, Alert, Mask and Toast modes |
| [v-tablegrid](https://github.com/TerryZ/v-tablegrid) | [![npm version](https://img.shields.io/npm/v/v-tablegrid.svg)](https://www.npmjs.com/package/v-tablegrid) | A simpler to use and practical datatable |
| [v-uploader](https://github.com/TerryZ/v-uploader) | [![npm version](https://img.shields.io/npm/v/v-uploader.svg)](https://www.npmjs.com/package/v-uploader) | A Vue2 plugin to make files upload simple and easier, <br>you can drag files or select file in dialog to upload |
| [v-ztree](https://github.com/TerryZ/v-ztree) | [![npm version](https://img.shields.io/npm/v/v-ztree.svg)](https://www.npmjs.com/package/v-ztree) | A simple tree for Vue2, support single or multiple(check) select tree, <br>and support server side data |
| [v-gallery](https://github.com/TerryZ/v-gallery) | [![npm version](https://img.shields.io/npm/v/v-gallery.svg)](https://www.npmjs.com/package/v-gallery) | A Vue2 plugin make browsing images in gallery |
| [v-region](https://github.com/TerryZ/v-region) | [![npm version](https://img.shields.io/npm/v/v-region.svg)](https://www.npmjs.com/package/v-region) | A simple region selector, provide Chinese administrative division data |
| [v-selectpage](https://github.com/TerryZ/v-selectpage) | [![npm version](https://img.shields.io/npm/v/v-selectpage.svg)](https://www.npmjs.com/package/v-selectpage) | A powerful selector for Vue2, list or table view of pagination, <br>use tags for multiple selection, i18n and server side resources supports |
| [v-suggest](https://github.com/TerryZ/v-suggest) | [![npm version](https://img.shields.io/npm/v/v-suggest.svg)](https://www.npmjs.com/package/v-suggest) | A Vue2 plugin for input suggestions by autocomplete |
| [v-playback](https://github.com/TerryZ/v-playback) | [![npm version](https://img.shields.io/npm/v/v-playback.svg)](https://www.npmjs.com/package/v-playback) | A Vue2 plugin to make video play easier |
| [v-selectmenu](https://github.com/TerryZ/v-selectmenu) | [![npm version](https://img.shields.io/npm/v/v-selectmenu.svg)](https://www.npmjs.com/package/v-selectmenu) | A simple, easier and highly customized menu solution |
