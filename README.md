# [v-page](https://terryz.github.io/vue/#/page) &middot; [![CircleCI](https://dl.circleci.com/status-badge/img/gh/TerryZ/v-page/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/TerryZ/v-page/tree/master) [![code coverage](https://codecov.io/gh/TerryZ/v-page/branch/master/graph/badge.svg)](https://codecov.io/gh/TerryZ/v-page) [![npm version](https://img.shields.io/npm/v/v-page.svg)](https://www.npmjs.com/package/v-page) [![license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://mit-license.org/) [![npm download](https://img.shields.io/npm/dy/v-page.svg)](https://www.npmjs.com/package/v-page) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A simple pagination bar for vue3, including size Menu, i18n support

<img src="https://terryz.github.io/image/v-page/v-page.png" alt="v-page" height="54px">

If you are using vue `2.x` version, please use [v-page 2.x](https://github.com/TerryZ/v-page/tree/dev-vue-2) version instead

## Examples and Documentation

Examples and documentation please visit below sites

- [github pages for english](https://terryz.github.io/vue/#/page)

The jQuery version: [bPage](https://github.com/TerryZ/bPage)

## Installation

[![https://nodei.co/npm/v-page.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/v-page.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/v-page)

```sh
npm i -S v-page
```

Include and install plugin in your `main.js` file

```js
// add component in global scope as plugin
import { createApp } from 'vue'
import App from './app.vue'
import Page from 'v-page'

const app = createApp(App)
app.use(Page, {
  // globally config options
})
app.mount('#app')
```

You also can use `v-page` in local component

```vue
<template>
  <page />
</template>

<script setup>
import { Page } from 'v-page'
</script>
```

## Usage

```vue
<template>
  <v-page
    v-model="pageNumber"
    :total-row="totalRow"
    @change="pageChange"
  />
</template>

<script setup>
import { ref } from 'vue'

const pageNumber = ref(3)
const totalRow = ref(100)
// respond for pagination change
function pageChange (data) {
  console.log(pInfo) // { pageNumber: 1, pageSize: 10 }
}
</script>
```
