'use client'

import React from 'react'
import { Suspense, lazy } from 'react'
import { Alert } from '@/components/product-management/tabs/alert'
import { useProductManagement } from '@/zustand/productManagement'
import productService from '@/services/product/product.service'
import toast from 'react-hot-toast'
import { mutate } from 'swr'
import { useSearchParams } from 'next/navigation'
import Loading from '@/app/loading'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import { useWalletStore } from '@/zustand/wallet'
import { useClient } from '@/hooks/useClient'

const DataTable = lazy(() => import('@/components/product-management/dataTable'))
const ViewProductModal = lazy(() => import('@/components/product-management/viewProduct'))
const EditProduct = lazy(() => import('@/components/product-management/editProduct'))
const AddProduct = lazy(() => import('@/components/product-management/addProduct'))
const AddAdressModal = lazy(() => import('@/components/product-management/addAdressModal'))

const ProductManagement = () => {
  const param = useSearchParams()
  const { config } = useClient()
  const { wallet } = useWalletStore()

  const page = Number(param.get('page')) || 1
  const limit = Number(param.get('limit')) || 10
  const searchKey = param.get('searchKey') || ''
  const sortField = param.get('sortField') || ''
  const sortOrder = param.get('sortOrder') || ''

  const { user } = useAuth()

  const { toggleDeleteProductModal, openDeleteProductModal, product, setProduct, setOpenAddressModal } =
    useProductManagement()

  const handleDeleteProduct = async () => {
    try {
      await productService
        .deleteProduct(product._id)
        .then(() => {
          toast.success('Xóa sản phẩm thành công')
          toggleDeleteProductModal()
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setProduct({} as any)
          mutate(['/api/product', page, limit, searchKey, sortField, sortOrder])
        })
        .catch(() => {
          toast.error('Xóa sản phẩm thất bại')
        })
    } catch {
      toast.error('Xóa sản phẩm thất bại')
    }
  }

  return (
    <div className="container px-1 md:px-10 mx-auto">
      <Suspense fallback={<Loading />}>
        <EditProduct />
        <ViewProductModal />
        <AddAdressModal />
      </Suspense>
      <div className="title text-black text-2xl font-semibold">
        <h2>Quản lý sản phẩm</h2>
      </div>
      <div className="flex justify-end">
        <Suspense fallback={<Loading />}>
          <AddProduct />
        </Suspense>
        <Alert
          title="Xác nhận xóa"
          content="Bạn có chắc chắn muốn xóa sản phẩm này không?"
          nameOk="Xóa"
          nameCancel="Hủy"
          onSubmit={handleDeleteProduct}
          onOpen={openDeleteProductModal}
          onClose={toggleDeleteProductModal}
        />
      </div>
      <div className="flex justify-end">
        {config?.valueToCross !== undefined && wallet.point <= config.valueToCross && (
          <p className="text-red-500">
            Vui lòng{' '}
            <Link href={'/packet'} className="text-blue-500 hover:underline">
              nạp thêm
            </Link>{' '}
            kim cương để thêm sản phẩm (Tối thiểu {config.valueToCross} kim cương)
          </p>
        )}
        {(!user?.address || !user?.phone) && (
          <p className="text-red-500">
            Vui lòng{' '}
            <span onClick={() => setOpenAddressModal(true)} className="text-blue-500 hover:underline">
              cập nhật
            </span>{' '}
            thông tin địa chỉ nhận hàng và số điện thoại để thêm sản phẩm
          </p>
        )}
      </div>
      <div className="flex justify-end">
        {!user?.banking && (
          <p className="text-red-500">
            Vui lòng{' '}
            <Link href="/banking-infor" className="text-blue-500 hover:underline">
              cập nhật
            </Link>{' '}
            thông tin ngân hàng để thêm sản phẩm
          </p>
        )}
      </div>
      <div className="mt-5 bg-white p-2 shadow-lg rounded-md">
        <Suspense fallback={<Loading />}>
          <DataTable />
        </Suspense>
      </div>
    </div>
  )
}

export default ProductManagement
