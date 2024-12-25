import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { PaginationBar } from '@/'
import { getPageNumbers } from '@/helper'
import {
  PaginationComplete, PaginationSlot
} from './PaginationComponents'

describe('v-page', function () {
  describe('page-numbers', function () {
    it('should be [2,3,4,5,6] when current page number is 4', function () {
      const values = getPageNumbers(4, 10, 5)
      expect(values.sort().join('')).to.equal([2, 3, 4, 5, 6].sort().join(''))
    })
    it('should be [1,2,3,4,5] when page number is less than 1(0)', function () {
      const values = getPageNumbers(0, 10, 5)
      expect(values.sort().join('')).to.equal([1, 2, 3, 4, 5].sort().join(''))
    })
    it('should be [16,17,18,19,20] when page number is greater than total page number(22)', function () {
      const values = getPageNumbers(22, 20, 5)
      expect(values.sort().join('')).to.equal(
        [16, 17, 18, 19, 20].sort().join('')
      )
    })
  })

  describe('dom operation', () => {
    const vModelFn = vi.fn()
    const wrapper = mount(PaginationComplete, {
      props: {
        modelValue: 3,
        totalRow: 101,
        language: 'cn',
        border: true,
        'onUpdate:modelValue': vModelFn
      }
    })

    it('分页栏应用了边框线风格', () => {
      expect(wrapper.classes('v-pagination--border')).toBeTruthy()
    })
    it('click page number `5`, the page 5 <li> item class name should be `active`', async () => {
      await wrapper.findAll('a').at(8).trigger('click')
      expect(wrapper.findAll('li').at(6).classes('active')).to.equal(true)
    })
    it('the number of current page should be 5', () => {
      expect(vModelFn).toHaveBeenCalledWith(5)
    })
    it('click `last page` button, the number of current page should be 11', async () => {
      // click `last page` button
      await wrapper.find('li.v-pagination__last').find('a').trigger('click')
      expect(vModelFn).toHaveBeenCalledWith(11)
    })
    it('the `next page` and `last page` buttons should be disabled', () => {
      expect(
        wrapper.find('li.v-pagination__next').classes('disabled')
      ).to.equal(true)
      expect(
        wrapper.find('li.v-pagination__last').classes('disabled')
      ).to.equal(true)
    })
    it('the page info bar content should be `第 11/11 页(共101条记录)`', () => {
      const expectInfoString = '第 11/11 页(共101条记录)'
      expect(wrapper.find('li.v-pagination__info a').text()).to.equal(
        expectInfoString
      )
    })
    it('设置大于总页数的页码，页码应被强制设置为总页数值', async () => {
      await wrapper.setProps({ modelValue: 20 })
      // 总页码没有发生变化，相应事件也应没有被触发
      expect(vModelFn).toHaveBeenCalledTimes(3)
    })
  })

  describe('switch page size', () => {
    const vModelFn = vi.fn()
    const changeFn = vi.fn()
    const wrapper = mount(PaginationComplete, {
      props: {
        modelValue: 5,
        totalRow: 100,
        language: 'cn',
        circle: true,
        onChange: changeFn,
        'onUpdate:modelValue': vModelFn
      }
    })
    const bar = wrapper.getComponent(PaginationBar)
    it('分页栏应用了圆形按钮风格', () => {
      expect(wrapper.classes('v-pagination--circle')).toBeTruthy()
    })
    it('initialize v-page with props: { modelValue: 5, totalRow: 100 }', () => {
      expect(vModelFn).toHaveBeenCalledWith(5)
      expect(bar.props('totalRow')).to.equal(100)
      expect(changeFn).toHaveBeenCalledWith({ pageNumber: 5, pageSize: 10, totalPage: 10 })
    })
    it('switch to the third item of list(50), the number of current page should be 1', () => {
      // select the third page size(50) in the dropdown menu
      wrapper.find('select').findAll('option').at(2).setSelected()
      expect(vModelFn).toHaveBeenCalledWith(1)
    })
    it('the number of total page should be 2', () => {
      expect(bar.emitted('change')[1][0].totalPage).to.equal(2)
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
    it('switch page length to all, the `change` event should return { pageNumber: 1, pageSize: 0 }', () => {
      wrapper
        .find('li.v-pagination__list select')
        .find('option:last-child')
        .setSelected()
      expect(changeFn).toHaveBeenCalledWith({ pageNumber: 1, pageSize: 0, totalPage: 1 })
    })
  })

  describe('每页记录数列表与 `pageSize` 联动应用', () => {
    const vModelPageSizeFn = vi.fn()
    const wrapper = mount(PaginationComplete, {
      props: {
        totalRow: 100,
        language: 'cn',
        pageSize: 25,
        'onUpdate:pageSize': vModelPageSizeFn
      }
    })
    it('每页记录数列表中应包含 `25` 选项，且该项目应被选中', () => {
      expect(wrapper.find('select').element.value).toBe('25')
      expect(wrapper.find('select option:checked').text()).toBe('25')
    })
    it('在记录数列表中选择 `50` 选项，每页记录数应被设置为 `50`', async () => {
      await wrapper.find('select').setValue('50')
      expect(wrapper.find('select').element.value).toBe('50')
      expect(wrapper.find('select option:checked').text()).toBe('50')
    })
    it('列表中应不再存在 `25` 的项目', () => {
      expect(wrapper.find('select option[value="25"]').exists()).toBeFalsy()
    })
    it('设置 `pageSize` prop 为 `15`，应在列表中添加该项目并选中', async () => {
      await wrapper.setProps({ pageSize: 15 })
      expect(vModelPageSizeFn).toHaveBeenCalledWith(15)
      expect(wrapper.find('select option[selected]').text()).toBe('15')
    })
    it('在记录数列表中选择 `20` 选项，每页记录数应被设置为 `20`', async () => {
      await wrapper.find('select').setValue('20')
      expect(wrapper.find('select').element.value).toBe('20')
      expect(wrapper.find('select option:checked').text()).toBe('20')
    })
    it('列表中应不再存在 `15` 的项目', () => {
      expect(wrapper.find('select option[value="15"]').exists()).toBeFalsy()
    })
  })

  describe('props', () => {
    const wrapper = mount(PaginationBar, {
      props: {
        modelValue: 5,
        totalRow: 100,
        align: 'center',
        language: 'cn'
      }
    })
    it('set `align` prop to `center`, pagination should align to the center', () => {
      expect(wrapper.classes().includes('v-pagination--center')).toBeTruthy()
    })
    it('set `disabled` prop to true, pagination should be disabled', async () => {
      await wrapper.setProps({ disabled: true })
      expect(wrapper.classes().includes('v-pagination--disabled')).toBeTruthy()
    })
    it('set `border` prop to true, pagination should have border style', async () => {
      await wrapper.setProps({ border: true })
      expect(wrapper.classes().includes('v-pagination--border')).toBeTruthy()
    })
    it('set `hideOnSinglePage` to true, the pagination should be hidden when the total page is 1', async () => {
      await wrapper.setProps({ hideOnSinglePage: true, pageSize: 100 })
      expect(wrapper.isVisible()).toBeFalsy()
    })
  })

  describe('slot', () => {
    const wrapper = mount(PaginationSlot, {
      props: {
        totalRow: 100,
        pageSize: 25,
        border: true,
        circle: true
      }
    })
    console.log(wrapper.html())

    it('scoped slot should output 6 page current states', () => {
      const slot = wrapper.find('li.v-pagination__slot')
      expect(slot.find('.slot-page-number').text()).to.equal('1')
      expect(slot.find('.slot-page-size').text()).to.equal('25')
      expect(slot.find('.slot-total-page').text()).to.equal('4')
      expect(slot.find('.slot-total-row').text()).to.equal('100')
      expect(slot.find('.slot-is-first').text()).to.equal('true')
      expect(slot.find('.slot-is-last').text()).to.equal('false')
    })
    it('go to last page, scoped slot states should be updated', async () => {
      await wrapper.find('li.v-pagination__last a').trigger('click')

      const slot = wrapper.find('li.v-pagination__slot')
      expect(slot.find('.slot-page-number').text()).to.equal('4')
      expect(slot.find('.slot-page-size').text()).to.equal('25')
      expect(slot.find('.slot-total-page').text()).to.equal('4')
      expect(slot.find('.slot-total-row').text()).to.equal('100')
      expect(slot.find('.slot-is-first').text()).to.equal('false')
      expect(slot.find('.slot-is-last').text()).to.equal('true')
    })
    it('同时启用了圆形按钮风格与边框线样式时，应只有边框线样式生效', () => {
      expect(wrapper.classes().includes('v-pagination--border')).toBeTruthy()
      expect(wrapper.classes().includes('v-pagination--circle')).toBeFalsy()
    })
    it('每页记录数列表当前选中项目应为 `25`', () => {
      expect(wrapper.find('.v-pagination__list select').element.value).toBe('25')
    })
  })
})
