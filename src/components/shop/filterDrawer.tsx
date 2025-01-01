'use client'

import { Drawer } from 'antd'
import { useUserAction } from '@/zustand/user'
import FilterSide from './filter'

export default function FilterDrawer() {
  const { openFilterDrawer, setOpenFilterDrawer } = useUserAction()
  console.log(openFilterDrawer)

  const onClose = () => {
    setOpenFilterDrawer(false)
  }

  return (
    <Drawer title="Bộ lọc sản phẩm" placement="left" open={openFilterDrawer} onClose={onClose}>
      <FilterSide />
    </Drawer>
  )
}
