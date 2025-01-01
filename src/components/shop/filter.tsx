'use client'

import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Collapse } from 'antd'
import { useClient } from '@/hooks/useClient'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import dynamic from 'next/dynamic'

const FillterCategory = dynamic(() => import('./fillterCollapse.tsx/category'), { ssr: false, loading: () => <div /> })
const FillterBrand = dynamic(() => import('./fillterCollapse.tsx/brand'), { ssr: false, loading: () => <div /> })
const FillterType = dynamic(() => import('./fillterCollapse.tsx/type'), { ssr: false, loading: () => <div /> })
const FillterStyle = dynamic(() => import('./fillterCollapse.tsx/style'), { ssr: false, loading: () => <div /> })
const FillterMaterial = dynamic(() => import('./fillterCollapse.tsx/material'), { ssr: false, loading: () => <div /> })
const FillterColor = dynamic(() => import('./fillterCollapse.tsx/color'), { ssr: false, loading: () => <div /> })
const FillterSize = dynamic(() => import('./fillterCollapse.tsx/size'), { ssr: false, loading: () => <div /> })
const FillterPrice = dynamic(() => import('./fillterCollapse.tsx/price'), { ssr: false, loading: () => <div /> })
const FillterStatus = dynamic(() => import('./fillterCollapse.tsx/status'), { ssr: false, loading: () => <div /> })

const expandIcon = ({ isActive }: { isActive: boolean | undefined }) => {
  return isActive ? (
    <MinusOutlined
      style={{
        fontSize: '1.5rem',
        color: '#000',
      }}
    />
  ) : (
    <PlusOutlined
      style={{
        fontSize: '1.5rem',
        color: '#000',
      }}
    />
  )
}

const FilterSide = () => {
  const { categories, brands } = useClient()
  const [activeKey, setActiveKey] = useState<string[]>(['1', '2', '3', '4', '5', '6', '7', '8', '9'])
  const handleCollapseChange = (key: string[]) => {
    setActiveKey(key)
  }

  const router = useRouter()
  const param = useSearchParams()

  const handleFilterChange = (checked: boolean, filterType: string, value: string) => {
    const currentParams = new URLSearchParams(param.toString())

    if (checked) {
      currentParams.append(filterType, value)
    } else {
      const filterValues = currentParams.getAll(filterType).filter((v) => v !== value)
      currentParams.delete(filterType)
      filterValues.forEach((v) => currentParams.append(filterType, v))
    }

    router.push(`?${currentParams.toString()}`, { scroll: false })
  }

  const isFilterChecked = (filterKey: string, filterValue: string) => {
    const filterValues = param.getAll(filterKey)
    return filterValues.includes(filterValue)
  }

  const handlePriceRangeChange = (checked: boolean, startPrice: number, endPrice: number) => {
    const currentParams = new URLSearchParams(param.toString())

    if (checked) {
      // If the range is checked, update both start and end price
      currentParams.set('filterStartPrice', startPrice.toString())
      currentParams.set('filterEndPrice', endPrice.toString())
    } else {
      // If unchecked, remove both start and end price from the query params
      currentParams.delete('filterStartPrice')
      currentParams.delete('filterEndPrice')
    }

    // Replace the URL without reloading the page or adding history, preventing scroll to top
    router.push(`?${currentParams.toString()}`, { scroll: false })
  }

  const isPriceRangeChecked = (startPrice: number, endPrice: number) => {
    const currentStartPrice = param.get('filterStartPrice')
    const currentEndPrice = param.get('filterEndPrice')

    return currentStartPrice === startPrice.toString() && currentEndPrice === endPrice.toString()
  }

  return (
    <>
      <Collapse
        bordered
        ghost
        expandIconPosition="end"
        collapsible="icon"
        size="large"
        activeKey={activeKey}
        onChange={(key) => handleCollapseChange(key as string[])}
        expandIcon={({ isActive }) => expandIcon({ isActive })}
      >
        <Collapse.Panel
          header={<p className="text-xl font-medium">Theo danh mục </p>}
          key="1"
          style={{
            borderBottom: '1px solid #000',
          }}
        >
          <FillterCategory
            categories={categories}
            handleFilterChange={handleFilterChange}
            isFilterChecked={isFilterChecked}
          />
        </Collapse.Panel>

        <Collapse.Panel
          header={<p className="text-xl font-medium">Theo kích thước </p>}
          key="2"
          style={{
            borderBottom: '1px solid #000',
          }}
        >
          <FillterSize handleFilterChange={handleFilterChange} isFilterChecked={isFilterChecked} />
        </Collapse.Panel>

        <Collapse.Panel
          header={<p className="text-xl font-medium">Theo màu sắc </p>}
          key="3"
          style={{
            borderBottom: '1px solid #000',
          }}
        >
          <FillterColor handleFilterChange={handleFilterChange} isFilterChecked={isFilterChecked} />
        </Collapse.Panel>

        <Collapse.Panel
          header={<p className="text-xl font-medium">Theo chất liệu </p>}
          key="7"
          style={{
            borderBottom: '1px solid #000',
          }}
        >
          <FillterMaterial handleFilterChange={handleFilterChange} isFilterChecked={isFilterChecked} />
        </Collapse.Panel>

        <Collapse.Panel
          header={<p className="text-xl font-medium">Theo giá bán</p>}
          key="4"
          style={{
            borderBottom: '1px solid #000',
          }}
        >
          <FillterPrice handlePriceRangeChange={handlePriceRangeChange} isPriceRangeChecked={isPriceRangeChecked} />
        </Collapse.Panel>

        <Collapse.Panel
          header={<p className="text-xl font-medium">Theo tình trạng </p>}
          key="5"
          style={{
            borderBottom: '1px solid #000',
          }}
        >
          <FillterStatus handleFilterChange={handleFilterChange} isFilterChecked={isFilterChecked} />
        </Collapse.Panel>

        <Collapse.Panel
          header={
            <>
              <div>
                <p className="text-xl font-medium">Theo thương hiệu </p>
              </div>
            </>
          }
          key="6"
          style={{
            borderBottom: '1px solid #000',
          }}
        >
          <FillterBrand brands={brands} handleFilterChange={handleFilterChange} isFilterChecked={isFilterChecked} />
        </Collapse.Panel>

        <Collapse.Panel
          header={<p className="text-xl font-medium">Theo loại sản phẩm</p>}
          key="8"
          style={{
            borderBottom: '1px solid #000',
          }}
        >
          <FillterType handleFilterChange={handleFilterChange} isFilterChecked={isFilterChecked} />
        </Collapse.Panel>

        <Collapse.Panel header={<p className="text-xl font-medium ">Theo phong cách </p>} key="9">
          <FillterStyle handleFilterChange={handleFilterChange} isFilterChecked={isFilterChecked} />
        </Collapse.Panel>
      </Collapse>
    </>
  )
}

export default FilterSide
