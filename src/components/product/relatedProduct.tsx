'use client'
import { useState, useEffect } from 'react'
import productService from '@/services/product/product.service'
import { ProductsClient } from '@/types/users/productTypes'
import ProductCard from '../shop/productCard'

export default function RelatedProduct({ categoryId }: { categoryId: string }) {
  const [products, setProducts] = useState<ProductsClient[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getAllProdClient(
          1,
          10,
          [categoryId],
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
        )
        setProducts(response.data)
      } catch (error) {
        console.error('Lỗi khi tải sản phẩm liên quan:', error)
      }
    }

    fetchProducts()

    // Thiết lập interval để tự động cập nhật mỗi 10 giây
    const interval = setInterval(fetchProducts, 10000)

    // Cleanup function
    return () => clearInterval(interval)
  }, [categoryId])

  return (
    <>
      <div className="container mx-auto px-2 md:px-16 mb-10">
        <div className="w-full border-b-2">
          <h3 className="text-lg md:text-2xl font-semibold">Sản phẩm liên quan</h3>
        </div>
        <div className="flex flex-row flex-wrap gap-3 mt-3 w-full">
          {products.map((product) => (
            <div className="w-[48%] md:w-[24%] h-[420px] md:h-[500px]" key={product._id}>
              <ProductCard product={product} isLoading={false} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
