# v-page

> A simple pagination bar, based on Vue2.x

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
    pageChange(pInfo){
      console.log(pInfo);//{pageNumber: 1, pageSize: 10}
    }
  }
};
```
