import { shallowMount } from '@vue/test-utils'
import page from '@/Page'
// import Vue from 'vue'

const expect = require('chai').expect

describe('v-page', function () {
  describe('page-numbers', function () {
    it('should be [2,3,4,5,6] when current page number is 4', function () {
      const env = {
        totalPage: 10,
        pageNumberSize: 5,
        current: 4
      }
      const values = page.computed.pageNumbers.call(env)
      expect(values.sort().join('')).to.equal([2, 3, 4, 5, 6].sort().join(''))
    })
    it('should be [1,2,3,4,5] when page number is less than 1(0)', function () {
      const env = {
        totalPage: 10,
        pageNumberSize: 5,
        current: 0
      }
      const values = page.computed.pageNumbers.call(env)
      expect(values.sort().join('')).to.equal([1, 2, 3, 4, 5].sort().join(''))
    })
    it('should be [16,17,18,19,20] when page number is greater than total page number(22)', function () {
      const env = {
        totalPage: 20,
        pageNumberSize: 5,
        current: 22
      }
      const values = page.computed.pageNumbers.call(env)
      expect(values.sort().join('')).to.equal([16, 17, 18, 19, 20].sort().join(''))
    })
  })

  describe('dom operation', () => {
    const wapper = shallowMount(page, {
      propsData: {
        value: 3,
        totalRow: 101
      }
    })

    it('click page number `5`, the page 5 <li> item class name should be `active`', () => {
      wapper.findAll('a').at(8).trigger('click')
      // console.log(wapper.html());
      // expect(wapper.props('totalRow')).to.equal(100);
      // expect(wapper.is('div')).equal(true);
      expect(wapper.findAll('li').at(6).classes('active')).to.equal(true)
    })
    it('the number of current page should be 5', () => {
      expect(wapper.vm.current).to.equal(5)
    })
    it('the page numbers should be [3,4,5,6,7]', () => {
      expect(wapper.vm.pageNumbers.sort().join('')).to.equal([3, 4, 5, 6, 7].sort().join(''))
    })

    it('click `last page` button, the number of current page should be 11', () => {
      // click `last page` button
      wapper.find('li.v-pagination__last').find('a').trigger('click')
      expect(wapper.vm.current).to.equal(11)
    })
    it('the `next page` and `last page` buttons should be disabled', () => {
      expect(wapper.find('li.v-pagination__next').classes('disabled')).to.equal(true)
      expect(wapper.find('li.v-pagination__last').classes('disabled')).to.equal(true)
    })
    it('the page info bar content should be `当前显示第 11 / 11 页（共101条记录）`', () => {
      const expectInfoString = '当前显示第 11 / 11 页（共101条记录）'
      expect(wapper.find('li.v-pagination__info a').text()).to.equal(expectInfoString)
    })
  })

  describe('switch page size', () => {
    const wapper = shallowMount(page, {
      propsData: {
        value: 5,
        totalRow: 100
      }
    })
    it('initialize v-page with props: { value: 5, totalRow: 100 }', () => {
      expect(wapper.vm.current).to.equal(5)
      expect(wapper.vm.totalRow).to.equal(100)
      expect(wapper.vm.totalPage).to.equal(10)
    })
    it('switch to the third item of list(50), the number of current page should be 1', () => {
      // select the third page size(50) in the dropdown menu
      wapper.find('select').findAll('option').at(2).setSelected()
      expect(wapper.vm.current).to.equal(1)
    })
    it('the number of total page should be 2', () => {
      expect(wapper.vm.totalPage).to.equal(2)
    })
  })
})
