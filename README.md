# [v-page](https://terryz.github.io/vue/#/page) &middot; [![circle ci](https://circleci.com/gh/TerryZ/v-page.svg?style=svg)](https://circleci.com/gh/TerryZ/v-page) [![code coverage](https://codecov.io/gh/TerryZ/v-page/branch/master/graph/badge.svg)](https://codecov.io/gh/TerryZ/v-page) [![npm version](https://img.shields.io/npm/v/v-page.svg)](https://www.npmjs.com/package/v-page) [![license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://mit-license.org/) [![npm download](https://img.shields.io/npm/dy/v-page.svg)](https://www.npmjs.com/package/v-page) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A simple pagination bar, including size Menu, i18n support, based on **Vue2**

<img src="https://terryz.github.io/image/v-page/v-page.png" alt="v-page" height="54px">

## Examples and Documentation

Live Examples on [CodePen](https://codepen.io/terry05/pen/yjZYLR), more exmaples and documentation please visit below sites

- [English site](https://terryz.github.io/vue/#/page)
- [国内站点](https://terryz.gitee.io/vue/#/page)

The jQuery version: [bPage](https://github.com/TerryZ/bPage)

## Installation

<a href="https://nodei.co/npm/v-page/"><img src="https://nodei.co/npm/v-page.png"></a>

```sh
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
