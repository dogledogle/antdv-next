import type { MenuProps } from '..'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Menu from '..'
import { mount, waitFakeTimer } from '/@tests/utils'

const items: NonNullable<MenuProps['items']> = [{ key: 'menu1', label: 'item' }]

describe('menu tooltip', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('inlineCollapsed Menu.Item Tooltip can be disabled by prop', async () => {
    vi.useFakeTimers()
    try {
      const wrapper = mount(() => (
        <Menu mode="inline" inlineCollapsed tooltip={false} items={items} />
      ), { attachTo: document.body })
      await waitFakeTimer()

      await wrapper.find('li.ant-menu-item').trigger('mouseenter')
      await waitFakeTimer()

      expect(document.querySelector('.ant-tooltip-container')).toBeFalsy()

      wrapper.unmount()
    }
    finally {
      vi.clearAllTimers()
      vi.useRealTimers()
    }
  })

  it('inlineCollapsed Menu.Item Tooltip should support custom props', async () => {
    vi.useFakeTimers()
    try {
      const itemsWithTitle: NonNullable<MenuProps['items']> = [
        { key: 'menu1', label: 'item', title: 'title' },
      ]
      const wrapper = mount(() => (
        <Menu
          mode="inline"
          inlineCollapsed
          tooltip={{ title: 'Custom Title', placement: 'left', classes: { root: 'custom-root' } }}
          items={itemsWithTitle}
        />
      ), { attachTo: document.body })
      await waitFakeTimer()

      await wrapper.find('li.ant-menu-item').trigger('mouseenter')
      await waitFakeTimer()

      const tooltipNode = document.querySelector('.ant-tooltip')
      expect(document.querySelector('.ant-tooltip-container')?.textContent).toBe('Custom Title')
      expect(tooltipNode).toHaveClass('ant-tooltip-placement-left')
      expect(tooltipNode).toHaveClass('custom-root')
      expect(tooltipNode).toHaveClass('ant-menu-inline-collapsed-tooltip')

      wrapper.unmount()
    }
    finally {
      vi.clearAllTimers()
      vi.useRealTimers()
    }
  })

  it('inlineCollapsed Menu.Item Tooltip should support classes function', async () => {
    vi.useFakeTimers()
    try {
      const classesFn = vi.fn(() => ({ root: 'fn-root' }))
      const wrapper = mount(() => (
        <Menu
          mode="inline"
          inlineCollapsed
          tooltip={{ classes: classesFn }}
          items={items}
        />
      ), { attachTo: document.body })
      await waitFakeTimer()

      await wrapper.find('li.ant-menu-item').trigger('mouseenter')
      await waitFakeTimer()

      expect(classesFn).toHaveBeenCalled()
      const tooltipNode = document.querySelector('.ant-tooltip')
      expect(tooltipNode).toHaveClass('fn-root')
      expect(tooltipNode).toHaveClass('ant-menu-inline-collapsed-tooltip')

      wrapper.unmount()
    }
    finally {
      vi.clearAllTimers()
      vi.useRealTimers()
    }
  })

  it('Menu.Item should not render Tooltip when inlineCollapsed is false even with tooltip prop', async () => {
    vi.useFakeTimers()
    try {
      const wrapper = mount(() => (
        <Menu
          defaultSelectedKeys={['menu1']}
          mode="inline"
          tooltip={{ title: 'Custom Title' }}
          items={items}
        />
      ), { attachTo: document.body })
      await waitFakeTimer()

      await wrapper.find('li.ant-menu-item').trigger('mouseenter')
      await waitFakeTimer()

      expect(document.querySelector('.ant-tooltip-container')).toBeFalsy()

      wrapper.unmount()
    }
    finally {
      vi.clearAllTimers()
      vi.useRealTimers()
    }
  })
})
