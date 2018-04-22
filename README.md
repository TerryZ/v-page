# v-page

> A simple pagination bar, based on Vue2.x

*plugin preview*

<p align="center"><img src="https://terryz.github.io/image/v-page/v-page.png" alt="v-page" height="54px"></p>

## Demo、Document、Changelog
Explorer on

- [English official site](https://terryz.github.io/vue)
- [中文官网](https://terryz.oschina.io/vue)

## State

[![npm version](https://img.shields.io/npm/v/v-page.svg)](https://www.npmjs.com/package/v-page)
[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://mit-license.org/)
[![npm](https://img.shields.io/npm/dy/v-page.svg)](https://www.npmjs.com/package/v-page)

## Install

``` bash
# install dependencies
npm install v-page --save
```

Include plugin in your `main.js` file.

```js
import Vue from 'vue'
import vPage from 'v-page';
...

Vue.use(vPage);
```

## Deploy on your component

template code

```html
<template>
  <!-- v-bind 'setting' data to config page bar -->
  <!-- bind event 'page-change' to receive page info change -->
  <v-page :setting="pageSet" @page-change="pageChange"></v-page>
</template>
```

script code

```js
export default {
  name: 'myComponent',
  data(){
    return {
      pageSet: {
        totalRow: 0,//required option
        language: 'en',//default: 'cn'
        pageSizeMenu: [20,100]//default: [10, 20, 50, 100]
      }
    }
  },
  methods:{
    //receive page info change callback
    pageChange(pInfo){
      console.log(pInfo);//{pageNumber: 1, pageSize: 10}
    }
  }
};
```
