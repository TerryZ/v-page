# [v-page](https://terryz.github.io/vue/#/page) &middot; [![CircleCI](https://dl.circleci.com/status-badge/img/gh/TerryZ/v-page/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/TerryZ/v-page/tree/master) [![code coverage](https://codecov.io/gh/TerryZ/v-page/branch/master/graph/badge.svg)](https://codecov.io/gh/TerryZ/v-page) [![npm version](https://img.shields.io/npm/v/v-page.svg)](https://www.npmjs.com/package/v-page) [![license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://mit-license.org/) [![npm download](https://img.shields.io/npm/dy/v-page.svg)](https://www.npmjs.com/package/v-page) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A simple pagination bar for vue3, including size Menu, i18n support features

<img src="https://terryz.github.io/image/v-page/v-page.png" alt="v-page" height="54px">

If you are using vue `2.x` version, please use [v-page 2.x](https://github.com/TerryZ/v-page/tree/dev-vue-2) version instead

<!-- ## Features

- Simple interface style
- I18n supported
- Modularization of Pagination bar features
-  -->

## Examples and Documentation

Documentation and examples and please visit below sites

- [github-pages](https://terryz.github.io/docs-vue3/page/)

## Installation

[![https://nodei.co/npm/v-page.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/v-page.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/v-page)

```sh
# npm
npm i v-page
# yarn
yarn add v-page
# pnpm
pnpm add v-page
```

Include and install plugin in your `main.js` file

```js
import { createApp } from 'vue'
import App from './app.vue'
import { PaginationBar } from 'v-page'

const app = createApp(App)
// install component globally
app.use(PaginationBar, {
  // globally config options
})
app.mount('#app')
```

Use `v-page` as a locally component

```vue
<template>
  <PaginationBar />
</template>

<script setup>
import { PaginationBar } from 'v-page'
</script>
```

## Usage

```vue
<template>
  <PaginationBar
    v-model="pageNumber"
    :total-row="totalRow"
    @change="paginationChange"
  />
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { PaginationBar } from 'v-page'
import type { PageInfo } from 'v-page'
// set default page to 3
const pageNumber = ref<number>(3)
const totalRow = ref<number>(100)
// respond for pagination change
function paginationChange (data: PageInfo): void {
  console.log(data) // { pageNumber: 1, pageSize: 10, totalPage: 10 }
}
</script>
```
