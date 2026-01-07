<script setup lang="ts">
import { ref } from 'vue'
import {
  PaginationBar,
  PaginationPageSizes,
  PaginationInfo,
  PaginationPanel,
  PaginationPageNumbers,
  PaginationFirstPage,
  PaginationPreviousPage,
  PaginationNextPage,
  PaginationLastPage,
  setLanguage
} from '../src'
import type { PageInfo, LanguageKey, AlignDirection } from '../src'

const arr = Array(108)
  .fill(0)
  .map((val, index) => index + 1)
const pageArr = ref<number[]>([])
const disabled = ref(false)
const target = ref(4)
const current = ref(3)
const align = ref<AlignDirection>('left')
const language = ref<LanguageKey>('cn')
const refPage = ref()
const size = ref(25)
const inputPageSize = ref(15)
const pageSizeCurrent = ref(3)

function pagePhotoChange(pInfo: PageInfo) {
  // console.log(pInfo);
  pageArr.value = []
  let start = 0
  let end = 0
  start = pInfo.pageSize * (pInfo.pageNumber - 1)
  end = start + pInfo.pageSize - 1
  pageArr.value = arr.filter((val, idx) => idx >= start && idx <= end)
}
function go() {
  // refPage.value.goPage(Number(target.value))
  current.value = Number(target.value)
}
function displayAllPageChange(data: PageInfo) {
  console.log(data)
}
function changePageSize(val: number | Event) {
  size.value = Number(typeof val === 'number' ? val : inputPageSize.value)
}
function pageChange(data: PageInfo) {
  console.log(data)
}
function changeGlobalLanguage() {
  setLanguage('cn')
}
</script>

<template>
  <div class="p-3 page-demo">
    <section>
      <h1>v-page examples</h1>
    </section>

    <hr />

    <h5>照片墙实例</h5>
    <div class="d-flex flex-wrap border px-3 pt-3 mb-3 rounded-3 shadow-sm">
      <div
        v-for="(num, index) in pageArr"
        :key="index"
        class="rounded-3 bg-light me-3 mb-3 text-black-50 h1 d-flex justify-content-center align-items-center"
        style="width: 11.2rem; height: 8rem"
      >
        {{ num }}
      </div>
    </div>
    <div>
      <PaginationBar
        language="cn"
        align="center"
        :total-row="arr.length"
        @change="pagePhotoChange"
      />
    </div>

    <h5 class="mt-5 mb-3">完整分页栏</h5>
    <div class="bg-light p-3 rounded-3">
      <PaginationBar align="left" :total-row="101" v-model="current" ref="refPage" />

      <div class="d-flex mt-2">
        <div class="col-md-1 me-3">
          <input type="text" class="form-control" v-model="target" />
        </div>
        <button class="btn btn-primary me-3" type="button" @click="go">跳转</button>
        <button class="btn btn-primary" type="button" @click="current = current + 1">
          page number + 1
        </button>
      </div>
    </div>

    <h5 class="mt-5 mb-3">自定义 page size {{ size }}</h5>
    <div class="border p-3 rounded-3">
      <PaginationBar
        align="left"
        border
        display-all
        :total-row="101"
        v-model="pageSizeCurrent"
        v-model:page-size="size"
        @change="pageChange"
        class="mb-3"
      >
        <template #default="{ pageSize }">
          <PaginationPageSizes />
          <PaginationInfo />
          <PaginationPanel>
            <div>pageSize: <span v-text="pageSize" /></div>
          </PaginationPanel>
          <PaginationFirstPage />
          <PaginationPreviousPage />
          <PaginationPageNumbers />
          <PaginationNextPage />
          <PaginationLastPage />
        </template>
      </PaginationBar>
      <PaginationBar
        align="left"
        border
        :total-row="101"
        v-model:page-size="size"
        @change="pageChange"
        v-slot="{ pageSize }"
      >
        <PaginationInfo />
        <PaginationPanel>
          <div>pageSize: <span v-text="pageSize" /></div>
        </PaginationPanel>
        <PaginationFirstPage />
        <PaginationPreviousPage />
        <PaginationPageNumbers />
        <PaginationNextPage />
        <PaginationLastPage />
      </PaginationBar>

      <div class="d-flex mt-2">
        <div class="col-md-1 me-3">
          <input type="text" class="form-control" v-model="inputPageSize" />
        </div>
        <button class="btn btn-primary me-3" type="button" @click="changePageSize">
          change page size
        </button>
        <button class="btn btn-primary" type="button" @click="changePageSize(15)">
          set page size to 15
        </button>
      </div>
    </div>

    <h5 class="mt-5 mb-3">对齐方向</h5>
    <div class="bg-light p-3 rounded-3">
      <div class="mb-3 d-flex align-items-center gap-3">
        <div>方向：</div>
        <div>
          <select v-model="align" class="form-select">
            <option value="left">左对齐</option>
            <option value="center">居中对齐</option>
            <option value="right">右对齐</option>
          </select>
        </div>
        <div>语言：</div>
        <div>
          <select v-model="language" class="form-select">
            <option value="en">English</option>
            <option value="cn">简体中文</option>
            <option value="de">German</option>
            <option value="jp">Japanese</option>
            <option value="pt">Portuguese</option>
          </select>
        </div>
        <div>
          <button type="button" @click="changeGlobalLanguage" class="btn btn-primary">
            change global language to 'cn'
          </button>
        </div>
      </div>
      <div>
        <PaginationBar :align="align" :language="language" :total-row="101">
          <PaginationPageSizes />
          <PaginationInfo />
          <PaginationFirstPage />
          <PaginationPreviousPage />
          <PaginationPageNumbers />
          <PaginationNextPage />
          <PaginationLastPage />
        </PaginationBar>
      </div>
    </div>

    <h5 class="mt-5 mb-3">无页数选择列表</h5>
    <div class="bg-light p-3 rounded-3">
      <PaginationBar :total-row="100" :page-size-options="false" align="left">
        <PaginationInfo />
        <PaginationFirstPage />
        <PaginationPreviousPage />
        <PaginationPageNumbers />
        <PaginationNextPage />
        <PaginationLastPage />
      </PaginationBar>
    </div>

    <h5 class="mt-5 mb-3">无分页信息栏</h5>
    <div class="bg-light p-3 rounded-3">
      <PaginationBar align="left" :total-row="100">
        <PaginationFirstPage />
        <PaginationPreviousPage />
        <PaginationPageNumbers />
        <PaginationNextPage />
        <PaginationLastPage />
      </PaginationBar>
    </div>

    <h5 class="mt-5 mb-3">无首页、尾页</h5>
    <div class="bg-light p-3 rounded-3">
      <PaginationBar :total-row="100" align="left">
        <PaginationPreviousPage />
        <PaginationPageNumbers />
        <PaginationNextPage />
      </PaginationBar>
    </div>

    <h5 class="mt-5 mb-3">无分页码</h5>
    <div class="bg-light p-3 rounded-3">
      <PaginationBar :total-row="100" align="left">
        <PaginationPreviousPage />
        <PaginationNextPage />
      </PaginationBar>
    </div>

    <h5 class="mt-5 mb-3">禁用</h5>
    <div class="border p-3 rounded-3">
      <PaginationBar align="left" :total-row="100" :disabled="disabled">
        <PaginationPageSizes />
        <PaginationInfo />
        <PaginationFirstPage />
        <PaginationPreviousPage />
        <PaginationPageNumbers />
        <PaginationNextPage />
        <PaginationLastPage />
      </PaginationBar>

      <div class="btn-group mt-3" role="group" aria-label="Basic radio toggle button group">
        <input
          type="radio"
          class="btn-check"
          id="radio-enabled"
          autocomplete="off"
          v-model="disabled"
          :value="false"
        />
        <label class="btn btn-outline-primary" for="radio-enabled">Enabled</label>

        <input
          type="radio"
          class="btn-check"
          id="radio-disabled"
          autocomplete="off"
          v-model="disabled"
          :value="true"
        />
        <label class="btn btn-outline-primary" for="radio-disabled">Disabled</label>
      </div>
    </div>

    <h5 class="mt-5 mb-3">圆形按钮风格</h5>
    <div class="bg-white border p-3 rounded-3">
      <PaginationBar :total-row="1500" :disabled="disabled" align="left" language="cn" circle>
        <PaginationPageSizes />
        <PaginationInfo />
        <PaginationFirstPage />
        <PaginationPreviousPage />
        <PaginationPageNumbers />
        <PaginationNextPage />
        <PaginationLastPage />
      </PaginationBar>
    </div>

    <h5 class="mt-5 mb-3">边框</h5>
    <div class="bg-white border p-3 rounded-3">
      <PaginationBar :total-row="100" :disabled="disabled" align="left" language="cn" border circle>
        <PaginationPageSizes />
        <PaginationInfo />
        <PaginationFirstPage />
        <PaginationPreviousPage />
        <PaginationPageNumbers />
        <PaginationNextPage />
        <PaginationLastPage />
      </PaginationBar>
    </div>

    <h5 class="mt-5 mb-3">插槽</h5>
    <div class="border p-3 rounded-3">
      <PaginationBar align="left" :total-row="101" :disabled="disabled">
        <template #default="{ pageNumber, pageSize, totalPage, totalRow, isFirst, isLast }">
          <PaginationPageSizes />
          <PaginationInfo />
          <PaginationFirstPage />
          <PaginationPreviousPage />
          <PaginationPageNumbers />
          <PaginationNextPage />
          <PaginationLastPage />
          <PaginationPanel>
            <div class="d-flex gap-1">
              <div>page: <span v-text="pageNumber" /></div>
              <div>pageSize: <span v-text="pageSize" /></div>
              <div>totalPage: <span v-text="totalPage" /></div>
              <div>totalRow: <span v-text="totalRow" /></div>
              <div>isFirst: <span v-text="isFirst" /></div>
              <div>isLast: <span v-text="isLast" /></div>
            </div>
          </PaginationPanel>
        </template>
      </PaginationBar>
    </div>

    <h5 class="mt-5 mb-3">显示全部数据</h5>
    <div class="p-3 rounded-3 border">
      <PaginationBar :total-row="101" :display-all="true" @change="displayAllPageChange">
        <PaginationPageSizes />
        <PaginationInfo />
        <PaginationFirstPage />
        <PaginationPreviousPage />
        <PaginationPageNumbers />
        <PaginationNextPage />
        <PaginationLastPage />
      </PaginationBar>
    </div>

    <h5 class="mt-5 mb-3">仅一页时隐藏分页栏</h5>
    <div class="p-3 rounded-3 border">
      <PaginationBar :total-row="11" hide-on-single-page>
        <PaginationPageSizes />
        <PaginationInfo />
        <PaginationFirstPage />
        <PaginationPreviousPage />
        <PaginationPageNumbers />
        <PaginationNextPage />
        <PaginationLastPage />
      </PaginationBar>
    </div>
  </div>
</template>

<style lang="sass">
.page-demo
  a
    color: blue
    &:hover
      color: red
</style>
