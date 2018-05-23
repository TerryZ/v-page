
<h3 align="center">v-page</h3>

<br><br>

<p align="center">
A simple pagination bar, including length Menu, i18n support, based on Vue2.x
</p>

<p align="center"><img src="https://terryz.github.io/image/v-page/v-page.png" alt="v-page" height="54px"></p>

<p align="center">
  <a href="https://www.npmjs.com/package/v-page"><img src="https://img.shields.io/npm/v/v-page.svg"></a>
  <a href="https://mit-license.org/"><img src="https://img.shields.io/badge/license-MIT-brightgreen.svg"></a>
  <a href="https://www.npmjs.com/package/v-page"><img src="https://img.shields.io/npm/dy/v-page.svg"></a>
</p>
<br><br><br><br><br>


## Demo、Document、Changelog
Explorer on

- [English site](https://terryz.github.io/vue/#/page)
- [国内站点](https://terryz.gitee.io/vue/#/page)

the jQuery version: [bPage](https://github.com/TerryZ/bPage)

Quick demo: [v-page gallery](https://codepen.io/terry05/pen/yjZYLR)

<br><br>

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

<br><br>

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
