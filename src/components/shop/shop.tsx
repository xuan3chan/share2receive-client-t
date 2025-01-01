'use client'
import { useState } from 'react'
import { Divider } from 'antd'
import { useSearchParams, useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { useUserAction } from '@/zustand/user'
import IconifyIcon from '../icons'
import { ProductsClient } from '@/types/users/productTypes'
import { motion, AnimatePresence } from 'framer-motion'

const ProductCard = dynamic(() => import('./productCard'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 h-full w-full rounded" />,
})
const FilterTag = dynamic(() => import('./filterTag'), {
  ssr: false,
  loading: () => <div className="h-10 bg-gray-100 animate-pulse" />,
})
const FilterSide = dynamic(() => import('./filter'), {
  ssr: false,
  loading: () => <div className="h-screen w-full bg-gray-100 animate-pulse" />,
})
const FilterDrawer = dynamic(() => import('./filterDrawer'), { ssr: false, loading: () => <div /> })

const Shop = ({ products, total }: { products: ProductsClient[]; total: number }) => {
  const { setOpenFilterDrawer } = useUserAction()
  const param = useSearchParams()
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState<number>(param.get('page') ? Number(param.get('page')) : 1)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const handleLoadMore = () => {
    const newPage = currentPage + 1
    setCurrentPage(newPage)

    const currentParams = new URLSearchParams(param.toString())
    currentParams.set('page', newPage.toString())

    router.push(`/shop?page=${newPage}`)
  }

  return (
    <>
      <FilterDrawer />
      <div className="container mx-auto mt-5">
        <p className="md:px-0 px-2 text-xl md:text-2xl font-semibold uppercase flex items-center">
          <IconifyIcon icon="tabler:filter" className="text-xl font-semibold md:text-3xl md:font-bold" /> Bộ lọc tìm
          kiếm
        </p>
        <div className="container md:px-0 px-2 mx-auto mt-2 md:mt-5">
          <FilterTag />
        </div>
        <Divider
          className="md:hidden block"
          style={{
            borderColor: '#000',
            padding: '0 8px',
            margin: '10px 8px',
          }}
        />
        <p className="md:hidden md:px-0 px-2 text-blue-600 underline" onClick={() => setOpenFilterDrawer(true)}>
          Lọc kết quả
        </p>
        <div className="flex mt-3">
          <div className="w-[22%] h-full hidden md:block">
            <FilterSide />
          </div>
          <div className="w-full md:w-[75%] h-full md:ml-5">
            <div className="container mx-auto px-2 md:px-5 mb-10">
              <p className="text-xl font-semibold">{total} Kết quả</p>
              <motion.div className="container mx-auto mt-3" layout>
                <AnimatePresence mode="wait">
                  <motion.div
                    className="flex flex-wrap gap-3"
                    variants={container}
                    initial="hidden"
                    animate="show"
                    layout
                  >
                    {products?.map((product, index) => (
                      <motion.div
                        layout
                        layoutId={product._id}
                        variants={item}
                        initial="hidden"
                        animate="show"
                        exit={{ opacity: 0, y: -20 }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.1,
                          layout: {
                            duration: 0.3,
                          },
                        }}
                        className="w-[48%] md:w-[24%] h-[420px] md:h-[500px]"
                        key={product._id}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {products && products.length < total && (
                  <motion.div className="text-center mt-5" layout>
                    <button
                      onClick={handleLoadMore}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Hiển thị thêm
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Shop
