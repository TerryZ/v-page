import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
// import page from '@/components/v-page/Page'
import page from '@/Page'
// import Vue from 'vue'

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
      expect(values.sort().join('')).to.equal(
        [16, 17, 18, 19, 20].sort().join('')
      )
    })
  })

  describe('dom operation', () => {
    const wrapper = mount(page, {
      props: {
        modelValue: 3,
        totalRow: 101
      }
    })

    it('click page number `5`, the page 5 <li> item class name should be `active`', () => {
      wrapper.findAll('a').at(8).trigger('click')
      // console.log(wrapper.html());
      // expect(wrapper.props('totalRow')).to.equal(100);
      // expect(wrapper.is('div')).equal(true);
      expect(wrapper.findAll('li').at(6).classes('active')).to.equal(true)
    })
    it('the number of current page should be 5', () => {
      expect(wrapper.vm.current).to.equal(5)
    })
    it('the page numbers should be [3,4,5,6,7]', () => {
      expect(wrapper.vm.pageNumbers.sort().join('')).to.equal(
        [3, 4, 5, 6, 7].sort().join('')
      )
    })

    it('click `last page` button, the number of current page should be 11', () => {
      // click `last page` button
      wrapper.find('li.v-pagination__last').find('a').trigger('click')
      expect(wrapper.vm.current).to.equal(11)
    })
    it('the `next page` and `last page` buttons should be disabled', () => {
      expect(
        wrapper.find('li.v-pagination__next').classes('disabled')
      ).to.equal(true)
      expect(
        wrapper.find('li.v-pagination__last').classes('disabled')
      ).to.equal(true)
    })
    it('the page info bar content should be `当前显示第 11 / 11 页（共101条记录）`', () => {
      const expectInfoString = '当前显示第 11 / 11 页（共101条记录）'
      expect(wrapper.find('li.v-pagination__info a').text()).to.equal(
        expectInfoString
      )
    })
  })

  describe('switch page size', () => {
    const wrapper = mount(page, {
      props: {
        modelValue: 5,
        totalRow: 100
      }
    })
    it('initialize v-page with props: { modelValue: 5, totalRow: 100 }', () => {
      expect(wrapper.vm.current).to.equal(5)
      expect(wrapper.vm.totalRow).to.equal(100)
      expect(wrapper.vm.totalPage).to.equal(10)
    })
    it('switch to the third item of list(50), the number of current page should be 1', () => {
      // select the third page size(50) in the dropdown menu
      wrapper.find('select').findAll('option').at(2).setSelected()
      expect(wrapper.vm.current).to.equal(1)
    })
    it('the number of total page should be 2', () => {
      expect(wrapper.vm.totalPage).to.equal(2)
    })
    it('`displayAll` prop set to true, page length list should add `全部` option', async () => {
      await wrapper.setProps({ displayAll: true })
      expect(
        wrapper
          .find('li.v-pagination__list select')
          .find('option:last-child')
          .text()
      ).to.equal('全部')
    })
    it('switch page length to all, the `page-change` event should return { pageNumber: 1, pageSize: 0 }', () => {
      wrapper
        .find('li.v-pagination__list select')
        .find('option:last-child')
        .setSelected()
      const emitted = wrapper.emitted('page-change')
      const lastEmited = emitted[emitted.length - 1][0]
      expect(lastEmited.pageNumber).to.equal(1)
      expect(lastEmited.pageSize).to.equal(0)
    })
  })

  describe('slot', () => {
    const wrapper = mount(page, {
      props: {
        totalRow: 100
      },
      slots: {
        default: `
        <template #default="props">
          <div>
            <div class="slot-page-number" v-text="props.pageNumber" />
            <div class="slot-page-size" v-text="props.pageSize" />
            <div class="slot-total-page" v-text="props.totalPage" />
            <div class="slot-total-row" v-text="props.totalRow" />
            <div class="slot-is-first" v-text="props.isFirst" />
            <div class="slot-is-last" v-text="props.isLast" />
          </div>
        </template>
        `
      }
    })

    it('scoped slot should output 6 page current states', () => {
      const slot = wrapper.find('li.v-pagination__slot')
      expect(slot.find('.slot-page-number').text()).to.equal('1')
      expect(slot.find('.slot-page-size').text()).to.equal('10')
      expect(slot.find('.slot-total-page').text()).to.equal('10')
      expect(slot.find('.slot-total-row').text()).to.equal('100')
      expect(slot.find('.slot-is-first').text()).to.equal('true')
      expect(slot.find('.slot-is-last').text()).to.equal('false')
    })
    it('go to last page, scoped slot states should be updated', async () => {
      await wrapper.find('li.v-pagination__last a').trigger('click')

      const slot = wrapper.find('li.v-pagination__slot')
      expect(slot.find('.slot-page-number').text()).to.equal('10')
      expect(slot.find('.slot-page-size').text()).to.equal('10')
      expect(slot.find('.slot-total-page').text()).to.equal('10')
      expect(slot.find('.slot-total-row').text()).to.equal('100')
      expect(slot.find('.slot-is-first').text()).to.equal('false')
      expect(slot.find('.slot-is-last').text()).to.equal('true')
    })
  })
})
